import Vue from 'vue';

import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		listing: [],
		played: []
	},
	actions: {
		async getScenarioListing({ commit }, params) {
			const crypto = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_CRYPTO);
			if (await LibraryUtility.checksumUpdateCheck(crypto, this.state, commit, 'scenarios', params.gameSystemId))
				return;
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.listing(params.correlationId, params.gameSystemId);
			this.$logger.debug('store.scenarios', 'getScenarioListing', 'response', response, params.correlationId);
			if (response.success) {
				const listing = response.success && response.results ? response.results.data : null;
				commit('setScenarioListing', { correlationId: params.correlationId, listing: listing });
				LibraryUtility.checksumUpdateComplete(crypto, this.state, commit, 'scenarios', params.gameSystemId);
				return listing;
			}
		},
		async getScenarioListingPlayed({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.played(params.correlationId, params.characterId);
			this.$logger.debug('store.scenarios', 'getScenarioListingPlayed', 'response', response, params.correlationId);
			commit('setScenarioListingPlayed', { correlationId: params.correlationId, played: response.success && response.results ? response.results : null, characterId: params.characterId });
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
		setScenarioListing(state, params) {
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.a', params.listing, params.correlationId);
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.b', state.listing, params.correlationId);
			if (!params.listing)
				return;

				params.listing.forEach((item) => {
				state.listing = VueUtility.updateArrayById(state.listing, item);
			});
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.c', state.listing, params.correlationId);
		},
		setScenarioListingPlayed(state, params) {
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.a', params, params.correlationId);
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.b', state.played, params.correlationId);
			const results = state.played.find(played => played.id === params.characterId);
			if (!results)
				state.played.push({ id: params.characterId, played: params.played });
			else
				results.played = params.played;
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.c', state.played, params.correlationId);
		}
	},
	dispatcher: {
		async getScenarioListing(correlationId, gameSystemId) {
			await Vue.prototype.$store.dispatch('getScenarioListing', { correlationId: correlationId, gameSystemId: gameSystemId });
		},
		async getScenarioListingPlayed(correlationId, characterId) {
			return await Vue.prototype.$store.dispatch('getScenarioListingPlayed', { correlationId: correlationId, characterId: characterId });
		}
	}
};

export default store;
