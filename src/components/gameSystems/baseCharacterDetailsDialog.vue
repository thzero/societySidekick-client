<script>
import { computed, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseComponent } from '@/components/base';

// Base character-details-dialog composable. Leaf owns the template (VtFormDialog stepper wrapper + fields)
// and passes services/callbacks via options { serviceGameSystem, initResponseDetails?, resetDialogI? }.
// Exposes reset(cid, value) for the parent CharacterDetails dialog ref.
export function useBaseCharacterDetailsDialogComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;

	const innerValue = ref({});
	const lookups = ref([]);
	const steps = ref(1);

	const assignBoon = (correlationId, boonId, boons, output) => {
		const boon = boons.find(l => l.id == boonId);
		if (boon)
			output.push(boon);
	};
	const fetchBoonsFromScenarios = (correlationId, boons, results, scenarios) => {
		for (const item of (scenarios || [])) {
			if (item.boon1Id)
				assignBoon(correlationId, item.boon1Id, results, boons);
			if (item.boon2Id)
				assignBoon(correlationId, item.boon2Id, results, boons);
		}
	};

	const boons = computed(() => {
		const correlationId = base.correlationId();
		const results = serviceGameSystem.boons(correlationId, LibraryClientUtility.$store, false);

		const boonsOut = [];
		fetchBoonsFromScenarios(correlationId, boonsOut, results, innerValue.value.scenarios);

		if (innerValue.value.boons) {
			for (const item of innerValue.value.boons) {
				if (item.boonId)
					assignBoon(item.boonId, results, boonsOut);
			}
		}

		return boonsOut;
	});
	const factions = computed(() => {
		return serviceGameSystem.factions(base.correlationId(), LibraryClientUtility.$store, true);
	});
	const hasScenarios = computed(() => {
		return innerValue.value.scenarios ? true : false;
	});
	const status = computed(() => {
		return lookups.value.characterStatus;
	});

	const initializeLookups = (correlationId) => {
		return serviceGameSystem.initializeLookups(correlationId, LibraryClientUtility.$injector);
	};
	const initResponseDetails = (correlationId, details) => {
		return options.initResponseDetails ? options.initResponseDetails(correlationId, details) : details;
	};
	const initResponse = (correlationId) => {
		const details = {
			factionId: innerValue.value.factionId,
			status: innerValue.value.status
		};
		return initResponseDetails(base.correlationId(), details);
	};

	const cancel = async () => {
		context.emit('cancel');
	};
	const close = async () => {
	};
	const ok = async () => {
		context.emit('ok');
		return true;
	};
	const open = async () => {
	};
	const preComplete = async (correlationId) => {
		const details = initResponse(correlationId);
		details.id = innerValue.value.id;
		details.gameSystemId = innerValue.value.gameSystemId;
		details.name = String.trim(innerValue.value.name);
		details.number = String.trim(innerValue.value.number);
		details.tagLine = String.trim(innerValue.value.tagLine);
		details.updatedTimestamp = innerValue.value.updatedTimestamp;
		const response = await LibraryClientUtility.$store.dispatcher.characters.updateCharacterDetails(correlationId, details);
		base.logger.debug('BaseCharacterDetailsDialog', 'preComplete', 'response', response, correlationId);
		return response;
	};
	const resetDialog = async (correlationId, value) => {
		steps.value = 1;
		innerValue.value = value ? LibraryCommonUtility.cloneDeep(value) : {};
		if (options.resetDialogI)
			await options.resetDialogI(correlationId);
	};

	// created(): load lookups.
	lookups.value = initializeLookups(base.correlationId());

	return {
		...base,
		serviceGameSystem,
		innerValue,
		lookups,
		steps,
		boons,
		factions,
		hasScenarios,
		status,
		assignBoon,
		fetchBoonsFromScenarios,
		initializeLookups,
		initResponse,
		initResponseDetails,
		cancel,
		close,
		ok,
		open,
		preComplete,
		resetDialog,
		reset: resetDialog
	};
};
</script>
