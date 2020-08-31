import Vue from 'vue';

import Constants from '@/constants';

import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		boons: null
	},
	actions: {
		async createAdminBoon({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.create(item);
			this.$logger.debug('store.admin.boons', 'createAdminBoon', 'response', response);
			if (response && response.success)
				commit('setAdminBoons', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteAdminBoon({ commit }, id) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.delete(id);
			this.$logger.debug('store.admin.boons', 'deleteAdminBoon', 'response', response);
			if (response && response.success)
				commit('deleteAdminBoon', id);
			return response;
		},
		async searchAdminBoons({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.search(params);
			this.$logger.debug('store.admin.boons', 'searchAdminBoons', 'response', response);
			commit('setAdminBoonsListing', response.success && response.results ? response.results.data : null);
		},
		async updateAdminBoon({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.update(item);
			this.$logger.debug('store.admin.boons', 'updateAdminBoon', 'response', response);
			if (response && response.success)
				commit('setAdminBoons', response.success && response.results ? response.results : null);
			return response;
		}
	},
	mutations: {
		deleteAdminBoon(state, id) {
			return Utility.deleteArrayById(state.boons, id);
		},
		setAdminBoons(state, item) {
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.a', item);
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.b', state.boons);
			state.boons = VueUtility.updateArrayById(state.boons, item);
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.c', state.boons);
		},
		setAdminBoonsListing(state, list) {
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.a', list);
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.b', state.boons);
			state.boons = list;
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.c', state.boons);
		}
	},
	dispatcher: {
		async createAdminBoon(item) {
			return await Vue.prototype.$store.dispatch('createAdminBoon', item);
		},
		async deleteAdminBoon(id) {
			return await Vue.prototype.$store.dispatch('deleteAdminBoon', id);
		},
		async searchAdminBoons(params) {
			await Vue.prototype.$store.dispatch('searchAdminBoons', params);
		},
		async updateAdminBoon(item) {
			return await Vue.prototype.$store.dispatch('updateAdminBoon', item);
		}
	}
};

export default store;
