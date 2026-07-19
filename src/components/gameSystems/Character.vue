<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			temporary
			style="z-index: 2"
		>
			<v-list
				density="compact"
				class="pt-0 mt-12"
			>
				<v-list-item
					:title="$t('characters.dashboard')"
					@click="clickTab(0)"
				>
					<template #prepend>
						<v-icon>mdi-view-dashboard</v-icon>
					</template>
				</v-list-item>
				<v-list-item
					:title="$t('characters.boons.namePlural')"
					@click="clickTab(1)"
				>
					<template #prepend>
						<v-icon>mdi-format-list-bulleted</v-icon>
					</template>
				</v-list-item>
				<v-list-item
					:title="$t('characters.inventory')"
					@click="clickTab(2)"
				>
					<template #prepend>
						<v-icon>mdi-format-list-bulleted</v-icon>
					</template>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<div class="flex-container">
			<div
				class="flex-item d-none d-md-block"
			>
				<v-card>
					<v-card-text>
						<v-tabs
							v-model="tabSupport.currentTab"
							direction="vertical"
							@update:model-value="clickTab"
						>
							<v-tab
								v-for="tab of tabSupport.tabs"
								:key="tab.index"
								style="justify-content: start; margin-left: 0px"
								@click="clickTab(tab.index)"
							>
								<v-icon
									v-if="tab.icon"
									start
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
					v-if="$vuetify.display.mdAndUp"
				>
					<v-card-text>
						<v-row>
							<v-col
								cols="7"
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
							</v-col>
							<v-col
								cols="5"
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
										variant="outlined"
										label
									>
										{{ getGameSystemName(character.gameSystemId) }}
									</v-chip>
								</div>
							</v-col>
							<v-col
								v-if="character.tagLine"
								cols="8"
								class="pt-2"
							>
								<span class="subtitle-1">
									{{ character.tagLine }}
								</span>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
				<v-card
					v-if="$vuetify.display.smAndDown"
				>
					<v-card-text>
						<v-row>
							<v-col
								:cols="$vuetify.display.smAndDown ? 12 : 6"
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
							</v-col>
							<v-col
								cols="6"
								class="pt-2"
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
							</v-col>
							<v-col
								cols="6"
								class="pt-2"
							>
								<div class="text-right">
									<v-chip
										color="success"
										variant="outlined"
										label
									>
										{{ getGameSystemName(character.gameSystemId) }}
									</v-chip>
								</div>
							</v-col>
							<v-col
								v-if="character.tagLine"
								cols="12"
								class="pt-2"
							>
								<span class="subtitle-1">
									{{ character.tagLine }}
								</span>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
				<!-- // GameSystems Update -->
				<ScenariosDashboardPathfinder2e
					v-if="isGameSystemPathfinder2e && tabSupport.currentTab === tabDashboard"
					:value="character"
					class="mb-4"
				/>
				<BoonsDashboardPathfinder2e
					v-if="isGameSystemPathfinder2e && tabSupport.currentTab === tabBoons"
					:value="character"
					class="mb-4"
				/>
				<InventoryDashboardPathfinder2e
					v-if="isGameSystemPathfinder2e && tabSupport.currentTab === tabInventory"
					:value="character"
					class="mb-4"
				/>
				<ScenariosDashboardStarfinder1e
					v-if="isGameSystemStarfinder1e && tabSupport.currentTab === tabDashboard"
					:value="character"
					class="mb-4"
				/>
				<BoonsDashboardStarfinder1e
					v-if="isGameSystemStarfinder1e && tabSupport.currentTab === tabBoons"
					:value="character"
					class="mb-4"
				/>
				<InventoryDashboardStarfinder1e
					v-if="isGameSystemStarfinder1e && tabSupport.currentTab === tabInventory"
					:value="character"
					class="mb-4"
				/>
			</div>
		</div>
		<VtLoadingOverlay
			:signal="initializeCompleted"
		/>
	</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import VueUtility from '@thzero/library_client_vue3/utility/index';

import { useBaseComponent } from '@/components/base';

import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

// GameSystems Update
import BoonsDashboardPathfinder2e from '@/components/gameSystems/pathfinder2e/BoonsDashboard';
import CharacterNameSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/CharacterNameSnippet';
import InventoryDashboardPathfinder2e from '@/components/gameSystems/pathfinder2e/InventoryDashboard';
import ScenariosDashboardPathfinder2e from '@/components/gameSystems/pathfinder2e/ScenariosDashboard';
import BoonsDashboardStarfinder1e from '@/components/gameSystems/starfinder1e/BoonsDashboard';
import CharacterNameSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/CharacterNameSnippet';
import InventoryDashboardStarfinder1e from '@/components/gameSystems/starfinder1e/InventoryDashboard';
import ScenariosDashboardStarfinder1e from '@/components/gameSystems/starfinder1e/ScenariosDashboard';

import TabSupport from '@thzero/library_client_vue3/components/support/tab';

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
		VtLoadingOverlay
	},
	async beforeRouteEnter(to, from) {
		const results = VueUtility.checkId(to);
		await LibraryClientUtility.$store.dispatcher.characters.getCharacterListing(LibraryCommonUtility.correlationId(), { basics: true });
		if (!results)
			return false;
		// The mounted component runs determineActiveTab() in onMounted, so no instance callback is needed here.
	},
	async beforeRouteUpdate(to, from) {
		const correlationId = this.correlationId();
		this.logger.debug('Character', 'beforeRouteUpdate', null, null, correlationId);
		const results = VueUtility.checkId(to);
		this.determineActiveTab();
		await LibraryClientUtility.$store.dispatcher.characters.getCharacterListing(correlationId, { basics: true });
		if (!results)
			return false;
	},
	setup(props, context) {
		const base = useBaseComponent(props, context);

		const route = useRoute();

		const servicePathfinder2e = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		const serviceStarfinder1e = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);

		const drawer = ref(false);
		const initializeCompleted = ref(false);
		const tabSupport = ref(new TabSupport());
		const tabDashboard = 0;
		const tabBoons = 1;
		const tabInventory = 2;

		const getId = () => {
			return route.params.id;
		};

		const character = computed(() => {
			base.logger.debug('Character', 'character', 'id', getId(), base.correlationId());
			const results = LibraryClientUtility.$store.getters.getCharacter(base.correlationId(), getId());
			return results ? results : {};
		});
		const isGameSystemPathfinder2e = computed(() => {
			return character.value.gameSystemId === SharedConstants.GameSystems.Pathfinder2e.id;
		});
		const isGameSystemStarfinder1e = computed(() => {
			return character.value.gameSystemId === SharedConstants.GameSystems.Starfinder1e.id;
		});
		const user = computed(() => {
			return LibraryClientUtility.$store.user.user;
		});

		const clickTab = (value) => {
			tabSupport.value.changeTab(value);
			drawer.value = false;
		};
		const determineActiveTab = () => {
			const correlationId = base.correlationId();
			base.logger.debug('Character', 'determineActiveTab', null, null, correlationId);
			let tab = tabDashboard;
			const page = route.params.page;
			if (!String.isNullOrEmpty(page))
				tab = tabDashboard;

			const timer = setInterval(async () => {
				clearInterval(timer);
				tabSupport.value.changeTab(tab);
			}, 150);
		};
		const getGameSystemName = (id) => {
			const results = LibraryClientUtility.$store.getters.getGameSystem(base.correlationId(), id);
			return results ? results.name : '';
		};
		const initializeGameSystem = async (correlationId) => {
			if (isGameSystemPathfinder2e.value)
				servicePathfinder2e.initializeFetches(correlationId, LibraryClientUtility.$store);
			if (isGameSystemStarfinder1e.value)
				serviceStarfinder1e.initializeFetches(correlationId, LibraryClientUtility.$store);
		};
		const initializeCharacter = async (correlationId) => {
			LibraryClientUtility.$store.dispatcher.characters.getCharacter(correlationId, getId())
				.then(async (response) => {
					try {
						base.logger.debug('Character', 'initializeCharacter', 'response', response);
						if (base.hasFailed(response)) {
							VueUtility.invalid();
							return;
						}

						await initializeGameSystem(correlationId);

						try {
							const scenarios = LibraryClientUtility.$store.scenarios.listing;
							if (!scenarios || (scenarios.length <= 0))
								await LibraryClientUtility.$store.dispatcher.scenarios.getScenarioListing(correlationId, response.results.gameSystemId);
						}
						catch (err) {
							base.logger.error('Character', 'initializeCharacter', null, err, null, null, correlationId);
							VueUtility.invalid();
						}

						const timeout = setTimeout(function () {
							initializeCompleted.value = true;
							clearTimeout(timeout);
						}, DelayMs);
					}
					catch (err) {
						VueUtility.invalid();
					}
				})
				.catch(() => {
					VueUtility.invalid();
				});
		};
		const initializeTabs = () => {
			tabSupport.value.add(tabDashboard, 'mdi-view-dashboard', LibraryClientUtility.$trans.t('characters.dashboard'));
			tabSupport.value.add(tabBoons, 'mdi-format-list-bulleted', LibraryClientUtility.$trans.t('characters.boons.namePlural'));
			tabSupport.value.add(tabInventory, 'mdi-format-list-bulleted', LibraryClientUtility.$trans.t('characters.inventory'));
		};

		onMounted(async () => {
			VueUtility.checkId(route);

			initializeCompleted.value = false;

			initializeTabs();
			determineActiveTab();

			LibraryClientUtility.$EventBus.on('toggle-drawer', () => {
				drawer.value = !drawer.value;
			});

			await initializeCharacter(base.correlationId());
		});

		return {
			...base,
			drawer,
			initializeCompleted,
			tabSupport,
			tabDashboard,
			tabBoons,
			tabInventory,
			character,
			isGameSystemPathfinder2e,
			isGameSystemStarfinder1e,
			user,
			clickTab,
			determineActiveTab,
			getId,
			getGameSystemName,
			initializeCharacter,
			initializeGameSystem,
			initializeTabs
		};
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
