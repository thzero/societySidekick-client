<script>
import { computed, onMounted, ref, watch } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseComponent } from '@/components/base';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

// Reusable boon-dialog logic composable. Folds in the shared BoonDialog.vue behaviour (boonName reset).
// The per-game-system leaf owns the template (VtFormDialog wrapper + fields + BoonLookupDialog child) and
// passes its services/callbacks via options:
//   { serviceGameSystem, rulesGameSystem, gameSystemId(), initBoon(cid), initResponseDetails(cid, details)?, dialogBoonsOkI(cid, id)? }
export function useBaseBoonDialogComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;
	const rulesGameSystem = options.rulesGameSystem;

	const boonLookupRef = ref(null);

	const boonName = ref(null);
	const dateFormat = ref(DEFAULT_DATE_FORMAT);
	const dateTimeFormat = ref(DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT);
	const timeFormat = ref(DEFAULT_TIME_FORMAT);
	const dialogBoons = ref(new DialogSupport());
	const innerValue = ref(null);
	const isNew = ref(false);
	const lookups = ref({});
	const steps = ref(1);

	const locations = computed(() => {
		return LibraryCommonUtility.selectBlank(LibraryCommonUtility.sortByName(AppUtility.settings().getSettingsUserLocations(base.correlationId(), LibraryClientUtility.$store.user.user), true));
	});
	const outputType = computed(() => {
		return 'timestamp';
	});

	const gameSystemId = () => {
		return options.gameSystemId();
	};
	const initBoon = (correlationId) => {
		return options.initBoon(correlationId);
	};
	const initResponseDetails = (correlationId, details) => {
		return options.initResponseDetails ? options.initResponseDetails(correlationId, details) : details;
	};
	const initializeLookups = (correlationId) => {
		return serviceGameSystem.initializeLookups(correlationId, LibraryClientUtility.$injector);
	};
	const initResponse = () => {
		const details = {
			boonId: innerValue.value.boonId,
			locationId: innerValue.value.locationId
		};
		return initResponseDetails(base.correlationId(), details);
	};

	const cancel = async () => {
		context.emit('cancel');
	};
	const close = async () => {
	};
	const ok = async () => {
		context.emit('ok', innerValue.value);
		return true;
	};

	const dialogBoonsOk = (id) => {
		const correlationId = base.correlationId();
		innerValue.value.boonId = id;
		boonName.value = serviceGameSystem.boonNameById(correlationId, id, LibraryClientUtility.$store);
		if (options.dialogBoonsOkI)
			options.dialogBoonsOkI(correlationId, id);
		dialogBoons.value.ok(correlationId);
	};
	const dialogBoonsOpen = async () => {
		await boonLookupRef.value.reset(base.correlationId(), null);
		dialogBoons.value.open();
	};

	const preComplete = async (correlationId) => {
		const boon = initResponse();
		boon.id = innerValue.value.id;
		boon.gameSystemId = gameSystemId();
		boon.boonId = innerValue.value.boonId;
		boon.timestamp = innerValue.value.timestamp;
		boon.updatedTimestamp = props.character.updatedTimestamp;
		const response = await LibraryClientUtility.$store.dispatcher.characters.updateCharacterBoon(correlationId, props.character.id, boon);
		base.logger.debug('BaseBoonDialog', 'preComplete', 'response', response, correlationId);
		return response;
	};
	const preCompleteResponseDelete = async (correlationId) => {
		return await LibraryClientUtility.$store.dispatcher.characters.deleteCharacterBoon(correlationId, props.character.id, innerValue.value.id);
	};

	// Shared BoonDialog.vue resetDialogI: normalize timestamp + resolve the boon name.
	const resetDialog = async (correlationId, value) => {
		steps.value = 1;
		value.timestamp = value.timestamp ? LibraryCommonUtility.convertTimestampToLocal(value.timestamp).valueOf() : LibraryCommonUtility.getTimestampLocal().valueOf();
		boonName.value = serviceGameSystem.boonNameById(correlationId, value.boonId, LibraryClientUtility.$store);
		isNew.value = value && !value.id;
		innerValue.value = value;
	};

	watch(innerValue, () => {}, { deep: true });

	// Set innerValue synchronously so the template can bind to it on first render.
	innerValue.value = initBoon(base.correlationId());

	onMounted(async () => {
		lookups.value = await initializeLookups(base.correlationId());
	});

	return {
		...base,
		serviceGameSystem,
		rulesGameSystem,
		boonLookupRef,
		boonName,
		dateFormat,
		dateTimeFormat,
		timeFormat,
		dialogBoons,
		innerValue,
		isNew,
		lookups,
		steps,
		locations,
		outputType,
		gameSystemId,
		initBoon,
		initResponse,
		initializeLookups,
		cancel,
		close,
		ok,
		dialogBoonsOk,
		dialogBoonsOpen,
		preComplete,
		preCompleteResponseDelete,
		resetDialog,
		reset: resetDialog
	};
};
</script>
