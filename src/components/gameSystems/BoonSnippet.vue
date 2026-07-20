<template>
	<!-- GameSystems Update -->
	<BoonSnippetPathfinder2e
		v-if="isGameSystemPathfinder2e"
		:value="value"
		:user="user"
	/>
	<!-- <BoonSnippetStarfinder1e
		v-if="isGameSystemStarfinder1e"
		:value="value"
		:user="user"
	/> -->
</template>

<script>
import { useGameSystemBaseSnippetComponent } from '@/components/gameSystems/baseSnippet';

import gameSystemBaseSnippetProps from '@/components/gameSystems/gameSystemBaseSnippetProps';

// GameSystems Update
import BoonSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/BoonSnippet';
// import BoonSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/BoonSnippet';

export default {
	name: 'BoonSnippet',
	components: {
		// GameSystems Update
		BoonSnippetPathfinder2e
		// BoonSnippetStarfinder1e
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

<style scoped>
</style>
