import Vue from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		listing: []
	},
	actions: {
		async getClassListing({ commit }, params) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await LibraryUtility.checksumUpdateCheck(crypto, this.state, commit, 'classes', params.gameSystemId))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CLASSES);
			const response = await service.listing(params.correlationId, params.gameSystemId);
			this.$logger.debug('store.classes', 'setClassListing', 'response', response, params.correlationId);
			if (response.success) {
				const listing = response.success && response.results ? response.results.data : null;
				commit('setClassListing', { correlationId: params.correlationId, listing: listing });
				LibraryUtility.checksumUpdateComplete(crypto, this.state, commit, 'classes', params.gameSystemId);
				return listing;
			}
		}
	},
	getters: {
		getClass: (state) => (id) => {
			if (state.listing == null)
				return null;
			return state.listing.find(item => item.id === id);
		}
	},
	mutations: {
		setClassListing(state, params) {
			this.$logger.debug('store.classes', 'setClassListing', 'list.a', params.listing, params.correlationId);
			this.$logger.debug('store.classes', 'setClassListing', 'list.b', state.listing, params.correlationId);
			if (!params.listing)
				return;
				params.listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('store.classes', 'setClassListing', 'list.c', state.listing, params.correlationId);
		}
	},
	dispatcher: {
		async getClassListing(correlationId, gameSystemId) {
			await Vue.prototype.$store.dispatch('getClassListing', { correlationId: correlationId, gameSystemId: gameSystemId });
		}
	}
};

export default store;
