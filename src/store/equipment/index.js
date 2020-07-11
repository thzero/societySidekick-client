import Vue from 'vue';

import Constants from '@/constants';

import Utility from '@thzero/library/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		listing: []
	},
	actions: {
		async equipmentSearch({ commit }, params) {
			if (await Utility.checksumUpdateCheck(this.state, commit, 'equipment', params))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_EQUIPMENT);
			const response = await service.search(params.gameSystemId, params.params);
			this.$logger.debug('equipmentSearch', response);
			if (response.success && response.results && response.results.data) {
				commit('setEquipmentListing', response.results.data);
				Utility.checksumUpdateComplete(this.state, commit, 'equipment', params);
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
			this.$logger.debug('setEquipmentListing.a', listing);
			this.$logger.debug('setEquipmentListing.b', state.listing);
			if (!listing)
				return;
			listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('setEquipmentListing.c', state.listing);
		}
	},
	dispatcher: {
		async equipmentSearch(gameSystemId, params) {
			return await Vue.prototype.$store.dispatch('equipmentSearch', { gameSystemId: gameSystemId, params: params });
		}
	}
};

export default store;
