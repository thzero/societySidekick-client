<template>
	<v-app id="root">
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
				bottom
				left
				:close-on-content-click="closeOnContentClick"
			>
				<template v-slot:activator="{ on }">
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
						to="/settings"
					>
						<v-list-item-action>
							<v-icon>settings</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{ $t('titles.settings') }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<!-- <v-list-item @click="clickAbout">
						<v-list-item-action>
							<v-icon>info</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>About</v-list-item-title>
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
			<v-container
				fluid
				pt-2
			>
				<router-view />
			</v-container>
		</v-main>

		<VConfirmationDialog
			:non-recoverable="true"
			:signal="dialogSignOut.signal"
			@cancel="dialogSignOut.cancel()"
			@ok="dialogSignOutOk"
		/>

		<VLayoutFooter />

		<VLoadingOverlay
			:signal="isAuthCompleted"
		/>
	</v-app>
</template>

<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import baseLayout from './baseLayout';

import VConfirmationDialog from '../components/VConfirmationDialog';
import VLayoutFooter from '../components/VLayoutFooter';
import VLoadingOverlay from '../components/VLoadingOverlay';

import DialogSupport from '../components/support/dialog';

const auth = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_AUTH);

export default {
	name: 'AdminLayout',
	components: {
		VConfirmationDialog,
		VLayoutFooter,
		VLoadingOverlay
	},
	extends: baseLayout,
	data: () => ({
		closeOnContentClick: true,
		dialogSignOut: new DialogSupport()
	}),
	computed: {
		isAuthCompleted() {
			return this.$store.state.user && this.$store.state.user.authCompleted;
		},
		isLoggedIn() {
			return this.$store.state.user && this.$store.state.user.isLoggedIn;
		}
	},
	methods: {
		clickAbout() {
			this.$navRouter.push('/about');
		},
		async clickSignIn() {
			this.$navRouter.push('/auth');
		},
		async dialogSignOutOk() {
			this.dialogSignOut.ok();
			await auth.signOut(this.correlationId());
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
