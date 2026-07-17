<template>
	<v-app id="root">
		<v-app-bar
			color="primary"
			density="compact"
		>
			<template #prepend>
				<v-app-bar-nav-icon
					v-if="$vuetify.display.smAndDown"
					@click.stop="toggleDrawer"
				/>
			</template>

			<v-app-bar-title class="text-uppercase">
				<router-link
					to="/"
					class="toolbar-title"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-app-bar-title>

			<v-btn
				v-if="isLoggedIn && $vuetify.display.mdAndUp"
				variant="text"
				@click="clickCards()"
			>
				{{ $t('cards.namePlural') }}
			</v-btn>
			<v-btn
				v-if="isLoggedIn && $vuetify.display.mdAndUp"
				variant="text"
				@click="clickFavorites()"
			>
				{{ $t('favorites.namePlural') }}
			</v-btn>

			<template #append>
				<v-menu>
					<template #activator="{ props }">
						<v-btn
							icon="mdi-dots-vertical"
							v-bind="props"
						/>
					</template>
					<v-list>
						<v-list-item
							v-if="isLoggedIn"
							:title="$t('cards.namePlural')"
							@click="clickCards()"
						/>
						<v-list-item
							v-if="isLoggedIn"
							:title="$t('favorites.namePlural')"
							@click="clickFavorites()"
						/>
						<v-list-item
							v-if="isLoggedIn"
							to="/settings"
							:title="$t('titles.settings')"
						/>
						<v-list-item
							:title="$t('titles.support')"
							@click="clickSupport"
						/>
						<v-list-item
							:title="$t('titles.openSource')"
							@click="clickOpenSource"
						/>
						<v-list-item
							v-if="displaySignIn"
							:title="$t('titles.signIn')"
							@click="clickSignIn"
						/>
						<v-list-item
							v-if="isLoggedIn"
							:title="$t('titles.signOut')"
							@click="dialogSignOut.open()"
						/>
					</v-list>
				</v-menu>
			</template>
		</v-app-bar>

		<v-main>
			<span class="bg" />
			<v-container fluid>
				<router-view />
			</v-container>
		</v-main>

		<VtConfirmationDialog
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>
		<VtDisplayDialog
			:signal="dialogDisplayMarkupSignal.signal"
			@cancel="dialogDisplayMarkupCancel"
			@ok="dialogDisplayMarkupOk"
		>
			<!-- eslint-disable vue/no-v-html -->
			<div
				class="markdown-body"
				style="vertical-align: top;"
				v-html="displayMarkupValue"
			/>
			<!--eslint-enable-->
		</VtDisplayDialog>

		<v-footer
			v-if="displayFooter"
			app
		>
			<VtLayoutFooter />
		</v-footer>

		<VtLoadingOverlay
			:signal="isAuthCompleted"
		/>
	</v-app>
</template>

<script>
import { useAppMainLayout } from '@/layouts/appMainLayout';

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtDisplayDialog from '@thzero/library_client_vue3_vuetify3/components/VtDisplayDialog';
import VtLayoutFooter from '@thzero/library_client_vue3_vuetify3/components/VtLayoutFooter';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

// NOTE(migration): the new-character button + CharacterNewDialog are intentionally deferred until
// the character-dialog chain is migrated. Everything else (nav, sign in/out, markup display,
// footer, loading overlay) is wired via the useAppMainLayout composable (matches thzero).
export default {
	name: 'MainLayout',
	components: {
		VtConfirmationDialog,
		VtDisplayDialog,
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
			clickOpenSource,
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
			displaySignIn,
			clickCards,
			clickFavorites,
			dialogDisplayMarkupCancel,
			dialogDisplayMarkupOk,
			dialogDisplayMarkupSignal,
			displayMarkupValue
		} = useAppMainLayout(props, context);

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
			clickOpenSource,
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
			displaySignIn,
			clickCards,
			clickFavorites,
			dialogDisplayMarkupCancel,
			dialogDisplayMarkupOk,
			dialogDisplayMarkupSignal,
			displayMarkupValue
		};
	}
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
