import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@thzero/library_client_vue/utility/index';

const store = {
	state: {
		classes: null
	},
	actions: {
		async createAdminClass({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.create(params.correlationId, params.item);
			this.$logger.debug('store.admin.classes', 'createAdminClass', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminClasses', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		},
		async deleteAdminClass({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.delete(params.correlationId, params.id);
			this.$logger.debug('store.admin.classes', 'deleteAdminClass', 'response', response, params.correlationId);
			if (response && response.success)
				commit('deleteAdminClass', { correlationId: params.correlationId, id: params.id });
			return response;
		},
		async searchAdminClasses({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.search(params.correlationId, params.params);
			this.$logger.debug('store.admin.classes', 'searchAdminClasses', 'response', response, params.correlationId);
			commit('setAdminClassesListing', { correlationId: params.correlationId, list: response.success && response.results ? response.results.data : null });
		},
		async updateAdminClass({ commit }, params) {
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.update(params.correlationId, params.item);
			this.$logger.debug('store.admin.classes', 'updateAdminClass', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminClasses', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		}
	},
	mutations: {
		deleteAdminClass(state, params) {
			return LibraryUtility.deleteArrayById(state.classes, params.id);
		},
		setAdminClasses(state, params) {
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.a', params.item, params.correlationId);
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.b', state.classes, params.correlationId);
			state.classes = LibraryUtility.updateArrayByObject(state.classes, params.item, true);
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.c', state.classes, params.correlationId);
		},
		setAdminClassesListing(state, params) {
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.a', params.list, params.correlationId);
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.b', state.classes, params.correlationId);
			state.classes = params.list;
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.c', state.classes, params.correlationId);
		}
	},
	dispatcher: {
		async createAdminClass(correlationId, item) {
			return await GlobalUtility.$store.dispatch('createAdminClass', { correlationId: correlationId, item: item });
		},
		async deleteAdminClass(correlationId, id) {
			return await GlobalUtility.$store.dispatch('deleteAdminClass', { correlationId: correlationId, id: id });
		},
		async searchAdminClasses(correlationId, params) {
			await GlobalUtility.$store.dispatch('searchAdminClasses', { correlationId: correlationId, params: params });
		},
		async updateAdminClass(correlationId, item) {
			return await GlobalUtility.$store.dispatch('updateAdminClass', { correlationId: correlationId, item: item });
		}
	}
};

export default store;
