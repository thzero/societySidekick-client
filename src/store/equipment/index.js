import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: {
		listing: []
	},
	actions: {
		async equipmentSearch({ commit }, params) {
			const crypto = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await LibraryUtility.checksumUpdateCheck(crypto, this.state, commit, 'equipment', params.params))
				return;
			const service = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EQUIPMENT);
			const response = await service.search(params.correlationId, params.gameSystemId, params.params);
			this.$logger.debug('store.equipment', 'equipmentSearch', 'response', response, params.correlationId);
			if (Response.hasSucceeded(response) && response.results && response.results.data) {
				const listing = response.results ? response.results.data : null;
				commit('setEquipmentListing', { correlationId: params.correlationId, listing: listing });
				LibraryUtility.checksumUpdateComplete(crypto, this.state, commit, 'equipment', params.params);
				return listing;
			}
			return [];
		}
	},
	getters: {
		getEquipment: (state) => (id) => {
			if (state.listing == null)
				return null;
			return state.listing.find(item => item.id === id);
		}
	},
	mutations: {
		setEquipmentListing(state, params) {
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.a', params.listing, params.correlationId);
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.b', state.listing, params.correlationId);
			if (!params.listing)
				return;
				params.listing.forEach((item) => {
				state.listing = LibraryUtility.updateArrayByObject(state.listing, item, true);
			});
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.c', state.listing, params.correlationId);
		}
	},
	dispatcher: {
		async equipmentSearch(correlationId, gameSystemId, params) {
			return await GlobalUtility.$store.dispatch('equipmentSearch', { correlationId: correlationId, gameSystemId: gameSystemId, params: params });
		}
	}
};

export default store;
