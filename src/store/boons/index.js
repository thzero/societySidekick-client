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
		async getBoonListing({ commit }, gameSystemId) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await LibraryUtility.checksumUpdateCheck(crypto, this.state, commit, 'boons', gameSystemId))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_BOONS);
			const response = await service.listing(gameSystemId);
			this.$logger.debug('store.boons', 'setBoonListing', 'response', response);
			if (response.success) {
				commit('setBoonListing', response.success && response.results ? response.results.data : null);
				LibraryUtility.checksumUpdateComplete(crypto, this.state, commit, 'boons', gameSystemId);
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
		setBoonListing(state, listing) {
			this.$logger.debug('store.boons', 'setBoonListing', 'list.a', listing);
			this.$logger.debug('store.boons', 'setBoonListing', 'list..b', state.listing);
			if (!listing)
				return;
			listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('store.boons', 'setBoonListing', 'list..c', state.listing);
		}
	},
	dispatcher: {
		async getBoonListing(gameSystemId) {
			await Vue.prototype.$store.dispatch('getBoonListing', gameSystemId);
		}
	}
};

export default store;
