import Vue from 'vue';

import Constants from '@/constants';

import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

import Response from '@thzero/library_common/response';

const store = {
	state: {
		characters: [],
		status: []
	},
	actions: {
		async createCharacter({ commit }, value) {
			if (!value)
				return Response.error('Invalid chraacter value.');

			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(value);
			this.$logger.debug('store.characters', 'createCharacter', 'response', response);
			if (response && response.success)
				commit('setCharacter', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteCharacter({ commit }, characterId) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.delete(characterId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'response', response);
			if (response && response.success)
				commit('deleteCharacter', characterId);
			return response;
		},
		async deleteCharacterBoon({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteBoon(params.characterId, params.boonId);
			this.$logger.debug('store.characters', 'deleteCharacterBoon', 'response', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async deleteCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteInventory(params.characterId, params.inventoryId);
			this.$logger.debug('store.characters', 'deleteCharacterInventory', 'response', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async deleteCharacterScenario({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteScenario(params.characterId, params.scenarioId);
			this.$logger.debug('store.characters', 'deleteCharacterScenario', 'response', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async getCharacter({ commit }, id) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.fetch(id);
			this.$logger.debug('store.characters', 'getCharacter', 'response', response);
			if (response && response.success)
				commit('setCharacter', response.results ? response.results : null);
			return response;
		},
		async getCharacterListing({ commit }, sections) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			if (!this.state.user.user)
				return;
			const response = await service.listing(sections);
			this.$logger.debug('store.characters', 'getCharacterListing', 'response', response);
			if (response && response.success)
				commit('setCharacterListing', { results: response.success && response.results ? response.results.data : null, sections: sections });
		},
		// eslint-disable-next-line
		async initializeCharacters({ commit }) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.initialize();
			this.$logger.debug('store.characters', 'initializeCharacters', 'response', response);
			commit('setCharacterLookups', response.success && response.results ? response.results.lookups : null);
		},
		async loadCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.loadInventory(params.characterId, params.gearSetId);
			this.$logger.debug('store.characters', 'loadCharacterInventory', 'response', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async setCharacter({ commit }, character) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(character);
			this.$logger.debug('store.characters', 'setCharacter', 'response', response);
			commit('setCharacter', response.success && response.results ? response.results : null);
			return response;
		},
		async updateCharacterBoon({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateBoon(params.characterId, params.boon);
			this.$logger.debug('store.characters', 'updateCharacterBoon', 'response', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async updateCharacterDetails({ commit }, details) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateDetails(details);
			this.$logger.debug('store.characters', 'updateCharacterDetails', 'response', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async updateCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateInventory(params.characterId, params.inventory);
			this.$logger.debug('store.characters', 'updateCharacterInventory', 'response', response);
			if (response && response.success && response.results)
				commit('setCharacter', response.results);
			return response;
		},
		async updateCharacterScenario({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateScenario(params.characterId, params.scenario);
			this.$logger.debug('store.characters', 'updateCharacterScenario', 'response', response);
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
			this.$logger.debug('store.characters', 'deleteCharacter', 'item.a', characterId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'item.b', state.characters);
			Utility.deleteArrayById(state.characters, characterId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'item.c', state.characters);
		},
		setCharacter(state, character) {
			this.$logger.debug('store.characters', 'setCharacter', 'item.a', character);
			this.$logger.debug('store.characters', 'setCharacter', 'item.b', state.characters);
			state.characters = VueUtility.updateArrayById(state.characters, character);
			this.$logger.debug('store.characters', 'setCharacter', 'item.c', state.characters);
		},
		setCharacterListing(state, params) {
			this.$logger.debug('store.characters', 'setCharacterListing', 'params', params);
			this.$logger.debug('store.characters', 'setCharacterListing', 'params.results', params.results);
			this.$logger.debug('store.characters', 'setCharacterListing', 'params.sections', params.sections);
			this.$logger.debug('store.characters', 'setCharacterListing', 'state.characters', state.characters);
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
			this.$logger.debug('store.characters', 'setCharacterListing', 'state.characters', state.characters);
		},
		setCharacterLookups(state, lookups) {
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.a', lookups);
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.b', state.status);
			state.status = lookups ? lookups.status : [];
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.c', state.status);
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
