<template>
	<div>
		<v-row>
			<v-col
				cols="12"
			>
				<ScenarioList
					:value="characters"
					:user="user"
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

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@/components/base';

import ScenarioList from '@/components/gameSystems/ScenarioList';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

const DelayMs = 0; // 250

// TODO(migration): human review:
//  1. Child <ScenarioList> (@/components/gameSystems/ScenarioList) is NOT yet migrated to Vue3.
//  2. `tab` computed uses AppUtility.settings().getSettingsUserTab/updateSettingsUserTab; those
//     methods do not currently exist on src/service/settings.js. Name preserved - confirm/implement.
//     (`tab` is not referenced in this template.)
//  3. Route guards beforeRouteEnter/beforeRouteUpdate kept as component options.
export default {
	name: 'Favorites',
	components: {
		ScenarioList,
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
			successResponse
		} = useBaseComponent(props, context);

		const serviceCharacters = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
		const serviceUsers = LibraryClientUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);

		const characters = ref([]);
		const externalListType = ref(Constants.ExternalListTypes.Favorites);
		const initializeCompleted = ref(false);

		const user = computed(() => {
			return LibraryClientUtility.$store.user.user;
		});
		const isAuthUserUser = computed(() => {
			const authUserId = LibraryClientUtility.$store.user.user ? LibraryClientUtility.$store.user.user.id : null;
			const userId = user.value ? user.value.id : null;
			return authUserId === userId;
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
			try {
				if (!serviceCharacters || !serviceUsers)
					return;

				const responseFavorites = await serviceCharacters.listingByFavorites(correlationIdI);
				logger.debug('Favorites', 'fetch', 'response', responseFavorites, correlationIdI);
				if (hasFailed(responseFavorites))
					return;

				const userValue = LibraryClientUtility.$store.user.user;
				const charactersValue = responseFavorites.results.data;
				await LibraryClientUtility.$store.dispatcher.characters.getCharacterListing(correlationIdI, { listing: true });
				logger.debug('Favorites', 'fetch', 'characters', charactersValue, correlationIdI);
				for (const char of LibraryClientUtility.$store.characters.characters) {
					char.user = userValue;
					charactersValue.push(char);
				}
				characters.value = charactersValue;
			}
			finally {
				const timeout = setTimeout(function () {
					initializeCompleted.value = true;
					clearTimeout(timeout);
				}, DelayMs);
			}
		};

		onMounted(async () => {
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
			characters,
			externalListType,
			initializeCompleted,
			user,
			isAuthUserUser,
			tab,
			userDisplayName,
			fetch
		};
	},
	async beforeRouteEnter (to, from) {
	},
	async beforeRouteUpdate (to, from) {
	}
};
</script>

<style scoped>
</style>
