<template>
	<div>
		<v-layout
			wrap
			:pt-4="$vuetify.breakpoint.smAndDown && newsCount > 0"
			:pt-2="$vuetify.breakpoint.mdAndUp || newsCount === 0"
		>
			<v-flex
				xs12
				sm12
				md6
				lg4
				xl4
				pb-4
			>
				<v-card color="basil">
					<v-tabs
						v-model="tab2"
						background-color="transparent"
						color="basil"
						grow
					>
						<v-tab
							v-for="item in items"
							:key="item"
						>
							{{ item }}
						</v-tab>
					</v-tabs>

					<v-tabs-items v-model="tab2">
						<v-tab-item
							v-for="item in items"
							:key="item"
						>sdfsdfsdf
							<v-card
								color="basil"
								flat
							>sdfsdfsdf
								<v-card-text>{{ text }}</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs-items>
				</v-card>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<v-badge
							v-if="$vuetify.breakpoint.smAndDown"
							color="primary"
							style="top: 8px;"
						>
							<p
								v-scroll-to="'#element'"
								class="headline mb-0"
							>
								{{ $t('titles.newsLatest') }}
							</p>
							<span slot="badge"> {{ newsCount }} </span>
						</v-badge>
						<p
							v-if="$vuetify.breakpoint.mdAndUp"
							class="headline mb-0"
						>
							{{ $t('titles.newsLatest') }}
						</p>
					</v-card-text>
				</v-card>
				<News
					v-if="$vuetify.breakpoint.mdAndUp"
				/>
			</v-flex>
			<v-flex
				v-if="isLoggedIn"
				xs12
				sm12
				md6
				lg8
				xl8
				:pl-2="$vuetify.breakpoint.mdAndUp"
			>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<v-layout>
							<v-flex
								lg4
								xs6
							>
								<v-chip
									color="success"
									outlined
									label
								>
									{{ userDisplayName }}
								</v-chip>
							</v-flex>
							<v-flex
								v-if="$vuetify.breakpoint.lgAndUp"
								lg4
								style="text-align: center"
							>
								<!-- GameSystems Update -->
								<Pathfinder2eSnippet
									v-if="isGameSystemPathfinder2e"
								/>
							</v-flex>
							<v-flex
								lg4
								xs6
								style="text-align: right"
							>
								<v-chip
									color="success"
									outlined
									label
								>
									#{{ gameSystemNumber }}
								</v-chip>
							</v-flex>
						</v-layout>
						<v-layout>
							<v-flex
								v-if="$vuetify.breakpoint.mdAndDown"
								xs12
								pt-2
								style="text-align: center"
							>
								<!-- GameSystems Update -->
								<Pathfinder2eSnippet
									v-if="isGameSystemPathfinder2e"
								/>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-card>
				<v-tabs
					v-model="tab"
					grow
				>
					<v-tab>
						{{ $t('titles.characters') }}
					</v-tab>
					<v-tab>
						{{ $t('titles.boons') }}
					</v-tab>
					<v-tab>
						{{ $t('titles.scenarios') }}
					</v-tab>
					<v-tab
						v-if="allowStatistics"
					>
						{{ $t('titles.statistics') }}
					</v-tab>
					<v-tab>
						sdfsdf
					</v-tab>
				</v-tabs>
				<v-tabs-items
					v-model="tab"
					style="background-color: transparent"
				>
					<v-tab-item
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<CharacterList />
					</v-tab-item>
					<v-tab-item
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<BoonList
							:user="user"
						/>
					</v-tab-item>
					<v-tab-item
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<ScenarioList
							:user="user"
						/>
					</v-tab-item>
					<v-tab-item
						v-if="allowStatistics"
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						<Statistics
							:user="user"
						/>
					</v-tab-item>
					<v-tab-item
						transition="fade-transition"
						reverse-transition="fade-transition"
					>
						sdfasdfasdf
					</v-tab-item>
				</v-tabs-items>
				<CharacterList />
			</v-flex>
			<v-flex
				v-if="$vuetify.breakpoint.smAndDown"
				id="element"
				xs12
				sm12
				md6
				lg4
				xl4
				pt-4
				pb-4
				:pl-2="$vuetify.breakpoint.mdAndUp"
				:pr-2="$vuetify.breakpoint.mdAndUp"
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
			</v-flex>
		</v-layout>
		<VLoadingOverlay
			:signal="initializeCompleted"
		/>
	</div>
</template>

<script>
import Vue from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryUtility from '@thzero/library_common/utility';
import GameSystemsUtility from '@/utility/gameSystems';

import base from '@/library_vue/components/base';

import BoonList from '@/components/gameSystems/BoonList';
import CharacterList from '@/components/gameSystems/CharacterList';
import News from '@/components/News';
import ScenarioList from '@/components/gameSystems/ScenarioList';
import Statistics from '@/components/gameSystems/Statistics';
import VLoadingOverlay from '@/library_vue/components/VLoadingOverlay';

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
		VLoadingOverlay,

		// GameSystems Update
		Pathfinder2eSnippet
	},
	extends: base,
	data: () => ({
		tab2: null,
		items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		initializeCompleted: false,
		sortKeys: [
			{ id: 'name', name: 'Name' },
			{ id: 'faction', name: 'Faction' }
		]
	}),
	computed: {
		allowStatistics() {
			return Constants.Features.Statistics;
		},
		gameSystemFilter() {
			return AppUtility.settings().getSettingsUserGameSystemFilter(this.correlationId(), this.$store.state.user.user, (settings) => settings.gameSystemFilter);
		},
		gameSystemNumber() {
			return GameSystemsUtility.gameSystemNumber(this.correlationId(), this.$store.state.user.user, this.gameSystemFilter);
		},
		isLoggedIn() {
			return this.$store.state.user && this.$store.state.user.isLoggedIn;
		},
		// GameSystems Update
		isGameSystemDungeonsAndDragons5e() {
			return this.gameSystemFilter === SharedConstants.GameSystems.DungeonsAndDragons5e.id;
		},
		isGameSystemPathfinder2e() {
			return this.gameSystemFilter === SharedConstants.GameSystems.Pathfinder2e.id;
		},
		isGameSystemStarfinder1e() {
			return this.gameSystemFilter === SharedConstants.GameSystems.Starfinder1e.id;
		},
		newsCount() {
			if (!this.$store.state.news.latest)
				return 0;

			const news = this.$store.state.news.latest.slice(0);
			return news.length;
		},
		tab: {
			get: function () {
				return this.getSettingsUserTab(this.correlationId(), this.$store.state.user.user, (settings) => settings.tab);
			},
			set: function (newVal) {
				this.updateSettingsUserTab(this.correlationId(), this.$store.state.user.user, newVal, (settings) => { return settings.tab = newVal; });
			}
		},
		user() {
			return this.$store.state.user.user;
		},
		userDisplayName() {
			const user = this.$store.state.user.user;
			const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
			const userName = settings && settings.gamerTag ? settings.gamerTag : user.external && user.external.name ? user.external.name : '******';
			return userName;
		}
	},
	created() {
		const self = this;
		this.$EventBus.$on('initialize-completed', (value) => {
			self.initializeCompleted = value;
		});
	},
	methods: {
		getSettingsUserTab(correlationId, user, funcAttribute) {
			if (!user || !user.settings)
				return null;

			const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
			return funcAttribute(settings.home);
		},
		updateSettingsUserTab(user, newVal, func) {
			const correlationId = this.correlationId();
			const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
			func(settings.home, newVal);
			this.$store.dispatcher.user.setUserSettings(correlationId, settings);
		}
	},
	// eslint-disable-next-line
	async beforeRouteEnter (to, from, next) {
		// called before the route that renders this component is confirmed.
		// does NOT have access to `this` component instance,
		// because it has not been created yet when this guard is called!
		(async () => {
			try {
				Vue.prototype.$EventBus.$emit('initialize-completed', false);

				const correlationId = LibraryUtility.generateId();

				await Promise.all([
					Vue.prototype.$store.dispatcher.news.getLatest(correlationId),
					Vue.prototype.$store.dispatcher.characters.getCharacterListing(correlationId, { listing: true })
				]);
			}
			finally {
				const timeout = setTimeout(function () {
					Vue.prototype.$EventBus.$emit('initialize-completed', true);
					clearTimeout(timeout);
				}, DelayMs);
			}
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
		next();
	},
	// eslint-disable-next-line
	async beforeRouteUpdate (to, from, next) {
		// called when the route that renders this component has changed,
		// but this component is reused in the new route.
		// For example, for a route with dynamic params `/foo/:id`, when we
		// navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
		// will be reused, and this hook will be called when that happens.
		// has access to `this` component instance.
		(async () => {
			const self = this;
			try {
				this.initializeCompleted = false;

				const correlationId = this.correlationId();

				await Promise.all([
					this.$store.dispatcher.news.getLatest(correlationId),
					this.$store.dispatcher.characters.getCharacterListing(correlationId, { listing: true })
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
		next();
	}
};
</script>

<style scoped>
</style>
