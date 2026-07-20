<template>
	<div>
		<v-row
			:class="($vuetify.display.smAndDown && newsCount > 0) ? 'pt-4' : 'pt-2'"
		>
			<v-col
				cols="12"
				md="6"
				lg="4"
				class="pb-4"
			>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<v-badge
							v-if="$vuetify.display.smAndDown"
							color="primary"
							:content="newsCount"
							style="top: 8px;"
						>
							<p
								class="headline mb-0"
							>
								{{ $t('titles.newsLatest') }}
							</p>
						</v-badge>
						<p
							v-if="$vuetify.display.mdAndUp"
							class="headline mb-0"
						>
							{{ $t('titles.newsLatest') }}
						</p>
					</v-card-text>
				</v-card>
				<News
					v-if="$vuetify.display.mdAndUp"
				/>
			</v-col>
			<v-col
				v-if="isLoggedIn"
				cols="12"
				md="6"
				lg="8"
				:class="{ 'pl-2': $vuetify.display.mdAndUp }"
			>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<v-row>
							<v-col
								cols="6"
								lg="4"
							>
								<v-chip
									color="success"
									variant="outlined"
									label
								>
									{{ userDisplayName }}
								</v-chip>
							</v-col>
							<v-col
								v-if="$vuetify.display.lgAndUp"
								lg="4"
								style="text-align: center"
							>
								<!-- GameSystems Update -->
								<Pathfinder2eSnippet
									v-if="isGameSystemPathfinder2e"
								/>
							</v-col>
							<v-col
								cols="6"
								lg="4"
								style="text-align: right"
							>
								<v-chip
									color="success"
									variant="outlined"
									label
								>
									#{{ gameSystemNumber }}
								</v-chip>
							</v-col>
						</v-row>
						<v-row>
							<v-col
								v-if="$vuetify.display.mdAndDown"
								cols="12"
								class="pt-2"
								style="text-align: center"
							>
								<!-- GameSystems Update -->
								<Pathfinder2eSnippet
									v-if="isGameSystemPathfinder2e"
								/>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
				<v-tabs
					v-model="tab"
					grow
				>
					<v-tab :value="0">
						{{ $t('titles.characters') }}
					</v-tab>
					<v-tab :value="1">
						{{ $t('titles.boons') }}
					</v-tab>
					<v-tab :value="2">
						{{ $t('titles.scenarios') }}
					</v-tab>
					<v-tab
						v-if="allowStatistics"
						:value="3"
					>
						{{ $t('titles.statistics') }}
					</v-tab>
				</v-tabs>
				<v-tabs-window
					v-model="tab"
					style="background-color: transparent"
				>
					<v-tabs-window-item
						:value="0"
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<CharacterList
							:user="user"
						/>
					</v-tabs-window-item>
					<v-tabs-window-item
						:value="1"
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<BoonList
							:user="user"
						/>
					</v-tabs-window-item>
					<v-tabs-window-item
						:value="2"
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<ScenarioList
							:user="user"
						/>
					</v-tabs-window-item>
					<v-tabs-window-item
						v-if="allowStatistics"
						:value="3"
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<Statistics
							:user="user"
						/>
					</v-tabs-window-item>
				</v-tabs-window>
			</v-col>
			<v-col
				v-if="$vuetify.display.smAndDown"
				id="element"
				cols="12"
				md="6"
				lg="4"
				class="pt-4 pb-4"
				:style="$vuetify.display.mdAndUp ? 'padding-left: 8px; padding-right: 8px;' : ''"
			>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<p class="headline">
							{{ $t('titles.newsLatest') }}
						</p>
					</v-card-text>
				</v-card>
				<News />
			</v-col>
		</v-row>
		<VtLoadingOverlay
			:signal="initializeCompleted"
		/>
	</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import GameSystemsUtility from '@/utility/gameSystems';

import { useBaseComponent } from '@/components/base';

import BoonList from '@/components/gameSystems/BoonList';
import CharacterList from '@/components/gameSystems/CharacterList';
import News from '@/components/News';
import ScenarioList from '@/components/gameSystems/ScenarioList';
import Statistics from '@/components/gameSystems/Statistics';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

// GameSystems Update
import Pathfinder2eSnippet from '@/components/gameSystems/pathfinder2e/MainSnippet';

const DelayMs = 0; // 250

export default {
	name: 'Home',
	components: {
		BoonList,
		CharacterList,
		News,
		ScenarioList,
		Statistics,
		VtLoadingOverlay,

		// GameSystems Update
		Pathfinder2eSnippet
	},
	async beforeRouteEnter(to, from) {
		(async () => {
			try {
				LibraryClientUtility.$EventBus.emit('initialize-completed', false);

				const correlationId = LibraryCommonUtility.generateId();

				await Promise.all([
					LibraryClientUtility.$store.dispatcher.news.getLatest(correlationId),
					LibraryClientUtility.$store.dispatcher.characters.getCharacterListing(correlationId, { listing: true })
				]);
			}
			finally {
				const timeout = setTimeout(function () {
					LibraryClientUtility.$EventBus.emit('initialize-completed', true);
					clearTimeout(timeout);
				}, DelayMs);
			}
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
	},
	async beforeRouteUpdate(to, from) {
		const self = this;
		(async () => {
			try {
				self.initializeCompleted = false;

				const correlationId = self.correlationId();

				await Promise.all([
					LibraryClientUtility.$store.dispatcher.news.getLatest(correlationId),
					LibraryClientUtility.$store.dispatcher.characters.getCharacterListing(correlationId, { listing: true })
				]);
			}
			finally {
				const timeout = setTimeout(function () {
					self.initializeCompleted = true;
					clearTimeout(timeout);
				}, DelayMs);
			}
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
	},
	setup(props, context) {
		const base = useBaseComponent(props, context);

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		const initializeCompleted = ref(false);

		const gameSystemFilter = computed(() => {
			return AppUtility.settings().getSettingsUserGameSystemFilter(base.correlationId(), LibraryClientUtility.$store.user.user, (settings) => settings.gameSystemFilter);
		});

		const allowStatistics = computed(() => {
			return Constants.Features.Statistics;
		});
		const gameSystemNumber = computed(() => {
			return GameSystemsUtility.gameSystemNumber(base.correlationId(), LibraryClientUtility.$store.user.user, gameSystemFilter.value);
		});
		const isLoggedIn = computed(() => {
			return serviceStore != null && serviceStore.userAuthIsLoggedIn;
		});
		const isGameSystemPathfinder2e = computed(() => {
			return gameSystemFilter.value === SharedConstants.GameSystems.Pathfinder2e.id;
		});
		const isGameSystemStarfinder1e = computed(() => {
			return gameSystemFilter.value === SharedConstants.GameSystems.Starfinder1e.id;
		});
		const newsCount = computed(() => {
			if (!LibraryClientUtility.$store.news.latest)
				return 0;
			return LibraryClientUtility.$store.news.latest.slice(0).length;
		});
		const user = computed(() => {
			return LibraryClientUtility.$store.user.user;
		});
		const userDisplayName = computed(() => {
			const u = LibraryClientUtility.$store.user.user;
			if (!u)
				return '';
			// 0.18 lib stores settings at $store.user.settings (user.settings is deleted on load).
			const settings = LibraryClientUtility.$store.user.settings;
			return settings && settings.gamerTag ? settings.gamerTag : u.external && u.external.name ? u.external.name : '******';
		});

		const getSettingsUserTab = (correlationId, u, funcAttribute) => {
			const settings = LibraryClientUtility.$store.user.settings;
			if (!settings || !settings.home)
				return null;
			return funcAttribute(settings.home);
		};
		const updateSettingsUserTab = (correlationId, u, newVal, func) => {
			const settings = AppUtility.settings().mergeUser(correlationId, LibraryClientUtility.$store.user.settings);
			func(settings.home, newVal);
			LibraryClientUtility.$store.dispatcher.user.setUserSettings(correlationId, settings);
		};

		// The settings-backed tab value does not reliably re-trigger reactivity when persisted via
		// setUserSettings (store settings replacement), so the tab window never switches. Drive off a
		// local ref (updated immediately on select) while still persisting the saved tab.
		const initialTab = getSettingsUserTab(base.correlationId(), LibraryClientUtility.$store.user.user, (settings) => settings.tab);
		const tabLocal = ref((initialTab === null || initialTab === undefined) ? 0 : initialTab);
		const tab = computed({
			get: () => tabLocal.value,
			set: (newVal) => {
				tabLocal.value = newVal;
				updateSettingsUserTab(base.correlationId(), LibraryClientUtility.$store.user.user, newVal, (settings) => { return settings.tab = newVal; });
			}
		});

		onMounted(() => {
			LibraryClientUtility.$EventBus.on('initialize-completed', (value) => {
				initializeCompleted.value = value;
			});
		});

		return {
			...base,
			initializeCompleted,
			allowStatistics,
			gameSystemFilter,
			gameSystemNumber,
			isLoggedIn,
			isGameSystemPathfinder2e,
			isGameSystemStarfinder1e,
			newsCount,
			tab,
			user,
			userDisplayName,
			getSettingsUserTab,
			updateSettingsUserTab
		};
	}
};
</script>

<style scoped>
</style>
