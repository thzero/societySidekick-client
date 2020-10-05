import Vue from 'vue';

import Constants from '@/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		equipment: null
	},
	actions: {
		async createAdminEquipment({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.create(params.correlationId, params.item);
			this.$logger.debug('store.admin.equipment', 'createAdminEquipment', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminEquipment', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		},
		async deleteAdminEquipment({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.delete(params.correlationId, params.id);
			this.$logger.debug('store.admin.equipment', 'deleteAdminEquipment', 'response', response, params.correlationId);
			if (response && response.success)
				commit('deleteAdminEquipment', { correlationId: params.correlationId, id: params.id });
			return response;
		},
		async searchAdminEquipment({ commit }, params) {
			const service = this._vm.$injector.getSparamservice(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.search(params.correlationId, params.params);
			this.$logger.debug('store.admin.equipment', 'searchAdminEquipment', 'response', response, params.correlationId);
			commit('setAdminEquipmentListing', { correlationId: params.correlationId, list: response.success && response.results ? response.results.data : null });
		},
		async updateAdminEquipment({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.update(params.correlationId, params.item);
			this.$logger.debug('store.admin.equipment', 'updateAdminEquipment', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setAdminEquipment', { correlationId: params.correlationId, item: response.success && response.results ? response.results : null });
			return response;
		}
	},
	mutations: {
		deleteAdminEquipment(state, params) {
			return LibraryUtility.deleteArrayById(state.equipment, params.id);
		},
		setAdminEquipment(state, params) {
			this.$logger.debug('store.admin.equipment', 'setAdminEquipment', 'item.a', params.item, params.correlationId);
			this.$logger.debug('store.admin.equipment', 'setAdminEquipment', 'item.b', state.equipment, params.correlationId);
			state.equipment = VueUtility.updateArrayById(state.equipment, params.item);
			this.$logger.debug('store.admin.equipment', 'setAdminEquipment', 'item.c', state.equipment, params.correlationId);
		},
		setAdminEquipmentListing(state, params) {
			this.$logger.debug('store.admin.equipment', 'setAdminEquipmentListing', 'list.a', params.list, params.correlationId);
			this.$logger.debug('store.admin.equipment', 'setAdminEquipmentListing', 'list.b', state.equipment, params.correlationId);
			state.equipment = params.list;
			this.$logger.debug('store.admin.equipment', 'setAdminEquipmentListing', 'list.c', state.equipment, params.correlationId);
		}
	},
	dispatcher: {
		async createAdminEquipment(correlationId, item) {
			return await Vue.prototype.$store.dispatch('createAdminEquipment', { correlationId: correlationId, item: item });
		},
		async deleteAdminEquipment(correlationId, id) {
			return await Vue.prototype.$store.dispatch('deleteAdminEquipment', { correlationId: correlationId, id: id });
		},
		async searchEquipment(correlationId, params) {
			await Vue.prototype.$store.dispatch('searchAdminEquipment', { correlationId: correlationId, params: params });
		},
		async updateAdminEquipment(correlationId, item) {
			return await Vue.prototype.$store.dispatch('updateAdminEquipment', { correlationId: correlationId, item: item });
		}
	}
};

export default store;
