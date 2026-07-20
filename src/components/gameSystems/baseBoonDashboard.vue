<script>
import { computed, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseDashboardComponent } from '@/components/baseDashboard';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// Base boon-dashboard composable. Leaf owns the template + registers its Boon/BoonDialog/CharacterDetails
// children and passes options { serviceGameSystem, boonsScenario(correlationId, results, scenario) }.
export function useBaseBoonDashboardComponent(props, context, options) {
	const base = useBaseDashboardComponent(props, context, options);

	const boonDialogRef = ref(null);
	const dialogBoon = ref(new DialogSupport());
	const dialogBoonItem = ref(null);

	const boonName = (id) => {
		return base.serviceGameSystem.boonNameById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const initializeCharacterBoon = (correlationId) => {
		return base.serviceGameSystem.initializeCharacterBoon(correlationId, props.value);
	};
	const initializeCharacterBoon2 = (correlationId, boonId, scenario) => {
		const results = initializeCharacterBoon(correlationId);
		results.boonId = boonId;
		results.locationId = scenario.locationId;
		results.scenario = scenario;
		results.timestamp = scenario.timestamp;
		return results;
	};
	const boonsScenario = (correlationId, results, scenario) => {
		if (options.boonsScenario)
			options.boonsScenario(correlationId, results, scenario, initializeCharacterBoon2);
	};

	const boons = computed(() => {
		const correlationId = base.correlationId();
		const results = props.value && props.value.boons ? props.value.boons : [];
		const scenarios = props.value && props.value.scenarios ? props.value.scenarios : [];
		for (const scenario of scenarios)
			boonsScenario(correlationId, results, scenario);
		for (const result of results)
			result.name = boonName(result.boonId);
		return LibraryCommonUtility.sortByName(results, true);
	});

	const dialogBoonEdit = async (value) => {
		if (!value)
			return;
		await boonDialogRef.value.reset(base.correlationId(), LibraryCommonUtility.cloneDeep(value));
		dialogBoon.value.open();
	};
	const dialogBoonNew = async () => {
		let item = initializeCharacterBoon(base.correlationId());
		delete item.id;
		await boonDialogRef.value.reset(base.correlationId(), item);
		dialogBoon.value.open();
	};

	return {
		...base,
		boonDialogRef,
		dialogBoon,
		dialogBoonItem,
		boons,
		boonName,
		initializeCharacterBoon,
		initializeCharacterBoon2,
		dialogBoonEdit,
		dialogBoonNew
	};
};
</script>
