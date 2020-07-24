import Vue from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library/constants';

import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		listing: []
	},
	actions: {
		async getFactionListing({ commit }, gameSystemId) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await Utility.checksumUpdateCheck(crypto, this.state, commit, 'factions', gameSystemId))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_FACTIONS);
			const response = await service.listing(gameSystemId);
			this.$logger.debug('getFactionListing', response);
			if (response.success) {
				commit('setFactionListing', response.success && response.results ? response.results.data : null);
				Utility.checksumUpdateComplete(crypto, this.state, commit, 'factions', gameSystemId);
			}
		}
	},
	getters: {
		getFaction: (state) => (id) => {
			if (state.listing == null)
				return null;
			return state.listing.find(faction => faction.id === id);
		}
	},
	mutations: {
		setFactionListing(state, listing) {
			this.$logger.debug('setFactionListing.a', listing);
			this.$logger.debug('setFactionListing.b', state.listing);
			if (!listing)
				return;
			listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('setFactionListing.c', state.listing);
		}
	},
	dispatcher: {
		async getFactionListing(gameSystemId) {
			await Vue.prototype.$store.dispatch('getFactionListing', gameSystemId);
		}
	}
};

export default store;
