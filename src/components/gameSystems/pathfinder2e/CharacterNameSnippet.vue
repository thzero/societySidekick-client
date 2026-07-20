<template>
	<span
		v-if="hasName"
		:class="fontName"
	>
		{{ name }}
	</span>
	<v-chip
		v-if="hasSecondary"
		color="success"
		variant="outlined"
		label
	>
		<span
			:class="fontSecondary"
		>
			{{ secondary }}
		</span>
	</v-chip>
</template>

<script>
import { computed } from 'vue';

import SharedConstants from '@/common/constants';

import { useGameSystemBaseCharacterNameSnippetComponent } from '@/components/gameSystems/baseCharacterNameSnippet';

import characterNameSnippetProps from '@/components/gameSystems/characterNameSnippetProps';

export default {
	name: 'Pathfinder2eCharacterNameSnippet',
	props: {
		...characterNameSnippetProps
	},
	setup(props, context) {
		const gameSystemId = () => {
			return SharedConstants.GameSystems.Pathfinder2e.id;
		};
		const secondaryFormat = (number) => {
			return `2${number.padStart(3, '0')}`;
		};

		const base = useGameSystemBaseCharacterNameSnippetComponent(props, context, { gameSystemId, secondaryFormat });

		const name = computed(() => {
			return props.value ? props.value.name : '';
		});

		return {
			...base,
			name
		};
	}
};
</script>

<style scoped>
</style>
