import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const storeCharacters = {
	pluginPersistPaths: {
		persist: [
			'characters',
			'charactersTtl',
			'status'
		]
	},
	state: () => ({
		characters: [],
		charactersTtl: 0,
		charactersTtlDiff: 1000 * 60 * 30,
		status: []
	}),
	actions: {
		async createCharacter(correlationId, details) {
			if (!details)
				return Response.error('store.characters', 'createCharacter', 'Invalid chraacter details.', null, null, null, correlationId);

			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(correlationId, details);
			this.$logger.debug('store.characters', 'createCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await setCharacterState(correlationId, response.results);
			return response;
		},
		async deleteCharacter(correlationid, characterId) {
			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.delete(correlationId, characterId);
			this.$logger.debug('store.characters', 'deleteCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await deleteCharacter(correlationId, characterId);
			return response;
		},
		async deleteCharacterBoon(correlationid, characterId, boonId) {
			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteBoon(correlationId, characterId, boonId);
			this.$logger.debug('store.characters', 'deleteCharacterBoon', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await setCharacterState(correlationId, response.results);
			return response;
		},
		async deleteCharacterInventory(correlationid, params) {
			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteInventory(correlationId, params.characterId, params.inventoryId);
			this.$logger.debug('store.characters', 'deleteCharacterInventory', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await setCharacterState(correlationId, response.results);
			return response;
		},
		async deleteCharacterScenario(correlationid, params) {
			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.deleteScenario(correlationId, params.characterId, params.scenarioId);
			this.$logger.debug('store.characters', 'deleteCharacterScenario', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await setCharacterState(correlationId, response.results);
			return response;
		},
		async getCharacter(correlationid, params) {
			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.fetch(correlationId, params.id);
			this.$logger.debug('store.characters', 'getCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await setCharacterState(correlationId, response.results ? response.results : null);
			return response;
		},
		async getCharacterListing(correlationId, gameSystemId) {
			const now = LibraryMomentUtility.getTimestamp();
			const ttlContent = this.listingTtl ? this.listingTtl : 0;
			const delta = now - ttlContent;
			// if (this.content && (this.content.length > 0) && (delta <= this.contentTtlDiff))
			if (this._checkTtl(this.content, delta, this.contentTtlDiff))
				return Response.success(correlationId, this.listing);

			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.characters', 'getCharacterListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				await setCharacterListing(correlationId, listing);
				return listing;
			}
			return [];
		},
		// eslint-disable-next-line
		async initializeCharacters(correlationid) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.initialize(correlationId);
			this.$logger.debug('store.characters', 'initializeCharacters', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await setCharacterLookups(correlationId, response.results ? response.results.lookups : null);
			return response;
		},
		async loadCharacterInventory(correlationid, characterId, gearSetId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.loadInventory(correlationId, characterId, gearSetId);
			this.$logger.debug('store.characters', 'loadCharacterInventory', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results)
				await setCharacterState(correlationId, response.results ? response.results : null);
			return response;
		},
		async setCharacter(correlationid, character) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
			const response = await service.create(correlationId, character);
			this.$logger.debug('store.characters', 'setCharacter', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await setCharacterState(correlationId, response.results ? response.results : null);
			return response;
		},
		setCharacterState(state, character) {
			this.$logger.debug('store.characters', 'setCharacter', 'item.a', character, correlationId);
			this.$logger.debug('store.characters', 'setCharacter', 'item.b', this.characters, correlationId);
			this.characters = LibraryUtility.updateArrayByObject(this.characters, character, correlationId, true);
			this.$logger.debug('store.characters', 'setCharacter', 'item.c', this.characters, correlationId);
		},
		async setCharacterListing(correlationId, results, sections) {
			this.$logger.debug('store.characters', 'setCharacterListing', 'list.a', results, correlationId);
			this.$logger.debug('store.characters', 'setCharacterListing', 'list.b', this.listing, correlationId);
			if (!params.listing)
				return;
			listing.forEach((item) => {
				this.listing = LibraryUtility.updateArrayByObject(this.listing, item, true);
			});

			if (sections) {
				let character;
				results.forEach((item) => {
					character = state.characters.find(l => l.id === item.id);
					if (character)
						character = LibraryUtility.merge2(character, item);
					else
						character = item;
					this.characters = LibraryUtility.updateArrayByObject(this.characters, character, true);
				});
			}
			else
				this.characters = results ? results : [];

			this.listingTtl = LibraryMomentUtility.getTimestamp();
			this.$logger.debug('store.characters', 'setCharacterListing', 'listing.c', this.listing, correlationId);
		},
		setCharacterLookups(correlationId, lookups) {
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.a', lookups, correlationId);
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.b', this.status, correlationId);
			this.status = lookups ? lookups.status : [];
			this.$logger.debug('store.characters', 'setCharacterLookups', 'list.c', this.status, correlationId);
		}
	},
	getters: {
		getCharacter(correlationId) {
			if (this.listing == null)
				return null;
			return this.listing.find(character => character.id === id);
		}
	},
	dispatcher: {
		
		async createCharacter(correlationId, details) {
			return await LibraryClientUtility.characters.$store.createCharacter(correlationId, details);
		},
		async deleteCharacter(correlationId, characterId) {
			return await LibraryClientUtility.characters.$store.deleteCharacter(correlationId, characterId);
		},
		async deleteCharacterBoon(correlationId, characterId, boonId) {
			return await LibraryClientUtility.characters.$store.deleteCharacterBoon(correlationId, characterId, boonId);
		},
		async deleteCharacterInventory(correlationId, characterId, inventoryId) {
			return await LibraryClientUtility.characters.$store.deleteCharacterInventory(correlationId, characterId, inventoryId);
		},
		async deleteCharacterScenario(correlationId, characterId, scenarioId) {
			return await LibraryClientUtility.characters.$store.deleteCharacterScenario(correlationId, characterId, scenarioId);
		},
		async getCharacter(correlationId, id) {
			return await LibraryClientUtility.characters.$store.getCharacter(correlationId, id);
		},
		async getCharacterListing(correlationId, sections) {
			await LibraryClientUtility.characters.$store.getCharacterListing(correlationId, sections);
		},
		async initializeCharacters(correlationId) {
			await LibraryClientUtility.characters.$store.initializeCharacters(correlationId);
		},
		async setCharacter(correlationId, character) {
			await LibraryClientUtility.characters.$store.setCharacter(correlationId, character);
		},
		async loadCharacterInventory(correlationId, characterId, gearSetId) {
			return await LibraryClientUtility.characters.$store.loadCharacterInventory(correlationId, characterId, gearSetId);
		},
		async updateCharacterBoon(correlationId, characterId, boon) {
			return await LibraryClientUtility.characters.$store.updateCharacterBoon(correlationId, characterId, boon);
		},
		async updateCharacterDetails(correlationId, details) {
			return await LibraryClientUtility.characters.$store.updateCharacterDetails(correlationId, details);
		},
		async updateCharacterInventory(correlationId, characterId, inventory) {
			return await LibraryClientUtility.characters.$store.updateCharacterInventory(correlationId, characterId, inventory);
		},
		async updateCharacterScenario(correlationId, characterId, scenario) {
			return await LibraryClientUtility.characters.$store.updateCharacterScenario(correlationId, characterId, scenario);
		}
	}
};

export default storeCharacters;
