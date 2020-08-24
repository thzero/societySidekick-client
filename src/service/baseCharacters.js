import LibraryConstants from '@thzero/library_client/constants';

import CharactersRestExternalService from '@/service/charactersExternalRest';

class CharactersService extends CharactersRestExternalService {
	async create(value) {
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, 'characters', value);
			this._logger.debug('CharactersService', 'create', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'create', err);
		}

		return this._error('CharactersService', 'create');
	}

	async delete(characterId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters', params: [ characterId ] });
			this._logger.debug('CharactersService', 'delete', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'delete', err);
		}

		return this._error();
	}

	async deleteBoon(characterId, boonId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/boon', params: [ characterId, boonId ] });
			this._logger.debug('CharactersService', 'deleteBoon', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'deleteBoon', err);
		}

		return this._error('CharactersService', 'deleteBoon');
	}

	async deleteInventory(characterId, inventoryId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/inventory', params: [ characterId, inventoryId ] });
			this._logger.debug('CharactersService', 'deleteInventory', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'deleteInventory', err);
		}

		return this._error('CharactersService', 'deleteInventory');
	}

	async deleteScenario(characterId, scenarioId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/scenario', params: [ characterId, scenarioId ] });
			this._logger.debug('CharactersService', 'deleteScenario', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'deleteScenario', err);
		}

		return this._error('CharactersService', 'deleteScenario');
	}

	async fetch(id) {
		try {
			const response = await this._serviceCommunicationRest.getById(LibraryConstants.ExternalKeys.BACKEND, 'characters', id);
			this._logger.debug('CharactersService', 'fetch', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'fetch', err);
		}

		return this._error('CharactersService', 'fetch');
	}

	async fetchNumber(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.getById(LibraryConstants.ExternalKeys.BACKEND, 'characters/number', gameSystemId);
			this._logger.debug('CharactersService', 'fetch', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'fetchNumber', err);
		}

		return this._error('CharactersService', 'fetchNumber');
	}

	async initialize() {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'characters/initialize');
			this._logger.debug('CharactersService', 'initialize', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'initialize', err);
		}

		return this._error('CharactersService', 'initialize');
	}

	async listing(sections) {
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing' }, sections);
			this._logger.debug('CharactersService', 'listing', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listing', err);
		}

		return this._error('CharactersService', 'listing');
	}

	async listingByFavorites() {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/favorites' });
			this._logger.debug('CharactersService', 'listingByFavorites', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listingByFavorites', err);
		}

		return this._error('CharactersService', 'listingByFavorites');
	}

	async listingByGamerTag(gamerTag, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/gamerTag', params: [ gamerTag, gameSystemId ] });
			this._logger.debug('CharactersService', 'listingByGamerTag', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listingByGamerTag', err);
		}

		return this._error('CharactersService', 'listingByGamerTag');
	}

	async listingByShortId(id, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/gamerId', params: [ id, gameSystemId ] });
			this._logger.debug('CharactersService', 'listingByShortId', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listingByShortId', err);
		}

		return this._error('CharactersService', 'listingByShortId');
	}

	async loadInventory(characterId, gearSetId) {
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/inventory/load', params: [ characterId, gearSetId ] });
			this._logger.debug('CharactersService', 'loadInventory', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'loadInventory', err);
		}

		return this._error('CharactersService', 'loadInventory');
	}

	async update(character) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters', character.id, character);
			this._logger.debug('CharactersService', 'update', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'update', err);
		}

		return this._error('CharactersService', 'update');
	}

	async updateBoon(characterId, boon) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/boon', characterId, boon);
			this._logger.debug('CharactersService', 'update', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateBoon', err);
		}

		return this._error('CharactersService', 'updateBoon');
	}

	async updateDetails(details) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/details', details.id, details);
			this._logger.debug('CharactersService', 'updateDetails', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateDetails', err);
		}

		return this._error('CharactersService', 'updateDetails');
	}

	async updateInventory(characterId, inventory) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/inventory', characterId, inventory);
			this._logger.debug('CharactersService', 'updateInventory', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateInventory', err);
		}

		return this._error('CharactersService', 'updateInventory');
	}

	async updateScenario(characterId, scenario) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/scenario', characterId, scenario);
			this._logger.debug('CharactersService', 'updateScenario', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateScenario', err);
		}

		return this._error('CharactersService', 'updateScenario');
	}

	async valid(name) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/valid', params: [ encodeURI(name) ] });
			this._logger.debug('CharactersService', 'valid', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'valid', err);
		}

		return this._error('CharactersService', 'valid');
	}
}

export default CharactersService;
