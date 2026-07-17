<script>
import { computed } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useGameSystemBaseGameSystemSnippetComponent } from '@/components/gameSystems/baseGameSystemSnippet';

// Boon snippet logic composable. The template now lives in the per-game-system leaf
// (e.g. pathfinder2e/BoonSnippet.vue) because Vue 3 has no Options-API template inheritance.
export function useBoonGameSystemSnippetComponent(props, context, options) {
	const base = useGameSystemBaseGameSystemSnippetComponent(props, context, options);

	const serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	const gamerTag = computed(() => {
		return props.user && props.user.settings ? props.user.settings.gamerTag : '';
	});

	const boonDescription = () => {
		if (!props.value.boon.description)
			return '';
		const correlationId = base.correlationId();
		return serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, props.value.boon.description));
	};
	const playedTimestamp = (item) => {
		return LibraryMomentUtility.getDateHuman(item ? item.timestamp : 0);
	};
	const scenarioDescription = (scenario) => {
		return scenario ? scenario.description : '';
	};
	const scenarioName = (correlationId, scenario) => {
		return scenario ? base.serviceGameSystem.scenarioName(correlationId, scenario) : '';
	};

	return {
		...base,
		serviceMarkup,
		gamerTag,
		boonDescription,
		playedTimestamp,
		scenarioDescription,
		scenarioName
	};
};
</script>
