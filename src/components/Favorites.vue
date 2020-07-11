<template>
	<div>
		<v-layout>
			<v-flex
				xs12
			>
				<ScenarioList
					:value="characters"
					:user="user"
					:external-list-type="externalListType"
					class="pt-4"
				/>
			</v-flex>
		</v-layout>
		<VLoadingOverlay
			:signal="initializeCompleted"
		/>
	</div>
</template>

<script>
import Constants from '@/constants';
import LibraryConstants from '@thzero/library/constants';

import AppUtility from '@/utility/app';

import base from '@/library_vue/components/base';
import ScenarioList from '@/components/gameSystems/ScenarioList';
import VLoadingOverlay from '@/library_vue/components/VLoadingOverlay';

const DelayMs = 0; // 250

export default {
	name: 'Scenarios',
	components: {
		ScenarioList,
		VLoadingOverlay
	},
	extends: base,
	data: () => ({
		characters: [],
		externalListType: Constants.ExternalListTypes.Favorites,
		initializeCompleted: false,
		service: null
	}),
	computed: {
		isAuthUserUser() {
			const authUserId = this.$store.state.user.user ? this.$store.state.user.user.id : null;
			const userId = this.user ? this.user.id : null;
			return authUserId === userId;
		},
		tab: {
			get: function () {
				return this.getSettingsUserTab(this.$store.state.user.user, (settings) => settings.tab);
			},
			set: function (newVal) {
				this.updateSettingsUserTab(this.$store.state.user.user, newVal, (settings) => { return settings.tab = newVal; });
			}
		},
		user() {
			return this.$store.state.user.user;
		},
		userDisplayName() {
			return AppUtility.userDisplayName(this.user);
		}
	},
	created() {
		this.serviceCharacters = this.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
		this.serviceUsers = this.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
	},
	async mounted() {
		this.initializeCompleted = false;

		await this.fetch();
	},
	methods: {
		async fetch() {
			const self = this;

			try {
				if (!this.serviceCharacters || !this.serviceUsers)
					return;

				const responseFavorites = await this.serviceCharacters.listingByFavorites();
				this.logger.debug('response', responseFavorites);
				if (!responseFavorites || !responseFavorites.success)
					return;

				const user = this.$store.state.user.user;
				const characters = responseFavorites.results.data;
				await this.$store.dispatcher.characters.getCharacterListing({ listing: true });
				this.logger.debug('characters', characters);
				for (const char of this.$store.state.characters.characters) {
					char.user = user;
					characters.push(char);
				}
				this.characters = characters;
			}
			finally {
				const timeout = setTimeout(function () {
					self.initializeCompleted = true;
					clearTimeout(timeout);
				}, DelayMs);
			}
		}
	},
	// eslint-disable-next-line
	async beforeRouteEnter (to, from, next) {
		// called before the route that renders this component is confirmed.
		// does NOT have access to `this` component instance,
		// because it has not been created yet when this guard is called!
		next();
	},
	// eslint-disable-next-line
	async beforeRouteUpdate (to, from, next) {
		// called when the route that renders this component has changed,
		// but this component is reused in the new route.
		// For example, for a route with dynamic params `/foo/:id`, when we
		// navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
		// will be reused, and this hook will be called when that happens.
		// has access to `this` component instance.
		next();
	}
};
</script>

<style scoped>
</style>
