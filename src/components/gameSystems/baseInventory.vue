<script>
import { ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseEditComponent } from '@/components/baseEdit';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// Base inventory-row composable. Leaf owns the <tr> template + passes options { serviceGameSystem }.
// The leaf must declare a `character` prop (used by scenarioById/scenarioName/scenarioOrder).
export function useGameSystemBaseInventoryComponent(props, context, options) {
	const base = useBaseEditComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;

	const dialogEdit = ref(new DialogSupport());

	const dialogEditOpen = () => {
		context.emit('dialog-edit', props.value);
	};
	const getGameSystemName = (id) => {
		const results = LibraryClientUtility.$store.getters.getGameSystem(base.correlationId(), id);
		return results ? results.name : '';
	};
	const scenarioById = (id) => {
		return props.character.scenarios.find(l => l.id === id);
	};
	const scenarioNameById = (id) => {
		return id ? serviceGameSystem.determineScenarioNameById(base.correlationId(), id, LibraryClientUtility.$store) : '';
	};
	const scenarioName = (id) => {
		if (!props.character || !props.character.inventory)
			return '';
		const scenario = scenarioById(id);
		if (!scenario)
			return '';
		return scenarioNameById(scenario.scenarioId);
	};
	const scenarioOrder = (id) => {
		if (!props.character || !props.character.inventory)
			return '';
		const scenario = scenarioById(id);
		if (!scenario)
			return '';
		return scenario.order;
	};

	return {
		...base,
		serviceGameSystem,
		dialogEdit,
		dialogEditOpen,
		getGameSystemName,
		scenarioById,
		scenarioName,
		scenarioNameById,
		scenarioOrder
	};
};
</script>
