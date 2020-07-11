<template>
	<vue-fragment>
		<!-- // GameSystems Update -->
		<ScenarioNameSnippetPathfinder2e
			v-if="isGameSystemPathfinder2e"
			:value="value"
		/>
		<ScenarioNameSnippetStarfinder1e
			v-if="isGameSystemStarfinder1e"
			:value="value"
		/>
	</vue-fragment>
</template>

<script>
import baseSnippet from '@/components/gameSystems/baseSnippet';

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
	extends: baseSnippet,
	props: {
		value: {
			type: Object,
			default: null
		}
	}
};
</script>