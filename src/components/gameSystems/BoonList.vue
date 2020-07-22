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
								ref="scenarioNameFilter"
								v-model="scenarioNameFilter"
								:flat="true"
								:hide-details="true"
								:solo-inverted="true"
								:label="$t('forms.scenarios.name') + ' ' + $t('forms.name')"
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
										<!-- // GameSystems Update -->
										<ScenarioListFilterPathfinder2e
											v-show="isGameSystemPathfinder2e"
											ref="scenarioListFilterPathfinder2e"
											v-model="forceRecomputeCounter"
											:external-list="false"
										/>
										<ScenarioListFilterStarfinder1e
											v-show="isGameSystemStarfinder1e"
											ref="scenarioListFilterStarfinder1e"
											v-model="forceRecomputeCounter"
											:external-list="false"
										/>
									</td>
								</tr>
								<tr>
									<td>
										<VText2
											ref="boonNameFilter"
											v-model="boonNameFilter"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.boons.name') + ' ' + $t('forms.name')"
											class="pb-1"
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
										<!-- // GameSystems Update -->
										<ScenarioListFilterPathfinder2e
											v-show="isGameSystemPathfinder2e"
											ref="scenarioListFilterPathfinder2e"
											v-model="forceRecomputeCounter"
											:external-list="false"
										/>
										<ScenarioListFilterStarfinder1e
											v-show="isGameSystemStarfinder1e"
											ref="scenarioListFilterStarfinder1e"
											v-model="forceRecomputeCounter"
											:external-list="false"
										/>
									</td>
								</tr>
								<tr>
									<td>
										<VText2
											ref="boonNameFilter"
											v-model="boonNameFilter"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.boons.name') + ' ' + $t('forms.name')"
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
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			v-for="item in boons"
			:key="item.id"
			sm12
			lg6
			xl4
			pb-1
			pt-1
			pl-1
			pr-1
		>
			<BoonSnippet
				:value="item"
				:user="item.user"
			/>
		</v-flex>
	</v-layout>
</template>

<script>
import SharedConstants from '@/common/constants';

import Utility from '@thzero/library/utility';
import AppUtility from '@/utility/app';
import VueUtility from '@/library_vue/utility';

import baseList from '@/components/gameSystems/baseList';
import VDirectionButton from '@/library_vue/components/VDirectionButton';
import VSelect2 from '@/library_vue/components/form/VSelect';
import VText2 from '@/library_vue/components/form/VTextField';

import BoonSnippet from '@/components/gameSystems/BoonSnippet';

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
		VDirectionButton,
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
		boonNameValue: null,
		boonsCache: {},
		forceRecomputeCounter: 0,
		scenarioNameValue: null,
		scenariosCache: {},
		sortByOverride: null,
		sortDirectionOverride: true,
		userIdFilterValue: null,
		users: [],
		executing: false
	}),
	asyncComputed: {
		async boons() {
			return await this.execute();
		}
	},
	computed: {
		boonNameFilter: {
			get: function () {
				return this.boonNameValue;
			},
			set: function (newVal) {
				this.boonNameValue = newVal;
				this.forceRecomputeCounter++;
			}
		},
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
		scenarioNameFilter: {
			get: function () {
				return this.scenarioNameValue;
			},
			set: function (newVal) {
				this.scenarioNameValue = newVal;
				this.forceRecomputeCounter++;
			}
		},
		seasonFilter: {
			get: function () {
				return AppUtility.settings().getSettingsUserBoons(this.user, (settings) => settings.seasonFilter);
			},
			set: function (newVal) {
				AppUtility.settings().updateSettingsUserBoons(this.$store, this.user, newVal, (settings) => { settings.seasonFilter = newVal; });
			}
		},
		sortBy: {
			get: function () {
				const result = AppUtility.settings().getSettingsUserBoons(this.user, (settings) => settings.sortBy);
				return result ? result : SharedConstants.SortBy.Boons.BoonName;
			},
			set: function (newVal) {
				AppUtility.settings().updateSettingsUserBoons(this.$store, this.user, newVal, (settings) => { settings.sortBy = newVal; });
			}
		},
		sortDirection: {
			get: function () {
				return AppUtility.settings().getSettingsUserBoons(this.user, (settings) => settings.sortDirection);
			},
			set: function (newVal) {
				AppUtility.settings().updateSettingsUserBoons(this.$store, this.user, newVal, (settings) => { settings.sortDirection = newVal; });
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
			{ id: SharedConstants.SortBy.Boons.BoonName, name: this.$trans.t('forms.boons.name') + ' ' + this.$trans.t('forms.name') }
		];
		this.sortByOverride = SharedConstants.SortBy.Boons.BoonName;
		this.scenariosCache = {};
	},
	mounted() {
		this.scenariosCache = {};
	},
	methods: {
		clickClear() {
			AppUtility.settings().clearUser(this.$store, this.user, (settings) => {
				this.boonNameValue = null;
				this.scenarioNameValue = null;
				settings.scenarios.seasonFilter = null;
				settings.scenarios.sortBy = SharedConstants.SortBy.Boons.BoonName;
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
		async execute() {
			this.users = [];

			if (!this.gameSystemFilter)
				return [];

			if (!this.characterList)
				return [];

			this.forceRecomputeCounter;

			let characters = this.characterList.slice(0);
			characters = characters.filter(l => l.gameSystemId === this.gameSystemFilter);

			if (!characters || characters.length <= 0)
				return [];

			const boons = await this.executeBoonsCache(this);
			if (!boons || boons.length === 0)
				return [];

			let scenarios = await this.executeScenariosCache(this);
			if (!scenarios || scenarios.length === 0)
				scenarios = [];

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

			let temp;
			let boonTemp;
			let characterT;
			// spin through the characters and gather up all the scenarios...
			for (const character of characters) {
				if (!character.boons && !character.scenarios)
					continue;

				characterT = this.clone(character);

				for (let scenario of characterT.scenarios) {
					temp = scenarios.find(l => l.id == scenario.scenarioId);
					if (!temp)
						continue;

					if (temp.type == SharedConstants.ScenarioTypes.INITIAL)
						continue;

					scenario = this.clone(scenario);

					if (this.seasonFilter) {
						if (temp.season !== this.seasonFilter)
							continue;
					}

					if (this.scenarioNameValue) {
						if (this.executeFilterOverride(this)) {
							if (this.executeScenarioNameFilter(this, temp, this.scenarioNameValue))
								continue;
						}
						else if (temp.name && (temp.name.toLowerCase().indexOf(this.scenarioNameValue.toLowerCase()) == -1))
							continue;
					}

					if (this.executeFilterOverride(this)) {
						if (!this.executeAdditionalFilter(this, temp))
							continue;
					}

					if (scenario.boon1Id) {
						boonTemp = { boonId: scenario.boon1Id };
						this.executeScenarioBoon(scenarios, boons, boonTemp, characterT, results, scenario);
					}
					if (scenario.boon2Id) {
						boonTemp = { boonId: scenario.boon2Id };
						this.executeScenarioBoon(scenarios, boons, boonTemp, characterT, results, scenario);
					}
				}

				for (const boon of characterT.boons) {
					if (this.seasonFilter || this.scenarioNameValue)
						continue;

					temp = boons.find(l => l.id == boon.boonId);
					if (!temp)
						continue;

					if (this.executeFilterOverride(this)) {
						if (!this.executeAdditionalFilter(this, temp))
							continue;
					}

					if (this.boonNameValue) {
						if (this.executeFilterOverride(this)) {
							if (!this.executeBoonNameFilter(this, temp, this.boonNameValue))
								continue;
						}
						else if (temp.name && (temp.name.toLowerCase().indexOf(this.boonNameValue.toLowerCase()) == -1))
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
					boonTemp.user = characterT.user ? characterT.user : this.user;
					boonTemp.gameSystemId = this.gameSystemFilter;

					results.push(boonTemp);
				}

				delete characterT.boons;
			}

			if (!results || results.length <= 0)
				return [];

			// TODO: Offer different sorts
			if (this.sortBy === SharedConstants.SortBy.Boons.BoonName)
				results = this.sortByBoonName(results, this.sortDirection);

			return results;
		},
		executeScenarioBoon(scenarios, boons, boon, character, results, scenario) {
			const temp = boons.find(l => l.id == boon.boonId);
			if (!temp)
				return;

			if (this.boonNameValue) {
				if (this.executeFilterOverride(this)) {
					if (!this.executeBoonNameFilter(this, temp, this.boonNameValue))
						return;
				}
				else if (temp.name && (temp.name.toLowerCase().indexOf(this.boonNameValue.toLowerCase()) == -1))
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

			const boonTemp = this.clone(boon);
			boonTemp.characters = boonTemp.characters ? boonTemp.characters : [];
			if (character)
				boonTemp.characters.push(character);
			boonTemp.boon = temp;
			boonTemp.scenario = scenarioT;
			boonTemp.gameSystemId = this.gameSystemFilter;
			boonTemp.user = character.user ? character.user : this.user;
			boonTemp.scenarios = boonTemp.scenarios ? boonTemp.scenarios : [];
			if (scenario) {
				scenario.character = character;
				boonTemp.scenarios.push(scenario);
			}
			results.push(boonTemp);
		},
		executeAdditionalFilter(self, temp) {
			// GameSystems Update
			if (this.isGameSystemPathfinder2e && this.$refs.scenarioListFilterPathfinder2e)
				return self.$refs.scenarioListFilterPathfinder2e.filterAdditional(temp);
			if (this.isGameSystemStarfinder1e && this.$refs.scenarioListFilterStarfinder1e)
				return self.$refs.scenarioListFilterStarfinder1e.filterAdditional(temp);
			return true;
		},
		// eslint-disable-next-line
		async executeBoonsCache() {
			const self = this;
			// eslint-disable-next-line
			return new Promise(async (resolve, reject) => {
				try {
					let boons = self.boonsCache[self.gameSystemFilter];
					if (!boons) {
						await self.$store.dispatcher.boons.getBoonListing(self.gameSystemFilter);
						boons = self.$store.state.boons.listing;
						if (boons) {
							boons = boons.filter(l => l.gameSystemId == self.gameSystemFilter);
							self.boonsCache[self.gameSystemFilter] = boons;
						}
					}
					boons = boons ? boons : [];
					resolve(boons);
				}
				catch (err) {
					reject();
				}
			});
		},
		executeBoonNameFilter(self, temp, value) {
			return temp ? temp.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 : false;
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
		async executeScenariosCache() {
			const self = this;
			// eslint-disable-next-line
			return new Promise(async (resolve, reject) => {
				try {
					let scenarios = self.scenariosCache[self.gameSystemFilter];
					if (!scenarios) {
						await self.$store.dispatcher.scenarios.getScenarioListing(self.gameSystemFilter);
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
		sortByBoonName(values, ascending) {
			if (!values || !Array.isArray(values))
				return values;

			if (ascending)
				return values.sort((a, b) => Utility.sortByString(a, b, (v) => { return v && v.boon ? v.boon.name : null; }));

			return values.sort((a, b) => Utility.sortByString(b, a, (v) => { return v && v.boon ? v.boon.name : null; }));
		}
	}
};
</script>

<style scoped>
</style>
