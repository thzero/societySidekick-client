<script>
import { computed } from 'vue';

import { useGameSystemBaseSnippetComponent } from '@/components/gameSystems/baseSnippet';

// Base scenario-name snippet composable. The template lives in the per-game-system leaf,
// which injects its service via options.serviceGameSystem.
export function useGameSystemBaseScenarioNameSnippetComponent(props, context, options) {
	const base = useGameSystemBaseSnippetComponent(props, context, options);

	const scenarioDescription = computed(() => {
		return base.serviceGameSystem.scenarioDescription(base.correlationId(), props.value);
	});
	const scenarioName = computed(() => {
		return base.serviceGameSystem.scenarioName(base.correlationId(), props.value);
	});

	return {
		...base,
		scenarioDescription,
		scenarioName
	};
};
</script>
