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
		async getBoonListing({ commit }, params) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await LibraryUtility.checksumUpdateCheck(crypto, this.state, commit, 'boons', params.gameSystemId))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_BOONS);
			const response = await service.listing(params.correlationId, params.gameSystemId);
			this.$logger.debug('store.boons', 'setBoonListing', 'response', response, params.correlationId);
			if (response.success) {
				const listing = response.success && response.results ? response.results.data : null;
				commit('setBoonListing', { correlationId: params.correlationId, listing: listing });
				LibraryUtility.checksumUpdateComplete(crypto, this.state, commit, 'boons', params.gameSystemId);
				return listing;
			}
		}
	},
	getters: {
		getBoon: (state) => (id) => {
			if (state.listing == null)
				return null;
			return state.listing.find(boon => boon.id === id);
		}
	},
	mutations: {
		setBoonListing(state, params) {
			this.$logger.debug('store.boons', 'setBoonListing', 'list.a', params.listing, params.correlationId);
			this.$logger.debug('store.boons', 'setBoonListing', 'list..b', state.listing, params.correlationId);
			if (!params.listing)
				return;
			params.listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('store.boons', 'setBoonListing', 'list..c', state.listing, params.correlationId);
		}
	},
	dispatcher: {
		async getBoonListing(correlationId, gameSystemId) {
			await Vue.prototype.$store.dispatch('getBoonListing', { correlationId: correlationId, gameSystemId: gameSystemId });
		}
	}
};

export default store;
