import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@thzero/library_client_vue/utility/index';

const store = {
	state: {
		scenarios: null
	},
	actions: {
		async createAdminScenario({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.create(params.correlationId, params.item);
			this.$logger.debug('store.admin', 'createAdminScenario', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminScenarios', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		},
		async deleteAdminScenario({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.delete(params.correlationId, params.id);
			this.$logger.debug('store.admin', 'deleteAdminScenario', 'response', response, params.correlationId);
			if (response && response.success)
				commit('deleteAdminScenario', { correlationId: params.correlationId, id: params.id });
			return response;
		},
		async searchAdminScenarios({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.search(params.correlationId, params.params);
			this.$logger.debug('store.admin', 'searchAdminScenarios', 'response', response, params.correlationId);
			commit('setAdminScenariosListing', { correlationId: params.correlationId, list: response.success && response.results ? response.results.data : null });
		},
		async updateAdminScenario({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.update(params.correlationId, params.item);
			this.$logger.debug('store.admin', 'updateAdminScenario', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminScenarios', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
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
		deleteAdminScenario(state, params) {
			return LibraryUtility.deleteArrayById(state.scenarios, params.id);
		},
		setAdminScenarios(state, params) {
			this.$logger.debug('store.admin', 'setAdminScenarios', 'item.a', params.item, params.correlationId);
			this.$logger.debug('store.admin', 'setAdminScenarios', 'item.b', state.scenarios, params.correlationId);
			state.scenarios = LibraryUtility.updateArrayByObject(state.scenarios, params.item, true);
			this.$logger.debug('store.admin', 'setAdminScenarios', 'item.c', state.scenarios, params.correlationId);
		},
		setAdminScenariosListing(state, params) {
			this.$logger.debug('store.admin', 'setAdminScenariosListing', 'list.a', params.list, params.correlationId);
			this.$logger.debug('store.admin', 'setAdminScenariosListing', 'list.b', state.scenarios, params.correlationId);
			state.scenarios = params.list;
			this.$logger.debug('store.admin', 'setAdminScenariosListing', 'list.c', state.scenarios, params.correlationId);
		}
	},
	dispatcher: {
		async createAdminScenario(correlationId, item) {
			return await GlobalUtility.$store.dispatch('createAdminScenario', { correlationId: correlationId, item: item });
		},
		async deleteAdminScenario(correlationId, id) {
			return await GlobalUtility.$store.dispatch('deleteAdminScenario', { correlationId: correlationId, id: id });
		},
		async searchAdminScenarios(correlationId, params) {
			await GlobalUtility.$store.dispatch('searchAdminScenarios', { correlationId: correlationId, params: params });
		},
		async updateAdminScenario(correlationId, item) {
			return await GlobalUtility.$store.dispatch('updateAdminScenario', { correlationId: correlationId, item: item });
		}
	}
};

export default store;
