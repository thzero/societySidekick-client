<script>
import { computed } from 'vue';

import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useGameSystemBaseGameSystemSnippetComponent } from '@/components/gameSystems/baseGameSystemSnippet';

// Scenario snippet logic composable. The template lives in the per-game-system leaf,
// which also provides scenarioLookupAdventureName(value).
export function useScenarioGameSystemSnippetComponent(props, context, options) {
	const base = useGameSystemBaseGameSystemSnippetComponent(props, context, options);

	const gamerTag = computed(() => {
		return props.user && props.user.settings ? props.user.settings.gamerTag : '';
	});

	const getDateHuman = (timestamp) => {
		return LibraryMomentUtility.getDateHuman(timestamp);
	};
	const scenarioName = (scenario) => {
		return scenario ? base.serviceGameSystem.scenarioName(base.correlationId(), scenario) : '';
	};

	return {
		...base,
		gamerTag,
		getDateHuman,
		scenarioName
	};
};
</script>
