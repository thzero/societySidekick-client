<template>
	<span
		class="displayLink"
		@click="handleDisplay(scenarioDescription)"
		@mouseenter="handleDisplayHover(scenarioDescription)"
		@mouseout="handleDisplayHoverClear()"
	>
		{{ scenarioName }}
	</span>
</template>

<script>
import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useGameSystemBaseScenarioNameSnippetComponent } from '@/components/gameSystems/baseScenarioNameSnippet';

import gameSystemBaseSnippetProps from '@/components/gameSystems/gameSystemBaseSnippetProps';

export default {
	name: 'Pathfinder2eScenarioNameSnippet',
	props: {
		...gameSystemBaseSnippetProps
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useGameSystemBaseScenarioNameSnippetComponent(props, context, { serviceGameSystem });

		return {
			...base
		};
	}
};
</script>

<style scoped>
</style>
