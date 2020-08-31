import Vue from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		listing: []
	},
	actions: {
		async equipmentSearch({ commit }, params) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await Utility.checksumUpdateCheck(crypto, this.state, commit, 'equipment', params))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_EQUIPMENT);
			const response = await service.search(params.gameSystemId, params.params);
			this.$logger.debug('store.equipment', 'equipmentSearch', 'response', response);
			if (response.success && response.results && response.results.data) {
				commit('setEquipmentListing', response.results.data);
				Utility.checksumUpdateComplete(crypto, this.state, commit, 'equipment', params);
				return response.results.data;
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
		setEquipmentListing(state, listing) {
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.a', listing);
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.b', state.listing);
			if (!listing)
				return;
			listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.c', state.listing);
		}
	},
	dispatcher: {
		async equipmentSearch(gameSystemId, params) {
			return await Vue.prototype.$store.dispatch('equipmentSearch', { gameSystemId: gameSystemId, params: params });
		}
	}
};

export default store;
