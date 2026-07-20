<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseEditComponent } from '@/components/baseEdit';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// Base scenario-card composable. Leaf passes options { serviceGameSystem, rulesGameSystem }.
export function useGameSystemBaseScenarioComponent(props, context, options) {
	const base = useBaseEditComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;
	const rulesGameSystem = options.rulesGameSystem;
	const serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	const dialogScenario = ref(new DialogSupport());
	const lookups = ref([]);

	const hasBoons = computed(() => {
		return props.value.boon1Id || props.value.boon2Id;
	});
	const isInitial = computed(() => {
		return rulesGameSystem.calculateCharacterScenarioInitial(base.correlationId(), props.value);
	});
	const scenarioLevel = computed(() => {
		return props.value.level;
	});

	const boonName = (id) => {
		return serviceGameSystem.boonNameById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const factionName = (id) => {
		return serviceGameSystem.factionNameById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const dialogScenarioOpen = () => {
		context.emit('dialog-edit', props.value);
	};
	const getGameSystemName = (id) => {
		const results = LibraryClientUtility.$store.getters.getGameSystem(base.correlationId(), id);
		return results ? results.name : '';
	};
	const getDateHuman = (timestamp) => {
		return LibraryMomentUtility.getDateHuman(timestamp);
	};
	const initializeLookups = (correlationId) => {
		return serviceGameSystem.initializeLookups(correlationId, LibraryClientUtility.$injector);
	};
	const locationName = (id) => {
		const location = AppUtility.settings().getSettingsUserLocation(base.correlationId(), LibraryClientUtility.$store.user.user, id);
		return location ? '@ ' + location.name : '';
	};
	const markup = (correlationId, value) => {
		if (!value)
			return null;
		return serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, value));
	};
	const scenarioDescription = (value) => {
		return markup(base.correlationId(), serviceGameSystem.determineScenarioDescription(base.correlationId(), value, LibraryClientUtility.$store));
	};
	const scenarioName = (value) => {
		return serviceGameSystem.determineScenarioName(base.correlationId(), value, LibraryClientUtility.$store);
	};
	const scenarioParticipantName = (id) => {
		return serviceGameSystem.scenarioLookupParticipantName(base.correlationId(), id, lookups.value);
	};
	const scenarioStatusName = (id) => {
		return serviceGameSystem.scenarioLookupStatusName(base.correlationId(), id, lookups.value);
	};
	const statusName = (value) => {
		return serviceGameSystem.characterLookupStatusName(base.correlationId(), value, lookups.value);
	};

	onMounted(() => {
		lookups.value = initializeLookups(base.correlationId());
	});

	return {
		...base,
		serviceGameSystem,
		rulesGameSystem,
		serviceMarkup,
		dialogScenario,
		lookups,
		hasBoons,
		isInitial,
		scenarioLevel,
		boonName,
		factionName,
		dialogScenarioOpen,
		getDateHuman,
		getGameSystemName,
		initializeLookups,
		locationName,
		markup,
		scenarioDescription,
		scenarioName,
		scenarioParticipantName,
		scenarioStatusName,
		statusName
	};
};
</script>
