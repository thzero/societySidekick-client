import Vue from 'vue';

import Constants from '@/constants';

import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		equipment: null
	},
	actions: {
		async createAdminEquipment({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.create(item);
			this.$logger.debug('createAdminEquipment', response);
			if (response && response.success)
				commit('setAdminEquipment', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteAdminEquipment({ commit }, id) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.delete(id);
			this.$logger.debug('deleteAdminEquipment', response);
			if (response && response.success)
				commit('deleteAdminEquipment', id);
			return response;
		},
		async searchAdminEquipment({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.search(params);
			this.$logger.debug('searchAdminEquipment', response);
			commit('setAdminEquipmentListing', response.success && response.results ? response.results.data : null);
		},
		async updateAdminEquipment({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.update(item);
			this.$logger.debug('updateAdminEquipment', response);
			if (response && response.success)
				commit('setAdminEquipment', response.success && response.results ? response.results : null);
			return response;
		}
	},
	mutations: {
		deleteAdminEquipment(state, id) {
			return Utility.deleteArrayById(state.equipment, id);
		},
		setAdminEquipment(state, item) {
			this.$logger.debug('setAdminEquipment.a', item);
			this.$logger.debug('setAdminEquipment.b', state.equipment);
			state.equipment = VueUtility.updateArrayById(state.equipment, item);
			this.$logger.debug('setAdminEquipment.c', state.equipment);
		},
		setAdminEquipmentListing(state, list) {
			this.$logger.debug('setAdminEquipmentListing.a', list);
			this.$logger.debug('setAdminEquipmentListing.b', state.equipment);
			state.equipment = list;
			this.$logger.debug('setAdminEquipmentListing.c', state.equipment);
		}
	},
	dispatcher: {
		async createAdminEquipment(item) {
			return await Vue.prototype.$store.dispatch('createAdminEquipment', item);
		},
		async deleteAdminEquipment(id) {
			return await Vue.prototype.$store.dispatch('deleteAdminEquipment', id);
		},
		async searchEquipment(params) {
			await Vue.prototype.$store.dispatch('searchAdminEquipment', params);
		},
		async updateAdminEquipment(item) {
			return await Vue.prototype.$store.dispatch('updateAdminEquipment', item);
		}
	}
};

export default store;
