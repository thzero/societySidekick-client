<template>
	<v-layout
		wrap
	>
		<v-flex
			xs12
			mb-2
		>
			<v-card
				tile
			>
				<v-card-text>
					<v-layout
						wrap
					>
						<v-flex
							xs12
							lg6
							mb-1
							:pr-2="$vuetify.breakpoint.lgAndUp"
						>
							<VSelect2
								v-if="!isExternalListScenarios"
								ref="gameSystems"
								v-model="gameSystemFilter"
								:items="gameSystems"
								:flat="true"
								:hide-details="true"
								:solo-inverted="true"
								:label="$t('forms.gameSystem')"
								class="pb-1"
							/>
							<VText2
								v-if="isExternalListScenarios"
								ref="gameSystem"
								v-model="gameSystemName"
								:flat="true"
								:hide-details="true"
								:solo-inverted="true"
								:label="$t('forms.gameSystem')"
								:readonly="true"
								class="pb-1"
							/>
							<VSelect2
								ref="scenarioSeasons"
								v-model="seasonFilter"
								:items="scenarioSeasons"
								:flat="true"
								:hide-details="true"
								:solo-inverted="true"
								:label="$t('forms.scenarios.season')"
								class="pb-1"
							/>
							<VNumber
								ref="uses"
								v-model="scenarioNumberFilter"
								:flat="true"
								:hide-details="true"
								:solo-inverted="true"
								:label="$t('forms.scenarios.name')+' '+$t('forms.scenarios.number')"
								step="1"
								class="pb-1"
							/>
							<table
								v-if="$vuetify.breakpoint.mdAndDown"
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
								class="pt-1"
							>
								<tr>
									<td>
										<VText2
											ref="scenarioNameFilter"
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
										<VSelect2
											ref="scenariosNotPlayedFilter"
											v-model="scenariosNotPlayedFilter"
											:items="scenariosNotPlayedList"
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
										<!-- // GameSystems Update -->
										<ScenarioListFilterPathfinder2e
											v-show="isGameSystemPathfinder2e"
											ref="scenarioListFilterPathfinder2e"
											v-model="forceRecomputeCounter"
											:external-list="isExternalList"
										/>
										<ScenarioListFilterStarfinder1e
											v-show="isGameSystemStarfinder1e"
											ref="scenarioListFilterStarfinder1e"
											v-model="forceRecomputeCounter"
											:external-list="isExternalList"
										/>
									</td>
									<td>
										<table style="margin-left: auto; margin-right: 0px;">
											<tr>
												<td>
													<v-btn
														v-if="gameSystemFilter && !isExternalList"
														depressed
														large
														style="min-width: 0px;"
														@click="dialogShareOpen()"
													>
														<v-icon>mdi-share-variant</v-icon>
													</v-btn>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr
									v-show="isExternalListFavorites"
								>
									<td>
										<VSelect2
											ref="user"
											v-model="userIdFilter"
											:items="userList"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('players.name')"
											class="pt-1"
										/>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs12
							lg6
						>
							<table
								v-if="$vuetify.breakpoint.lgAndUp"
								border="0"
								cellspacing="0"
								cellpadding="0"
								class="mb-1"
								style="width: 100%;"
							>
								<tr>
									<td>
										<VText2
											ref="scenarioNameFilter"
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
										<VSelect2
											ref="scenariosNotPlayedFilter"
											v-model="scenariosNotPlayedFilter"
											:items="scenariosNotPlayedList"
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
										<!-- // GameSystems Update -->
										<ScenarioListFilterPathfinder2e
											v-show="isGameSystemPathfinder2e"
											ref="scenarioListFilterPathfinder2e"
											v-model="forceRecomputeCounter"
											:external-list="isExternalList"
										/>
										<ScenarioListFilterStarfinder1e
											v-show="isGameSystemStarfinder1e"
											ref="scenarioListFilterStarfinder1e"
											v-model="forceRecomputeCounter"
											:external-list="isExternalList"
										/>
									</td>
									<td>
										<table style="margin-left: auto; margin-right: 0px;">
											<tr>
												<td>
													<v-btn
														v-if="gameSystemFilter && !isExternalList"
														depressed
														large
														style="min-width: 0px;"
														@click="dialogShareOpen()"
													>
														<v-icon>mdi-share-variant</v-icon>
													</v-btn>
												</td>
											</tr>
										</table>
									</td>
								</tr>
								<tr
									v-show="isExternalListFavorites"
								>
									<td>
										<VSelect2
											ref="user"
											v-model="userIdFilter"
											:items="userList"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('players.name')"
											class="pt-1"
										/>
									</td>
								</tr>
							</table>
							<table
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
							>
								<tr>
									<td
										style="padding-right: 4px; width: 99%;"
									>
										<VSelect2
											ref="sortBy"
											v-model="sortBy"
											:items="sortKeys"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.sorting.nameShort')"
										/>
									</td>
									<td>
										<VDirectionButton
											v-model="sortDirection"
										/>
									</td>
									<td
										v-if="gameSystemFilter"
										align="right"
									>
										<v-btn
											depressed
											large
											style="min-width: 0px;"
											class="ml-1"
											@click="clickClear()"
										>
											<v-icon>mdi-filter-variant-remove</v-icon>
										</v-btn>
									</td>
								</tr>
							</table>
						</v-flex>
						<ShareDialog
							ref="shareDialog"
							:label="$t('characters.share') + ' ' +$t('characters.scenarios.namePlural')"
							:signal="dialogShare.signal"
							url="scenarios"
							@cancel="dialogShare.cancel()"
							@ok="dialogShare.ok()"
						/>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			v-for="item in scenarios"
			:key="item.id"
			sm12
			lg6
			xl4
			pb-1
			pt-1
			pl-1
			pr-1
		>
			<ScenarioSnippet
				:value="item"
				:user="item.user"
				:external-list-type="externalListType"
			/>
		</v-flex>
	</v-layout>
</template>

<script>
import { firstBy } from 'thenby';

import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility';

import baseList from '@/components/gameSystems/baseList';
import VDirectionButton from '@/library_vue/components/VDirectionButton';
import VNumber from '@/library_vue/components/form/VNumberField';
import VSelect2 from '@/library_vue/components/form/VSelect';
import VText2 from '@/library_vue/components/form/VTextField';

import ScenarioSnippet from '@/components/gameSystems/ScenarioSnippet';
import ShareDialog from '@/components/ShareDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

// GameSystems Update
import ScenarioListFilterPathfinder2e from '@/components/gameSystems/pathfinder2e/ScenarioListFilter';
import ScenarioListFilterStarfinder1e from '@/components/gameSystems/starfinder1e/ScenarioListFilter';

export default {
	name: 'BaseScenarioList',
	components: {
		// GameSystems Update
		ScenarioListFilterPathfinder2e,
		ScenarioListFilterStarfinder1e,
		ScenarioSnippet,
		ShareDialog,
		VDirectionButton,
		VNumber,
		VSelect2,
		VText2
	},
	extends: baseList,
	props: {
		user: {
			type: Object,
			default: null
		},
		value: {
			type: Array,
			default: null
		}
	},
	data: () => ({
		dialogShare: new DialogSupport(),
		forceRecomputeCounter: 0,
		scenarioNameValue: null,
		scenarioNumberValue: null,
		scenariosNotPlayed: false,
		scenariosCache: {},
		sortByOverride: null,
		sortDirectionOverride: true,
		userIdFilterValue: null,
		users: [],
		executing: false
	}),
	asyncComputed: {
		async scenarios() {
			return await this.execute();
		}
	},
	computed: {
		characterList() {
			return this.value ? this.value : this.$store.state.characters.characters;
		},
		gameSystemName: {
			get() {
				const results = this.$store.getters.getGameSystem(this.gameSystemFilter);
				return results ? results.name : '';
			},
			set() {}
		},
		seasonFilter: {
			get: function () {
				if (this.isExternalList)
					return this.seasonFilterOverride;

				return AppUtility.settings().getSettingsUserScenarios(this.correlationId(), this.user, (settings) => settings.seasonFilter);
			},
			set: function (newVal) {
				if (this.isExternalList) {
					this.seasonFilterOverride = newVal;
					return;
				}

				AppUtility.settings().updateSettingsUserScenarios(this.correlationId(), this.$store, this.user, newVal, (settings) => { settings.seasonFilter = newVal; });
			}
		},
		scenarioNameFilter: {
			get: function () {
				return this.scenarioNameValue;
			},
			set: function (newVal) {
				this.scenarioNameValue = newVal;
				this.forceRecomputeCounter++;
			}
		},
		scenariosNotPlayedFilter: {
			get: function () {
				return this.scenariosNotPlayed;
			},
			set: function (newVal) {
				if (newVal) {
					if (
						(this.sortBy === SharedConstants.SortBy.Scenarios.CharacterName) ||
						(this.sortBy === SharedConstants.SortBy.Scenarios.DatePlayed)
					)
						this.sortBy = SharedConstants.SortBy.Scenarios.Season;
				}
				this.scenariosNotPlayed = newVal;
				this.forceRecomputeCounter++;
			}
		},
		scenarioNumberFilter: {
			get: function () {
				return this.scenarioNumberValue;
			},
			set: function (newVal) {
				this.scenarioNumberValue = newVal;
				this.forceRecomputeCounter++;
			}
		},
		sortBy: {
			get: function () {
				if (this.isExternalList)
					return this.sortByOverride;

				const result = AppUtility.settings().getSettingsUserScenarios(this.correlationId(), this.user, (settings) => settings.sortBy);
				return result ? result : SharedConstants.SortBy.Scenarios.ScenarioName;
			},
			set: function (newVal) {
				if (this.isExternalList) {
					this.sortByOverride = newVal;
					this.forceRecomputeCounter++;
					return;
				}

				AppUtility.settings().updateSettingsUserScenarios(this.correlationId(), this.$store, this.user, newVal, (settings) => { settings.sortBy = newVal; });
			}
		},
		sortDirection: {
			get: function () {
				if (this.isExternalList)
					return this.sortDirectionOverride;

				return AppUtility.settings().getSettingsUserScenarios(this.correlationId(), this.user, (settings) => settings.sortDirection);
			},
			set: function (newVal) {
				if (this.isExternalList) {
					this.sortDirectionOverride = newVal;
					this.forceRecomputeCounter++;
					return;
				}

				AppUtility.settings().updateSettingsUserScenarios(this.correlationId(), this.$store, this.user, newVal, (settings) => { settings.sortDirection = newVal; });
			}
		},
		scenarioSeasons: {
			get: function () {
				const scenarios = this.scenariosCache[this.gameSystemFilter];
				if (!scenarios)
					return [];

				let output = scenarios.filter(l => l.season != null).flatMap(l => l.season).filter(l => l !== null && l !== '');
				output = [...new Set(output)];
				return VueUtility.selectBlank(output, this.$trans.t('forms.scenarios.season'));
			},
			cache: false
		},
		scenariosNotPlayedList() {
			return VueUtility.selectBlank([ { id: true, name: this.$trans.t('strings.no') }, { id: false, name: this.$trans.t('strings.yes') } ], this.$trans.t('forms.scenarios.namePlural') + ' ' + this.$trans.t('forms.scenarios.played'));
		},
		userIdFilter: {
			get: function () {
				return this.userIdFilterValue;
			},
			set: function (newVal) {
				this.userIdFilterValue = newVal;
				this.forceRecomputeCounter++;
			}
		},
		userList() {
			return VueUtility.selectBlank(this.users, this.$trans.t('players.name'));
		}
	},
	created() {
		this.sortKeys = [
			{ id: SharedConstants.SortBy.Scenarios.CharacterName, name: this.$trans.t('forms.characters.name') + ' ' + this.$trans.t('forms.name') },
			{ id: SharedConstants.SortBy.Scenarios.DatePlayed, name: this.$trans.t('forms.scenarios.datePlayed') },
			{ id: SharedConstants.SortBy.Scenarios.ScenarioName, name: this.$trans.t('forms.scenarios.name') + ' ' + this.$trans.t('forms.name') },
			{ id: SharedConstants.SortBy.Scenarios.ScenarioNumber, name: this.$trans.t('forms.scenarios.name') + ' ' + this.$trans.t('forms.number') },
			{ id: SharedConstants.SortBy.Scenarios.Season, name: this.$trans.t('forms.season') }
		];
		this.sortByOverride = SharedConstants.SortBy.Scenarios.ScenarioName;
		this.scenariosCache = {};
	},
	mounted() {
		this.scenariosCache = {};
	},
	methods: {
		clickClear() {
			if (this.isExternalList) {
				this.scenarioNameValue = null;
				this.scenarioNumberValue = null;
				this.seasonFilterOverride = null;
				this.sortByOverride = SharedConstants.SortBy.Scenarios.ScenarioName;
				this.sortDirectionOverride = true;
				this.clickClearGameSystemExternal();

				this.forceRecomputeCounter = 0;
				return;
			}

			AppUtility.settings().clearUser(this.$store, this.user, (settings) => {
				this.scenarioNameValue = null;
				this.scenarioNumberValue = null;
				settings.scenarios.seasonFilter = null;
				settings.scenarios.sortBy = SharedConstants.SortBy.Scenarios.ScenarioName;
				settings.scenarios.sortDirection = true;
				this.clickClearGameSystem();
			});
		},
		clickClearGameSystem() {
			// GameSystems Update
			if (this.isGameSystemPathfinder2e && this.$refs.scenarioListFilterPathfinder2e)
				this.$refs.scenarioListFilterPathfinder2e.clear(this.gameSystemFilter);
			if (this.isGameSystemStarfinder1e && this.$refs.scenarioListFilterStarfinder1e)
				this.$refs.scenarioListFilterStarfinder1e.clear(this.gameSystemFilter);
		},
		clickClearGameSystemExternal() {
			// GameSystems Update
			if (this.isGameSystemPathfinder2e && this.$refs.scenarioListFilterPathfinder2e)
				this.$refs.scenarioListFilterPathfinder2e.clear(this.gameSystemFilter);
			if (this.isGameSystemStarfinder1e && this.$refs.scenarioListFilterStarfinder1e)
				this.$refs.scenarioListFilterStarfinder1e.clear(this.gameSystemFilter);
		},
		dialogShareOpen() {
			this.$refs.shareDialog.openDialog(this.gameSystemFilter);
			this.dialogShare.open();
		},
		async execute() {
			this.users = [];

			if (!this.gameSystemFilter)
				return [];

			if (!this.characterList)
				return [];

			const correlationId = this.correlationId();

			this.forceRecomputeCounter;

			let characters = this.characterList.slice(0);
			characters = characters.filter(l => l.gameSystemId === this.gameSystemFilter);

			if (!characters || characters.length <= 0)
				return [];

			const scenarios = await this.executeScenariosCache(correlationId, this);
			if (!scenarios || scenarios.length === 0)
				return [];

			let results = [];

			let name;
			let user;
			for (const character of characters) {
				user = character.user ? character.user : this.user;
				if (this.users.find(l => l.id === user.id))
					continue;

				name = user.settings && user.settings.gamerTag ? user.settings.gamerTag : null;
				if (!name)
					continue;

				this.users.push({ id: user.id, name: name });
			}

			let found;
			let scenarioT;

			if (this.scenariosNotPlayed) {
				let scenarioIds = [];
				for (const character of characters) {
					for (const scenario of character.scenarios) {
						if (!scenarioIds.find(l => l === scenario.scenarioId))
							scenarioIds.push(scenario.scenarioId);
					}
				}

				for (const scenario of scenarios) {
					if (scenarioIds.find(l => l === scenario.id))
						continue;

					found = this.filter(scenario);
					if (!found)
						continue;

					scenarioT = this.clone(scenario);
					scenarioT.scenario = scenario;
					scenarioT.user = this.user;
					results.push(scenarioT);
				}
			}
			else {
				// spin through the characters and gather up all the scenarios...
				for (const character of characters) {
					if (!character.scenarios)
						continue;

					if (this.isExternalListFavorites) {
						if (this.userIdFilterValue) {
							if (character.userId !== this.userIdFilterValue)
								continue;
						}
					}

					for (const scenario of character.scenarios) {
						found = scenarios.find(l => l.id === scenario.scenarioId);
						if (!found)
							continue;

						if (found.type === SharedConstants.ScenarioTypes.INITIAL)
							continue;
							
						found = this.filter(found);

						if (!found)
							continue;

						scenarioT = this.clone(scenario);
						scenarioT.character = character;
						scenarioT.scenario = found;
						scenarioT.user = character.user ? character.user : this.user;
						results.push(scenarioT);
					}
				}
			}

			if (!results || results.length <= 0)
				return [];
				
			// TODO: Offer different sorts
			// TODO: need to incorporation direction...
			if (this.sortBy === SharedConstants.SortBy.Scenarios.ScenarioName)
				results = this.sortByScenarioName(results, this.sortDirection);
			else if (this.sortBy === SharedConstants.SortBy.Scenarios.ScenarioNumber)
				results = this.sortByScenarioNumber(results, this.sortDirection);
			else if (this.sortBy === SharedConstants.SortBy.Scenarios.Season)
				results = this.sortBySeason(results, this.sortDirection);

			if (!this.scenariosNotPlayed) {
				// TODO: need to incorporation direction...
				if (this.sortBy === SharedConstants.SortBy.Scenarios.CharacterName)
					results = this.sortByCharacterName(results, this.sortDirection);
				else if (this.sortBy === SharedConstants.SortBy.Scenarios.DatePlayed)
					results = this.sortByDatePlayed(results, this.sortDirection);
			}

			return results;
		},
		filter(temp) {
			if (this.scenarioNameValue) {
				if (this.executeFilterOverride(this)) {
					if (this.executeScenarioNameFilter(this, temp, this.scenarioNameValue))
					return null;
				}
				else if (temp.name && (temp.name.toLowerCase().indexOf(this.scenarioNameValue.toLowerCase()) == -1))
					return null;
			}

			if (this.scenarioNumberValue) {
				if (!temp.scenario || (temp.scenario.indexOf(this.scenarioNumberFilter) == -1))
					return null;
			}

			if (this.seasonFilter) {
				if (temp.season !== this.seasonFilter)
					return null;
			}

			if (this.executeFilterOverride(this)) {
				if (!this.executeAdditionalFilter(this, temp))
				return null;
			}

			return temp;
		},
		executeAdditionalFilter(self, temp) {
			// GameSystems Update
			if (this.isGameSystemPathfinder2e && this.$refs.scenarioListFilterPathfinder2e)
				return self.$refs.scenarioListFilterPathfinder2e.filterAdditional(temp);
			if (this.isGameSystemStarfinder1e && this.$refs.scenarioListFilterStarfinder1e)
				return self.$refs.scenarioListFilterStarfinder1e.filterAdditional(temp);
			return true;
		},
		executeFilterOverride(self) {
			// GameSystems Update
			if (this.isGameSystemPathfinder2e && this.$refs.scenarioListFilterPathfinder2e)
				return self.isGameSystemPathfinder2e && self.$refs.scenarioListFilterPathfinder2e;
			if (this.isGameSystemStarfinder1e && this.$refs.scenarioListFilterStarfinder1e)
				return self.isGameSystemPathfinder2e && self.$refs.scenarioListFilterStarfinder1e;
			return false;
		},
		executeScenarioNameFilter(self, temp, value) {
			// GameSystems Update
			if (this.isGameSystemPathfinder2e && this.$refs.scenarioListFilterPathfinder2e)
				return self.$refs.scenarioListFilterPathfinder2e.filterScenarioName(temp, value);
			if (this.isGameSystemStarfinder1e && this.$refs.scenarioListFilterStarfinder1e)
				return self.$refs.scenarioListFilterStarfinder1e.filterScenarioName(temp, value);
		},
		// eslint-disable-next-line
		async executeScenariosCache(correlationId) {
			const self = this;
			// eslint-disable-next-line
			return new Promise(async (resolve, reject) => {
				try {
					let scenarios = self.scenariosCache[self.gameSystemFilter];
					if (!scenarios) {
						await self.$store.dispatcher.scenarios.getScenarioListing(correlationId, self.gameSystemFilter);
						scenarios = self.$store.state.scenarios.listing;
						if (scenarios) {
							scenarios = scenarios.filter(l => l.gameSystemId == self.gameSystemFilter);
							self.scenariosCache[self.gameSystemFilter] = scenarios;
						}
					}
					scenarios = scenarios ? scenarios : [];
					resolve(scenarios);
				}
				catch (err) {
					reject();
				}
			});
		},
		scenarioName(scenario) {
			if (!scenario || !scenario.scenario)
				return '';
			return scenario.scenario.name;
		},
		sortByCharacterName(values, ascending) {
			if (!values || !Array.isArray(values))
				return values;

			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.character.name : null; }))
					.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);

			return values.sort(
				firstBy((a, b) => LibraryUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.character.name : null; }))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		},
		sortByDatePlayed(values, ascending) {
			if (!values || !Array.isArray(values))
				return values;

			if (ascending)
				return values.sort((a, b) => LibraryUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }));

			return values.sort((a, b) => LibraryUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }));
		},
		sortByScenarioName(values, ascending) {
			if (!values || !Array.isArray(values))
				return values;

			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.scenario.name : null; }))
					.thenBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => {
						return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647;
					}))
					.thenBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => {
						return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647;
					}))
					.thenBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);

			return values.sort(
				firstBy((a, b) => LibraryUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.scenario.name : null; }))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => {
					return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647;
				}))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => {
					return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647;
				}))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		},
		sortByScenarioNumber(values, ascending) {
			if (!values || !Array.isArray(values))
				return values;

			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => {
						return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : -2147483647;
					}))
					.thenBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => {
						return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : -2147483647;
					}))
					.thenBy((a, b) => LibraryUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.scenario.name : null; }))
					.thenBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);

			return values.sort(
				firstBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => {
					return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647;
				}))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => {
					return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647;
				}))
				.thenBy((a, b) => LibraryUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.scenario.name : null; }))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		},
		sortBySeason(values, ascending) {
			if (!values || !Array.isArray(values))
				return values;

			if (ascending)
				return values.sort(
					firstBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => {
						return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647;
					}))
					.thenBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => {
						return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : -2147483647;
					}))
					.thenBy((a, b) => LibraryUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.scenario.name : null; }))
					.thenBy((a, b) => LibraryUtility.sortByNumber(a, b, (v) => { return v && v.scenario ? v.timestamp : null; }))
				);

			return values.sort(
				firstBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => {
					return v && v.scenario && v.scenario.season ? parseInt(v.scenario.season, 10) : 2147483647;
				}))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => {
					return v && v.scenario && v.scenario.scenario ? parseInt(v.scenario.scenario, 10) : 2147483647;
				}))
				.thenBy((a, b) => LibraryUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.scenario.name : null; }))
				.thenBy((a, b) => LibraryUtility.sortByNumber(b, a, (v) => { return v && v.scenario ? v.timestamp : null; }))
			);
		}
	}
};
</script>

<style scoped>
</style>
