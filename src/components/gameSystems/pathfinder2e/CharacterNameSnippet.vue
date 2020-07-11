<template>
	<vue-fragment>
		<span
			v-if="hasName"
			:class="fontName"
		>
			{{ name }}
		</span>
		<v-chip
			v-if="hasSecondary"
			color="success"
			outlined
			label
		>
			<span
				:class="fontSecondary"
			>
				{{ secondary }}
			</span>
		</v-chip>
	</vue-fragment>
</template>

<script>
import SharedConstants from '@/common/constants';

import baseCharacterNameSnippet from '@/components/gameSystems/baseCharacterNameSnippet';

export default {
	name: 'Pathfinder2eCharacterNameSnippet',
	extends: baseCharacterNameSnippet,
	props: {
		includeCharacterNumber: {
			type: Boolean,
			default: true
		},
		user: {
			type: Object,
			default: null
		}
	},
	computed: {
		name() {
			return this.value ? this.value.name : '';
		}
	},
	methods: {
		gameSystemId() {
			return SharedConstants.GameSystems.Pathfinder2e.id;
		},
		secondaryFormat(number) {
			return `2${number.padStart(3, '0')}`;
		}
	}
};
</script>

<style scoped>
</style>
