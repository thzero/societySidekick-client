import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';

const store = {
	state: {
		latest: null
	},
	actions: {
		async deleteNews({ commit }, params) {
			commit('deleteNews', params);
		},
		async getLatestNews({ commit }, correlationId) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_NEWS);
			const response = await service.latest(correlationId);
			this.$logger.debug('store.news', 'getLatestNews', 'response', response);
			commit('setLatestNews', { correlationId: correlationId, latest: response.success && response.results ? response.results.data : null });
		}
	},
	mutations: {
		deleteNews(state, params) {
			LibraryUtility.deleteArrayById(state.latest, params.id);
		},
		setLatestNews(state, params) {
			this.$logger.debug('store.news', 'setLatest', 'item.a', params.latest, params.correlationId);
			this.$logger.debug('store.news', 'setLatest', 'item.b', state.latest, params.correlationId);
			state.latest = params.latest;
			this.$logger.debug('store.news', 'setLatest', 'item.c', state.latest, params.correlationId);
		}
	},
	dispatcher: {
		async delete(correlationId, id) {
			await Vue.prototype.$store.dispatch('deleteNews', { correlationId: correlationId, id: id });
		},
		async getLatest(correlationId) {
			await Vue.prototype.$store.dispatch('getLatestNews', correlationId);
		}
	}
};

export default store;
