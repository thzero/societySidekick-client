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
							<table
								border="0"
								cellspacing="0"
								cellpadding="0"
								style="width: 100%;"
							>
								<tr>
									<td
										style="width: 100%;"
									>
										<VSelect2
											v-if="!isExternalListCharacters"
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
											v-if="isExternalListCharacters"
											ref="gameSystem"
											v-model="gameSystemName"
											:flat="true"
											:hide-details="true"
											:solo-inverted="true"
											:label="$t('forms.gameSystem')"
											:readonly="true"
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
													<VNumberField
														ref="characterLevelMinFilter"
														v-model="characterLevelMinFilter"
														:flat="true"
														:hide-details="true"
														:solo-inverted="true"
														:label="$t('forms.characters.name') + ' ' + $t('forms.level') + ' ' + $t('forms.minAbbr')"
														class="pb-1"
													/>
												</td>
											</tr>
											<tr>
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
									</td>
									<td
										style="vertical-align: top;"
										v-if="$vuetify.breakpoint.mdAndDown"
									>
										<table
											border="0"
											cellspacing="0"
											cellpadding="0"
											class="mb-1 ml-2"
											style="margin-left: auto; margin-right: 0px;"
										>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
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
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<VGameSystemListingSyleButton 
														v-model="listingStyle"
													/>
												</td>
											</tr>
											<tr
												v-if="gameSystemFilter"
											>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-btn
														depressed
														large
														style="min-width: 0px;"
														@click="clickClear()"
													>
														<v-icon>mdi-filter-variant-remove</v-icon>
													</v-btn>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs12
							lg6
							mb-1
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
									<td
										style="width: 100%; vertical-align: top;"
									>
										<table
											border="0"
											cellspacing="0"
											cellpadding="0"
											class="mb-1"
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
											</tr>
										</table>
									</td>
									<td
										style="vertical-align: top;"
									>
										<table
											border="0"
											cellspacing="0"
											cellpadding="0"
											class="mb-1 ml-2"
											style="margin-left: auto; margin-right: 0px;"
										>
											<tr>
												<td></td>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<VGameSystemListingSyleButton 
														v-model="listingStyle"
													/>
												</td>
											</tr>
											<tr>
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
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
												<td
													style="padding-right: 4px;"
													align="right"
													class="pb-1"
												>
													<v-btn
														depressed
														large
														style="min-width: 0px;"
														@click="clickClear()"
													>
														<v-icon>mdi-filter-variant-remove</v-icon>
													</v-btn>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</v-flex>
						<ShareDialog
							ref="shareDialog"
							:label="$t('characters.share') + ' ' +$t('characters.namePlural')"
							:signal="dialogShare.signal"
							url="characters"
							@cancel="dialogShare.cancel()"
							@ok="dialogShare.ok()"
						/>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex
			v-for="item in characters"
			:key="item.id"
			sm12
			:lg6="isGrid"
			:lg12="isList"
			:xl4="isGrid"
			:xl12="isList"
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
						:external-list-type="externalListType"
					/>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import baseList from '@/components/gameSystems/baseList';
import VDirectionButton from '@/library_vue_vuetify/components/VDirectionButton';
import VGameSystemListingSyleButton from '@/components/gameSystems/VGameSystemListingSyleButton';
import VNumberField from '@/library_vue_vuetify/components/form/VNumberField';
import VSelect2 from '@/library_vue_vuetify/components/form/VSelect';
import VText2 from '@/library_vue_vuetify/components/form/VTextField';

import CharacterNameSnippet from '@/components/gameSystems/CharacterNameSnippet';
import CharacterSnippet from '@/components/gameSystems/CharacterSnippet';

export default {
	name: 'CharacterList',
	components: {
		CharacterNameSnippet,
		CharacterSnippet,
		VDirectionButton,
		VGameSystemListingSyleButton,
		VNumberField,
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
		classCache: {},
		characterNameValue: null,
		characterLevelMaxFilter: null,
		characterLevelMinFilter: null,
		factionsCache: {},
		forceRecomputeCounter: 0,
		listingStyleOverride: SharedConstants.ListingTypes.Grid,
		sortByOverride: null,
		sortDirectionOverride: true,
		userIdFilterValue: null
	}),
	asyncComputed: {
		async characters() {
			if (!this.gameSystemFilter)
				return [];

			this.forceRecomputeCounter;

			const correlationId = this.correlationId();

			let results = this.value ? this.value : GlobalUtility.$store.state.characters.characters.slice(0);
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
				await GlobalUtility.$store.dispatcher.classes.getClassListing(correlationId, this.gameSystemFilter);
				// await this.initialize(correlationId, this.gameSystemFilter)
				classes = GlobalUtility.$store.state.classes.listing;
				if (classes) {
					classes = classes.filter(l => l.gameSystemId == this.gameSystemFilter);
					this.classCache[this.gameSystemFilter] = classes;
				}
			}
			classes = classes ? classes : [];

			let factions = this.factionsCache[this.gameSystemFilter];
			if (!factions) {
				await GlobalUtility.$store.dispatcher.factions.getFactionListing(correlationId, this.gameSystemFilter);
				// await this.initialize(correlationId, this.gameSystemFilter)
				factions = GlobalUtility.$store.state.factions.listing;
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
				results = LibraryUtility.sortByName(results, this.sortDirection);
			else if (this.sortBy === SharedConstants.SortBy.Characters.Level)
				// results.sort((a, b) => LibraryUtility.sortByNumber(a, b, (obj) => {
				// 	return (obj ? ( obj.level ? obj.level : 0): 0);
				// }));
				results = LibraryUtility.sortByNumberEx(results, (obj) => {
						return (obj ? ( obj.level ? obj.level : 0): 0);
					},
					this.sortDirection);

			return results;
		}
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
		isGrid() {
			return this.listingStyle === SharedConstants.ListingTypes.Grid;
		},
		isList() {
			return this.listingStyle === SharedConstants.ListingTypes.List;
		},
		listingStyle: {
			get: function () {
				if (!this.user)
					return this.listingStyleOverride;
				if (this.isExternalList)
					return this.listingStyleOverride;

				let value = this.getSettingsUser(this.correlationId(), GlobalUtility.$store.state.user.user, (settings) => settings.listingStyleFilter);
				value = !String.isNullOrEmpty(value) ? value : SharedConstants.ListingTypes.Grid;
				return value;
			},
			set: function (newVal) {
				if (!this.user)
					return;
				if (this.isExternalList)
					this.listingStyleOverride = newVal;

				this.updateSettingsUserCharacter(this.correlationId(), GlobalUtility.$store.state.user.user, newVal, (settings) => { settings.listingStyleFilter = newVal; });
			}
		},
		sortBy: {
			get: function () {
				if (this.isExternalList)
					return this.sortByOverride;

				const result = this.getSettingsUser(this.correlationId(), GlobalUtility.$store.state.user.user, (settings) => settings.sortBy);
				return result ? result : SharedConstants.SortBy.Characters.CharacterName;
			},
			set: function (newVal) {
				if (this.isExternalList) {
					this.sortByOverride = newVal;
					this.forceRecomputeCounter++;
					return;
				}

				this.updateSettingsUserCharacter(this.correlationId(), GlobalUtility.$store.state.user.user, newVal, (settings) => { settings.sortBy = newVal; });
			}
		},
		sortDirection: {
			get: function () {
				if (this.isExternalList)
					return this.sortDirectionOverride;

				return this.getSettingsUser(this.correlationId(), GlobalUtility.$store.state.user.user, (settings) => settings.sortDirection);
			},
			set: function (newVal) {
				if (this.isExternalList) {
					this.sortDirectionOverride = newVal;
					this.forceRecomputeCounter++;
					return;
				}

				this.updateSettingsUserCharacter(this.correlationId(), GlobalUtility.$store.state.user.user, newVal, (settings) => { settings.sortDirection = newVal; });
			}
		},
		sortKeys: {
			get: function() {
				return  [
					{ id: SharedConstants.SortBy.Characters.CharacterName, name: GlobalUtility.$trans.t('forms.characters.name') + ' ' + GlobalUtility.$trans.t('forms.name') },
					{ id: SharedConstants.SortBy.Characters.Level, name: GlobalUtility.$trans.t('forms.characters.name') + ' ' + GlobalUtility.$trans.t('forms.level') }
					// { id: 'faction', name: GlobalUtility.$trans.t('forms.factions.name') },
				];
			}
		},
		userIdFilter: {
			get: function () {
				return this.userIdFilterValue;
			},
			set: function (newVal) {
				this.userIdFilterValue = newVal;
				this.forceRecomputeCounter++;
			}
		}
	},
	created() {
	},
	methods: {
		characterLevel(level) {
			return level ? level : 0;
		},
		clickCharacter(id) {
			GlobalUtility.$navRouter.push(LibraryUtility.formatUrl({ url: '/character', params: [ id ]}));
		},
		clickClear() {
			if (this.isExternalList) {
				this.characterNameValue = null;
				this.characterLevelMinFilter = null;
				this.characterLevelMinFilter = null;
				this.sortByOverride = SharedConstants.SortBy.Characters.CharacterName;
				this.sortDirectionOverride = true;

				this.forceRecomputeCounter = 0;
				return;
			}

			AppUtility.settings().clearUser(this.correlationId(), GlobalUtility.$store, GlobalUtility.$store.state.user.user, (correlationId, settings) => {
				this.characterNameValue = null;
				this.characterLevelMaxFilter = null;
				this.characterLevelMinFilter = null;
				settings.characters.sortBy = SharedConstants.SortBy.Characters.CharacterName;
				settings.characters.sortDirection = true;
			});
		},
		getSettingsUser(correlationId, user, funcAttribute) {
			if (!user || !user.settings)
				return null;
			const characters = user.settings.characters ? user.settings.characters : {};
			return funcAttribute(characters);
		},
		updateSettingsUserCharacter(correlationId, user, newVal, func) {
			const settings = AppUtility.settings().mergeUser(correlationId, user.settings);
			func(settings.characters, newVal);
			GlobalUtility.$store.dispatcher.user.setUserSettings(correlationId, settings);
		}
	}
};
</script>

<style scoped>
</style>
