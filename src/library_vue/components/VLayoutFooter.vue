<template>
	<v-footer
		app
		absolute
	>
		<VVersion v-model="version" />
		<v-spacer />
		© 2020
		<a
			class="ml-1"
			target="_blank"
			href="https://thzero.com"
		>
			thZero.com
		</a>
		<span
			v-if="isDev"
			style="padding-left: 4px;"
		>
			{{ breakpointName }}
		</span>
	</v-footer>
</template>

<script>
import Utility from '@thzero/library/utility';

import base from './base';
import VVersion from './VVersion';

export default {
	name: 'LayoutFooter',
	components: {
		VVersion
	},
	extends: base,
	data: () => ({
		version: ''
	}),
	computed: {
		breakpointName() {
			return Utility.isDev ? this.$vuetify.breakpoint.name : '';
		},
		isDev() {
			return Utility.isDev;
		}
	},
	async created() {
		await this.$store.dispatcher.root.getVersion();
		this.version = this.$store.state.version;
	}
};
</script>

<style scoped>
</style>
