import Vue from 'vue';

import Constants from '@/constants';

import Utility from '@thzero/library/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		scenarios: null
	},
	actions: {
		async createAdminScenario({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.create(item);
			this.$logger.debug('createAdminScenario', response);
			if (response && response.success)
				commit('setAdminScenarios', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteAdminScenario({ commit }, id) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.delete(id);
			this.$logger.debug('deleteAdminScenario', response);
			if (response && response.success) {
				commit('deleteAdminScenario', id);
				Vue.prototype.$store.dispatcher.scenarios.delete(id);
			}
			return response;
		},
		async searchAdminScenarios({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.search(params);
			this.$logger.debug('searchAdminScenarios', response);
			commit('setAdminScenariosListing', response.success && response.results ? response.results.data : null);
		},
		async updateAdminScenario({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.update(item);
			this.$logger.debug('updateAdminScenario', response);
			if (response && response.success)
				commit('setAdminScenarios', response.success && response.results ? response.results : null);
			return response;
		}
	},
	getters: {
		getAdminScenario: (state) => (id) => {
			if (state.scenarios == null)
				return null;
			return state.scenarios.find(scenario => scenario.id === id);
		}
	},
	mutations: {
		deleteAdminScenario(state, id) {
			return Utility.deleteArrayById(state.scenarios, id);
		},
		setAdminScenarios(state, item) {
			this.$logger.debug('setAdminScenarios.a', item);
			this.$logger.debug('setAdminScenarios.b', state.scenarios);
			state.scenarios = VueUtility.updateArrayById(state.scenarios, item);
			this.$logger.debug('setAdminScenarios.c', state.scenarios);
		},
		setAdminScenariosListing(state, list) {
			this.$logger.debug('setAdminScenariosListing.a', list);
			this.$logger.debug('setAdminScenariosListing.b', state.scenarios);
			state.scenarios = list;
			this.$logger.debug('setAdminScenariosListing.c', state.scenarios);
		}
	},
	dispatcher: {
		async createAdminScenario(item) {
			return await Vue.prototype.$store.dispatch('createAdminScenario', item);
		},
		async deleteAdminScenario(id) {
			return await Vue.prototype.$store.dispatch('deleteAdminScenario', id);
		},
		async searchAdminScenarios(params) {
			await Vue.prototype.$store.dispatch('searchAdminScenarios', params);
		},
		async updateAdminScenario(item) {
			return await Vue.prototype.$store.dispatch('updateAdminScenario', item);
		}
	}
};

export default store;
