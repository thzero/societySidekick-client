import Vue from 'vue';

import Constants from '@/constants';

import Utility from '@thzero/library/utility';
import VueUtility from '@/library_vue/utility/index';

import Response from '@thzero/library/response';

const store = {
	state: {
		characters: [],
		status: []
	},
	actions: {
		async createCharacter({ commit }, value) {
			if (!value)
				return Response.error();
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(value);
			this.$logger.debug('createCharacter', response);
			if (response && response.success)
				commit('setCharacter', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteCharacter({ commit }, characterId) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.delete(characterId);
			this.$logger.debug('deleteCharacter', response);
			if (response && response.success)
				commit('deleteCharacter', characterId);
			return response;
		},
		async deleteCharacterBoon({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteBoon(params.characterId, params.boonId);
			this.$logger.debug('deleteCharacterBoon', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async deleteCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteInventory(params.characterId, params.inventoryId);
			this.$logger.debug('deleteCharacterInventory', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async deleteCharacterScenario({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteScenario(params.characterId, params.scenarioId);
			this.$logger.debug('deleteCharacterScenario', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async getCharacter({ commit }, id) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.fetch(id);
			this.$logger.debug('getCharacter', response);
			if (response && response.success)
				commit('setCharacter', response.results ? response.results : null);
			return response;
		},
		async getCharacterListing({ commit }, sections) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			if (!this.state.user.user)
				return;
			const response = await service.listing(sections);
			this.$logger.debug('getCharacterListing', response);
			if (response && response.success)
				commit('setCharacterListing', { results: response.success && response.results ? response.results.data : null, sections: sections });
		},
		// eslint-disable-next-line
		async initializeCharacters({ commit }) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.initialize();
			this.$logger.debug('initializeCharacters', response);
			commit('setCharacterLookups', response.success && response.results ? response.results.lookups : null);
		},
		async loadCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.loadInventory(params.characterId, params.gearSetId);
			this.$logger.debug('loadCharacterInventory', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async setCharacter({ commit }, character) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(character);
			this.$logger.debug('setCharacter', response);
			commit('setCharacter', response.success && response.results ? response.results : null);
			return response;
		},
		async updateCharacterBoon({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateBoon(params.characterId, params.boon);
			this.$logger.debug('updateCharacterBoon', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async updateCharacterDetails({ commit }, details) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateDetails(details);
			this.$logger.debug('updateCharacterDetails', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async updateCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateInventory(params.characterId, params.inventory);
			this.$logger.debug('updateCharacterInventory', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async updateCharacterScenario({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateScenario(params.characterId, params.scenario);
			this.$logger.debug('updateCharacterScenario', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		}
	},
	getters: {
		getCharacter: (state) => (id) => {
			if (state.characters == null)
				return null;
			return state.characters.find(character => character.id === id);
		}
	},
	mutations: {
		deleteCharacter(state, characterId) {
			this.$logger.debug('setCharacter.a', characterId);
			this.$logger.debug('setCharacter.b', state.characters);
			Utility.deleteArrayById(state.characters, characterId);
			this.$logger.debug('setCharacter.c', state.characters);
		},
		setCharacter(state, character) {
			this.$logger.debug('setCharacter.a', character);
			this.$logger.debug('setCharacter.b', state.characters);
			state.characters = VueUtility.updateArrayById(state.characters, character);
			this.$logger.debug('setCharacter.c', state.characters);
		},
		setCharacterListing(state, params) {
			this.$logger.debug('setCharacterListing.a', params);
			this.$logger.debug('setCharacterListing.a', params.results);
			this.$logger.debug('setCharacterListing.a', params.sections);
			this.$logger.debug('setCharacterListing.b', state.characters);
			if (params.sections) {
				let character;
				params.results.forEach((item) => {
					character = state.characters.find(l => l.id === item.id);
					if (character)
						character = Utility.merge2(character, item);
					else
						character = item;
					state.characters = VueUtility.updateArrayById(state.characters, character);
				});
			}
			else
				state.characters = params.results ? params.results : [];
			this.$logger.debug('setCharacterListing.c', state.characters);
		},
		setCharacterLookups(state, lookups) {
			this.$logger.debug('setCharacterLookups.a', lookups);
			this.$logger.debug('setCharacterLookups.b', state.status);
			state.status = lookups ? lookups.status : [];
			this.$logger.debug('setCharacterLookups.c', state.status);
		}
	},
	dispatcher: {
		async createCharacter(gameSystemId, name, number) {
			return await Vue.prototype.$store.dispatch('createCharacter', { gameSystemId: gameSystemId, name: name, number: number });
		},
		async deleteCharacter(characterId) {
			return await Vue.prototype.$store.dispatch('deleteCharacter', characterId);
		},
		async deleteCharacterBoon(characterId, boonId) {
			return await Vue.prototype.$store.dispatch('deleteCharacterBoon', { characterId: characterId, boonId: boonId});
		},
		async deleteCharacterInventory(characterId, inventoryId) {
			return await Vue.prototype.$store.dispatch('deleteCharacterInventory', { characterId: characterId, inventoryId: inventoryId});
		},
		async deleteCharacterScenario(characterId, scenarioId) {
			return await Vue.prototype.$store.dispatch('deleteCharacterScenario', { characterId: characterId, scenarioId: scenarioId});
		},
		async getCharacter(id) {
			return await Vue.prototype.$store.dispatch('getCharacter', id);
		},
		async getCharacterListing(sections) {
			await Vue.prototype.$store.dispatch('getCharacterListing', sections);
		},
		async initializeCharacters() {
			await Vue.prototype.$store.dispatch('initializeCharacters');
		},
		async setCharacter(character) {
			await Vue.prototype.$store.dispatch('setCharacter', character);
		},
		async loadCharacterInventory(characterId, gearSetId) {
			return await Vue.prototype.$store.dispatch('loadCharacterInventory', { characterId: characterId, gearSetId: gearSetId});
		},
		async updateCharacterBoon(characterId, boon) {
			return await Vue.prototype.$store.dispatch('updateCharacterBoon', { characterId: characterId, boon: boon});
		},
		async updateCharacterDetails(details) {
			return await Vue.prototype.$store.dispatch('updateCharacterDetails', details);
		},
		async updateCharacterInventory(characterId, inventory) {
			return await Vue.prototype.$store.dispatch('updateCharacterInventory', { characterId: characterId, inventory: inventory});
		},
		async updateCharacterScenario(characterId, scenario) {
			return await Vue.prototype.$store.dispatch('updateCharacterScenario', { characterId: characterId, scenario: scenario});
		}
	}
};

export default store;
