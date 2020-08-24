import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import Utility from '@thzero/library_common/utility';

const store = {
	state: {
		latest: null
	},
	actions: {
		async deleteNews({ commit }, id) {
			commit('deleteNews', id);
		},
		async getLatestNews({ commit }) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_NEWS);
			const response = await service.latest();
			this.$logger.debug('store.news', 'getLatestNews', 'response', response);
			commit('setLatestNews', response.success && response.results ? response.results.data : null);
		}
	},
	mutations: {
		deleteNews(state, id) {
			Utility.deleteArrayById(state.latest, id);
		},
		setLatestNews(state, latest) {
			this.$logger.debug('store.news', 'setLatest', 'item.a', latest);
			this.$logger.debug('store.news', 'setLatest', 'item.b', state.latest);
			state.latest = latest;
			this.$logger.debug('store.news', 'setLatest', 'item.c', state.latest);
		}
	},
	dispatcher: {
		async delete(id) {
			await Vue.prototype.$store.dispatch('deleteNews', id);
		},
		async getLatest() {
			await Vue.prototype.$store.dispatch('getLatestNews');
		}
	}
};

export default store;
