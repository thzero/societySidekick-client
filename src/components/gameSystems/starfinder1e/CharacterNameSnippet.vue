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
import Constants from '@/constants';

import SharedConstants from '@/common/constants';

import baseCharacterNameSnippet from '@/components/gameSystems/baseCharacterNameSnippet';

export default {
	name: 'Starfinder1eCharacterNameSnippet',
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
			return SharedConstants.GameSystems.Starfinder1e.id;
		},
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		},
		secondaryFormat(number) {
			return `7${number.padStart(2, '0')}`;
		}
	}
};
</script>

<style scoped>
</style>
