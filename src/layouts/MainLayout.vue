<template>
	<v-app id="root">
		<v-app-bar
			color="primary"
			density="compact"
		>
			<v-app-bar-title class="text-uppercase">
				<router-link
					to="/"
					class="toolbar-title"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-app-bar-title>
		</v-app-bar>

		<v-main>
			<v-container fluid>
				<router-view />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
// Phase 2: minimal shell so the app renders and boots. Phase 3 restores the full
// MainLayout (nav drawer, menus, dialogs) using the useAppMainLayout composable,
// matching thzero's layouts/MainLayout.vue.
export default {
	name: 'MainLayout'
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
