<template>
	<vue-fragment>
		<span
			v-if="value.tagLine"
			class="subtitle-1"
		>
			{{ value.tagLine }}
		</span>
		<!-- // GameSystems Update -->
		<ScenarioSnippetPathfinder2e
			v-if="isGameSystemPathfinder2e"
			:value="value"
			:user="user"
			:external-list-type="externalListType"
		/>
		<ScenarioSnippetStarfinder1e
			v-if="isGameSystemStarfinder1e"
			:value="value"
			:user="user"
			:external-list-type="externalListType"
		/>
	</vue-fragment>
</template>

<script>
import baseSnippet from '@/components/gameSystems/baseSnippet';

// GameSystems Update
import ScenarioSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/ScenarioSnippet';
import ScenarioSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/ScenarioSnippet';

export default {
	name: 'ScenarioSnippet',
	components: {
		// GameSystems Update
		ScenarioSnippetPathfinder2e,
		ScenarioSnippetStarfinder1e
	},
	extends: baseSnippet
};
</script>