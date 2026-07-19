<template>
	<div>
		<v-card>
			<v-card-text>
				<v-row class="pt-2">
					<v-col
						v-if="$vuetify.display.smAndDown"
						cols="12"
						class="pl-2 pr-2 pb-4"
						style="text-align: center; margin-top: auto; margin-bottom: auto;"
					>
						<v-chip
							color="success"
							variant="outlined"
							label
						>
							{{ gameSystemName }}
						</v-chip>
					</v-col>
					<v-col
						cols="12"
						class="pl-2 pr-2"
					>
						<v-row>
							<v-col
								cols="6"
								md="4"
							>
								<v-chip
									color="success"
									variant="outlined"
									label
								>
									{{ userDisplayName }}
								</v-chip>
							</v-col>
							<v-col
								v-if="$vuetify.display.mdAndUp"
								cols="12"
								md="4"
								style="text-align: center"
							>
								<v-chip
									color="success"
									variant="outlined"
									label
								>
									{{ gameSystemName }}
								</v-chip>
							</v-col>
							<v-col
								cols="6"
								md="4"
								style="text-align: right"
							>
								<v-chip
									color="success"
									variant="outlined"
									label
								>
									#{{ gameSystemNumber }}
								</v-chip>
								<VtFavoriteButton
									v-if="hasFavorite && isAuthUserUser"
									v-model="isFavorite"
									:disabled="!isAuthUserUser"
									class="ml-2"
									style="min-width: 0px"
								/>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
		<v-row>
			<v-col
				cols="12"
			>
				<CharacterList
					ref="characterListRef"
					:value="characters"
					:user="user"
					:game-system-filter-override="gameSystemId"
					:external-list-type="externalListType"
					class="pt-4"
				/>
			</v-col>
		</v-row>
		<VtLoadingOverlay
			:signal="initializeCompleted"
		/>
	</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GameSystemsUtility from '@/utility/gameSystems';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import VueUtility from '@thzero/library_client_vue3/utility/index';

import { useBaseComponent } from '@/components/base';

import CharacterList from '@/components/gameSystems/CharacterList';
import VtFavoriteButton from '@thzero/library_client_vue3_vuetify3/components/VtFavoriteButton';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

const check = (to) => {
	return VueUtility.checkHasParams(to, null, null, [ 'gamerTag', 'key' ]);
};

const DelayMs = 0; // 250

// TODO(migration): human review:
//  1. Child <CharacterList> (@/components/gameSystems/CharacterList) is NOT yet migrated to Vue3.
//  2. `tab` computed uses AppUtility.settings().getSettingsUserTab/updateSettingsUserTab; those
//     methods do not currently exist on src/service/settings.js. Name preserved - confirm/implement.
//     (`tab` is not referenced in this template.)
//  3. Route guards beforeRouteEnter/beforeRouteUpdate kept as component options; params via useRoute().
export default {
	name: 'Characters',
	components: {
		CharacterList,
		VtFavoriteButton,
		VtLoadingOverlay
	},
	setup(props, context) {
		const characterListRef = ref(null);

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
			successResponse
		} = useBaseComponent(props, context);

		const route = useRoute();

		const serviceCharacters = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
		const serviceUsers = LibraryClientUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);

		const characters = ref([]);
		const gameSystemId = ref(null);
		const externalListType = ref(Constants.ExternalListTypes.Characters);
		const initializeCompleted = ref(false);
		const user = ref(null);

		const gameSystemName = computed(() => {
			const results = LibraryClientUtility.$store.getters.getGameSystem(correlationId(), gameSystemId.value);
			return results ? results.name : '';
		});
		const gameSystemNumber = computed(() => {
			return GameSystemsUtility.gameSystemNumber(correlationId(), user.value, gameSystemId.value);
		});
		const hasFavorite = computed(() => {
			return LibraryClientUtility.$store.user.user != null;
		});
		const isAuthUserUser = computed(() => {
			const authUserId = LibraryClientUtility.$store.user.user ? LibraryClientUtility.$store.user.user.id : null;
			const userId = user.value ? user.value.id : null;
			return authUserId === userId;
		});
		const isFavorite = computed({
			get() {
				if (!hasFavorite.value)
					return false;

				if (isAuthUserUser.value)
					return true;

				return AppUtility.settings().getSettingsUserFavorite(correlationId(), LibraryClientUtility.$store.user.user, user.value ? user.value.id : null);
			},
			set(newVal) {
				if (!hasFavorite.value)
					return;
				if (isAuthUserUser.value)
					return;

				AppUtility.settings().updateSettingsUserFavorite(correlationId(), LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, user.value ? user.value.id : null, newVal);
			}
		});
		const tab = computed({
			get() {
				// TODO(migration): getSettingsUserTab not present on settings service yet.
				return AppUtility.settings().getSettingsUserTab(correlationId(), LibraryClientUtility.$store.user.user, (settings) => settings.tab);
			},
			set(newVal) {
				// TODO(migration): updateSettingsUserTab not present on settings service yet.
				AppUtility.settings().updateSettingsUserTab(correlationId(), LibraryClientUtility.$store.user.user, newVal, (settings) => { return settings.tab = newVal; });
			}
		});
		const userDisplayName = computed(() => {
			return AppUtility.userDisplayName(user.value);
		});

		const fetch = async (correlationIdI) => {
			if (!serviceCharacters || !serviceUsers)
				return;

			try {
				const gamerTag = route.params.gamerTag;
				if (!gamerTag) {
					VueUtility.invalid();
					return;
				}

				const gameSystem = AppUtility.findSharedConstantsGameSystemByFriendlyId(route.params.key);
				if (!gameSystem) {
					VueUtility.invalid();
					return;
				}
				gameSystemId.value = gameSystem.id;

				const responseUser = await serviceUsers.fetchByGamerId(correlationIdI, gamerTag);
				logger.debug('Characters', 'fetch', 'response', responseUser, correlationIdI);
				if (hasFailed(responseUser)) {
					VueUtility.invalid();
					return;
				}

				user.value = responseUser.results;
				logger.debug('Characters', 'fetch', 'user', user.value);

				const responseCharacter = await serviceCharacters.listingByShortId(correlationIdI, gamerTag, gameSystemId.value);
				logger.debug('Characters', 'fetch', 'response', responseCharacter, correlationIdI);
				if (hasFailed(responseCharacter)) {
					//VueUtility.invalid()
					return;
				}

				const charactersValue = responseCharacter.results.data;
				for (const character of charactersValue)
					character.user = user.value;
				logger.debug('Characters', 'fetch', 'characters', charactersValue, correlationIdI);
				characters.value = charactersValue;

				// characterListRef.value.execute()
			}
			finally {
				const timeout = setTimeout(function () {
					initializeCompleted.value = true;
					clearTimeout(timeout);
				}, DelayMs);
			}
		};

		onMounted(async () => {
			check(route);

			initializeCompleted.value = false;

			await fetch(correlationId());
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
			successResponse,
			characterListRef,
			characters,
			gameSystemId,
			externalListType,
			initializeCompleted,
			user,
			gameSystemName,
			gameSystemNumber,
			hasFavorite,
			isAuthUserUser,
			isFavorite,
			tab,
			userDisplayName,
			fetch
		};
	},
	async beforeRouteEnter (to, from) {
		const results = check(to);
		if (!results)
			return false;
	},
	async beforeRouteUpdate (to, from) {
		const results = check(to);
		if (!results)
			return false;
	}
};
</script>

<style scoped>
</style>
