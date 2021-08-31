<template>
	<v-app id="root">
		<!-- <v-navigation-drawer absolute temporary
			v-model="drawer">
			<v-app-bar>
			</v-app-bar>

			<v-divider></v-divider>

			<v-list dense class="pt-0">
				<v-list-item to="/">
					<v-list-item-action>
						<v-icon>home</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('titles.home') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="isLoggedIn" to="/profile">
					<v-list-item-action>
						<v-icon>account_circle</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('titles.profile') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="isLoggedIn" to="/settings">
					<v-list-item-action>
						<v-icon>settings</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('titles.settings') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item to="/about">
					<v-list-item-action>
						<v-icon>info</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>About</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="!isLoggedIn" @click="signIn">
					<v-list-item-action>
						<v-icon color="green darken-2">power_settings_new</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('titles.signIn') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="isLoggedIn" @click="signOut">
					<v-list-item-action>
						<v-icon color="red darken-2">power_settings_new</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('titles.signOut') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>

		</v-navigation-drawer> -->

		<v-app-bar
			app
			dense
			dark
		>
			<v-btn
				text
				class="hidden-md-and-up"
				@click.stop="toggleDrawer"
			>
				<v-icon>menu</v-icon>
			</v-btn>
			<v-toolbar-title class="headline text-uppercase">
				<router-link
					to="/"
					class="toolbar-title"
				>
					{{ $t('titles.application') }}
				</router-link>
			</v-toolbar-title>
			<v-spacer />
			<v-menu
				v-if="isLoggedIn"
				bottom
				offset-y
			>
				<template #activator="{ on }">
					<v-btn
						class="hidden-sm-and-down mr-3"
						v-on="on"
						@click="clickCards()"
					>
						{{ $t('cards.namePlural') }}
					</v-btn>
				</template>
			</v-menu>
			<v-menu
				v-if="isLoggedIn && features.Favorites"
				bottom
				offset-y
			>
				<template #activator="{ on }">
					<v-btn
						class="hidden-sm-and-down mr-3"
						v-on="on"
						@click="clickFavorites()"
					>
						{{ $t('favorites.namePlural') }}
					</v-btn>
				</template>
			</v-menu>
			<v-menu
				v-if="isLoggedIn"
				bottom
				offset-y
			>
				<template #activator="{ on }">
					<v-btn
						class="hidden-sm-and-down"
						v-on="on"
						@click="dialogNewCharacterOpen()"
					>
						{{ $t('titles.new') }} {{ $t('characters.name') }}
					</v-btn>
				</template>
			</v-menu>
			<v-menu
				bottom
				left
				:close-on-content-click="closeOnContentClick"
			>
				<template #activator="{ on }">
					<v-btn
						icon
						v-on="on"
					>
						<v-icon>more_vert</v-icon>
					</v-btn>
				</template>
				<v-list>
					<!-- <v-list-item
						v-if="isLoggedIn"
						to="/profile"
					>
						<v-list-item-action>
							<v-icon>account_circle</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.profile') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item> -->
					<v-list-item
						v-if="isLoggedIn"
						class="hidden-md-and-up"
						@click="clickCards()"
					>
						<v-list-item-action>
							<v-icon>map</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('cards.namePlural') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item
						v-if="isLoggedIn && features.Favorites"
						class="hidden-md-and-up"
						@click="clickFavorites()"
					>
						<v-list-item-action>
							<v-icon>map</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('favorites.namePlural') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item
						v-if="isLoggedIn"
						class="hidden-md-and-up"
						@click="dialogNewCharacterOpen()"
					>
						<v-list-item-action>
							<v-icon>map</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.new') }} {{ $t('characters.name') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item
						v-if="isLoggedIn"
						to="/settings"
					>
						<v-list-item-action>
							<v-icon>settings</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.settings') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item @click="clickSupport">
						<!-- to="/support" -->
						<v-list-item-action>
							<v-icon>help</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.support') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item @click="clickOpenSource">
						<!-- to="/openSource" -->
						<v-list-item-action>
							<v-icon>mdi-open-source-initiative</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.openSource') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<!-- <v-list-item @click="clickAbout">
						<v-list-item-action>
							<v-icon>info</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.about') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item> -->
					<v-list-item
						v-if="!isLoggedIn"
						@click="clickSignIn"
					>
						<v-list-item-action>
							<v-icon color="green darken-2">
								power_settings_new
							</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.signIn') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item
						v-if="isLoggedIn"
						@click="dialogSignOut.open()"
					>
						<v-list-item-action>
							<v-icon color="red darken-2">
								power_settings_new
							</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.signOut') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-menu>
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

		<CharacterNewDialog
			ref="newCharacterDialog"
			:label="$t('characters.name')"
			:signal="dialogNewCharacter.signal"
			@cancel="dialogNewCharacter.cancel()"
			@ok="dialogNewCharacter.ok()"
		/>
		<VConfirmationDialog
			:non-recoverable="false"
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>
		<VDisplayDialog
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
		</VDisplayDialog>

		<VLayoutFooter />

		<VLoadingOverlay
			:signal="isAuthCompleted"
		/>
	</v-app>
</template>

<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseMainLayout from '@/library_vue/layouts/baseMainLayout';

import CharacterNewDialog from '@/components/gameSystems/CharacterNewDialog';
import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VDisplayDialog from '@/library_vue_vuetify/components/VDisplayDialog';
import VLayoutFooter from '@/library_vue_vuetify/components/VLayoutFooter';
import VLoadingOverlay from '@/library_vue_vuetify/components/VLoadingOverlay';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'MainLayout',
	components: {
		CharacterNewDialog,
		VConfirmationDialog,
		VDisplayDialog,
		VLayoutFooter,
		VLoadingOverlay
	},
	extends: baseMainLayout,
	data: () => ({
		closeOnContentClick: true,
		// drawer: false,
		dialogDisplayMarkupSignal: new DialogSupport(),
		displayMarkupValue: null,
		dialogNewCharacter: new DialogSupport()
	}),
	created() {
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

		GlobalUtility.$EventBus.on('display-markup', (value) => {
			this.markup(this.correlationId(), value);
			this.dialogDisplayMarkupSignal.open();
		});
	},
	methods: {
		clickCards() {
			window.open(`/#/cards`, '_blank');
		},
		clickFavorites() {
			// window.open(`/#/favorites`, '_blank')
			GlobalUtility.$navRouter.push('/favorites');
		},
		async dialogDisplayMarkupCancel() {
			this.dialogDisplayMarkupSignal.cancel();
		},
		async dialogDisplayMarkupOk() {
			this.dialogDisplayMarkupSignal.ok();
		},
		async dialogNewCharacterOpen() {
			await this.$refs.newCharacterDialog.reset(this.correlationId(), {});
			this.dialogNewCharacter.open();
		},
		markup(correlationId, value) {
			this.displayMarkupValue = value ? this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, value)) : null;
		}
	}
};
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
