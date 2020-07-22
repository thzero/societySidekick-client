import Vue from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library/constants';

import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		listing: [],
		played: []
	},
	actions: {
		async getScenarioListing({ commit }, gameSystemId) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await Utility.checksumUpdateCheck(crypto, this.state, commit, 'scenarios', gameSystemId))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.listing(gameSystemId);
			this.$logger.debug('getScenarioListing', response);
			if (response.success) {
				commit('setScenarioListing', response.success && response.results ? response.results.data : null);
				Utility.checksumUpdateComplete(crypto, this.state, commit, 'scenarios', gameSystemId);
			}
		},
		async getScenarioListingPlayed({ commit }, characterId) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.played(characterId);
			this.$logger.debug('getScenarioListingPlayed', response);
			commit('setScenarioListingPlayed', { played: response.success && response.results ? response.results : null, characterId: characterId });
		}
	},
	getters: {
		getScenario: (state) => (id) => {
			if (state.listing == null)
				return null;
			return state.listing.find(scenario => scenario.id === id);
		},
		getScenarioPlayed: (state) => (characterId) => {
			if (state.played == null)
				return null;
			const results = state.played.find(played => played.id === characterId);
			return results ? results.played : [];
		}
	},
	mutations: {
		setScenarioListing(state, listing) {
			this.$logger.debug('setScenarioListing.a', listing);
			this.$logger.debug('setScenarioListing.b', state.listing);
			if (!listing)
				return;

			listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('setScenarioListing.c', state.listing);
		},
		setScenarioListingPlayed(state, params) {
			this.$logger.debug('setScenarioListingPlayed.a', params);
			this.$logger.debug('setScenarioListingPlayed.b', state.played);
			const results = state.played.find(played => played.id === params.characterId);
			if (!results)
				state.played.push({ id: params.characterId, played: params.played });
			else
				results.played = params.played;
			this.$logger.debug('setScenarioListingPlayed.c', state.played);
		}
	},
	dispatcher: {
		async getScenarioListing(gameSystemId) {
			await Vue.prototype.$store.dispatch('getScenarioListing', gameSystemId);
		},
		async getScenarioListingPlayed(characterId) {
			return await Vue.prototype.$store.dispatch('getScenarioListingPlayed', characterId);
		}
	}
};

export default store;
