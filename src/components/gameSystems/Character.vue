<template>
	<vue-fragment>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			temporary
			style="z-index: 2"
		>
			<v-list
				dense
				class="pt-0 mt-12"
			>
				<v-list-item @click="clickTab(0)">
					<v-list-item-action>
						<v-icon>dashboard</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('characters.dashboard') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="clickTab(1)">
					<v-list-item-action>
						<v-icon>list_alt</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('characters.boons.namePlural') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="clickTab(2)">
					<v-list-item-action>
						<v-icon>list_alt</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{ $t('characters.inventory') }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<div class="flex-container">
			<div
				class="flex-item hidden-sm-and-down"
			>
				<v-card>
					<v-card-text>
						<v-tabs
							v-model="tabSupport.currentTab"
							vertical
							@change="clickTab"
						>
							<v-tab
								v-for="tab of tabSupport.tabs"
								:key="tab.index"
								style="justify-content: start; margin-left: 0px"
								@click="clickTab(tab.index)"
							>
								<v-icon
									v-if="tab.icon"
									left
								>
									{{ tab.icon }}
								</v-icon>
								{{ tab.label }}
							</v-tab>
						</v-tabs>
					</v-card-text>
				</v-card>
			</div>
			<div class="flex-item2">
				<v-card
					v-if="$vuetify.breakpoint.mdAndUp"
				>
					<v-card-text>
						<v-layout
							wrap
						>
							<v-flex
								xs7
							>
								<!-- // GameSystems Update -->
								<CharacterNameSnippetPathfinder2e
									v-if="isGameSystemPathfinder2e"
									:user="user"
									:value="character"
									:has-secondary="false"
									prefix=""
									suffix=""
								/>
								<CharacterNameSnippetStarfinder1e
									v-if="isGameSystemStarfinder1e"
									:user="user"
									:value="character"
									:has-secondary="false"
									prefix=""
									suffix=""
								/>
							</v-flex>
							<v-flex
								xs5
							>
								<div class="text-right">
									<span class="mr-2">
										<!-- // GameSystems Update -->
										<CharacterNameSnippetPathfinder2e
											v-if="isGameSystemPathfinder2e"
											:user="user"
											:value="character"
											:has-name="false"
											prefix=""
											suffix=""
											font-secondary=""
										/>
										<CharacterNameSnippetStarfinder1e
											v-if="isGameSystemStarfinder1e"
											:user="user"
											:value="character"
											:has-name="false"
											prefix=""
											suffix=""
											font-secondary=""
										/>
									</span>
									<v-chip
										color="success"
										outlined
										label
									>
										{{ getGameSystemName(character.gameSystemId) }}
									</v-chip>
								</div>
							</v-flex>
							<v-flex
								v-if="character.tagLine"
								xs8
								pt-2
							>
								<span class="subtitle-1">
									{{ character.tagLine }}
								</span>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
				<v-card
					v-if="$vuetify.breakpoint.smAndDown"
				>
					<v-card-text>
						<v-layout
							wrap
						>
							<v-flex
								:xs12="$vuetify.breakpoint.smAndDown"
								:xs6="$vuetify.breakpoint.mdAndUp"
							>
								<!-- // GameSystems Update -->
								<CharacterNameSnippetPathfinder2e
									v-if="isGameSystemPathfinder2e"
									:user="user"
									:value="character"
									:has-secondary="false"
									prefix=""
									suffix=""
								/>
								<CharacterNameSnippetStarfinder1e
									v-if="isGameSystemStarfinder1e"
									:user="user"
									:value="character"
									:has-secondary="false"
									prefix=""
									suffix=""
								/>
							</v-flex>
							<v-flex
								xs6
								pt-2
							>
								<div>
									<!-- // GameSystems Update -->
									<CharacterNameSnippetPathfinder2e
										v-if="isGameSystemPathfinder2e"
										:user="user"
										:value="character"
										:has-name="false"
										font-secondary=""
										prefix=""
										suffix=""
									/>
									<CharacterNameSnippetStarfinder1e
										v-if="isGameSystemStarfinder1e"
										:user="user"
										:value="character"
										:has-name="false"
										font-secondary=""
										prefix=""
										suffix=""
									/>
								</div>
							</v-flex>
							<v-flex
								xs6
								pt-2
							>
								<div class="text-right">
									<v-chip
										color="success"
										outlined
										label
									>
										{{ getGameSystemName(character.gameSystemId) }}
									</v-chip>
								</div>
							</v-flex>
							<v-flex
								v-if="character.tagLine"
								xs12
								pt-2
							>
								<span class="subtitle-1">
									{{ character.tagLine }}
								</span>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
				<!-- // GameSystems Update -->
				<ScenariosDashboardPathfinder2e
					v-if="isGameSystemPathfinder2e && tabSupport.currentTab === tabDashboard"
					v-model="character"
					mb-4
				/>
				<BoonsDashboardPathfinder2e
					v-if="isGameSystemPathfinder2e && tabSupport.currentTab === tabBoons"
					v-model="character"
					mb-4
				/>
				<InventoryDashboardPathfinder2e
					v-if="isGameSystemPathfinder2e && tabSupport.currentTab === tabInventory"
					v-model="character"
					mb-4
				/>
				<ScenariosDashboardStarfinder1e
					v-if="isGameSystemStarfinder1e && tabSupport.currentTab === tabDashboard"
					v-model="character"
					mb-4
				/>
				<BoonsDashboardStarfinder1e
					v-if="isGameSystemStarfinder1e && tabSupport.currentTab === tabBoons"
					v-model="character"
					mb-4
				/>
				<InventoryDashboardStarfinder1e
					v-if="isGameSystemStarfinder1e && tabSupport.currentTab === tabInventory"
					v-model="character"
					mb-4
				/>
			</div>
		</div>
		<VLoadingOverlay
			:signal="initializeCompleted"
		/>
	</vue-fragment>
</template>

<script>
import Vue from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

// GameSystems Update
import VueUtility from '@/library_vue/utility/index';

import base from '@/components/base';
import VLoadingOverlay from '@/library_vue/components/VLoadingOverlay';

// GameSystems Update
import BoonsDashboardPathfinder2e from '@/components/gameSystems/pathfinder2e/BoonsDashboard';
import CharacterNameSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/CharacterNameSnippet';
import InventoryDashboardPathfinder2e from '@/components/gameSystems/pathfinder2e/InventoryDashboard';
import ScenariosDashboardPathfinder2e from '@/components/gameSystems/pathfinder2e/ScenariosDashboard';
import BoonsDashboardStarfinder1e from '@/components/gameSystems/starfinder1e/BoonsDashboard';
import CharacterNameSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/CharacterNameSnippet';
import InventoryDashboardStarfinder1e from '@/components/gameSystems/starfinder1e/InventoryDashboard';
import ScenariosDashboardStarfinder1e from '@/components/gameSystems/starfinder1e/ScenariosDashboard';

import TabSupport from '@/library_vue/components/support/tab';

const DelayMs = 0; // 250

export default {
	name: 'Character',
	components: {
		// GameSystems Update
		BoonsDashboardPathfinder2e,
		BoonsDashboardStarfinder1e,
		CharacterNameSnippetPathfinder2e,
		CharacterNameSnippetStarfinder1e,
		InventoryDashboardPathfinder2e,
		InventoryDashboardStarfinder1e,
		ScenariosDashboardPathfinder2e,
		ScenariosDashboardStarfinder1e,
		VLoadingOverlay
	},
	extends: base,
	data: () => ({
		drawer: false,
		initializeCompleted: false,
		// GameSystems Update
		servicePathfinder2e: null,
		serviceStarfinder1e: null,
		tabSupport: new TabSupport(),
		tabDashboard: 0,
		tabBoons: 1,
		tabInventory: 2
	}),
	computed: {
		character() {
			this.logger.debug('Character', 'character', 'id', this.getId());
			const results = this.$store.getters.getCharacter(this.getId());
			return results ? results : {};
		},
		// GameSystems Update
		isGameSystemDungeonsAndDragons5e() {
			return this.character.gameSystemId === SharedConstants.GameSystems.DungeonsAndDragons5e.id;
		},
		isGameSystemPathfinder2e() {
			return this.character.gameSystemId === SharedConstants.GameSystems.Pathfinder2e.id;
		},
		isGameSystemStarfinder1e() {
			return this.character.gameSystemId === SharedConstants.GameSystems.Starfinder1e.id;
		},
		user() {
			return this.$store.state.user.user;
		}
	},
	created() {
		// GameSystems Update
		this.servicePathfinder2e = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		this.serviceStarfinder1e = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
	},
	async mounted() {
		VueUtility.checkId(this.$route);

		this.initializeCompleted = false;

		this.initializeTabs();
		this.determineActiveTab();

		const self = this;
		this.$EventBus.$on('toggle-drawer', () => {
			self.drawer = !self.drawer;
		});

		await this.initializeCharacter();
	},
	methods: {
		clickTab(value) {
			this.tabSupport.changeTab(value);
			this.drawer = false;
		},
		determineActiveTab() {
			this.logger.debug('Character', 'determineActiveTab');
			let tab = this.tabDashboard;
			const page = this.$route.params.page;
			if (!String.isNullOrEmpty(page))
				tab = this.tabWiki;

			const self = this;
			const timer = setInterval(async () => {
				clearInterval(timer);
				self.tabSupport.changeTab(tab);
			}, 150);
		},
		getId() {
			return this.$route.params.id;
		},
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		async initializeCharacter() {
			const self = this;
			// try and fetch an update from the api
			this.$store.dispatcher.characters.getCharacter(this.getId())
				.then(async (response) => {
					try {
						self.logger.debug('Character', 'initializeCharacter', 'response', response);
						if (!response || !response.success) {
							VueUtility.invalid();
							return;
						}

						// TODO: Check to see if we can even see it.... otherwise redirect to homepage?

						await self.initializeGameSystem();

						const timeout = setTimeout(function () {
							self.initializeCompleted = true;
							clearTimeout(timeout);
						}, DelayMs);
					}
					catch(err) {
						VueUtility.invalid();
					}
				})
				.catch(() => {
					VueUtility.invalid();
				});
		},
		async initializeGameSystem() {
			// GameSystems Update
			if (this.isGameSystemPathfinder2e)
				this.servicePathfinder2e.initializeFetches(this.$store);
			if (this.isGameSystemStarfinder1e)
				this.serviceStarfinder1e.initializeFetches(this.$store);
		},
		initializeTabs() {
			// TODO: Depending on security results, only some of these should be displayed...
			this.tabSupport.add(this.tabDashboard, 'dashboard', this.$trans.t('characters.dashboard'));
			this.tabSupport.add(this.tabBoons, 'list_alt', this.$trans.t('characters.boons.namePlural'));
			this.tabSupport.add(this.tabInventory, 'list_alt', this.$trans.t('characters.inventory'));
		}
	},
	async beforeRouteEnter(to, from, next) {
		// eslint-disable-next-line
		// console.log('beforeRouteEnter1')
		// called before the route that renders this component is confirmed.
		// does NOT have access to `this` component instance,
		// because it has not been created yet when this guard is called!
		//VueUtility.checkId(to, from, next)
		// next(vm => {
		//	 // access to component instance via `vm`
		//	 vm.character = vm.$store.getters.getCharacter(vm.$route.params.id)
		// })
		const results = VueUtility.checkId(to);
		await Vue.prototype.$store.dispatcher.characters.getCharacterListing({ basics: true });
		if (results) {
			next(async vm => {
				// access to component instance via `vm`
				vm.logger.debug('Character', 'beforeRouteEnter2');
				vm.determineActiveTab();
			});
		}
	},
	async beforeRouteUpdate(to, from, next) {
		// called when the route that renders this component has changed,
		// but this component is reused in the new route.
		// has access to `this` component instance.
		this.logger.debug('Character', 'beforeRouteUpdate');
		const results = VueUtility.checkId(to);
		this.determineActiveTab();
		await this.$store.dispatcher.characters.getCharacterListing({ basics: true });
		// this.character = this.$store.getters.getCharacter(this.getId())
		if (results)
			next();
	}
};
</script>

<style scoped>
.flex-container {
	padding: 0;
	margin: 0;
	list-style: none;

	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;

	height: 100%;
}

.flex-item {
	flex-grow: 0;
	margin-right: 10px;
}

.flex-item2 {
	flex-grow: 1;
}

.v-navigation-drawer--temporary {
		z-index: auto;
}
</style>
