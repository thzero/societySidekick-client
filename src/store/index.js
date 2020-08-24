import Vue from 'vue';
import VuexPersist from 'vuex-persist';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import Utility from '@thzero/library_common/utility';
import AppUtility from '@/utility/app';

// Admin Update
import adminBoons from '@/store/admin/boons';
import adminClasses from '@/store/admin/classes';
import adminEquipment from '@/store/admin/equipment';
import adminFactions from '@/store/admin/factions';
import adminScenarios from '@/store/admin/scenarios';
import boons from '@/store/boons';
import classes from '@/store/classes';
import characters from '@/store/characters';
import equipment from '@/store/equipment';
import factions from '@/store/factions';
import scenarios from '@/store/scenarios';

import BaseStore from '@/library_vue/store';

class AppStore extends BaseStore {
	_init() {
		return {
			modules: {
			},
			state: {
				checksumLastUpdate: [],
				gameSystems: [],
				plans: [],
				settings: AppUtility.initializeSettingsUser(),
				version: null
			},
			actions: {
				async getGameSystems({ commit }) {
					const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.gameSystems();
					this.$logger.debug('store', 'getGameSystems', 'response', response);
					commit('setGameSystems', response.success && response.results ? response.results.data : []);
				},
				async getPlans({ commit }) {
					const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_PLANS);
					const response = await service.plans();
					this.$logger.debug('store', 'getPlans', 'response', response);
					commit('setPlans', response.success && response.results ? response.results.data : []);
				},
				async getVersion({ commit }) {
					const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
					const version = await service.version();
					this.$logger.debug('store', 'getVersion', 'version', version);
					commit('setVersion', version);
				},
				async initialize({ commit }) {
					const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.initialize();
					this.$logger.debug('store', 'initialize', 'response', response);
					if (response && response.success) {
						commit('setGameSystems', response.results.gameSystems.data);
						commit('setPlans', response.results.plans);
						commit('setVersion', response.results.version);
					}
				},
				async setSettings({ commit }, settings) {
					commit('setSettings', settings);
				}
			},
			getters: {
				getGameSystem: (state) => (id) => {
					if (state.gameSystems == null)
						return null;
					return state.gameSystems.find(gameSystem => gameSystem.id === id);
				},
				getPlan: (state) => (id) => {
					if (state.plans == null)
						return null;
					return state.plans.find(plan => plan.id === id);
				}
			},
			mutations: {
				setCheckumLastUpdate(state, last) {
					state.checksumLastUpdate = last;
				},
				setGameSystems(state, gameSystems) {
					this.$logger.debug('setGameSystems.a', gameSystems);
					this.$logger.debug('setGameSystems.b', state.gameSystems);
					state.gameSystems = gameSystems;
					this.$logger.debug('setGameSystems.c', state.gameSystems);
				},
				setPlans(state, plans) {
					this.$logger.debug('setPlans.a', plans);
					this.$logger.debug('setPlans.b', state.plans);
					state.plans = plans;
					this.$logger.debug('setPlans.c', state.plans);
				},
				setSettings(state, settings) {
					state.settings = Utility.merge3({}, state.settings, settings);
				},
				setVersion(state, version) {
					this.$logger.debug('setVersion.version', version);
					state.version = version;
				}
			},
			dispatcher: {
				async getGameSystems() {
					await Vue.prototype.$store.dispatch('getGameSystems');
				},
				async getPlans() {
					await Vue.prototype.$store.dispatch('getPlans');
				},
				async setSettings(settings) {
					await Vue.prototype.$store.dispatch('setSettings', settings);
				},
				async getVersion(version) {
					await Vue.prototype.$store.dispatch('getVersion', version);
				},
				async initialize() {
					await Vue.prototype.$store.dispatch('initialize');
				}
			}
		};
	}

	_initModules() {
		// Admin Update
		this._addModule('adminBoons', adminBoons);
		this._addModule('adminClasses', adminClasses);
		this._addModule('adminEquipment', adminEquipment);
		this._addModule('adminFactions', adminFactions);
		this._addModule('adminScenarios', adminScenarios);

		this._addModule('characters', characters);
		this._addModule('boons', boons);
		this._addModule('classes', classes);
		this._addModule('equipment', equipment);
		this._addModule('factions', factions);
		this._addModule('scenarios', scenarios);
	}

	_initPluginPersist() {
		return new VuexPersist({
			storage: window.localStorage,
			reducer: state => ({
				plans: state.plans,
				settings: state.settings,
				version: state.version
			})
		});
	}
}

export default AppStore;
