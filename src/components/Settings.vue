<template>
	<v-layout
		wrap
	>
		<v-flex
			xs12
			class="mx-auto mb-2"
		>
			<v-card>
				<v-card-text>
					<span class="headline">{{ $t('titles.settings') }}</span>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			xs12
			class="mx-auto mb-2"
		>
			<v-card>
				<v-card-text>
					<v-layout
						wrap
					>
						<v-flex
							xs12
							pb-2
							pr-2
							pt-2
						>
							<v-layout
								wrap
							>
								<v-flex
									xs9
									class="title mb-1 pt-1"
								>
									{{ name }}
								</v-flex>
								<v-flex
									xs3
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
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			xs12
			class="mx-auto mb-2"
		>
			<VFormControl
				ref="form"
				:auto-save="true"
				:pre-complete-ok="preComplete"
				@close="close"
				@cancel="cancel"
				@ok="ok"
				@open="open"
			>
				<v-layout
					wrap
				>
					<v-flex
						xs12
					>
						<v-card
							class="mb-3"
						>
							<v-card-text>
								<VTextFieldWithValidation
									ref="gamerTag"
									v-model="user.settings.gamerTag"
									rules="min:3|max:30|"
									vid="gamerTag"
									:label="$t('forms.gamerTag')"
									:counter="30"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-flex>
					<!-- // GameSystems Update -->
					<v-flex
						v-if="isGameSystemDungeonsAndDragons5e"
						xs12
						md6
						:pr-4="$vuetify.breakpoint.mdAndUp"
					>
						<v-card>
							<v-card-title class="headline">
								{{ getGameSystemName(gameSystemIds.DungeonsAndDragons5e.id) }}
							</v-card-title>
							<v-card-text>
								<VTextFieldWithValidation
									ref="gameSystemNumberDungeonsAndDragons5e"
									v-model="gameSystemNumberDungeonsAndDragons5e"
									rules="numeric|min_value:1|max_value:1000000000|"
									vid="gameSystemNumberDungeonsAndDragons5e"
									:label="getGameSystemNumberName(gameSystemIds.DungeonsAndDragons5e.id)"
									step="1"
									:counter="10"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-flex>
					<!-- // GameSystems Update -->
					<v-flex
						v-if="isGameSystemPathfinder2e"
						xs12
						md6
					>
						<v-card>
							<v-card-title class="headline">
								{{ getGameSystemName(gameSystemIds.Pathfinder2e.id) }}
							</v-card-title>
							<v-card-text>
								<VTextFieldWithValidation
									ref="gameSystemNumberPathfinder2e"
									v-model="gameSystemNumberPathfinder2e"
									rules="numeric|min_value:1|max_value:1000000000|"
									vid="gameSystemNumberPathfinder2e"
									:label="getGameSystemNumberName(gameSystemIds.Pathfinder2e.id)"
									step="1"
									:counter="10"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-flex>
					<!-- // GameSystems Update -->
					<v-flex
						v-if="isGameSystemStarfinder1e"
						xs12
						md6
						:class="{'mt-3': $vuetify.breakpoint.smAndDown}"
					>
						<v-card
							:class="{'ml-2': $vuetify.breakpoint.mdAndUp}"
						>
							<v-card-title class="headline">
								{{ getGameSystemName(gameSystemIds.Starfinder1e.id) }}
							</v-card-title>
							<v-card-text>
								<VTextFieldWithValidation
									ref="gameSystemNumberStarfinder1e"
									v-model="gameSystemNumberStarfinder1e"
									rules="numeric|min_value:1|max_value:1000000000|"
									vid="gameSystemNumberStarfinder1e"
									:label="getGameSystemNumberName(gameSystemIds.Starfinder1e.id)"
									step="1"
									:counter="10"
									:blur="submitForm"
								/>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</VFormControl>
		</v-flex>
		<v-flex
			xs12
			class="mx-auto mb-2"
		>
			<v-card>
				<v-card-title class="headline">
					{{ $t('favorites.namePlural') }}
				</v-card-title>
				<v-card-text>
					<v-layout
						wrap
					>
						<v-flex
							v-for="item in favorites"
							:key="item.id"
							xs12
							sm6
							md3
							pl-1
							pr-1
							pb-2
						>
							<Favorite
								:value="item"
								@dialog-favorite-delete="dialogFavoriteDelete"
								@dialog-favorite-edit="dialogFavoriteEdit"
							/>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			xs12
			class="mx-auto mb-2 mt-4"
		>
			<v-card>
				<v-card-title class="headline">
					{{ $t('locations.namePlural') }}
				</v-card-title>
				<v-card-text>
					<v-fab-transition>
						<v-btn
							absolute
							fab
							right
							small
							color="green"
							top
							style="margin-right: 40px;"
							@click="dialogLocationNew()"
						>
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-fab-transition>
					<v-layout
						wrap
					>
						<v-flex
							v-for="item in locations"
							:key="item.id"
							xs12
							sm6
							md3
							pl-1
							pr-1
							pb-2
						>
							<Location
								:value="item"
								@dialog-location-delete="dialogLocationDelete"
								@dialog-location-edit="dialogLocationEdit"
							/>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<FavoriteDialog
			ref="favoriteDialog"
			:signal="dialogFavoriteSignal.signal"
			@cancel="dialogFavoriteSignal.cancel()"
			@ok="dialogFavoriteSignal.ok()"
		/>
		<LocationDialog
			ref="locationDialog"
			:signal="dialogLocationSignal.signal"
			@cancel="dialogLocationSignal.cancel()"
			@ok="dialogLocationSignal.ok()"
		/>
		<VConfirmationDialog
			:non-recoverable="true"
			:signal="dialogLocationDeleteSignal.signal"
			:pre-complete-ok="dialogLocationDeletePreCompleteOk"
			@cancel="dialogLocationDeleteCancel"
			@ok="dialogLocationDeleteOk"
		/>
		<v-snackbar
			ref="snackbar"
			v-model="snackbar"
			:timeout="timeout"
		>
			{{ $t('messages.saved') }}
		</v-snackbar>
	</v-layout>
</template>

<script>
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import GameSystemsUtility from '@/utility/gameSystems';

import Favorite from '@/components/favorites/Favorite';
import FavoriteDialog from '@/components/favorites/FavoriteDialog';
import Location from '@/components/locations/Location';
import LocationDialog from '@/components/locations/LocationDialog';
import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

import DialogSupport from '@/library_vue_components/support/dialog';

import baseSettings from '@/library_vue_components/baseSettings';

export default {
	name: 'Settings',
	components: {
		Favorite,
		FavoriteDialog,
		Location,
		LocationDialog,
		VConfirmationDialog,
		VTextFieldWithValidation
	},
	extends: baseSettings,
	data: () => ({
		dialogFavoriteDeleteItemId: null,
		dialogFavoriteDeleteSignal: new DialogSupport(),
		dialogFavoriteSignal: new DialogSupport(),
		dialogLocationDeleteItemId: null,
		dialogLocationDeleteSignal: new DialogSupport(),
		dialogLocationSignal: new DialogSupport(),
		gameSystemNumberDungeonsAndDragons5e: null,
		gameSystemNumberPathfinder2e: null,
		gameSystemNumberStarfinder1e: null
	}),
	asyncComputed: {
		async favorites() {
			// return LibraryUtility.sortByName(AppUtility.settings().getSettingsUserFavorites(this.correlationId(), this.user), true)
			const response = await GlobalUtility.$store.dispatcher.user.getUserFavorites(this.correlationId());
			return response && response.success ? response.results : [];
		}
	},
	computed: {
		locations() {
			return LibraryUtility.sortByName(AppUtility.settings().getSettingsUserLocations(this.correlationId(), this.user), true);
		},
		gameSystemIds() {
			return SharedConstants.GameSystems;
		},
		// GameSystems Update
		isGameSystemDungeonsAndDragons5e() {
			return this.getGameSystemActive(SharedConstants.GameSystems.DungeonsAndDragons5e.id);
		},
		isGameSystemPathfinder2e() {
			return this.getGameSystemActive(SharedConstants.GameSystems.Pathfinder2e.id);
		},
		isGameSystemStarfinder1e() {
			return this.getGameSystemActive(SharedConstants.GameSystems.Starfinder1e.id);
		}
	},
	methods: {
		async dialogFavoriteDelete(value) {
			if (!value)
				return;

			this.dialogFavoriteDeleteItemId = value.id;
			this.dialogFavoriteDeleteSignal.open();
		},
		async dialogFavoriteDeleteCancel() {
			this.dialogFavoriteDeleteSignal.cancel();
			this.dialogFavoriteDeleteItemId = null;
		},
		async dialogFavoriteDeleteOk() {
			this.dialogFavoriteDeleteSignal.ok();
			this.dialogFavoriteDeleteItemId = null;
		},
		async dialogFavoriteDeletePreCompleteOk() {
			const response = AppUtility.settings().deleteSettingsUserFavorite(this.correlationId(), GlobalUtility.$store, GlobalUtility.$store.state.user.user, this.dialogFavoriteDeleteItemId);
			return response;
		},
		async dialogFavoriteEdit(value) {
			await this.$refs.favoriteDialog.reset(this.correlationId(), this.clone(value));
			this.dialogFavoriteSignal.open();
		},
		async dialogFavoriteNew() {
			await this.$refs.favoriteDialog.reset(this.correlationId(), null);
			this.dialogFavoriteSignal.open();
		},
		async dialogLocationDelete(value) {
			if (!value)
				return;

			this.dialogLocationDeleteItemId = value.id;
			this.dialogLocationDeleteSignal.open();
		},
		async dialogLocationDeleteCancel() {
			this.dialogLocationDeleteSignal.cancel();
			this.dialogLocationDeleteItemId = null;
		},
		async dialogLocationDeleteOk() {
			this.dialogLocationDeleteSignal.ok();
			this.dialogLocationDeleteItemId = null;
		},
		async dialogLocationDeletePreCompleteOk() {
			const response = AppUtility.settings().deleteSettingsUserLocation(this.correlationId(), GlobalUtility.$store, GlobalUtility.$store.state.user.user, this.dialogLocationDeleteItemId);
			return response;
		},
		async dialogLocationEdit(value) {
			await this.$refs.locationDialog.reset(this.correlationId(), this.clone(value));
			this.dialogLocationSignal.open();
		},
		async dialogLocationNew() {
			await this.$refs.locationDialog.reset(this.correlationId(), null);
			this.dialogLocationSignal.open();
		},
		getGameSystemActive(id) {
			const results = GlobalUtility.$store.getters.getGameSystem(id);
			return results ? results.active : false;
		},
		getGameSystemName(id) {
			const results = GlobalUtility.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		getGameSystemNumberName(id) {
			return GameSystemsUtility.numberName(id, GlobalUtility.$trans);
		},
		// eslint-disable-next-line
		async preCompleteI(correlationId, responses) {
			// GameSystems Update
			if (this.isGameSystemDungeonsAndDragons5e)
				responses.push(await AppUtility.settings().updateSettingsUserGameSystem(correlationId, GlobalUtility.$store, this.user, SharedConstants.GameSystems.DungeonsAndDragons5e.id, this.gameSystemNumberDungeonsAndDragons5e, (settings, newVal) => { settings.number = String.trim(newVal); }));
			if (this.isGameSystemPathfinder2e)
				responses.push(await AppUtility.settings().updateSettingsUserGameSystem(correlationId, GlobalUtility.$store, this.user, SharedConstants.GameSystems.Pathfinder2e.id, this.gameSystemNumberPathfinder2e, (settings, newVal) => { settings.number = String.trim(newVal); }));
			if (this.isGameSystemStarfinder1e)
				responses.push(await AppUtility.settings().updateSettingsUserGameSystem(correlationId, GlobalUtility.$store, this.user, SharedConstants.GameSystems.Starfinder1e.id, this.gameSystemNumberStarfinder1e, (settings, newVal) => { settings.number = String.trim(newVal); }));
		},
		// eslint-disable-next-line
		resetI(correlationId) {
			// GameSystems Update
			this.gameSystemNumberDungeonsAndDragons5e = this.clone(AppUtility.settings().getSettingsUserGameSystem(correlationId, this.user, SharedConstants.GameSystems.DungeonsAndDragons5e.id, (settings) => { return settings.number; }));
			this.gameSystemNumberPathfinder2e = this.clone(AppUtility.settings().getSettingsUserGameSystem(correlationId, this.user, SharedConstants.GameSystems.Pathfinder2e.id, (settings) => { return settings.number; }));
			this.gameSystemNumberStarfinder1e = this.clone(AppUtility.settings().getSettingsUserGameSystem(correlationId, this.user, SharedConstants.GameSystems.Starfinder1e.id, (settings) => { return settings.number; }));
		},
		async submitForm() {
			await this.$refs.form.submit();
		}
	}
};
</script>

<style scoped>
</style>
