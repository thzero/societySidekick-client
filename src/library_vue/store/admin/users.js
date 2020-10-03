import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '../../utility/index';

const store = {
	state: {
		users: null
	},
	actions: {
		async deleteAdminUser({ commit }, id) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.delete(id);
			this.$logger.debug('store.admin.users', 'deleteAdminUser', 'response', response);
			if (response && response.success) {
				commit('deleteAdminUser', id);
				Vue.prototype.$store.dispatcher.users.delete(id);
			}
			return response;
		},
		async searchAdminUsers({ commit }, params) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.search(params);
			this.$logger.debug('store.admin.users', 'searchAdminUsers', 'response', response);
			commit('setAdminUsersListing', response.success && response.results ? response.results.data : null);
		},
		async updateAdminUser({ commit }, item) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.update(item);
			this.$logger.debug('store.admin.users', 'updateAdminUser', 'response', response);
			if (response && response.success)
				commit('setAdminUsers', response.success && response.results ? response.results : null);
			return response;
		}
	},
	mutations: {
		deleteAdminUser(state, id) {
			return LibraryUtility.deleteArrayById(state.users, id);
		},
		setAdminUsers(state, item) {
			this.$logger.debug('store.admin.users', 'setAdminUsers', 'items.a', item);
			this.$logger.debug('store.admin.users', 'setAdminUsers', 'items.b', state.users);
			state.users = VueUtility.updateArrayById(state.users, item);
			this.$logger.debug('store.admin.users', 'setAdminUsers', 'items.c', state.users);
		},
		setAdminUsersListing(state, list) {
			this.$logger.debug('store.admin.users', 'setAdminUsersListing', 'list.a', list);
			this.$logger.debug('store.admin.users', 'setAdminUsersListing', 'list.b', state.users);
			state.users = list;
			this.$logger.debug('store.admin.users', 'setAdminUsersListing', 'list.c', state.users);
		}
	},
	dispatcher: {
		async deleteAdminUser(id) {
			return await Vue.prototype.$store.dispatch('deleteAdminUser', id);
		},
		async searchAdminUsers(params) {
			await Vue.prototype.$store.dispatch('searchAdminUsers', params);
		},
		async updateAdminUser(item) {
			return await Vue.prototype.$store.dispatch('updateAdminUser', item);
		}
	}
};

export default store;
