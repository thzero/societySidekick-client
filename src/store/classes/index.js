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
		async getClassListing({ commit }, gameSystemId) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await Utility.checksumUpdateCheck(crypto, this.state, commit, 'classes', gameSystemId))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CLASSES);
			const response = await service.listing(gameSystemId);
			this.$logger.debug('setClassListing', response);
			if (response.success) {
				commit('setClassListing', response.success && response.results ? response.results.data : null);
				Utility.checksumUpdateComplete(crypto, this.state, commit, 'classes', gameSystemId);
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
		setClassListing(state, listing) {
			this.$logger.debug('setClassListing.a', listing);
			this.$logger.debug('setClassListing.b', state.listing);
			if (!listing)
				return;
			listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('setClassListing.c', state.listing);
		}
	},
	dispatcher: {
		async getClassListing(gameSystemId) {
			await Vue.prototype.$store.dispatch('getClassListing', gameSystemId);
		}
	}
};

export default store;
