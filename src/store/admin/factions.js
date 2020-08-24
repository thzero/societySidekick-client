import Vue from 'vue';

import Constants from '@/constants';

import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		factions: null
	},
	actions: {
		async createAdminFaction({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.create(item);
			this.$logger.debug('store.admin.factions', 'createAdminFaction', 'response', response);
			if (response && response.success)
				commit('setAdminFactions', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteAdminFaction({ commit }, id) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.delete(id);
			this.$logger.debug('store.admin.factions', 'deleteAdminFaction', 'response', response);
			if (response && response.success)
				commit('deleteAdminFaction', id);
			return response;
		},
		async searchAdminFactions({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.search(params);
			this.$logger.debug('store.admin.factions', 'searchAdminFactions', 'response', response);
			commit('setAdminFactionsListing', response.success && response.results ? response.results.data : null);
		},
		async updateAdminFaction({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.update(item);
			this.$logger.debug('store.admin.factions', 'updateAdminFaction', 'response', response);
			if (response && response.success)
				commit('setAdminFactions', response.success && response.results ? response.results : null);
			return response;
		}
	},
	mutations: {
		deleteAdminFactions(state, id) {
			return Utility.deleteArrayById(state.factions, id);
		},
		setAdminFactions(state, item) {
			this.$logger.debug('store.admin.factions', 'setAdminFactions', 'item.a', item);
			this.$logger.debug('store.admin.factions', 'setAdminFactions', 'item.b', state.factions);
			state.factions = VueUtility.updateArrayById(state.factions, item);
			this.$logger.debug('store.admin.factions', 'setAdminFactions.c', state.factions);
		},
		setAdminFactionsListing(state, list) {
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list..a', list);
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.b', state.factions);
			state.factions = list;
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.c', state.factions);
		}
	},
	dispatcher: {
		async createAdminFaction(item) {
			return await Vue.prototype.$store.dispatch('createAdminFaction', item);
		},
		async deleteAdminFaction(id) {
			return await Vue.prototype.$store.dispatch('deleteAdminFaction', id);
		},
		async searchAdminFactions(params) {
			await Vue.prototype.$store.dispatch('searchAdminFactions', params);
		},
		async updateAdminFaction(item) {
			return await Vue.prototype.$store.dispatch('updateAdminFaction', item);
		}
	}
};

export default store;
