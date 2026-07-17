<template>
	<!-- GameSystems Update -->
	<ScenarioNameSnippetPathfinder2e
		v-if="isGameSystemPathfinder2e"
		:value="value"
	/>
	<ScenarioNameSnippetStarfinder1e
		v-if="isGameSystemStarfinder1e"
		:value="value"
	/>
</template>

<script>
import { useGameSystemBaseSnippetComponent } from '@/components/gameSystems/baseSnippet';

import gameSystemBaseSnippetProps from '@/components/gameSystems/gameSystemBaseSnippetProps';

// GameSystems Update
import ScenarioNameSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/ScenarioNameSnippet';
import ScenarioNameSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/ScenarioNameSnippet';

export default {
	name: 'ScenarioNameSnippet',
	components: {
		// GameSystems Update
		ScenarioNameSnippetPathfinder2e,
		ScenarioNameSnippetStarfinder1e
	},
	props: {
		...gameSystemBaseSnippetProps
	},
	setup(props, context) {
		const {
			isGameSystemPathfinder2e,
			isGameSystemStarfinder1e
		} = useGameSystemBaseSnippetComponent(props, context);

		return {
			isGameSystemPathfinder2e,
			isGameSystemStarfinder1e
		};
	}
};
</script>
