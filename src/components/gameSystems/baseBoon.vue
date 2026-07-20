<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseEditComponent } from '@/components/baseEdit';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// Base boon-card composable. Leaf passes services via options { serviceGameSystem, rulesGameSystem }.
export function useGameSystemBaseBoonComponent(props, context, options) {
	const base = useBaseEditComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;
	const rulesGameSystem = options.rulesGameSystem;
	const serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	const dialogScenario = ref(new DialogSupport());
	const lookups = ref([]);

	const boonDescription = (id) => {
		const correlationId = base.correlationId();
		return serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, serviceGameSystem.boonDescriptionById(correlationId, id, LibraryClientUtility.$store)));
	};
	const boonName = (id) => {
		return serviceGameSystem.boonNameById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const boonUses = (id) => {
		return serviceGameSystem.boonUsesById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const getGameSystemName = (id) => {
		const results = LibraryClientUtility.$store.getters.getGameSystem(base.correlationId(), id);
		return results ? results.name : '';
	};
	const getDateHuman = (timestamp) => {
		return LibraryMomentUtility.getDateHuman(timestamp);
	};
	const initializeLookups = (correlationId) => {
		if (!serviceGameSystem)
			return [];
		return serviceGameSystem.initializeLookups(correlationId, LibraryClientUtility.$injector);
	};
	const locationName = (id, at) => {
		const location = AppUtility.settings().getSettingsUserLocation(base.correlationId(), LibraryClientUtility.$store.user.user, id);
		return location ? (at ? '@ ' : '') + location.name : '';
	};
	const scenarioName = (value) => {
		return serviceGameSystem.determineScenarioName(base.correlationId(), value, LibraryClientUtility.$store);
	};
	const dialogBoonOpen = () => {
		context.emit('dialog-edit', props.value);
	};

	const boonUsesArray = computed(() => {
		let uses = boonUses(props.value.boonId);
		if (!uses)
			return [];
		uses = Number(uses);
		return [ ...Array(uses).keys() ].map(i => i + 1);
	});
	const hasScenario = computed(() => {
		return props.value ? props.value.scenario : null;
	});

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
		boonDescription,
		boonName,
		boonUses,
		getGameSystemName,
		getDateHuman,
		initializeLookups,
		locationName,
		scenarioName,
		dialogBoonOpen,
		boonUsesArray,
		hasScenario
	};
};
</script>
