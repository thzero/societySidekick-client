import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		characters: [],
		status: []
	}),
	actions: {
		async createCharacter(correlationId, details) {
			if (!details)
				return Response.error('store.characters', 'createCharacter', 'Invalid chraacter details.', null, null, null, correlationId);

			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(correlationId, details);
			this.$logger.debug('store.characters', 'createCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setCharacter(correlationId, response.results);
			return response;
		},
		async deleteCharacter(correlationId, characterId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.delete(correlationId, characterId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				this.$logger.debug('store.characters', 'deleteCharacter', 'item.a', characterId, correlationId);
				this.$logger.debug('store.characters', 'deleteCharacter', 'item.b', this.characters, correlationId);
				LibraryUtility.deleteArrayById(this.characters, characterId);
				this.$logger.debug('store.characters', 'deleteCharacter', 'item.c', this.characters, correlationId);
			}
			return response;
		},
		async deleteCharacterBoon(correlationId, characterId, boonId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteBoon(correlationId, characterId, boonId);
			this.$logger.debug('store.characters', 'deleteCharacterBoon', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await this.setCharacter(correlationId, response.results);
			return response;
		},
		async deleteCharacterInventory(correlationId, characterId, inventoryId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteInventory(correlationId, characterId, inventoryId);
			this.$logger.debug('store.characters', 'deleteCharacterInventory', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await this.setCharacter(correlationId, response.results);
			return response;
		},
		async deleteCharacterScenario(correlationId, characterId, scenarioId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteScenario(correlationId, characterId, scenarioId);
			this.$logger.debug('store.characters', 'deleteCharacterScenario', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await this.setCharacter(correlationId, response.results);
			return response;
		},
		async getCharacter(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.fetch(correlationId, id);
			this.$logger.debug('store.characters', 'getCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setCharacter(correlationId, response.results ? response.results : null);
			return response;
		},
		async getCharacterListing(correlationId, sections) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			if (!LibraryClientUtility.$store.user.user)
				return;
			const response = await service.listing(correlationId, sections);
			this.$logger.debug('store.characters', 'getCharacterListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setCharacterListing(correlationId, response.results ? response.results.data : null, sections);
			return response;
		},
		// eslint-disable-next-line
		async initializeCharacters(correlationId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.initialize(correlationId);
			this.$logger.debug('store.characters', 'initializeCharacters', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setCharacterLookups(correlationId, response.results ? response.results.lookups : null);
			return response;
		},
		async loadCharacterInventory(correlationId, characterId, gearSetId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.loadInventory(correlationId, characterId, gearSetId);
			this.$logger.debug('store.characters', 'loadCharacterInventory', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await this.setCharacter(correlationId, response.results);
			return response;
		},
		async saveCharacter(correlationId, character) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(correlationId, character);
			this.$logger.debug('store.characters', 'setCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setCharacter(correlationId, response.results ? response.results : null);
			return response;
		},
		async updateCharacterBoon(correlationId, characterId, boon) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateBoon(correlationId, characterId, boon);
			this.$logger.debug('store.characters', 'updateCharacterBoon', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results) {
				await this.setCharacter(correlationId, response.results);
				LibraryClientUtility.$store.dispatcher.user.refreshUserSettings(correlationId);
			}
			return response;
		},
		async updateCharacterDetails(correlationId, details) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateDetails(correlationId, details);
			this.$logger.debug('store.characters', 'updateCharacterDetails', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results) {
				await this.setCharacter(correlationId, response.results);
				LibraryClientUtility.$store.dispatcher.user.refreshUserSettings(correlationId);
			}
			return response;
		},
		async updateCharacterInventory(correlationId, characterId, inventory) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateInventory(correlationId, characterId, inventory);
			this.$logger.debug('store.characters', 'updateCharacterInventory', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results) {
				await this.setCharacter(correlationId, response.results);
				LibraryClientUtility.$store.dispatcher.user.refreshUserSettings(correlationId);
			}
			return response;
		},
		async updateCharacterScenario(correlationId, characterId, scenario) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.updateScenario(correlationId, characterId, scenario);
			this.$logger.debug('store.characters', 'updateCharacterScenario', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results) {
				await this.setCharacter(correlationId, response.results);
				LibraryClientUtility.$store.dispatcher.user.refreshUserSettings(correlationId);
			}
			return response;
		},
		async setCharacter(correlationId, character) {
			this.$logger.debug('store.characters', 'setCharacter', 'item.a', character, correlationId);
			this.$logger.debug('store.characters', 'setCharacter', 'item.b', this.characters, correlationId);
			this.characters = LibraryUtility.updateArrayByObject(this.characters, character, correlationId, true);
			this.$logger.debug('store.characters', 'setCharacter', 'item.c', this.characters, correlationId);
		},
		async setCharacterListing(correlationId, results, sections) {
			this.$logger.debug('store.characters', 'setCharacterListing', 'params', { correlationId, results, sections }, correlationId);
			this.$logger.debug('store.characters', 'setCharacterListing', 'params.results', results, correlationId);
			this.$logger.debug('store.characters', 'setCharacterListing', 'params.sections', sections, correlationId);
			this.$logger.debug('store.characters', 'setCharacterListing', 'state.characters', this.characters, correlationId);
			if (sections) {
				let character;
				results.forEach((item) => {
					character = this.characters.find(l => l.id === item.id);
					if (character)
						character = LibraryUtility.merge2(character, item);
					else
						character = item;
					this.characters = LibraryUtility.updateArrayByObject(this.characters, character, true);
				});
			}
			else
				this.characters = results ? results : [];
			this.$logger.debug('store.characters', 'setCharacterListing', 'state.characters', this.characters, correlationId);
		},
		async setCharacterLookups(correlationId, lookups) {
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.a', lookups, correlationId);
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.b', this.status, correlationId);
			this.status = lookups ? lookups.status : [];
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.c', this.status, correlationId);
		}
	},
	getters: {
		getCharacter(correlationId, id) {
			if (LibraryClientUtility.$store.characters.characters == null)
				return null;
			return LibraryClientUtility.$store.characters.characters.find(character => character.id === id);
		}
	},
	dispatcher: {
		async createCharacter(correlationId, details) {
			return await LibraryClientUtility.$store.characters.createCharacter(correlationId, details);
		},
		async deleteCharacter(correlationId, characterId) {
			return await LibraryClientUtility.$store.characters.deleteCharacter(correlationId, characterId);
		},
		async deleteCharacterBoon(correlationId, characterId, boonId) {
			return await LibraryClientUtility.$store.characters.deleteCharacterBoon(correlationId, characterId, boonId);
		},
		async deleteCharacterInventory(correlationId, characterId, inventoryId) {
			return await LibraryClientUtility.$store.characters.deleteCharacterInventory(correlationId, characterId, inventoryId);
		},
		async deleteCharacterScenario(correlationId, characterId, scenarioId) {
			return await LibraryClientUtility.$store.characters.deleteCharacterScenario(correlationId, characterId, scenarioId);
		},
		async getCharacter(correlationId, id) {
			return await LibraryClientUtility.$store.characters.getCharacter(correlationId, id);
		},
		async getCharacterListing(correlationId, sections) {
			await LibraryClientUtility.$store.characters.getCharacterListing(correlationId, sections);
		},
		async initializeCharacters(correlationId) {
			await LibraryClientUtility.$store.characters.initializeCharacters(correlationId);
		},
		async setCharacter(correlationId, character) {
			await LibraryClientUtility.$store.characters.saveCharacter(correlationId, character);
		},
		async loadCharacterInventory(correlationId, characterId, gearSetId) {
			return await LibraryClientUtility.$store.characters.loadCharacterInventory(correlationId, characterId, gearSetId);
		},
		async updateCharacterBoon(correlationId, characterId, boon) {
			return await LibraryClientUtility.$store.characters.updateCharacterBoon(correlationId, characterId, boon);
		},
		async updateCharacterDetails(correlationId, details) {
			return await LibraryClientUtility.$store.characters.updateCharacterDetails(correlationId, details);
		},
		async updateCharacterInventory(correlationId, characterId, inventory) {
			return await LibraryClientUtility.$store.characters.updateCharacterInventory(correlationId, characterId, inventory);
		},
		async updateCharacterScenario(correlationId, characterId, scenario) {
			return await LibraryClientUtility.$store.characters.updateCharacterScenario(correlationId, characterId, scenario);
		}
	}
};

export default store;
