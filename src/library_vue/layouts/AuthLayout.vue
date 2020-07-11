<template>
	<v-app id="root">
		<v-app-bar
			app
			dark
		>
			<v-toolbar-title class="headline text-uppercase">
				<span>{{ $t('titles.application') }}</span>
			</v-toolbar-title>
			<v-spacer />
		</v-app-bar>
		<v-main>
			<span class="bg" />
			<v-container
				fluid
				pt-2
			>
				<router-view />
			</v-container>
		</v-main>
		<v-footer app>
			<VVersion :version="version" />
		</v-footer>
	</v-app>
</template>

<script>
import baseLayout from './baseLayout';

import VVersion from '../components/VVersion';

export default {
	name: 'AuthLayout',
	components: {
		VVersion
	},
	extends: baseLayout,
	computed: {
		version() {
			return this.$store.state.version;
		}
	}
};
</script>

<style scoped>
</style>
