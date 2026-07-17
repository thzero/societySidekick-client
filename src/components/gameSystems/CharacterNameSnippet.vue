<template>
	<!-- GameSystems Update -->
	<CharacterNameSnippetPathfinder2e
		v-if="isGameSystemPathfinder2e"
		:value="value"
		:font-name="fontName"
		:font-secondary="fontSecondary"
		:has-name="hasName"
		:has-secondary="hasSecondary"
		:include-character-number="includeCharacterNumber"
		:prefix="prefix"
		:suffix="suffix"
	/>
	<CharacterNameSnippetStarfinder1e
		v-if="isGameSystemStarfinder1e"
		:value="value"
		:font-name="fontName"
		:font-secondary="fontSecondary"
		:has-name="hasName"
		:has-secondary="hasSecondary"
		:include-character-number="includeCharacterNumber"
		:prefix="prefix"
		:suffix="suffix"
	/>
</template>

<script>
import { useGameSystemBaseSnippetComponent } from '@/components/gameSystems/baseSnippet';

import characterNameSnippetProps from '@/components/gameSystems/characterNameSnippetProps';

// GameSystems Update
import CharacterNameSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/CharacterNameSnippet';
import CharacterNameSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/CharacterNameSnippet';

export default {
	name: 'CharacterNameSnippet',
	components: {
		// GameSystems Update
		CharacterNameSnippetPathfinder2e,
		CharacterNameSnippetStarfinder1e
	},
	props: {
		...characterNameSnippetProps
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
