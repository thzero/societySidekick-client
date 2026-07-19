<template>
	<v-row>
		<v-col
			cols="12"
			class="mb-2"
		>
			<v-card>
				<v-card-text>
					<v-row>
						<v-col
							cols="12"
							lg="6"
							class="mb-1"
							:class="{ 'pr-2': $vuetify.display.lgAndUp }"
						>
							<table
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
							><tbody>
								<tr>
									<td style="width: 100%;">
										<VtSelect
											v-if="!isExternalListScenarios"
											ref="gameSystemsRef"
											v-model="gameSystemFilter"
											:items="gameSystems"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.gameSystem')"
											class="pb-1"
										/>
										<VtTextField
											v-if="isExternalListScenarios"
											ref="gameSystemRef"
											v-model="gameSystemName"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.gameSystem')"
											:readonly="true"
											class="pb-1"
										/>
										<VtSelect
											ref="scenarioSeasonsRef"
											v-model="seasonFilter"
											:items="scenarioSeasons"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.scenarios.season')"
											class="pb-1"
										/>
										<VtNumberField
											ref="usesRef"
											v-model="scenarioNumberFilter"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.scenarios.name')+' '+$t('forms.scenarios.number')"
											step="1"
											class="pb-1"
										/>
										<table
											v-if="$vuetify.display.mdAndDown"
											border="0"
											cellspacing="0"
											cellpadding="0"
											style="width: 100%;"
											class="pt-1"
										><tbody>
											<tr>
												<td>
													<VtTextField
														ref="scenarioNameFilterRef"
														v-model="scenarioNameFilter"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('forms.scenarios.name') + ' ' + $t('forms.name')"
														class="pb-1"
													/>
												</td>
											</tr>
											<tr>
												<td>
													<VtSelect
														ref="scenariosListingTypeFilterRef"
														v-model="scenariosListingTypeFilter"
														:items="scenariosListingTypeFilterList"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('sdfsdf')"
														class="pb-1"
													/>
												</td>
											</tr>
											<tr>
												<td>
													<!-- GameSystems Update -->
													<ScenarioListFilterPathfinder2e
														v-show="isGameSystemPathfinder2e"
														ref="scenarioListFilterPathfinder2eRef"
														v-model="forceRecomputeCounter"
														:external-list="isExternalList"
													/>
													<ScenarioListFilterStarfinder1e
														v-show="isGameSystemStarfinder1e"
														ref="scenarioListFilterStarfinder1eRef"
														v-model="forceRecomputeCounter"
														:external-list="isExternalList"
													/>
												</td>
											</tr>
										</tbody></table>
									</td>
									<td
										v-if="$vuetify.display.mdAndDown"
										style="vertical-align: top;"
									>
										<table
											border="0"
											cellspacing="0"
											cellpadding="0"
											class="mb-1 ml-2"
											style="margin-left: auto; margin-right: 0px;"
										><tbody>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-menu>
														<template #activator="{ props: menu }">
															<v-tooltip location="left">
																<template #activator="{ props: tooltip }">
																	<v-btn
																		v-if="gameSystemFilter"
																		variant="flat"
																		size="large"
																		style="min-width: 0px;"
																		v-bind="mergeProps(menu, tooltip)"
																	>
																		<v-icon>mdi-file-download</v-icon>
																	</v-btn>
																</template>
																<span>{{ $t('tooltips.extract') }}</span>
															</v-tooltip>
														</template>
														<v-list>
															<v-list-item @click="clickExtract(extractTypes.Csv)">
																<v-list-item-title>{{ $t('extracts.csv') }}</v-list-item-title>
															</v-list-item>
															<v-list-item @click="clickExtract(extractTypes.Text)">
																<v-list-item-title>{{ $t('extracts.text') }}</v-list-item-title>
															</v-list-item>
														</v-list>
													</v-menu>
												</td>
											</tr>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-tooltip location="left">
														<template #activator="{ props }">
															<v-btn
																v-if="gameSystemFilter && !isExternalList"
																variant="flat"
																size="large"
																style="min-width: 0px;"
																v-bind="props"
																@click="dialogShareOpen()"
															>
																<v-icon>mdi-share-variant</v-icon>
															</v-btn>
														</template>
														<span>{{ $t('tooltips.share') }}</span>
													</v-tooltip>
												</td>
											</tr>
											<tr>
												<td
													v-show="isExternalListFavorites"
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<VtSelect
														ref="userRef"
														v-model="userIdFilter"
														:items="userList"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('players.name')"
													/>
												</td>
											</tr>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<VGameSystemListingSyleButton v-model="listingStyle" />
												</td>
											</tr>
											<tr v-if="gameSystemFilter">
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-tooltip location="left">
														<template #activator="{ props }">
															<v-btn
																v-if="gameSystemFilter && !isExternalList"
																variant="flat"
																size="large"
																style="min-width: 0px;"
																v-bind="props"
																@click="clickClear()"
															>
																<v-icon>mdi-filter-variant-remove</v-icon>
															</v-btn>
														</template>
														<span>{{ $t('tooltips.clear') }}</span>
													</v-tooltip>
												</td>
											</tr>
										</tbody></table>
									</td>
								</tr>
							</tbody></table>
						</v-col>
						<v-col
							cols="12"
							lg="6"
						>
							<table
								v-if="$vuetify.display.lgAndUp"
								border="0"
								cellspacing="0"
								cellpadding="0"
								class="mb-1"
								style="width: 100%;"
							><tbody>
								<tr>
									<td style="width: 100%;">
										<table
											border="0"
											cellspacing="0"
											cellpadding="0"
											class="mb-1"
											style="width: 100%;"
										><tbody>
											<tr>
												<td>
													<VtTextField
														ref="scenarioNameFilterRef2"
														v-model="scenarioNameFilter"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('forms.scenarios.name') + ' ' + $t('forms.name')"
														class="pb-1"
													/>
												</td>
											</tr>
											<tr>
												<td>
													<VtSelect
														ref="scenariosListingTypeFilterRef2"
														v-model="scenariosListingTypeFilter"
														:items="scenariosListingTypeFilterList"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('sdfsdf')"
														class="pb-1"
													/>
												</td>
											</tr>
											<tr>
												<td class="pb-1">
													<!-- GameSystems Update -->
													<ScenarioListFilterPathfinder2e
														v-show="isGameSystemPathfinder2e"
														ref="scenarioListFilterPathfinder2eRef2"
														v-model="forceRecomputeCounter"
														:external-list="isExternalList"
													/>
													<ScenarioListFilterStarfinder1e
														v-show="isGameSystemStarfinder1e"
														ref="scenarioListFilterStarfinder1eRef2"
														v-model="forceRecomputeCounter"
														:external-list="isExternalList"
													/>
												</td>
											</tr>
											<tr>
												<table
													border="0"
													cellspacing="0"
													cellpadding="0"
													style="width: 100%;"
												><tbody>
													<tr>
														<td style="padding-right: 4px;">
															<VtSelect
																ref="sortByRef"
																v-model="sortBy"
																:items="sortKeys"
																:flat="true"
																:hide-details="true"
																:solo-inverted="true"
																:label="$t('forms.sorting.nameShort')"
															/>
														</td>
														<td>
															<VtDirectionButton v-model="sortDirection" />
														</td>
													</tr>
												</tbody></table>
											</tr>
										</tbody></table>
									</td>
									<td style="vertical-align: top;">
										<table
											border="0"
											cellspacing="0"
											cellpadding="0"
											class="mb-1 ml-2"
											style="margin-left: auto; margin-right: 0px;"
										><tbody>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-menu>
														<template #activator="{ props: menu }">
															<v-tooltip location="left">
																<template #activator="{ props: tooltip }">
																	<v-btn
																		v-if="gameSystemFilter"
																		variant="flat"
																		size="large"
																		style="min-width: 0px;"
																		v-bind="mergeProps(menu, tooltip)"
																	>
																		<v-icon>mdi-file-download</v-icon>
																	</v-btn>
																</template>
																<span>{{ $t('tooltips.extract') }}</span>
															</v-tooltip>
														</template>
														<v-list>
															<v-list-item @click="clickExtract(extractTypes.Csv)">
																<v-list-item-title>{{ $t('extracts.csv') }}</v-list-item-title>
															</v-list-item>
															<v-list-item @click="clickExtract(extractTypes.Text)">
																<v-list-item-title>{{ $t('extracts.text') }}</v-list-item-title>
															</v-list-item>
														</v-list>
													</v-menu>
												</td>
											</tr>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-tooltip location="left">
														<template #activator="{ props }">
															<v-btn
																v-if="gameSystemFilter && !isExternalList"
																variant="flat"
																size="large"
																style="min-width: 0px;"
																v-bind="props"
																@click="dialogShareOpen()"
															>
																<v-icon>mdi-share-variant</v-icon>
															</v-btn>
														</template>
														<span>{{ $t('tooltips.share') }}</span>
													</v-tooltip>
												</td>
											</tr>
											<tr>
												<td
													v-show="isExternalListFavorites"
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<VtSelect
														ref="userRef2"
														v-model="userIdFilter"
														:items="userList"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('players.name')"
													/>
												</td>
											</tr>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<VGameSystemListingSyleButton v-model="listingStyle" />
												</td>
											</tr>
											<tr v-if="gameSystemFilter">
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-tooltip location="left">
														<template #activator="{ props }">
															<v-btn
																v-if="gameSystemFilter && !isExternalList"
																variant="flat"
																size="large"
																style="min-width: 0px;"
																v-bind="props"
																@click="clickClear()"
															>
																<v-icon>mdi-filter-variant-remove</v-icon>
															</v-btn>
														</template>
														<span>{{ $t('tooltips.clear') }}</span>
													</v-tooltip>
												</td>
											</tr>
										</tbody></table>
									</td>
								</tr>
							</tbody></table>
						</v-col>
						<ShareDialog
							ref="shareDialogRef"
							:label="$t('characters.share') + ' ' +$t('characters.scenarios.namePlural')"
							:signal="dialogShare.signal"
							url="scenarios"
							@cancel="dialogShare.cancel()"
							@ok="dialogShare.ok()"
						/>
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			v-for="item in scenarios"
			:key="item.id"
			cols="12"
			:lg="isGrid ? 6 : 12"
			:xl="isGrid ? 4 : 12"
			class="pb-1 pt-1 pl-1 pr-1"
		>
			<ScenarioSnippet
				:value="item"
				:user="item.user"
				:external-list-type="externalListType"
			/>
		</v-col>
	</v-row>
</template>

<script>
import { computed, mergeProps, onMounted, ref, watch } from 'vue';
import { firstBy } from 'thenby';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useGameSystemBaseListComponent } from '@/components/gameSystems/baseList';

import gameSystemBaseListProps from '@/components/gameSystems/gameSystemBaseListProps';

import ScenarioSnippet from '@/components/gameSystems/ScenarioSnippet';
import ShareDialog from '@/components/ShareDialog';
import VGameSystemListingSyleButton from '@/components/gameSystems/VGameSystemListingSyleButton';
import VtDirectionButton from '@thzero/library_client_vue3_vuetify3/components/VtDirectionButton';
import VtNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberField';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

// GameSystems Update
import ScenarioListFilterPathfinder2e from '@/components/gameSystems/pathfinder2e/ScenarioListFilter';
import ScenarioListFilterStarfinder1e from '@/components/gameSystems/starfinder1e/ScenarioListFilter';

// TODO(migration): asyncComputed `scenarios` re-implemented as a ref recomputed via watch()/execute().
// The per-game-system ScenarioListFilter children are accessed via template refs (scenarioListFilterX2eRef*).
// NOTE the mdAndDown and lgAndUp layouts each render a ScenarioListFilter with its own ref; the filter
// helpers below try each ref. `this.clone` → LibraryCommonUtility.cloneDeep.
export default {
	name: 'BaseScenarioList',
	components: {
		// GameSystems Update
		ScenarioListFilterPathfinder2e,
		ScenarioListFilterStarfinder1e,
		ScenarioSnippet,
		ShareDialog,
		VGameSystemListingSyleButton,
		VtDirectionButton,
		VtNumberField,
		VtSelect,
		VtTextField
	},
	props: {
		...gameSystemBaseListProps
	},
	setup(props, context) {
		const base = useGameSystemBaseListComponent(props, context);

		const shareDialogRef = ref(null);
		const scenarioListFilterPathfinder2eRef = ref(null);
		const scenarioListFilterStarfinder1eRef = ref(null);
		const scenarioListFilterPathfinder2eRef2 = ref(null);
		const scenarioListFilterStarfinder1eRef2 = ref(null);

		const forceRecomputeCounter = ref(0);
		const listingStyleOverride = ref(SharedConstants.ListingTypes.Grid);
		const scenarioNameValue = ref(null);
		const scenarioNumberValue = ref(null);
		const scenariosCache = ref({});
		const scenariosListingTypeValue = ref(SharedConstants.ScenarioListingTypes.Played);
		const sortByOverride = ref(SharedConstants.SortBy.Scenarios.ScenarioName);
		const sortDirectionOverride = ref(true);
		const userIdFilterValue = ref(null);
		const users = ref([]);

		const scenarios = ref([]);

		// base.gameSystemFilter is a settings-backed computed that does not reliably re-trigger reactivity
		// when persisted via setUserSettings (store settings replacement). Drive the list off a local ref
		// (updated immediately on select) while still persisting the saved setting through the settings service.
		const gameSystemFilterLocal = ref(AppUtility.settings().getSettingsUserGameSystemFilter(base.correlationId(), LibraryClientUtility.$store.user.user, (s) => s.gameSystemFilter));
		const gameSystemFilter = computed({
			get: () => gameSystemFilterLocal.value,
			set: (newVal) => {
				gameSystemFilterLocal.value = newVal;
				AppUtility.settings().updateSettingsUserGameSystemFilter(base.correlationId(), LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, newVal, (s) => { return s.gameSystemFilter = newVal; });
			}
		});

		// Returns the active ScenarioListFilter child ref for the current game system (either layout).
		const filterPathfinder2e = () => {
			return scenarioListFilterPathfinder2eRef.value || scenarioListFilterPathfinder2eRef2.value;
		};
		const filterStarfinder1e = () => {
			return scenarioListFilterStarfinder1eRef.value || scenarioListFilterStarfinder1eRef2.value;
		};

		const characterList = computed(() => {
			return props.value ? props.value : LibraryClientUtility.$store.characters.characters;
		});
		const listingStyle = computed({
			get() {
				if (!props.user)
					return listingStyleOverride.value;
				if (base.isExternalList.value)
					return listingStyleOverride.value;

				let value = AppUtility.settings().getSettingsUserScenarios(base.correlationId(), props.user, (settings) => settings.listingStyleFilter);
				value = !String.isNullOrEmpty(value) ? value : SharedConstants.ListingTypes.Grid;
				return value;
			},
			set(newVal) {
				if (!props.user)
					return;
				if (base.isExternalList.value)
					listingStyleOverride.value = newVal;

				AppUtility.settings().updateSettingsUserScenarios(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.listingStyleFilter = newVal; });
			}
		});
		const isGrid = computed(() => {
			return listingStyle.value === SharedConstants.ListingTypes.Grid;
		});
		const isList = computed(() => {
			return listingStyle.value === SharedConstants.ListingTypes.List;
		});
		const seasonFilter = computed({
			get() {
				if (base.isExternalList.value)
					return base.seasonFilterOverride.value;
				if (!props.user)
					return null;
				return AppUtility.settings().getSettingsUserScenarios(base.correlationId(), props.user, (settings) => settings.seasonFilter);
			},
			set(newVal) {
				if (base.isExternalList.value) {
					base.seasonFilterOverride.value = newVal;
					return;
				}
				if (!props.user)
					return;
				AppUtility.settings().updateSettingsUserScenarios(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.seasonFilter = newVal; });
			}
		});
		const scenarioNameFilter = computed({
			get() {
				return scenarioNameValue.value;
			},
			set(newVal) {
				scenarioNameValue.value = newVal;
				forceRecomputeCounter.value++;
			}
		});
		const scenarioNumberFilter = computed({
			get() {
				return scenarioNumberValue.value;
			},
			set(newVal) {
				scenarioNumberValue.value = newVal;
				forceRecomputeCounter.value++;
			}
		});
		const sortBy = computed({
			get() {
				if (base.isExternalList.value)
					return sortByOverride.value;
				const result = AppUtility.settings().getSettingsUserScenarios(base.correlationId(), props.user, (settings) => settings.sortBy);
				return result ? result : SharedConstants.SortBy.Scenarios.ScenarioName;
			},
			set(newVal) {
				if (base.isExternalList.value) {
					sortByOverride.value = newVal;
					forceRecomputeCounter.value++;
					return;
				}
				AppUtility.settings().updateSettingsUserScenarios(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.sortBy = newVal; });
			}
		});
		const sortDirection = computed({
			get() {
				if (base.isExternalList.value)
					return sortDirectionOverride.value;
				return AppUtility.settings().getSettingsUserScenarios(base.correlationId(), props.user, (settings) => settings.sortDirection);
			},
			set(newVal) {
				if (base.isExternalList.value) {
					sortDirectionOverride.value = newVal;
					forceRecomputeCounter.value++;
					return;
				}
				AppUtility.settings().updateSettingsUserScenarios(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.sortDirection = newVal; });
			}
		});
		const scenariosListingTypeFilter = computed({
			get() {
				return scenariosListingTypeValue.value;
			},
			set(newVal) {
				if (newVal) {
					if (
						(sortBy.value === SharedConstants.SortBy.Scenarios.CharacterName) ||
						(sortBy.value === SharedConstants.SortBy.Scenarios.DatePlayed)
					)
						sortBy.value = SharedConstants.SortBy.Scenarios.Season;
				}
				scenariosListingTypeValue.value = newVal;
				forceRecomputeCounter.value++;
			}
		});
		const scenarioSeasons = computed(() => {
			const scenariosS = scenariosCache.value[gameSystemFilter.value];
			if (!scenariosS)
				return [];

			let output = scenariosS.filter(l => l.season != null).flatMap(l => l.season).filter(l => l !== null && l !== '');
			output = [...new Set(output)];
			return LibraryCommonUtility.selectBlank(output, LibraryClientUtility.$trans.t('forms.scenarios.season'));
		});
		const scenariosListingTypeFilterList = computed(() => {
			return LibraryCommonUtility.selectBlank([
				{ id: SharedConstants.ScenarioListingTypes.Played, name: LibraryClientUtility.$trans.t('forms.scenarios.played') },
				{ id: SharedConstants.ScenarioListingTypes.NotPlayed, name: LibraryClientUtility.$trans.t('forms.not') + ' ' + LibraryClientUtility.$trans.t('forms.scenarios.played') },
				{ id: SharedConstants.ScenarioListingTypes.All, name: LibraryClientUtility.$trans.t('forms.scenarios.all') }
			], LibraryClientUtility.$trans.t('forms.scenarios.name') + ' ' + LibraryClientUtility.$trans.t('forms.listing') + ' ' + LibraryClientUtility.$trans.t('forms.scenarios.type'));
		});
		const sortKeys = computed(() => {
			let keys = [];
			if (scenariosListingTypeFilter.value === SharedConstants.ScenarioListingTypes.Played) {
				keys.push({ id: SharedConstants.SortBy.Scenarios.CharacterName, name: LibraryClientUtility.$trans.t('forms.characters.name') + ' ' + LibraryClientUtility.$trans.t('forms.name') });
				keys.push({ id: SharedConstants.SortBy.Scenarios.DatePlayed, name: LibraryClientUtility.$trans.t('forms.scenarios.datePlayed') });
			}
			keys.push({ id: SharedConstants.SortBy.Scenarios.ScenarioName, name: LibraryClientUtility.$trans.t('forms.scenarios.name') + ' ' + LibraryClientUtility.$trans.t('forms.name') });
			keys.push({ id: SharedConstants.SortBy.Scenarios.ScenarioNumber, name: LibraryClientUtility.$trans.t('forms.scenarios.name') + ' ' + LibraryClientUtility.$trans.t('forms.number') });
			keys.push({ id: SharedConstants.SortBy.Scenarios.Season, name: LibraryClientUtility.$trans.t('forms.season') });
			return keys;
		});
		const userIdFilter = computed({
			get() {
				return userIdFilterValue.value;
			},
			set(newVal) {
				userIdFilterValue.value = newVal;
				forceRecomputeCounter.value++;
			}
		});
		const userList = computed(() => {
			return LibraryCommonUtility.selectBlank(users.value, LibraryClientUtility.$trans.t('players.name'));
		});

		const executeAdditionalFilter = (temp) => {
			if (base.isGameSystemPathfinder2e.value && filterPathfinder2e())
				return filterPathfinder2e().filterAdditional(temp);
			if (base.isGameSystemStarfinder1e.value && filterStarfinder1e())
				return filterStarfinder1e().filterAdditional(temp);
			return true;
		};
		const executeFilterOverride = () => {
			if (base.isGameSystemPathfinder2e.value && filterPathfinder2e())
				return true;
			if (base.isGameSystemStarfinder1e.value && filterStarfinder1e())
				return true;
			return false;
		};
		const executeScenarioNameFilter = (temp, value) => {
			if (base.isGameSystemPathfinder2e.value && filterPathfinder2e())
				return filterPathfinder2e().filterScenarioName(temp, value);
			if (base.isGameSystemStarfinder1e.value && filterStarfinder1e())
				return filterStarfinder1e().filterScenarioName(temp, value);
		};
		const filter = (temp) => {
			if (scenarioNameValue.value) {
				if (executeFilterOverride()) {
					if (executeScenarioNameFilter(temp, scenarioNameValue.value))
						return null;
				}
				else if (temp.name && (temp.name.toLowerCase().indexOf(scenarioNameValue.value.toLowerCase()) == -1))
					return null;
			}

			if (scenarioNumberValue.value) {
				if (!temp.scenario || (temp.scenario.indexOf(scenarioNumberFilter.value) == -1))
					return null;
			}

			if (seasonFilter.value) {
				if (temp.season !== seasonFilter.value)
					return null;
			}

			if (executeFilterOverride()) {
				if (!executeAdditionalFilter(temp))
					return null;
			}

			return temp;
		};
		const executeScenariosCache = async (correlationId) => {
			return new Promise(async (resolve, reject) => {
				try {
					let scenariosS = scenariosCache.value[gameSystemFilter.value];
					if (!scenariosS) {
						await LibraryClientUtility.$store.dispatcher.scenarios.getScenarioListing(correlationId, gameSystemFilter.value);
						scenariosS = LibraryClientUtility.$store.scenarios.listing;
						if (scenariosS) {
							scenariosS = scenariosS.filter(l => l.gameSystemId == gameSystemFilter.value);
							scenariosCache.value[gameSystemFilter.value] = scenariosS;
						}
					}
					scenariosS = scenariosS ? scenariosS : [];
					resolve(scenariosS);
				}
				catch (err) {
					reject();
				}
			});
		};
		const sortByCharacterName = (values, ascending) => {
			if (!values || !Array.isArray(values))
				return values;
			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryCommonUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.character.name : null; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);
			return values.sort(
				firstBy((a, b) => LibraryCommonUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.character.name : null; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		};
		const sortByDatePlayed = (values, ascending) => {
			if (!values || !Array.isArray(values))
				return values;
			if (ascending)
				return values.sort((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }));
			return values.sort((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }));
		};
		const sortByScenarioName = (values, ascending) => {
			if (!values || !Array.isArray(values))
				return values;
			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryCommonUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.scenario.name : null; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);
			return values.sort(
				firstBy((a, b) => LibraryCommonUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.scenario.name : null; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		};
		const sortByScenarioNumber = (values, ascending) => {
			if (!values || !Array.isArray(values))
				return values;
			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : -2147483647; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : -2147483647; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.scenario.name : null; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);
			return values.sort(
				firstBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.scenario.name : null; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		};
		const sortBySeason = (values, ascending) => {
			if (!values || !Array.isArray(values))
				return values;
			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : -2147483647; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.scenario.name : null; }))
					.thenBy((a, b) => LibraryCommonUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);
			return values.sort(
				firstBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.scenario.name : null; }))
				.thenBy((a, b) => LibraryCommonUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		};

		const execute = async () => {
			users.value = [];

			if (!gameSystemFilter.value)
				return [];
			if (!characterList.value)
				return [];

			const correlationId = base.correlationId();

			let characters = characterList.value.slice(0);
			characters = characters.filter(l => l.gameSystemId === gameSystemFilter.value);

			if (!characters || characters.length <= 0)
				return [];

			const scenariosS = await executeScenariosCache(correlationId);
			if (!scenariosS || scenariosS.length === 0)
				return [];

			let results = [];

			let name;
			let user;
			for (const character of characters) {
				user = character.user ? character.user : props.user;
				if (users.value.find(l => l.id === user.id))
					continue;

				name = user.settings && user.settings.gamerTag ? user.settings.gamerTag : null;
				if (!name)
					continue;

				users.value.push({ id: user.id, name: name });
			}

			let found;
			let scenarioT;

			if (scenariosListingTypeFilter.value === SharedConstants.ScenarioListingTypes.NotPlayed) {
				let scenarioIds = [];
				for (const character of characters) {
					for (const scenario of character.scenarios) {
						if (!scenarioIds.find(l => l === scenario.scenarioId))
							scenarioIds.push(scenario.scenarioId);
					}
				}

				for (const scenario of scenariosS) {
					if (scenarioIds.find(l => l === scenario.id))
						continue;

					found = filter(scenario);
					if (!found)
						continue;

					scenarioT = LibraryCommonUtility.cloneDeep(scenario);
					scenarioT.scenario = scenario;
					scenarioT.user = props.user;
					results.push(scenarioT);
				}
			}
			else if (scenariosListingTypeFilter.value === SharedConstants.ScenarioListingTypes.Played) {
				for (const character of characters) {
					if (!character.scenarios)
						continue;

					if (base.isExternalListFavorites.value) {
						if (userIdFilterValue.value) {
							if (character.userId !== userIdFilterValue.value)
								continue;
						}
					}

					for (const scenario of character.scenarios) {
						found = scenariosS.find(l => l.id === scenario.scenarioId);
						if (!found)
							continue;

						if (found.type === SharedConstants.ScenarioTypes.INITIAL)
							continue;

						found = filter(found);
						if (!found)
							continue;

						scenarioT = LibraryCommonUtility.cloneDeep(scenario);
						scenarioT.character = character;
						scenarioT.scenario = found;
						scenarioT.user = character.user ? character.user : props.user;
						results.push(scenarioT);
					}
				}
			}
			else if (scenariosListingTypeFilter.value === SharedConstants.ScenarioListingTypes.All) {
				for (const scenario of scenariosS) {
					found = filter(scenario);
					if (!found)
						continue;

					scenarioT = LibraryCommonUtility.cloneDeep(scenario);
					scenarioT.scenario = scenario;
					scenarioT.user = props.user;
					results.push(scenarioT);
				}
			}

			if (!results || results.length <= 0)
				return [];

			if (sortBy.value === SharedConstants.SortBy.Scenarios.ScenarioName)
				results = sortByScenarioName(results, sortDirection.value);
			else if (sortBy.value === SharedConstants.SortBy.Scenarios.ScenarioNumber)
				results = sortByScenarioNumber(results, sortDirection.value);
			else if (sortBy.value === SharedConstants.SortBy.Scenarios.Season)
				results = sortBySeason(results, sortDirection.value);

			if (scenariosListingTypeFilter.value === SharedConstants.ScenarioListingTypes.Played) {
				if (sortBy.value === SharedConstants.SortBy.Scenarios.CharacterName)
					results = sortByCharacterName(results, sortDirection.value);
				else if (sortBy.value === SharedConstants.SortBy.Scenarios.DatePlayed)
					results = sortByDatePlayed(results, sortDirection.value);
			}

			return results;
		};

		const clickClearGameSystem = () => {
			if (base.isGameSystemPathfinder2e.value && filterPathfinder2e())
				filterPathfinder2e().clear(gameSystemFilter.value);
			if (base.isGameSystemStarfinder1e.value && filterStarfinder1e())
				filterStarfinder1e().clear(gameSystemFilter.value);
		};
		const clickClear = () => {
			if (base.isExternalList.value) {
				scenarioNameValue.value = null;
				scenarioNumberValue.value = null;
				base.seasonFilterOverride.value = null;
				sortByOverride.value = SharedConstants.SortBy.Scenarios.ScenarioName;
				sortDirectionOverride.value = true;
				clickClearGameSystem();
				forceRecomputeCounter.value = 0;
				return;
			}

			AppUtility.settings().clearUser(base.correlationId(), LibraryClientUtility.$store, props.user, (correlationId, settings) => {
				scenarioNameValue.value = null;
				scenarioNumberValue.value = null;
				settings.scenarios.seasonFilter = null;
				settings.scenarios.sortBy = SharedConstants.SortBy.Scenarios.ScenarioName;
				settings.scenarios.sortDirection = true;
				clickClearGameSystem();
			});
		};
		const clickExtract = (type) => {
			extract(base.correlationId(), type);
		};
		const dialogShareOpen = () => {
			shareDialogRef.value.openDialog(gameSystemFilter.value);
			base.dialogShare.value.open();
		};
		const extract = (correlationId, type) => {
			// GameSystems Update
			let serviceGameSystem;
			if (base.isGameSystemPathfinder2e.value)
				serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
			else if (base.isGameSystemStarfinder1e.value)
				serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
			if (!serviceGameSystem)
				return;

			let id;
			const ids = [];
			let output = '';
			if (type == Constants.ExtractTypes.Csv)
				output = 'Season,Scenario,Name,Repeatable\n';

			for (let item of scenarios.value) {
				id = ids.find(l => l === item.scenario.id);
				if (id)
					continue;
				if (!item.scenario)
					continue;

				if (type == Constants.ExtractTypes.Csv) {
					output += (item.scenario.season ? item.scenario.season : '') + ',';
					output += item.scenario.scenario + ',';
					output += '"' + item.scenario.name + '",';
					output += (item.scenario.repeatable ? 'Y' : 'N') + '\n';
				}
				else if (type == Constants.ExtractTypes.Text) {
					output += serviceGameSystem.scenarioName(correlationId, item.scenario) + '\n';
					output += 'Repeatable: ' + (item.scenario.repeatable ? 'Y' : 'N') + '\n\n';
				}

				ids.push(item.scenario.id);
			}

			base.download(output, type, props.user, 'scenarios');
		};

		watch(
			[
				() => gameSystemFilter.value,
				forceRecomputeCounter,
				scenarioNameValue,
				scenarioNumberValue,
				() => seasonFilter.value,
				scenariosListingTypeValue,
				() => sortBy.value,
				() => sortDirection.value,
				userIdFilterValue,
				() => props.value
			],
			async () => {
				scenarios.value = await execute();
			}
		);

		onMounted(async () => {
			scenariosCache.value = {};
			scenarios.value = await execute();
		});

		return {
			...base,
			gameSystemFilter,
			shareDialogRef,
			scenarioListFilterPathfinder2eRef,
			scenarioListFilterStarfinder1eRef,
			scenarioListFilterPathfinder2eRef2,
			scenarioListFilterStarfinder1eRef2,
			forceRecomputeCounter,
			scenarios,
			characterList,
			listingStyle,
			isGrid,
			isList,
			seasonFilter,
			scenarioNameFilter,
			scenarioNumberFilter,
			scenariosListingTypeFilter,
			sortBy,
			sortDirection,
			scenarioSeasons,
			scenariosListingTypeFilterList,
			sortKeys,
			userIdFilter,
			userList,
			clickClear,
			clickExtract,
			dialogShareOpen,
			extract,
			mergeProps
		};
	}
};
</script>

<style scoped>
</style>
