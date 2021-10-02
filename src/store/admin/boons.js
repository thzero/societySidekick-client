import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@thzero/library_client_vue/utility/index';

const store = {
	state: {
		boons: null
	},
	actions: {
		async createAdminBoon({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.create(params.correlationId, params.item);
			this.$logger.debug('store.admin.boons', 'createAdminBoon', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminBoons', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		},
		async deleteAdminBoon({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.delete(params.correlationId, params.id);
			this.$logger.debug('store.admin.boons', 'deleteAdminBoon', 'response', response, params.correlationId);
			if (response && response.success)
				commit('deleteAdminBoon', { correlationId: params.correlationId, id: params.id });
			return response;
		},
		async searchAdminBoons({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.search(params.correlationId, params.params);
			this.$logger.debug('store.admin.boons', 'searchAdminBoons', 'response', response, params.correlationId);
			commit('setAdminBoonsListing', { correlationId: params.correlationId, list: response.success && response.results ? response.results.data : null });
		},
		async updateAdminBoon({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.update(params.correlationId, params.item);
			this.$logger.debug('store.admin.boons', 'updateAdminBoon', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminBoons', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		}
	},
	mutations: {
		deleteAdminBoon(state, params) {
			return LibraryUtility.deleteArrayById(state.boons, params.id);
		},
		setAdminBoons(state, params) {
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.a', params.item, params.correlationId);
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.b', state.boons, params.correlationId);
			state.boons = LibraryUtility.updateArrayByObject(state.boons, params.item, true);
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.c', state.boons, params.correlationId);
		},
		setAdminBoonsListing(state, params) {
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.a', params.list, params.correlationId);
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.b', state.boons, params.correlationId);
			state.boons = params.list;
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.c', state.boons, params.correlationId);
		}
	},
	dispatcher: {
		async createAdminBoon(correlationId, item) {
			return await GlobalUtility.$store.dispatch('createAdminBoon', { correlationId: correlationId, item: item });
		},
		async deleteAdminBoon(correlationId, id) {
			return await GlobalUtility.$store.dispatch('deleteAdminBoon', { correlationId: correlationId, id: id });
		},
		async searchAdminBoons(correlationId, params) {
			await GlobalUtility.$store.dispatch('searchAdminBoons', { correlationId: correlationId, params: params });
		},
		async updateAdminBoon(correlationId, item) {
			return await GlobalUtility.$store.dispatch('updateAdminBoon', { correlationId: correlationId, item: item });
		}
	}
};

export default store;
