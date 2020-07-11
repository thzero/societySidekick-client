<template>
	<vue-fragment>
		<span
			v-if="value.tagLine"
			class="subtitle-1"
		>
			{{ value.tagLine }}
		</span>
		<!-- // GameSystems Update -->
		<CharacterSnippetPathfinder2e
			v-if="isGameSystemPathfinder2e"
			:value="value"
		/>
		<CharacterSnippetStarfinder1e
			v-if="isGameSystemStarfinder1e"
			:value="value"
		/>
	</vue-fragment>
</template>

<script>
import baseSnippet from '@/components/gameSystems/baseSnippet';

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
	extends: baseSnippet
};
</script>