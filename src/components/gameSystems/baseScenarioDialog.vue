<script>
import { computed, onMounted, ref, watch } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@/components/base';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

// Reusable scenario-dialog logic composable. The per-game-system leaf owns the template
// (VtFormDialog wrapper + fields + ScenarioLookupDialog child) and passes services/callbacks via options:
//   { serviceGameSystem, rulesGameSystem, gameSystemId(), initScenario(cid),
//     initResponseDetails(cid, details)?, dialogScenariosOkI(cid, id)?, onChangeI(cid, newValue, recalc)?,
//     resetDialogI(cid, value)? }
export function useBaseScenarioDialogComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;
	const rulesGameSystem = options.rulesGameSystem;

	const scenarioLookupRef = ref(null);

	const dateFormat = ref(DEFAULT_DATE_FORMAT);
	const dateTimeFormat = ref(DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT);
	const timeFormat = ref(DEFAULT_TIME_FORMAT);
	const dialogScenarios = ref(new DialogSupport());
	const initialized = ref(false);
	const innerValue = ref(null);
	const isNew = ref(false);
	const lookups = ref({});
	const previousValue = ref(null);
	const scenarionType = ref(null);
	const scenarioName = ref(null);
	const scenarios = ref([]);
	const steps = ref(1);

	const boons = computed(() => {
		const results = serviceGameSystem.boons(base.correlationId(), LibraryClientUtility.$store, true);
		const scenarioId = innerValue.value ? innerValue.value.scenarioId : null;
		const results2 = results ? results.filter(l => l.scenarioId == scenarioId) : [];
		return LibraryCommonUtility.selectBlank(results2);
	});
	const factions = computed(() => {
		return serviceGameSystem.factions(base.correlationId(), LibraryClientUtility.$store, true);
	});
	const locations = computed(() => {
		const settings = AppUtility.settings().getSettingsUserLocations(base.correlationId(), LibraryClientUtility.$store.user.user);
		const list = settings.map(l => { return { id: l.id, name: l.name + (l.online ? ' (' + LibraryClientUtility.$trans.t('locations.online') + ')' : '')}; });
		return LibraryCommonUtility.selectBlank(LibraryCommonUtility.sortByName(list, true));
	});
	const outputType = computed(() => {
		return 'timestamp';
	});
	const status = computed(() => {
		return lookups.value.characterStatus;
	});

	const gameSystemId = () => {
		return options.gameSystemId();
	};
	const initScenario = (correlationId) => {
		return options.initScenario(correlationId);
	};
	const initResponseDetails = (correlationId, details) => {
		return options.initResponseDetails ? options.initResponseDetails(correlationId, details) : details;
	};
	const initializeLookups = (correlationId) => {
		return serviceGameSystem.initializeLookups(correlationId, LibraryClientUtility.$injector);
	};
	const initResponse = () => {
		const details = {
			experiencePointsEarned: rulesGameSystem.cleanDecimal(rulesGameSystem.clean(innerValue.value.experiencePointsEarned)),
			currencyEarned: rulesGameSystem.cleanDecimal(rulesGameSystem.clean(innerValue.value.currencyEarned)),
			currencyIncomeEarned: rulesGameSystem.cleanDecimal(rulesGameSystem.clean(innerValue.value.currencyIncomeEarned)),
			currencySpent: rulesGameSystem.cleanDecimal(rulesGameSystem.clean(innerValue.value.currencySpent)),
			locationId: innerValue.value.locationId,
			scenarioParticipant: innerValue.value.scenarioParticipant,
			scenarioStatus: innerValue.value.scenarioStatus
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

	const dialogScenariosOk = (id) => {
		const correlationId = base.correlationId();
		innerValue.value.scenarioId = id;
		innerValue.value.scenario = LibraryClientUtility.$store.getters.getScenario(correlationId, id);

		rulesGameSystem.calculateScenario(correlationId, innerValue.value);
		scenarioName.value = serviceGameSystem.determineScenarioName(correlationId, innerValue.value, LibraryClientUtility.$store);

		if (options.dialogScenariosOkI)
			options.dialogScenariosOkI(correlationId, id);

		dialogScenarios.value.ok();
	};
	const dialogScenariosOpen = async () => {
		await scenarioLookupRef.value.reset(base.correlationId(), null);
		dialogScenarios.value.open();
	};

	const onChangeI = (correlationId, newValue, recalculateScenario) => {
		return options.onChangeI ? options.onChangeI(correlationId, newValue, recalculateScenario) : recalculateScenario;
	};
	const onChange = (newValue) => {
		if (!initialized.value)
			return;

		let recalculateScenario = (previousValue.value == null);
		if (previousValue.value)
			recalculateScenario = (previousValue.value.scenarioId != newValue.scenarioId);

		const correlationId = base.correlationId();
		recalculateScenario = onChangeI(correlationId, newValue, recalculateScenario);

		if (recalculateScenario)
			rulesGameSystem.calculateScenario(correlationId, newValue);

		previousValue.value = LibraryCommonUtility.cloneDeep(newValue);
	};

	const preComplete = async (correlationId) => {
		const scenario = initResponse();
		scenario.id = innerValue.value.id;
		scenario.gameSystemId = gameSystemId();
		scenario.order = innerValue.value.order;
		scenario.scenarioId = innerValue.value.scenarioId;
		scenario.status = innerValue.value.status;
		scenario.timestamp = innerValue.value.timestamp;
		scenario.updatedTimestamp = props.character.updatedTimestamp;
		const response = await LibraryClientUtility.$store.dispatcher.characters.updateCharacterScenario(correlationId, props.character.id, scenario);
		base.logger.debug('BaseScenarioDialog', 'preComplete', 'response', response, correlationId);
		return response;
	};
	const preCompleteResponseDelete = async (correlationId) => {
		return await LibraryClientUtility.$store.dispatcher.characters.deleteCharacterScenario(correlationId, props.character.id, innerValue.value.id);
	};

	const resetDialog = async (correlationId, value) => {
		steps.value = 1;
		value.timestamp = value.timestamp ? LibraryMomentUtility.convertTimestampToLocal(value.timestamp).valueOf() : LibraryMomentUtility.getTimestampLocal().valueOf();
		scenarioName.value = serviceGameSystem.determineScenarioName(correlationId, value, LibraryClientUtility.$store);

		value.scenario = LibraryClientUtility.$store.getters.getScenario(correlationId, value.scenarioId);

		if (options.resetDialogI)
			await options.resetDialogI(correlationId, value);
		isNew.value = value && !value.id;
		previousValue.value = LibraryCommonUtility.cloneDeep(value);
		innerValue.value = value;
	};

	watch(innerValue, (newValue) => {
		onChange(newValue);
	}, { deep: true });

	// Set innerValue synchronously so the template can bind on first render (initialized guards onChange).
	innerValue.value = initScenario(base.correlationId());

	onMounted(async () => {
		lookups.value = await initializeLookups(base.correlationId());
		initialized.value = true;
	});

	return {
		...base,
		serviceGameSystem,
		rulesGameSystem,
		scenarioLookupRef,
		dateFormat,
		dateTimeFormat,
		timeFormat,
		dialogScenarios,
		initialized,
		innerValue,
		isNew,
		lookups,
		previousValue,
		scenarionType,
		scenarioName,
		scenarios,
		steps,
		boons,
		factions,
		locations,
		outputType,
		status,
		gameSystemId,
		initScenario,
		initResponse,
		initResponseDetails,
		initializeLookups,
		cancel,
		close,
		ok,
		dialogScenariosOk,
		dialogScenariosOpen,
		onChange,
		preComplete,
		preCompleteResponseDelete,
		resetDialog,
		reset: resetDialog
	};
};
</script>
