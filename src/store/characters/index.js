import Vue from 'vue';

import Constants from '@/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

import Response from '@thzero/library_common/response';

const store = {
	state: {
		characters: [],
		status: []
	},
	actions: {
		async createCharacter({ commit }, params) {
			if (!params.value)
				return Response.error('store.characters', 'createCharacter', 'Invalid chraacter value.', null, null, null, params.correlationId);

			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(params.correlationId, params.value);
			this.$logger.debug('store.characters', 'createCharacter', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async deleteCharacter({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.delete(params.correlationId, params.characterId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'response', response, params.correlationId);
			if (response && response.success)
				commit('deleteCharacter', { correlationId: params.correlationId, characterId: params.characterId });
			return response;
		},
		async deleteCharacterBoon({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteBoon(params.correlationId, params.characterId, params.boonId);
			this.$logger.debug('store.characters', 'deleteCharacterBoon', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async deleteCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteInventory(params.correlationId, params.characterId, params.inventoryId);
			this.$logger.debug('store.characters', 'deleteCharacterInventory', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async deleteCharacterScenario({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteScenario(params.correlationId, params.characterId, params.scenarioId);
			this.$logger.debug('store.characters', 'deleteCharacterScenario', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async getCharacter({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.fetch(params.correlationId, params.id);
			this.$logger.debug('store.characters', 'getCharacter', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results ? response.results : null });
			return response;
		},
		async getCharacterListing({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			if (!this.state.user.user)
				return;
			const response = await service.listing(params.correlationId, params.sections);
			this.$logger.debug('store.characters', 'getCharacterListing', 'response', response, params.correlationId);
			if (response && response.success)
				commit('setCharacterListing', { correlationId: params.correlationId, results: response.success && response.results ? response.results.data : null, sections: params.sections });
		},
		// eslint-disable-next-line
		async initializeCharacters({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.initialize(params.correlationId);
			this.$logger.debug('store.characters', 'initializeCharacters', 'response', response, params.correlationId);
			commit('setCharacterLookups', { correlationId: params.correlationId, lookups: response.success && response.results ? response.results.lookups : null });
		},
		async loadCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.loadInventory(params.correlationId, params.characterId, params.gearSetId);
			this.$logger.debug('store.characters', 'loadCharacterInventory', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async setCharacter({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(params.correlationId, params.character);
			this.$logger.debug('store.characters', 'setCharacter', 'response', response, params.correlationId);
			commit('setCharacter', { correlationId: params.correlationId, character: response.success && response.results ? response.results : null });
			return response;
		},
		async updateCharacterBoon({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateBoon(params.correlationId, params.characterId, params.boon);
			this.$logger.debug('store.characters', 'updateCharacterBoon', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async updateCharacterDetails({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateDetails(params.correlationId, params.details);
			this.$logger.debug('store.characters', 'updateCharacterDetails', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async updateCharacterInventory({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateInventory(params.correlationId, params.characterId, params.inventory);
			this.$logger.debug('store.characters', 'updateCharacterInventory', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
			return response;
		},
		async updateCharacterScenario({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateScenario(params.correlationId, params.characterId, params.scenario);
			this.$logger.debug('store.characters', 'updateCharacterScenario', 'response', response, params.correlationId);
			if (response && response.success && response.results)
				commit('setCharacter', { correlationId: params.correlationId, character: response.results });
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
		deleteCharacter(state, params) {
			this.$logger.debug('store.characters', 'deleteCharacter', 'item.a', params.characterId, params.correlationId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'item.b', state.characters, params.correlationId);
			LibraryUtility.deleteArrayById(state.characters, params.characterId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'item.c', state.characters, params.correlationId);
		},
		setCharacter(state, params) {
			this.$logger.debug('store.characters', 'setCharacter', 'item.a', params.character, params.correlationId);
			this.$logger.debug('store.characters', 'setCharacter', 'item.b', state.characters, params.correlationId);
			state.characters = VueUtility.updateArrayById(state.characters, params.character, params.correlationId);
			this.$logger.debug('store.characters', 'setCharacter', 'item.c', state.characters, params.correlationId);
		},
		setCharacterListing(state, params) {
			this.$logger.debug('store.characters', 'setCharacterListing', 'params', params, params.correlationId);
			this.$logger.debug('store.characters', 'setCharacterListing', 'params.results', params.results, params.correlationId);
			this.$logger.debug('store.characters', 'setCharacterListing', 'params.sections', params.sections, params.correlationId);
			this.$logger.debug('store.characters', 'setCharacterListing', 'state.characters', state.characters, params.correlationId);
			if (params.sections) {
				let character;
				params.results.forEach((item) => {
					character = state.characters.find(l => l.id === item.id);
					if (character)
						character = LibraryUtility.merge2(character, item);
					else
						character = item;
					state.characters = VueUtility.updateArrayById(state.characters, character);
				});
			}
			else
				state.characters = params.results ? params.results : [];
			this.$logger.debug('store.characters', 'setCharacterListing', 'state.characters', state.characters, params.correlationId);
		},
		setCharacterLookups(state, params) {
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.a', params.lookups, params.correlationId);
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.b', state.status, params.correlationId);
			state.status = params.lookups ? params.lookups.status : [];
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.c', state.status, params.correlationId);
		}
	},
	dispatcher: {
		async createCharacter(correlationId, gameSystemId, name, number) {
			return await Vue.prototype.$store.dispatch('createCharacter', { correlationId: correlationId, gameSystemId: gameSystemId, name: name, number: number });
		},
		async deleteCharacter(correlationId, characterId) {
			return await Vue.prototype.$store.dispatch('deleteCharacter', { correlationId: correlationId, characterId: characterId });
		},
		async deleteCharacterBoon(correlationId, characterId, boonId) {
			return await Vue.prototype.$store.dispatch('deleteCharacterBoon', { correlationId: correlationId, characterId: characterId, boonId: boonId});
		},
		async deleteCharacterInventory(correlationId, characterId, inventoryId) {
			return await Vue.prototype.$store.dispatch('deleteCharacterInventory', { correlationId: correlationId, characterId: characterId, inventoryId: inventoryId});
		},
		async deleteCharacterScenario(correlationId, characterId, scenarioId) {
			return await Vue.prototype.$store.dispatch('deleteCharacterScenario', { correlationId: correlationId, characterId: characterId, scenarioId: scenarioId});
		},
		async getCharacter(correlationId, id) {
			return await Vue.prototype.$store.dispatch('getCharacter', { correlationId: correlationId, id: id });
		},
		async getCharacterListing(correlationId, sections) {
			await Vue.prototype.$store.dispatch('getCharacterListing', { correlationId: correlationId, sections: sections });
		},
		async initializeCharacters(correlationId) {
			await Vue.prototype.$store.dispatch('initializeCharacters', { correlationId: correlationId });
		},
		async setCharacter(correlationId, character) {
			await Vue.prototype.$store.dispatch('setCharacter', { correlationId: correlationId, character: character });
		},
		async loadCharacterInventory(correlationId, characterId, gearSetId) {
			return await Vue.prototype.$store.dispatch('loadCharacterInventory', { correlationId: correlationId, characterId: characterId, gearSetId: gearSetId});
		},
		async updateCharacterBoon(correlationId, characterId, boon) {
			return await Vue.prototype.$store.dispatch('updateCharacterBoon', { correlationId: correlationId, characterId: characterId, boon: boon});
		},
		async updateCharacterDetails(correlationId, details) {
			return await Vue.prototype.$store.dispatch('updateCharacterDetails', { correlationId: correlationId, details: details });
		},
		async updateCharacterInventory(correlationId, characterId, inventory) {
			return await Vue.prototype.$store.dispatch('updateCharacterInventory', { correlationId: correlationId, characterId: characterId, inventory: inventory});
		},
		async updateCharacterScenario(correlationId, characterId, scenario) {
			return await Vue.prototype.$store.dispatch('updateCharacterScenario', { correlationId: correlationId, characterId: characterId, scenario: scenario});
		}
	}
};

export default store;
