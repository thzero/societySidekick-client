<template>
	<span
		v-if="value.tagLine"
		class="subtitle-1"
	>
		{{ value.tagLine }}
	</span>
	<!-- GameSystems Update -->
	<CharacterSnippetPathfinder2e
		v-if="isGameSystemPathfinder2e"
		:value="value"
	/>
	<CharacterSnippetStarfinder1e
		v-if="isGameSystemStarfinder1e"
		:value="value"
	/>
</template>

<script>
import { useGameSystemBaseSnippetComponent } from '@/components/gameSystems/baseSnippet';

import gameSystemBaseSnippetProps from '@/components/gameSystems/gameSystemBaseSnippetProps';

// GameSystems Update
import CharacterSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/CharacterSnippet';
import CharacterSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/CharacterSnippet';

export default {
	name: 'CharacterSnippet',
	components: {
		// GameSystems Update
		CharacterSnippetPathfinder2e,
		CharacterSnippetStarfinder1e
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
