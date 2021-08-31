import VuexPersist from 'vuex-persist';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

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

import BaseStore from '@thzero/library_client_vue/store';

class AppStore extends BaseStore {
	_init() {
		return {
			modules: {
			},
			state: {
				checksumLastUpdate: [],
				gameSystems: [],
				organizedPlay: [],
				plans: [],
				settings: AppUtility.initializeSettingsUser(),
				version: null
			},
			actions: {
				async getGameSystems({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.gameSystems(correlationId);
					this.$logger.debug('store', 'getGameSystems', 'response', response, correlationId);
					commit('setGameSystems', { correlationId : correlationId, gameSystems: response.success && response.results ? response.results.data : [] });
				},
				async getOrganizedPlay({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.gameSystems(correlationId);
					this.$logger.debug('store', 'getOrganizedPlay', 'response', response, correlationId);
					commit('setOrganizedPlay', { correlationId : correlationId, organizedPlay: response.success && response.results ? response.results.data : [] });
				},
				async getPlans({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_PLANS);
					const response = await service.plans(correlationId);
					this.$logger.debug('store', 'getPlans', 'response', response, correlationId);
					commit('setPlans', { correlationId : correlationId, plans: response.success && response.results ? response.results.data : [] });
				},
				async getVersion({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_VERSION);
					const version = await service.version(correlationId);
					this.$logger.debug('store', 'getVersion', 'version', version, correlationId);
					commit('setVersion', { correlationId : correlationId, version: version });
				},
				async initialize({ commit }, correlationId) {
					const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
					const response = await service.initialize(correlationId);
					this.$logger.debug('store', 'initialize', 'response', response);
					if (response && response.success) {
						commit('setGameSystems', { correlationId : correlationId, gameSystems: response.results.gameSystems.data });
						commit('setOrganizedPlay', { correlationId : correlationId, organizedPlay: response.results.gameSystems.data });
						commit('setPlans', { correlationId : correlationId, plans: response.results.plans });
						commit('setVersion', { correlationId : correlationId, version: response.results.version });
					}
				},
				async setSettings({ commit }, params) {
					commit('setSettings', params);
				}
			},
			getters: {
				getGameSystem: (state) => (id) => {
					if (state.gameSystems == null)
						return null;
					return state.gameSystems.find(gameSystem => gameSystem.id === id);
				},
				getOrganizedPlay: (state) => (id) => {
					if (state.organizedPlay == null)
						return null;
					return state.organizedPlay.find(gameSystem => gameSystem.id === id);
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
				setGameSystems(state, params) {
					this.$logger.debug('store', 'setGameSystems', 'gameSystems.a', params.gameSystems, params.correlationId);
					this.$logger.debug('store', 'setGameSystems', 'gameSystems.b', state.gameSystems, params.correlationId);
					state.gameSystems = params.gameSystems;
					this.$logger.debug('store', 'setGameSystems', 'gameSystems.c', state.gameSystems, params.correlationId);
				},
				setOrganizedPlay(state, params) {
					this.$logger.debug('store', 'setOrganizedPlay', 'organizedPlay.a', params.organizedPlay, params.correlationId);
					this.$logger.debug('store', 'setOrganizedPlay', 'organizedPlay.b', state.organizedPlay, params.correlationId);
					state.organizedPlay = params.organizedPlay;
					this.$logger.debug('store', 'setOrganizedPlay', 'organizedPlay.c', state.organizedPlay, params.correlationId);
				},
				setPlans(state, params) {
					this.$logger.debug('store', 'setPlans', 'plans.a', params.plans, params.correlationId);
					this.$logger.debug('store', 'setPlans', 'plans.b', state.plans, params.correlationId);
					state.plans = params.plans;
					this.$logger.debug('store', 'setPlans', 'plans.c', state.plans, params.correlationId);
				},
				setSettings(state, params) {
					state.settings = LibraryUtility.merge3({}, state.settings, params.settings);
				},
				setVersion(state, params) {
					this.$logger.debug('store', 'setVersion', 'version', params.version, params.correlationId);
					state.version = params.version;
				}
			},
			dispatcher: {
				async getGameSystems(correlationId) {
					await GlobalUtility.$store.dispatch('getGameSystems', correlationId);
				},
				async getOrganizedPlay(correlationId) {
					await GlobalUtility.$store.dispatch('getOrganizedPlay', correlationId);
				},
				async getPlans(correlationId) {
					await GlobalUtility.$store.dispatch('getPlans', correlationId);
				},
				async getVersion(correlationId) {
					await GlobalUtility.$store.dispatch('getVersion', correlationId);
				},
				async initialize(correlationId) {
					await GlobalUtility.$store.dispatch('initialize', correlationId);
				},
				async setSettings(correlationId, settings) {
					await GlobalUtility.$store.dispatch('setSettings', { correlationId: correlationId, settings: settings });
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
