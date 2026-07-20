<script>
import { ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseDashboardComponent } from '@/components/baseDashboard';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// Base scenario-dashboard composable. Leaf owns the template + registers its Scenario/ScenarioDialog/
// CharacterDetails children and passes options { serviceGameSystem }.
export function useBaseScenarioDashboardComponent(props, context, options) {
	const base = useBaseDashboardComponent(props, context, options);

	const scenarioDialogRef = ref(null);
	const dialogScenario = ref(new DialogSupport());
	const dialogScenarioItem = ref(null);

	const boonName = (id) => {
		return base.serviceGameSystem.boonNameById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const initializeCharacterScenario = (correlationId) => {
		return base.serviceGameSystem.initializeCharacterScenario(correlationId, props.value);
	};
	const dialogScenarioEdit = async (value) => {
		if (!value)
			return;
		await scenarioDialogRef.value.reset(base.correlationId(), LibraryCommonUtility.cloneDeep(value));
		dialogScenario.value.open();
	};
	const dialogScenarioNew = async () => {
		const correlationId = base.correlationId();
		const item = initializeCharacterScenario(correlationId);
		delete item.id;
		item.fameFactionId = props.value.factionId;
		await scenarioDialogRef.value.reset(correlationId, item);
		dialogScenario.value.open();
	};

	return {
		...base,
		scenarioDialogRef,
		dialogScenario,
		dialogScenarioItem,
		boonName,
		initializeCharacterScenario,
		dialogScenarioEdit,
		dialogScenarioNew
	};
};
</script>
