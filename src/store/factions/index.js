import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@thzero/library_client_vue/utility/index';

const store = {
	state: {
		listing: []
	},
	actions: {
		async getFactionListing({ commit }, params) {
			const crypto = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await LibraryUtility.checksumUpdateCheck(crypto, this.state, commit, 'factions', params.gameSystemId))
				return;
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_FACTIONS);
			const response = await service.listing(params.correlationId, params.gameSystemId);
			this.$logger.debug('store.factions', 'getFactionListing', 'response', response, params.correlationId);
			if (response.success) {
				const listing = response.success && response.results ? response.results.data : null;
				commit('setFactionListing', { correlationId: params.correlationId, listing: listing });
				LibraryUtility.checksumUpdateComplete(crypto, this.state, commit, 'factions', params.gameSystemId);
				return listing;
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
		setFactionListing(state, params) {
			this.$logger.debug('store.factions', 'setFactionListing', 'list.a', params.listing, params.correlationId);
			this.$logger.debug('store.factions', 'setFactionListing', 'list.b', state.listing, params.correlationId);
			if (!params.listing)
				return;
				params.listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('store.factions', 'setFactionListing', 'list.c', state.listing, params.correlationId);
		}
	},
	dispatcher: {
		async getFactionListing(correlationId, gameSystemId) {
			await GlobalUtility.$store.dispatch('getFactionListing', { correlationId: correlationId, gameSystemId: gameSystemId });
		}
	}
};

export default store;
