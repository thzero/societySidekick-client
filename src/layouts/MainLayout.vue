<template>
	<v-app id="root">

		<v-app-bar
			app
			density="compact"
		>
			<template v-slot:prepend>
				<v-app-bar-nav-icon
					class="hidden-md-and-up"
					@click.stop="toggleDrawer"
				>
				</v-app-bar-nav-icon>
			</template>

			<v-app-bar-title class="headline text-uppercase">
				<router-link
					to="/"
					class="toolbar-title text-contrast"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-app-bar-title>

			<MainMenuToolbar
				:displaySignIn="displaySignIn"
				:features="features"
				:isLoggedIn="isLoggedIn"
			/>

			<template v-slot:append>
				<SecondaryMenu
					:clickAbout="clickAbout"
					:clickOpenSource="clickOpenSource"
					:clickPrivcy="clickPrivcy"
					:clickSignOut="clickSignOut"
					:clickSupport="clickSupport"
					:displaySignIn="displaySignIn"
					:features="features"
					:isLoggedIn="isLoggedIn"
					@clickSignIn="clickSignIn"
					@clickSignOut="clickSignOut"
				 />
			</template>
		</v-app-bar>

		<v-navigation-drawer
			v-model="displayDrawer"
			temporary
		>
			<MainMenuDrawer
				:displaySignIn="displaySignIn"
				:features="features"
				:isLoggedIn="isLoggedIn"
			/>
		</v-navigation-drawer>

		<v-main id="top">
			<span class="bg" />
			<v-container
				fluid
				pt-2
			>
			<!-- [[ online = {{  online  }}]]
			[[ isLoggedIn = {{  isLoggedIn  }}]] -->
				<router-view />
			</v-container>
		</v-main>

		<VtConfirmationDialog
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>
		<!-- <VtDisplayDialog
			:signal="dialogDisplayMarkupSignal.signal"
			@cancel="dialogDisplayMarkupCancel"
			@ok="dialogDisplayMarkupOk"
		>
			!--eslint-disable vue/no-v-html --
			<div
				class="markdown-body"
				style="vertical-align: top;"
				v-html="displayMarkupValue"
			/>
			!--eslint-enable--
		</VtDisplayDialog> -->

		<v-footer
			v-if="displayFooter"
			app
		>
			<VtLayoutFooter />
		</v-footer>

		<VtLoadingOverlay
			:signal="isAuthCompleted"
		/>

		<VtCookieComply
			v-if="features.CookieComply"
			:preferences="preferences"
		/>
	</v-app>
</template>

<script>
import { computed } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import VtCookieComply from '@thzero/library_client_vue3_vuetify3/components/VtCookieComply';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtLayoutFooter from '@thzero/library_client_vue3_vuetify3/components/VtLayoutFooter';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

import MainMenuDrawer from '@/components/main/mainMenuDrawer';
import MainMenuToolbar from '@/components/main/mainMenuToolbar';
import SecondaryMenu from '@/components/main/secondaryMenu';

import { useAppMainLayout } from '@/layouts/appMainLayout';

export default {
	name: 'MainLayout',
	components: {
		MainMenuDrawer,
		MainMenuToolbar,
		SecondaryMenu,
		VtConfirmationDialog,
		VtCookieComply,
		// VtDisplayDialog,
		VtLayoutFooter,
		VtLoadingOverlay
	},
	setup(props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			features,
			closeOnContentClick,
			clickAbout,
			clickOpenSource,
			clickPrivcy,
			clickSignIn,
			clickSignOut,
			clickSupport,
			dialogSignOut,
			dialogSignOutOk,
			displayDrawer,
			displayFooter,
			isAuthCompleted,
			isLoggedIn,
			serviceAuth,
			serviceStore,
			toggleDrawer,
			dialogDisplayMarkupCancel,
			dialogDisplayMarkupOk,
			dialogDisplayMarkupSignal,
			displayMarkupValue,
			displaySignIn,
			markup,
			preferences,
			serviceMarkup
		} = useAppMainLayout(props, context);

		const online = computed(() => {
			return LibraryClientUtility.$store.getters.getOnline();
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			features,
			closeOnContentClick,
			clickAbout,
			clickOpenSource,
			clickPrivcy,
			clickSignIn,
			clickSignOut,
			clickSupport,
			dialogSignOut,
			dialogSignOutOk,
			displayDrawer,
			displayFooter,
			isAuthCompleted,
			isLoggedIn,
			serviceAuth,
			serviceStore,
			toggleDrawer,
			dialogDisplayMarkupCancel,
			dialogDisplayMarkupOk,
			dialogDisplayMarkupSignal,
			displayMarkupValue,
			displaySignIn,
			markup,
			preferences,
			serviceMarkup,
			online
		};
	}
};
</script>

<style scoped>
</style>
