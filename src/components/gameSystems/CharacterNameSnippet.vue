<template>
	<vue-fragment>
		<!-- // GameSystems Update -->
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
	</vue-fragment>
</template>

<script>
import baseSnippet from '@/components/gameSystems/baseSnippet';

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
	extends: baseSnippet,
	props: {
		fontName: {
			type: String,
			default: () => 'headline'
		},
		fontSecondary: {
			type: String,
			default: () => 'subtitle-1'
		},
		hasName: {
			type: Boolean,
			default: true
		},
		hasSecondary: {
			type: Boolean,
			default: true
		},
		includeCharacterNumber: {
			type: Boolean,
			default: true
		},
		prefix: {
			type: String,
			default: '('
		},
		suffix: {
			type: String,
			default: ')'
		}
	}
};
</script>
