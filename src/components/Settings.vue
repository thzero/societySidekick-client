<template>
	<v-row>
		<v-col
			cols="12"
			class="mx-auto mb-2"
		>
			<v-card>
				<v-card-text>
					<span class="headline">{{ $t('titles.settings') }}</span>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			cols="12"
			class="mx-auto mb-2"
		>
			<v-card>
				<v-card-text>
					<v-row>
						<v-col
							cols="12"
							class="pb-2 pr-2 pt-2"
						>
							<v-row>
								<v-col
									cols="9"
									class="text-h6 mb-1 pt-1"
								>
									{{ name }}
								</v-col>
								<v-col
									cols="3"
									style="text-align: right;"
								>
									<v-avatar
										tile
										size="80"
										color="grey"
									>
										<img
											v-if="hasPicture"
											:src="picture"
											class="responsive"
										>
									</v-avatar>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			cols="12"
			class="mx-auto mb-2"
		>
			<VtFormControl
				ref="formRef"
				:validation="validation"
				:auto-save="true"
				:pre-complete-ok="preCompleteOk"
				:reset-additional="resetAdditional"
				@cancel="cancel"
				@ok="ok"
			>
				<v-row>
					<v-col
						cols="12"
					>
						<v-card
							class="mb-3"
						>
							<v-card-text>
								<VtTextFieldWithValidation
									ref="gamerTagRef"
									v-model="gamerTag"
									vid="gamerTag"
									:validation="validation"
									:label="$t('forms.gamerTag')"
									:counter="30"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-col>
					<!-- // GameSystems Update -->
					<v-col
						v-if="isGameSystemDungeonsAndDragons5e"
						cols="12"
						md="6"
						:class="{ 'pr-4': $vuetify.display.mdAndUp }"
					>
						<v-card>
							<v-card-title class="headline">
								{{ getGameSystemName(gameSystemIds.DungeonsAndDragons5e.id) }}
							</v-card-title>
							<v-card-text>
								<VtNumberFieldWithValidation
									ref="gameSystemNumberDungeonsAndDragons5eRef"
									v-model="gameSystemNumberDungeonsAndDragons5e"
									vid="gameSystemNumberDungeonsAndDragons5e"
									:validation="validation"
									:label="getGameSystemNumberName(gameSystemIds.DungeonsAndDragons5e.id)"
									step="1"
									:counter="10"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-col>
					<!-- // GameSystems Update -->
					<v-col
						v-if="isGameSystemPathfinder2e"
						cols="12"
						md="6"
					>
						<v-card>
							<v-card-title class="headline">
								{{ getGameSystemName(gameSystemIds.Pathfinder2e.id) }}
							</v-card-title>
							<v-card-text>
								<VtNumberFieldWithValidation
									ref="gameSystemNumberPathfinder2eRef"
									v-model="gameSystemNumberPathfinder2e"
									vid="gameSystemNumberPathfinder2e"
									:validation="validation"
									:label="getGameSystemNumberName(gameSystemIds.Pathfinder2e.id)"
									step="1"
									:counter="10"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-col>
					<!-- // GameSystems Update -->
					<v-col
						v-if="isGameSystemStarfinder1e"
						cols="12"
						md="6"
						:class="{ 'mt-3': $vuetify.display.smAndDown }"
					>
						<v-card
							:class="{ 'ml-2': $vuetify.display.mdAndUp }"
						>
							<v-card-title class="headline">
								{{ getGameSystemName(gameSystemIds.Starfinder1e.id) }}
							</v-card-title>
							<v-card-text>
								<VtNumberFieldWithValidation
									ref="gameSystemNumberStarfinder1eRef"
									v-model="gameSystemNumberStarfinder1e"
									vid="gameSystemNumberStarfinder1e"
									:validation="validation"
									:label="getGameSystemNumberName(gameSystemIds.Starfinder1e.id)"
									step="1"
									:counter="10"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</VtFormControl>
		</v-col>
		<v-col
			cols="12"
			class="mx-auto mb-2"
		>
			<v-card>
				<v-card-title class="headline">
					{{ $t('favorites.namePlural') }}
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col
							v-for="item in favorites"
							:key="item.id"
							cols="12"
							sm="6"
							md="3"
							class="pl-1 pr-1 pb-2"
						>
							<Favorite
								:value="item"
								@dialog-favorite-delete="dialogFavoriteDelete"
								@dialog-favorite-edit="dialogFavoriteEdit"
							/>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			cols="12"
			class="mx-auto mb-2 mt-4"
		>
			<v-card>
				<v-card-title class="headline">
					{{ $t('locations.namePlural') }}
				</v-card-title>
				<v-card-text>
					<v-fab-transition>
						<v-btn
							icon="mdi-plus"
							size="small"
							color="green"
							style="margin-right: 40px;"
							@click="dialogLocationNew()"
						/>
					</v-fab-transition>
					<v-row>
						<v-col
							v-for="item in locations"
							:key="item.id"
							cols="12"
							sm="6"
							md="3"
							class="pl-1 pr-1 pb-2"
						>
							<Location
								:value="item"
								@dialog-location-delete="dialogLocationDelete"
								@dialog-location-edit="dialogLocationEdit"
							/>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
		<FavoriteDialog
			ref="favoriteDialogRef"
			:signal="dialogFavoriteSignal.signal"
			@cancel="dialogFavoriteSignal.cancel()"
			@ok="dialogFavoriteSignal.ok()"
		/>
		<LocationDialog
			ref="locationDialogRef"
			:signal="dialogLocationSignal.signal"
			@cancel="dialogLocationSignal.cancel()"
			@ok="dialogLocationSignal.ok()"
		/>
		<VtConfirmationDialog
			:non-recoverable="true"
			:signal="dialogLocationDeleteSignal.signal"
			:pre-complete-ok="dialogLocationDeletePreCompleteOk"
			@cancel="dialogLocationDeleteCancel"
			@ok="dialogLocationDeleteOk"
		/>
		<v-snackbar
			ref="snackbarRef"
			v-model="snackbar"
			:timeout="timeout"
		>
			{{ $t('messages.saved') }}
		</v-snackbar>
	</v-row>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength } from '@vuelidate/validators';

import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import AppUtility from '@/utility/app';
import GameSystemsUtility from '@/utility/gameSystems';

import { useBaseSettingsComponent } from '@thzero/library_client_vue3/components/baseSettings';

import Favorite from '@/components/favorites/Favorite';
import FavoriteDialog from '@/components/favorites/FavoriteDialog';
import Location from '@/components/locations/Location';
import LocationDialog from '@/components/locations/LocationDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// TODO(migration): Settings is a complex page — human review required on:
//  1. Child components Favorite/FavoriteDialog/Location/LocationDialog are NOT yet migrated to
//     Vue3; the ref-based `favoriteDialogRef.value.reset(...)` / `locationDialogRef.value.reset(...)`
//     calls and their `:signal` wiring assume those children expose the same API after migration.
//  2. Form/validation: VFormControl -> VtFormControl now uses vuelidate (`:validation`) instead of
//     vee-validate string rules; only gamerTag rules were ported (see validations()).
//  3. asyncComputed `favorites` was replaced with a ref + onMounted loadFavorites(); it will not
//     auto-refresh on dependency change the way asyncComputed did.
//  4. preCompleteOk/resetAdditional consolidate the old preCompleteI/resetI + base gamerTag save;
//     confirm the base preCompleteOkI/setUserSettings flow matches the intended save behavior.
//  5. The old floating <v-btn absolute fab> was converted to a v3 `icon`/`size` button — visual
//     placement (absolute/top/right) may need adjustment.
//  6. `user.value` replaces GlobalUtility.$store.state.user.user; confirm serviceStore.user is the
//     correct source in the migrated Pinia store.
export default {
	name: 'Settings',
	components: {
		Favorite,
		FavoriteDialog,
		Location,
		LocationDialog,
		VtConfirmationDialog,
		VtFormControl,
		VtNumberFieldWithValidation,
		VtTextFieldWithValidation
	},
	setup(props, context) {
		const formRef = ref(null);
		const favoriteDialogRef = ref(null);
		const locationDialogRef = ref(null);

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
			successResponse,
			isSaving,
			serverErrors,
			setErrors,
			beforeUnload,
			dirty,
			dirtyCheck,
			leaveCheck,
			cancel,
			close,
			gamerTag,
			gamerTagDisplay,
			fab,
			hasPicture,
			name,
			ok,
			open,
			picture,
			preComplete,
			preCompleteI,
			preCompleteOkI,
			resetAdditionalI,
			requestReset,
			serviceStore,
			serviceUsers,
			user
		} = useBaseSettingsComponent(props, context, {
			formRef: formRef
		});

		// GameSystems Update
		const gameSystemNumberDungeonsAndDragons5e = ref(null);
		const gameSystemNumberPathfinder2e = ref(null);
		const gameSystemNumberStarfinder1e = ref(null);

		const snackbar = ref(false);
		const timeout = ref(2000);

		const dialogFavoriteDeleteItemId = ref(null);
		const dialogFavoriteDeleteSignal = ref(new DialogSupport());
		const dialogFavoriteSignal = ref(new DialogSupport());
		const dialogLocationDeleteItemId = ref(null);
		const dialogLocationDeleteSignal = ref(new DialogSupport());
		const dialogLocationSignal = ref(new DialogSupport());

		const favorites = ref([]);

		const gameSystemIds = computed(() => {
			return SharedConstants.GameSystems;
		});
		const locations = computed(() => {
			return LibraryCommonUtility.sortByName(AppUtility.settings().getSettingsUserLocations(correlationId(), user.value), true);
		});
		// GameSystems Update
		const isGameSystemDungeonsAndDragons5e = computed(() => {
			return getGameSystemActive(SharedConstants.GameSystems.DungeonsAndDragons5e.id);
		});
		const isGameSystemPathfinder2e = computed(() => {
			return getGameSystemActive(SharedConstants.GameSystems.Pathfinder2e.id);
		});
		const isGameSystemStarfinder1e = computed(() => {
			return getGameSystemActive(SharedConstants.GameSystems.Starfinder1e.id);
		});

		const dialogFavoriteDelete = async (value) => {
			if (!value)
				return;

			dialogFavoriteDeleteItemId.value = value.id;
			dialogFavoriteDeleteSignal.value.open();
		};
		const dialogFavoriteDeleteCancel = async () => {
			dialogFavoriteDeleteSignal.value.cancel();
			dialogFavoriteDeleteItemId.value = null;
		};
		const dialogFavoriteDeleteOk = async () => {
			dialogFavoriteDeleteSignal.value.ok();
			dialogFavoriteDeleteItemId.value = null;
		};
		const dialogFavoriteDeletePreCompleteOk = async () => {
			const response = AppUtility.settings().deleteSettingsUserFavorite(correlationId(), LibraryClientUtility.$store, user.value, dialogFavoriteDeleteItemId.value);
			return response;
		};
		const dialogFavoriteEdit = async (value) => {
			await favoriteDialogRef.value.reset(correlationId(), LibraryCommonUtility.cloneDeep(value));
			dialogFavoriteSignal.value.open();
		};
		const dialogFavoriteNew = async () => {
			await favoriteDialogRef.value.reset(correlationId(), null);
			dialogFavoriteSignal.value.open();
		};
		const dialogLocationDelete = async (value) => {
			if (!value)
				return;

			dialogLocationDeleteItemId.value = value.id;
			dialogLocationDeleteSignal.value.open();
		};
		const dialogLocationDeleteCancel = async () => {
			dialogLocationDeleteSignal.value.cancel();
			dialogLocationDeleteItemId.value = null;
		};
		const dialogLocationDeleteOk = async () => {
			dialogLocationDeleteSignal.value.ok();
			dialogLocationDeleteItemId.value = null;
		};
		const dialogLocationDeletePreCompleteOk = async () => {
			const response = AppUtility.settings().deleteSettingsUserLocation(correlationId(), LibraryClientUtility.$store, user.value, dialogLocationDeleteItemId.value);
			return response;
		};
		const dialogLocationEdit = async (value) => {
			await locationDialogRef.value.reset(correlationId(), LibraryCommonUtility.cloneDeep(value));
			dialogLocationSignal.value.open();
		};
		const dialogLocationNew = async () => {
			await locationDialogRef.value.reset(correlationId(), null);
			dialogLocationSignal.value.open();
		};
		const getGameSystemActive = (id) => {
			const results = LibraryClientUtility.$store.getters.getGameSystem(correlationId(), id);
			return results ? results.active : false;
		};
		const getGameSystemName = (id) => {
			const results = LibraryClientUtility.$store.getters.getGameSystem(correlationId(), id);
			return results ? results.name : '';
		};
		const getGameSystemNumberName = (id) => {
			return GameSystemsUtility.numberName(id, LibraryClientUtility.$trans);
		};
		const loadFavorites = async () => {
			favorites.value = LibraryCommonUtility.sortByName(AppUtility.settings().getSettingsUserFavorites(correlationId(), user.value) || [], true);
		};
		// Auto-save: VtFormControl's auto-save mode has no built-in trigger, so each field's blur
		// submits the form (mirrors master's :blur="submitForm").
		const submitForm = async () => {
			if (formRef.value)
				await formRef.value.submit();
		};
		// Adapts the old preCompleteI hook: persists the game-system numbers on save.
		const preCompleteOk = async (correlationIdI) => {
			const responses = [];
			// GameSystems Update
			if (isGameSystemDungeonsAndDragons5e.value)
				responses.push(await AppUtility.settings().updateSettingsUserGameSystem(correlationIdI, LibraryClientUtility.$store, user.value, SharedConstants.GameSystems.DungeonsAndDragons5e.id, gameSystemNumberDungeonsAndDragons5e.value, (settings, newVal) => { settings.number = String.trim(newVal); }));
			if (isGameSystemPathfinder2e.value)
				responses.push(await AppUtility.settings().updateSettingsUserGameSystem(correlationIdI, LibraryClientUtility.$store, user.value, SharedConstants.GameSystems.Pathfinder2e.id, gameSystemNumberPathfinder2e.value, (settings, newVal) => { settings.number = String.trim(newVal); }));
			if (isGameSystemStarfinder1e.value)
				responses.push(await AppUtility.settings().updateSettingsUserGameSystem(correlationIdI, LibraryClientUtility.$store, user.value, SharedConstants.GameSystems.Starfinder1e.id, gameSystemNumberStarfinder1e.value, (settings, newVal) => { settings.number = String.trim(newVal); }));

			// Persist gamerTag via the base composable's settings persistence.
			const settings = await preCompleteOkI(correlationIdI);
			return await LibraryClientUtility.$store.dispatcher.user.setUserSettings(correlationIdI, settings);
		};
		// Adapts the old resetI hook: loads the game-system numbers into the form.
		const resetAdditional = (correlationIdI) => {
			resetAdditionalI(correlationIdI);
			// GameSystems Update
			gameSystemNumberDungeonsAndDragons5e.value = LibraryCommonUtility.cloneDeep(AppUtility.settings().getSettingsUserGameSystem(correlationIdI, user.value, SharedConstants.GameSystems.DungeonsAndDragons5e.id, (settings) => { return settings.number; }));
			gameSystemNumberPathfinder2e.value = LibraryCommonUtility.cloneDeep(AppUtility.settings().getSettingsUserGameSystem(correlationIdI, user.value, SharedConstants.GameSystems.Pathfinder2e.id, (settings) => { return settings.number; }));
			gameSystemNumberStarfinder1e.value = LibraryCommonUtility.cloneDeep(AppUtility.settings().getSettingsUserGameSystem(correlationIdI, user.value, SharedConstants.GameSystems.Starfinder1e.id, (settings) => { return settings.number; }));
		};

		onMounted(async () => {
			await loadFavorites();
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
			isSaving,
			serverErrors,
			setErrors,
			beforeUnload,
			dirty,
			dirtyCheck,
			leaveCheck,
			cancel,
			close,
			gamerTag,
			gamerTagDisplay,
			fab,
			hasPicture,
			name,
			ok,
			open,
			picture,
			preComplete,
			preCompleteI,
			preCompleteOkI,
			resetAdditionalI,
			requestReset,
			serviceStore,
			serviceUsers,
			user,
			formRef,
			favoriteDialogRef,
			locationDialogRef,
			gameSystemNumberDungeonsAndDragons5e,
			gameSystemNumberPathfinder2e,
			gameSystemNumberStarfinder1e,
			snackbar,
			timeout,
			dialogFavoriteDeleteItemId,
			dialogFavoriteDeleteSignal,
			dialogFavoriteSignal,
			dialogLocationDeleteItemId,
			dialogLocationDeleteSignal,
			dialogLocationSignal,
			favorites,
			gameSystemIds,
			locations,
			isGameSystemDungeonsAndDragons5e,
			isGameSystemPathfinder2e,
			isGameSystemStarfinder1e,
			dialogFavoriteDelete,
			dialogFavoriteDeleteCancel,
			dialogFavoriteDeleteOk,
			dialogFavoriteDeletePreCompleteOk,
			dialogFavoriteEdit,
			dialogFavoriteNew,
			dialogLocationDelete,
			dialogLocationDeleteCancel,
			dialogLocationDeleteOk,
			dialogLocationDeletePreCompleteOk,
			dialogLocationEdit,
			dialogLocationNew,
			getGameSystemActive,
			getGameSystemName,
			getGameSystemNumberName,
			preCompleteOk,
			resetAdditional,
			submitForm,
			validation: useVuelidate({ $scope: 'Settings' })
		};
	},
	validations() {
		return {
			// TODO(migration): the Vue2 template used vee-validate string rules
			// (gamerTag "min:3|max:30", game-system numbers "numeric|min_value:1|max_value:1000000000").
			// Only gamerTag is translated to vuelidate below; port the numeric rules if needed.
			gamerTag: {
				minLength: minLength(3),
				maxLength: maxLength(30),
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
