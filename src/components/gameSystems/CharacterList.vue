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
								vid="gameSystems"
								:items="gameSystems"
								:flat="true"
								:hide-details="true"
								:solo-inverted="true"
								:label="$t('forms.gameSystem')"
								class="pb-1"
							/>
							<VText2
								ref="characterNameFilter"
								v-model="characterNameFilter"
								:flat="true"
								:hide-details="true"
								:solo-inverted="true"
								:label="$t('forms.characters.name') + ' ' + $t('forms.name')"
								class="pb-1"
							/>
						</v-flex>
						<v-flex
							xs12
							lg6
							mb-1
						>
							<table
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
							>
								<tr>
									<td>
										<VNumberField
											ref="characterLevelMinFilter"
											v-model="characterLevelMinFilter"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.characters.name') + ' ' + $t('forms.level') + ' ' + $t('forms.minAbbr')"
											class="pb-1 pr-2"
										/>
									</td>
									<td>
										<VNumberField
											ref="characterLevelMaxFilter"
											v-model="characterLevelMaxFilter"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.characters.name') + ' ' + $t('forms.level') + ' ' + $t('forms.maxAbbr')"
											class="pb-1"
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
										style="padding-right: 4px"
									>
										<VSelect2
											ref="sortBy"
											v-model="sortBy"
											vid="sortBy"
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
											style="min-width: 0px"
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
			v-for="item in characters"
			:key="item.id"
			sm12
			lg6
			xl4
			pb-1
			pt-1
			pl-1
			pr-1
		>
			<v-card
				outlined
				min-width="300px"
				height="100%"
			>
				<v-card-title
					@click="clickCharacter(item.id)"
				>
					<span
						class="title text-capitalize displayLink"
					>
						<CharacterNameSnippet
							:value="item"
							:has-secondary="false"
							font-name="title"
						/>
					</span>
					<v-spacer />
					<span
						class="title text-capitalize displayLink"
					>
						<CharacterNameSnippet
							:value="item"
							:has-name="false"
							:include-character-number="false"
							font-name=""
							prefix=""
							suffix=""
						/>
					</span>
				</v-card-title>
				<v-card-text class="body-1">
					<CharacterSnippet
						:value="item"
					/>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import SharedConstants from '@/common/constants';

import Utility from '@thzero/library/utility';
import AppUtility from '@/utility/app';

import baseList from '@/components/gameSystems/baseList';
import VDirectionButton from '@/library_vue/components/VDirectionButton';
import VNumberField from '@/library_vue/components/form/VNumberField';
import VSelect2 from '@/library_vue/components/form/VSelect';
import VText2 from '@/library_vue/components/form/VTextField';

import CharacterNameSnippet from '@/components/gameSystems/CharacterNameSnippet';
import CharacterSnippet from '@/components/gameSystems/CharacterSnippet';

export default {
	name: 'CharacterList',
	components: {
		CharacterNameSnippet,
		CharacterSnippet,
		VDirectionButton,
		VNumberField,
		VSelect2,
		VText2
	},
	extends: baseList,
	data: () => ({
		classCache: {},
		characterNameValue: null,
		characterLevelMaxFilter: null,
		characterLevelMinFilter: null,
		factionsCache: {},
		forceRecomputeCounter: 0
	}),
	asyncComputed: {
		async characters() {
			if (!this.gameSystemFilter)
				return [];

			this.forceRecomputeCounter;

			let results = this.$store.state.characters.characters.slice(0);
			results = results.filter(l => l.gameSystemId === this.gameSystemFilter);

			if (this.characterLevelMaxFilter && this.characterLevelMinFilter)
				results = results.filter(l => ((this.characterLevel(l.level) >= Number(this.characterLevelMinFilter)) && (this.characterLevel(l.level) <= Number(this.characterLevelMaxFilter))));
			else if (this.characterLevelMaxFilter && !this.characterLevelMinFilter)
				results = results.filter(l => (this.characterLevel(l.level) <= Number(this.characterLevelMaxFilter)));
			else if (!this.characterLevelMaxFilter && this.characterLevelMinFilter)
				results = results.filter(l => (this.characterLevel(l.level) >= Number(this.characterLevelMinFilter)));

			if (this.characterNameValue)
				results = results.filter(l => l.name.toLowerCase().indexOf(this.characterNameValue.toLowerCase()) > -1);

			let classes = this.classCache[this.gameSystemFilter];
			if (!classes) {
				await this.$store.dispatcher.classes.getClassListing(this.gameSystemFilter);
				// await this.initialize(this.gameSystemFilter)
				classes = this.$store.state.classes.listing;
				if (classes) {
					classes = classes.filter(l => l.gameSystemId == this.gameSystemFilter);
					this.classCache[this.gameSystemFilter] = classes;
				}
			}
			classes = classes ? classes : [];

			let factions = this.factionsCache[this.gameSystemFilter];
			if (!factions) {
				await this.$store.dispatcher.factions.getFactionListing(this.gameSystemFilter);
				// await this.initialize(this.gameSystemFilter)
				factions = this.$store.state.factions.listing;
				if (factions) {
					factions = factions.filter(l => l.gameSystemId == this.gameSystemFilter);
					this.factionsCache[this.gameSystemFilter] = factions;
				}
			}
			factions = factions ? factions : [];

			let temp = null;
			for (const character of results) {
				temp = factions.find(l => l.id == character.factionId);
				if (!temp)
					continue;

				character.factionName = temp.name;
				character.factionDescription = temp.description;
			}

			// TODO: Offer different sorts
			// TODO: need to incorporation direction...
			if (this.sortBy === SharedConstants.SortBy.Characters.CharacterName)
				results = Utility.sortByName(results, this.sortDirection);
			else if (this.sortBy === SharedConstants.SortBy.Characters.Level)
				// results.sort((a, b) => Utility.sortByNumber(a, b, (obj) => {
				// 	return (obj ? ( obj.level ? obj.level : 0): 0);
				// }));
				results = Utility.sortByNumberEx(results, (obj) => {
						return (obj ? ( obj.level ? obj.level : 0): 0);
					},
					this.sortDirection);

			return results;
		},
	},
	computed: {
		characterNameFilter: {
			get: function () {
				return this.characterNameValue;
			},
			set: function (newVal) {
				this.characterNameValue = newVal;
				this.forceRecomputeCounter++;
			}
		},
		sortBy: {
			get: function () {
				const result = this.getSettingsUser(this.$store.state.user.user, (settings) => settings.sortBy);
				return result ? result : SharedConstants.SortBy.Characters.CharacterName;
			},
			set: function (newVal) {
				this.updateSettingsUserCharacter(this.$store.state.user.user, newVal, (settings) => { settings.sortBy = newVal; });
			}
		},
		sortDirection: {
			get: function () {
				return this.getSettingsUser(this.$store.state.user.user, (settings) => settings.sortDirection);
			},
			set: function (newVal) {
				this.updateSettingsUserCharacter(this.$store.state.user.user, newVal, (settings) => { settings.sortDirection = newVal; });
			}
		}
	},
	created() {
		this.sortKeys = [
			{ id: SharedConstants.SortBy.Characters.CharacterName, name: this.$trans.t('forms.characters.name') + ' ' + this.$trans.t('forms.name') },
			{ id: SharedConstants.SortBy.Characters.Level, name: this.$trans.t('forms.characters.name') + ' ' + this.$trans.t('forms.level') }
			// { id: 'faction', name: this.$trans.t('forms.factions.name') },
		];
	},
	methods: {
		characterLevel(level) {
			return level ? level : 0;
		},
		clickCharacter(id) {
			this.$navRouter.push(Utility.formatUrl({ url: '/character', params: [ id ]}));
		},
		clickClear() {
			AppUtility.settings().clearSettingsUser(this.$store, this.$store.state.user.user, (settings) => {
				this.characterNameValue = null;
				this.characterLevelMaxFilter = null;
				this.characterLevelMinFilter = null;
				settings.characters.sortBy = SharedConstants.SortBy.Characters.CharacterName;
				settings.characters.sortDirection = true;
			});
		},
		getSettingsUser(user, funcAttribute) {
			if (!user || !user.settings)
				return null;
			const characters = user.settings.characters ? user.settings.characters : {};
			return funcAttribute(characters);
		},
		updateSettingsUserCharacter(user, newVal, func) {
			const settings = AppUtility.settings().mergeUser(user.settings);
			func(settings.characters, newVal);
			this.$store.dispatcher.user.setUserSettings(settings);
		}
	}
};
</script>

<style scoped>
</style>
