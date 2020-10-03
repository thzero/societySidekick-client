import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '../../utility/index';

const store = {
	state: {
		news: null
	},
	actions: {
		async createAdminNews({ commit }, item) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.create(item);
			this.$logger.debug('store.admin.news', 'createAdminNews', 'response', response);
			if (response && response.success)
				commit('setAdminNews', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteAdminNews({ commit }, id) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.delete(id);
			this.$logger.debug('store.admin.news', 'deleteAdminNews', 'response', response);
			if (response && response.success) {
				commit('deleteAdminNews', id);
				Vue.prototype.$store.dispatcher.news.delete(id);
			}
			return response;
		},
		async searchAdminNews({ commit }, params) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.search(params);
			this.$logger.debug('store.admin.news', 'searchAdminNews', 'response', response);
			commit('setAdminNewsListing', response.success && response.results ? response.results.data : null);
		},
		async updateAdminNews({ commit }, item) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.update(item);
			this.$logger.debug('store.admin.news', 'updateAdminNews', 'response', response);
			if (response && response.success)
				commit('setAdminNews', response.success && response.results ? response.results : null);
			return response;
		}
	},
	mutations: {
		deleteAdminNews(state, id) {
			return LibraryUtility.deleteArrayById(state.news, id);
		},
		setAdminNews(state, item) {
			this.$logger.debug('store.admin.news', 'setAdminNews', 'items.a', item);
			this.$logger.debug('store.admin.news', 'setAdminNews', 'items.b', state.news);
			state.news = VueUtility.updateArrayById(state.news, item);
			this.$logger.debug('store.admin.news', 'setAdminNews', 'items.c', state.news);
		},
		setAdminNewsListing(state, list) {
			this.$logger.debug('store.admin.news', 'setAdminNewsListing', 'list.a', list);
			this.$logger.debug('store.admin.news', 'setAdminNewsListing', 'list.b', state.news);
			state.news = list;
			this.$logger.debug('store.admin.news', 'setAdminNewsListing', 'list.c', state.news);
		}
	},
	dispatcher: {
		async createAdminNews(item) {
			return await Vue.prototype.$store.dispatch('createAdminNews', item);
		},
		async deleteAdminNews(id) {
			return await Vue.prototype.$store.dispatch('deleteAdminNews', id);
		},
		async searchNews(params) {
			await Vue.prototype.$store.dispatch('searchAdminNews', params);
		},
		async updateAdminNews(item) {
			return await Vue.prototype.$store.dispatch('updateAdminNews', item);
		}
	}
};

export default store;
