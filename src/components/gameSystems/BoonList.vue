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
											ref="scenarioNameFilterRef"
											v-model="scenarioNameFilter"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.scenarios.name') + ' ' + $t('forms.name')"
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
													<!-- GameSystems Update -->
													<ScenarioListFilterPathfinder2e
														v-show="isGameSystemPathfinder2e"
														ref="scenarioListFilterPathfinder2eRef"
														v-model="forceRecomputeCounter"
														:external-list="false"
													/>
													<ScenarioListFilterStarfinder1e
														v-show="isGameSystemStarfinder1e"
														ref="scenarioListFilterStarfinder1eRef"
														v-model="forceRecomputeCounter"
														:external-list="false"
													/>
												</td>
											</tr>
											<tr>
												<td>
													<VtTextField
														ref="boonNameFilterRef"
														v-model="boonNameFilter"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('forms.boons.name') + ' ' + $t('forms.name')"
														class="pt-1 pb-1"
													/>
												</td>
											</tr>
										</tbody></table>
									</td>
									<td
										v-if="$vuetify.display.mdAndDown"
										style="vertical-align:top"
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
													<!-- GameSystems Update -->
													<ScenarioListFilterPathfinder2e
														v-show="isGameSystemPathfinder2e"
														ref="scenarioListFilterPathfinder2eRef2"
														v-model="forceRecomputeCounter"
														:external-list="false"
													/>
													<ScenarioListFilterStarfinder1e
														v-show="isGameSystemStarfinder1e"
														ref="scenarioListFilterStarfinder1eRef2"
														v-model="forceRecomputeCounter"
														:external-list="false"
													/>
												</td>
											</tr>
											<tr>
												<td>
													<VtTextField
														ref="boonNameFilterRef2"
														v-model="boonNameFilter"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('forms.boons.name') + ' ' + $t('forms.name')"
														class="pt-1"
													/>
												</td>
											</tr>
										</tbody></table>
										<table
											border="0"
											cellspacing="0"
											cellpadding="0"
											style="width: 100%;"
										><tbody>
											<tr>
												<td style="padding-right: 4px; width: 99%;">
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
												<td style="padding-right: 4px;">
													<VtDirectionButton v-model="sortDirection" />
												</td>
											</tr>
										</tbody></table>
									</td>
									<td style="vertical-align:top">
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
					</v-row>
				</v-card-text>
			</v-card>
		</v-col>
		<v-col
			v-for="item in boons"
			:key="item.id"
			cols="12"
			:lg="isGrid ? 6 : 12"
			:xl="isGrid ? 4 : 12"
			class="pb-1 pt-1 pl-1 pr-1"
		>
			<BoonSnippet
				:value="item"
				:user="item.user"
			/>
		</v-col>
	</v-row>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';

import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useGameSystemBaseListComponent } from '@/components/gameSystems/baseList';

import gameSystemBaseListProps from '@/components/gameSystems/gameSystemBaseListProps';

import BoonSnippet from '@/components/gameSystems/BoonSnippet';
import VGameSystemListingSyleButton from '@/components/gameSystems/VGameSystemListingSyleButton';
import VtDirectionButton from '@thzero/library_client_vue3_vuetify3/components/VtDirectionButton';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

// GameSystems Update
import ScenarioListFilterPathfinder2e from '@/components/gameSystems/pathfinder2e/ScenarioListFilter';
import ScenarioListFilterStarfinder1e from '@/components/gameSystems/starfinder1e/ScenarioListFilter';

export default {
	name: 'BaseBoonList',
	components: {
		// GameSystems Update
		ScenarioListFilterPathfinder2e,
		ScenarioListFilterStarfinder1e,
		BoonSnippet,
		VGameSystemListingSyleButton,
		VtDirectionButton,
		VtSelect,
		VtTextField
	},
	props: {
		...gameSystemBaseListProps
	},
	setup(props, context) {
		const base = useGameSystemBaseListComponent(props, context);

		const scenarioListFilterPathfinder2eRef = ref(null);
		const scenarioListFilterStarfinder1eRef = ref(null);
		const scenarioListFilterPathfinder2eRef2 = ref(null);
		const scenarioListFilterStarfinder1eRef2 = ref(null);

		const boonNameValue = ref(null);
		const boonsCache = ref({});
		const forceRecomputeCounter = ref(0);
		const scenarioNameValue = ref(null);
		const scenariosCache = ref({});
		const sortByOverride = ref(SharedConstants.SortBy.Boons.BoonName);
		const sortDirectionOverride = ref(true);
		const userIdFilterValue = ref(null);
		const users = ref([]);

		const boons = ref([]);

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

		const filterPathfinder2e = () => scenarioListFilterPathfinder2eRef.value || scenarioListFilterPathfinder2eRef2.value;
		const filterStarfinder1e = () => scenarioListFilterStarfinder1eRef.value || scenarioListFilterStarfinder1eRef2.value;

		const boonNameFilter = computed({
			get() {
				return boonNameValue.value;
			},
			set(newVal) {
				boonNameValue.value = newVal;
				forceRecomputeCounter.value++;
			}
		});
		const characterList = computed(() => {
			return props.value ? props.value : LibraryClientUtility.$store.characters.characters;
		});
		const isGrid = computed(() => {
			return listingStyle.value === SharedConstants.ListingTypes.Grid;
		});
		const isList = computed(() => {
			return listingStyle.value === SharedConstants.ListingTypes.List;
		});
		const listingStyle = computed({
			get() {
				let value = AppUtility.settings().getSettingsUserBoons(base.correlationId(), props.user, (settings) => settings.listingStyleFilter);
				value = !String.isNullOrEmpty(value) ? value : SharedConstants.ListingTypes.Grid;
				return value;
			},
			set(newVal) {
				AppUtility.settings().updateSettingsUserBoons(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.listingStyleFilter = newVal; });
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
		const seasonFilter = computed({
			get() {
				return AppUtility.settings().getSettingsUserBoons(base.correlationId(), props.user, (settings) => settings.seasonFilter);
			},
			set(newVal) {
				AppUtility.settings().updateSettingsUserBoons(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.seasonFilter = newVal; });
			}
		});
		const sortBy = computed({
			get() {
				const result = AppUtility.settings().getSettingsUserBoons(base.correlationId(), props.user, (settings) => settings.sortBy);
				return result ? result : SharedConstants.SortBy.Boons.BoonName;
			},
			set(newVal) {
				AppUtility.settings().updateSettingsUserBoons(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.sortBy = newVal; });
			}
		});
		const sortDirection = computed({
			get() {
				return AppUtility.settings().getSettingsUserBoons(base.correlationId(), props.user, (settings) => settings.sortDirection);
			},
			set(newVal) {
				AppUtility.settings().updateSettingsUserBoons(base.correlationId(), LibraryClientUtility.$store, props.user, newVal, (settings) => { settings.sortDirection = newVal; });
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
		const sortKeys = computed(() => {
			return [
				{ id: SharedConstants.SortBy.Boons.BoonName, name: LibraryClientUtility.$trans.t('forms.boons.name') + ' ' + LibraryClientUtility.$trans.t('forms.name') }
			];
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
		const executeBoonNameFilter = (temp, value) => {
			return temp ? temp.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 : false;
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
		const executeBoonsCache = async (correlationId) => {
			return new Promise(async (resolve, reject) => {
				try {
					let boonsS = boonsCache.value[gameSystemFilter.value];
					if (!boonsS) {
						await LibraryClientUtility.$store.dispatcher.boons.getBoonListing(correlationId, gameSystemFilter.value);
						boonsS = LibraryClientUtility.$store.boons.listing;
						if (boonsS) {
							boonsS = boonsS.filter(l => l.gameSystemId == gameSystemFilter.value);
							boonsCache.value[gameSystemFilter.value] = boonsS;
						}
					}
					boonsS = boonsS ? boonsS : [];
					resolve(boonsS);
				}
				catch (err) {
					reject();
				}
			});
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
		const executeScenarioBoon = (scenarios, boonsS, boon, character, results, scenario) => {
			const temp = boonsS.find(l => l.id == boon.boonId);
			if (!temp)
				return;

			if (boonNameValue.value) {
				if (executeFilterOverride()) {
					if (!executeBoonNameFilter(temp, boonNameValue.value))
						return;
				}
				else if (temp.name && (temp.name.toLowerCase().indexOf(boonNameValue.value.toLowerCase()) == -1))
					return;
			}

			const exists = results.find(l => l.boon && l.boon.id == boon.boonId);
			if (exists) {
				if (character)
					exists.characters.push(character);
				if (scenario) {
					scenario.character = character;
					exists.scenarios.push(scenario);
				}
				return;
			}

			const scenarioT = scenarios.find(l => l.id == temp.scenarioId);

			const boonTemp = LibraryCommonUtility.cloneDeep(boon);
			boonTemp.characters = boonTemp.characters ? boonTemp.characters : [];
			if (character)
				boonTemp.characters.push(character);
			boonTemp.boon = temp;
			boonTemp.scenario = scenarioT;
			boonTemp.gameSystemId = gameSystemFilter.value;
			boonTemp.user = character.user ? character.user : props.user;
			boonTemp.scenarios = boonTemp.scenarios ? boonTemp.scenarios : [];
			if (scenario) {
				scenario.character = character;
				boonTemp.scenarios.push(scenario);
			}
			results.push(boonTemp);
		};
		const sortByBoonName = (values, ascending) => {
			if (!values || !Array.isArray(values))
				return values;
			if (ascending)
				return values.sort((a, b) => LibraryCommonUtility.sortByString(a, b, (v) => { return v && v.boon ? v.boon.name : null; }));
			return values.sort((a, b) => LibraryCommonUtility.sortByString(b, a, (v) => { return v && v.boon ? v.boon.name : null; }));
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

			const boonsS = await executeBoonsCache(correlationId);
			if (!boonsS || boonsS.length === 0)
				return [];

			let scenarios = await executeScenariosCache(correlationId);
			if (!scenarios || scenarios.length === 0)
				scenarios = [];

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

			let temp;
			let boonTemp;
			let characterT;
			for (const character of characters) {
				if (!character.boons && !character.scenarios)
					continue;

				characterT = LibraryCommonUtility.cloneDeep(character);

				for (let scenario of characterT.scenarios) {
					temp = scenarios.find(l => l.id == scenario.scenarioId);
					if (!temp)
						continue;
					if (temp.type == SharedConstants.ScenarioTypes.INITIAL)
						continue;

					scenario = LibraryCommonUtility.cloneDeep(scenario);

					if (seasonFilter.value) {
						if (temp.season !== seasonFilter.value)
							continue;
					}

					if (scenarioNameValue.value) {
						if (executeFilterOverride()) {
							if (executeScenarioNameFilter(temp, scenarioNameValue.value))
								continue;
						}
						else if (temp.name && (temp.name.toLowerCase().indexOf(scenarioNameValue.value.toLowerCase()) == -1))
							continue;
					}

					if (executeFilterOverride()) {
						if (!executeAdditionalFilter(temp))
							continue;
					}

					if (scenario.boon1Id) {
						boonTemp = { boonId: scenario.boon1Id };
						executeScenarioBoon(scenarios, boonsS, boonTemp, characterT, results, scenario);
					}
					if (scenario.boon2Id) {
						boonTemp = { boonId: scenario.boon2Id };
						executeScenarioBoon(scenarios, boonsS, boonTemp, characterT, results, scenario);
					}
				}

				for (const boon of characterT.boons) {
					if (seasonFilter.value || scenarioNameValue.value)
						continue;

					temp = boonsS.find(l => l.id == boon.boonId);
					if (!temp)
						continue;

					if (executeFilterOverride()) {
						if (!executeAdditionalFilter(temp))
							continue;
					}

					if (boonNameValue.value) {
						if (executeFilterOverride()) {
							if (!executeBoonNameFilter(temp, boonNameValue.value))
								continue;
						}
						else if (temp.name && (temp.name.toLowerCase().indexOf(boonNameValue.value.toLowerCase()) == -1))
							continue;
					}

					boonTemp = results.find(l => l.boon && l.boon.id == boon.boonId);
					if (boonTemp) {
						boonTemp.characters.push(boon.characterT);
						continue;
					}

					boonTemp = {};
					boonTemp.characters = boon.characters ? boon.characters : [];
					boonTemp.characters.push(boon.characterT);
					boonTemp.boon = temp;
					boonTemp.user = characterT.user ? characterT.user : props.user;
					boonTemp.gameSystemId = gameSystemFilter.value;
					results.push(boonTemp);
				}

				delete characterT.boons;
			}

			if (!results || results.length <= 0)
				return [];

			if (sortBy.value === SharedConstants.SortBy.Boons.BoonName)
				results = sortByBoonName(results, sortDirection.value);

			return results;
		};

		const clickClearGameSystem = () => {
			if (base.isGameSystemPathfinder2e.value && filterPathfinder2e())
				filterPathfinder2e().clear(gameSystemFilter.value);
			if (base.isGameSystemStarfinder1e.value && filterStarfinder1e())
				filterStarfinder1e().clear(gameSystemFilter.value);
		};
		const clickClear = () => {
			AppUtility.settings().clearUser(base.correlationId(), LibraryClientUtility.$store, props.user, (correlationId, settings) => {
				boonNameValue.value = null;
				scenarioNameValue.value = null;
				settings.scenarios.seasonFilter = null;
				settings.scenarios.sortBy = SharedConstants.SortBy.Boons.BoonName;
				settings.scenarios.sortDirection = true;
				clickClearGameSystem();
			});
		};

		watch(
			[
				() => gameSystemFilter.value,
				forceRecomputeCounter,
				boonNameValue,
				scenarioNameValue,
				() => seasonFilter.value,
				() => sortBy.value,
				() => sortDirection.value,
				() => props.value
			],
			async () => {
				boons.value = await execute();
			}
		);

		onMounted(async () => {
			scenariosCache.value = {};
			boons.value = await execute();
		});

		return {
			...base,
			gameSystemFilter,
			forceRecomputeCounter,
			scenarioListFilterPathfinder2eRef,
			scenarioListFilterStarfinder1eRef,
			scenarioListFilterPathfinder2eRef2,
			scenarioListFilterStarfinder1eRef2,
			boons,
			boonNameFilter,
			characterList,
			isGrid,
			isList,
			listingStyle,
			scenarioNameFilter,
			seasonFilter,
			sortBy,
			sortDirection,
			scenarioSeasons,
			sortKeys,
			userIdFilter,
			userList,
			clickClear
		};
	}
};
</script>

<style scoped>
</style>
