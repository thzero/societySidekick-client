<template>
	<div>
		<v-card>
			<v-card-text>
				<v-layout
					wrap
					pt-2
				>
					<v-flex
						v-if="$vuetify.breakpoint.smAndDown"
						sm12
						pl-2
						pr-2
						pb-4
						style="text-align: center; margin-top: auto; margin-bottom: auto;"
					>
						<v-chip
							color="success"
							outlined
							label
						>
							{{ gameSystemName }}
						</v-chip>
					</v-flex>
					<v-flex
						xs12
						pl-2
						pr-2
					>
						<v-layout>
							<v-flex
								xs6
								md4
							>
								<v-chip
									color="success"
									outlined
									label
								>
									{{ userDisplayName }}
								</v-chip>
							</v-flex>
							<v-flex
								v-if="$vuetify.breakpoint.mdAndUp"
								md4
								style="text-align: center"
							>
								<v-chip
									color="success"
									outlined
									label
								>
									{{ gameSystemName }}
								</v-chip>
							</v-flex>
							<v-flex
								xs6
								md4
								style="text-align: right"
							>
								<v-chip
									color="success"
									outlined
									label
								>
									#{{ gameSystemNumber }}
								</v-chip>
								<VFavoriteButton
									v-if="hasFavorite && isAuthUserUser"
									v-model="isFavorite"
									:disabled="!isAuthUserUser"
									class="ml-2"
									style="min-width: 0px"
								/>
								<!-- <v-btn
									depressed
									small
									class="ml-2"
									style="min-width: 0px"
								>
									<v-icon
										color="blue"
									>
										mdi-star-three-points-outline
									</v-icon>
								</v-btn> -->
							</v-flex>
						</v-layout>
						<!-- <v-layout>
							<v-flex
								xs12
								mt-2
								style="text-align: right"
							>
								<v-btn
									depressed
									small
									class="ml-2"
									style="min-width: 0px"
								>
									<v-icon
										color="blue"
									>
										mdi-facebook
									</v-icon>
								</v-btn>
								<v-btn
									depressed
									small
									class="ml-2"
									style="min-width: 0px"
								>
									<v-icon
										color="blue"
									>
										mdi-twitter
									</v-icon>
								</v-btn>
								<v-btn
									depressed
									small
									class="ml-2"
									style="min-width: 0px"
								>
									<v-icon
										color="blue"
									>
										mdi-star-three-points-outline
									</v-icon>
								</v-btn>
							</v-flex>
						</v-layout> -->
					</v-flex>
				</v-layout>
			</v-card-text>
		</v-card>
		<v-layout>
			<v-flex
				xs12
			>
				<CharacterList
					ref="characterList"
					:value="characters"
					:user="user"
					:game-system-filter-override="gameSystemId"
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
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GameSystemsUtility from '@/utility/gameSystems';
import GlobalUtility from '@thzero/library_client/utility/global';
import VueUtility from '@/library_vue/utility/index';

import base from '@/library_vue_components/base';
import CharacterList from '@/components/gameSystems/CharacterList';
import VFavoriteButton from '@/library_vue_vuetify/components/VFavoriteButton';
import VLoadingOverlay from '@/library_vue_vuetify/components/VLoadingOverlay';

const check = (to) => {
	return VueUtility.checkHasParams(to, null, null, [ 'gamerTag', 'key' ]);
};

const DelayMs = 0; // 250

export default {
	name: 'Characters',
	components: {
		CharacterList,
		VFavoriteButton,
		VLoadingOverlay
	},
	extends: base,
	data: () => ({
		characters: [],
		gameSystemId: null,
		externalListType: Constants.ExternalListTypes.Characters,
		initializeCompleted: false,
		service: null,
		user: null
	}),
	computed: {
		gameSystemName() {
			const results = GlobalUtility.$store.getters.getGameSystem(this.gameSystemId);
			return results ? results.name : '';
		},
		gameSystemNumber() {
			return GameSystemsUtility.gameSystemNumber(this.correlationId(), this.user, this.gameSystemId);
		},
		hasFavorite() {
			return GlobalUtility.$store.state.user.user != null;
		},
		isFavorite: {
			get: function () {
				if (!this.hasFavorite)
					return false;

				if (this.isAuthUserUser)
					return true;

				return AppUtility.settings().getSettingsUserFavorite(this.correlationId(), GlobalUtility.$store.state.user.user, this.user ? this.user.id : null);
			},
			set: function (newVal) {
				if (!this.hasFavorite)
					return;
				if (this.isAuthUserUser)
					return;

				AppUtility.settings().updateSettingsUserFavorite(this.correlationId(), GlobalUtility.$store, GlobalUtility.$store.state.user.user, this.user ? this.user.id : null, newVal);
			}
		},
		isAuthUserUser() {
			const authUserId = GlobalUtility.$store.state.user.user ? GlobalUtility.$store.state.user.user.id : null;
			const userId = this.user ? this.user.id : null;
			return authUserId === userId;
		},
		tab: {
			get: function () {
				return this.getSettingsUserTab(this.correlationId(), GlobalUtility.$store.state.user.user, (settings) => settings.tab);
			},
			set: function (newVal) {
				this.updateSettingsUserTab(this.correlationId(), GlobalUtility.$store.state.user.user, newVal, (settings) => { return settings.tab = newVal; });
			}
		},
		userDisplayName() {
			return AppUtility.userDisplayName(this.user);
		}
	},
	created() {
		this.serviceCharacters = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
		this.serviceUsers = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
	},
	async mounted() {
		check(this.$route);

		this.initializeCompleted = false;

		await this.fetch(this.correlationId());
	},
	methods: {
		async fetch(correlationId) {
			if (!this.serviceCharacters || !this.serviceUsers)
				return;
		
			try {
				const gamerTag = this.$route.params.gamerTag;
				if (!gamerTag) {
					VueUtility.invalid();
					return;
				}

				const gameSystem = AppUtility.findSharedConstantsGameSystemByFriendlyId(this.$route.params.key);
				if (!gameSystem) {
					VueUtility.invalid();
					return;
				}
				this.gameSystemId = gameSystem.id;

				const responseUser = await this.serviceUsers.fetchByGamerId(correlationId, gamerTag);
				this.logger.debug('Characters', 'fetch', 'response', responseUser, correlationId);
				if (!responseUser || !responseUser.success) {
					VueUtility.invalid();
					return;
				}

				this.user = responseUser.results;
				this.logger.debug('Characters', 'fetch', 'user', this.user);

				const responseCharacter = await this.serviceCharacters.listingByShortId(correlationId, gamerTag, this.gameSystemId);
				this.logger.debug('Characters', 'fetch', 'response', responseCharacter, correlationId);
				if (!responseCharacter || !responseCharacter.success) {
					//VueUtility.invalid()
					return;
				}

				const characters = responseCharacter.results.data;
				for (const character of characters)
					character.user = this.user;
				this.logger.debug('Characters', 'fetch', 'characters', characters, correlationId);
				this.characters = characters;

				// this.$refs.CharacterList.execute()
			}
			finally {
				const self = this;
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
		const results = check(to);
		if (results)
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
		const results = check(to);
		if (results)
			next();
	}
};
</script>

<style scoped>
</style>
