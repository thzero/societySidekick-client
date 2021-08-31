import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@thzero/library_client_vue/utility/index';

const store = {
	state: {
		factions: null
	},
	actions: {
		async createAdminFaction({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.create(params.correlationId, params.item);
			this.$logger.debug('store.admin.factions', 'createAdminFaction', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminFactions', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		},
		async deleteAdminFaction({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.delete(params.correlationId, params.id);
			this.$logger.debug('store.admin.factions', 'deleteAdminFaction', 'response', response, params.correlationId);
			if (response && response.success)
				commit('deleteAdminFaction', { correlationId: params.correlationId, id: params.id });
			return response;
		},
		async searchAdminFactions({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.search(params.correlationId, params.params);
			this.$logger.debug('store.admin.factions', 'searchAdminFactions', 'response', response, params.correlationId);
			commit('setAdminFactionsListing', { correlationId: params.correlationId, list: response.success && response.results ? response.results.data : null });
		},
		async updateAdminFaction({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.update(params.correlationId, params.item);
			this.$logger.debug('store.admin.factions', 'updateAdminFaction', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminFactions', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		}
	},
	mutations: {
		deleteAdminFactions(state, params) {
			return LibraryUtility.deleteArrayById(state.factions, params.id);
		},
		setAdminFactions(state, params) {
			this.$logger.debug('store.admin.factions', 'setAdminFactions', 'item.a', params.item, params.correlationId);
			this.$logger.debug('store.admin.factions', 'setAdminFactions', 'item.b', state.factions, params.correlationId);
			state.factions = VueUtility.updateArrayById(state.factions, params.item);
			this.$logger.debug('store.admin.factions', 'setAdminFactions.c', state.factions, params.correlationId);
		},
		setAdminFactionsListing(state, params) {
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.a', params.list, params.correlationId);
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.b', state.factions, params.correlationId);
			state.factions = params.list;
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.c', state.factions, params.correlationId);
		}
	},
	dispatcher: {
		async createAdminFaction(correlationId, item) {
			return await GlobalUtility.$store.dispatch('createAdminFaction', { correlationId: correlationId, item: item });
		},
		async deleteAdminFaction(correlationId, id) {
			return await GlobalUtility.$store.dispatch('deleteAdminFaction', { correlationId: correlationId, id: id });
		},
		async searchAdminFactions(correlationId, params) {
			await GlobalUtility.$store.dispatch('searchAdminFactions', { correlationId: correlationId, params: params });
		},
		async updateAdminFaction(correlationId, item) {
			return await GlobalUtility.$store.dispatch('updateAdminFaction', { correlationId: correlationId, item: item });
		}
	}
};

export default store;
