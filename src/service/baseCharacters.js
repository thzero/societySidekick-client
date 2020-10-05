import LibraryConstants from '@thzero/library_client/constants';

import CharactersRestExternalService from '@/service/charactersExternalRest';

class CharactersService extends CharactersRestExternalService {
	async create(correlationId, value) {
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters', value);
			this._logger.debug('CharactersService', 'create', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'create', err, correlationId);
		}

		return this._error('CharactersService', 'create', null, null, null, null, correlationId);
	}

	async delete(correlationId, characterId) {
		try {
			const response = await this._serviceCommunicationRest.delete(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters', params: [ characterId ] });
			this._logger.debug('CharactersService', 'delete', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'delete', err);
		}

		return this._error('CharactersService', 'delete', null, null, null, null, correlationId);
	}

	async deleteBoon(correlationId, characterId, boonId) {
		try {
			const response = await this._serviceCommunicationRest.delete(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/boon', params: [ characterId, boonId ] });
			this._logger.debug('CharactersService', 'deleteBoon', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'deleteBoon', err, correlationId);
		}

		return this._error('CharactersService', 'deleteBoon', null, null, null, null, correlationId);
	}

	async deleteInventory(correlationId, characterId, inventoryId) {
		try {
			const response = await this._serviceCommunicationRest.delete(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/inventory', params: [ characterId, inventoryId ] });
			this._logger.debug('CharactersService', 'deleteInventory', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'deleteInventory', err, correlationId);
		}

		return this._error('CharactersService', 'deleteInventory', null, null, null, null, correlationId);
	}

	async deleteScenario(correlationId, characterId, scenarioId) {
		try {
			const response = await this._serviceCommunicationRest.delete(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/scenario', params: [ characterId, scenarioId ] });
			this._logger.debug('CharactersService', 'deleteScenario', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'deleteScenario', err, correlationId);
		}

		return this._error('CharactersService', 'deleteScenario', null, null, null, null, correlationId);
	}

	async fetch(correlationId, id) {
		try {
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters', id);
			this._logger.debug('CharactersService', 'fetch', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'fetch', err, correlationId);
		}

		return this._error('CharactersService', 'fetch', null, null, null, null, correlationId);
	}

	async fetchNumber(correlationId, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters/number', gameSystemId);
			this._logger.debug('CharactersService', 'fetch', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'fetchNumber', err, correlationId);
		}

		return this._error('CharactersService', 'fetchNumber', null, null, null, null, correlationId);
	}

	async initialize(correlationId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters/initialize');
			this._logger.debug('CharactersService', 'initialize', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'initialize', err, correlationId);
		}

		return this._error('CharactersService', 'initialize', null, null, null, null, correlationId);
	}

	async listing(correlationId, sections) {
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing' }, sections);
			this._logger.debug('CharactersService', 'listing', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listing', err, correlationId);
		}

		return this._error('CharactersService', 'listing', null, null, null, null, correlationId);
	}

	async listingByFavorites(correlationId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/favorites' });
			this._logger.debug('CharactersService', 'listingByFavorites', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listingByFavorites', err, correlationId);
		}

		return this._error('CharactersService', 'listingByFavorites', null, null, null, null, correlationId);
	}

	async listingByGamerTag(correlationId, gamerTag, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/gamerTag', params: [ gamerTag, gameSystemId ] });
			this._logger.debug('CharactersService', 'listingByGamerTag', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listingByGamerTag', err, correlationId);
		}

		return this._error('CharactersService', 'listingByGamerTag', null, null, null, null, correlationId);
	}

	async listingByShortId(correlationId, id, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/gamerId', params: [ id, gameSystemId ] });
			this._logger.debug('CharactersService', 'listingByShortId', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'listingByShortId', err, correlationId);
		}

		return this._error('CharactersService', 'listingByShortId', null, null, null, null, correlationId);
	}

	async loadInventory(correlationId, characterId, gearSetId) {
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/inventory/load', params: [ characterId, gearSetId ] });
			this._logger.debug('CharactersService', 'loadInventory', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'loadInventory', err, correlationId);
		}

		return this._error('CharactersService', 'loadInventory', null, null, null, null, correlationId);
	}

	async update(correlationId, character) {
		try {
			const response = await this._serviceCommunicationRest.postById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters', character.id, character);
			this._logger.debug('CharactersService', 'update', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'update', err, correlationId);
		}

		return this._error('CharactersService', 'update', null, null, null, null, correlationId);
	}

	async updateBoon(correlationId, characterId, boon) {
		try {
			const response = await this._serviceCommunicationRest.postById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters/boon', characterId, boon);
			this._logger.debug('CharactersService', 'update', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateBoon', err, correlationId);
		}

		return this._error('CharactersService', 'updateBoon', null, null, null, null, correlationId);
	}

	async updateDetails(correlationId, details) {
		try {
			const response = await this._serviceCommunicationRest.postById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters/details', details.id, details);
			this._logger.debug('CharactersService', 'updateDetails', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateDetails', err, correlationId);
		}

		return this._error('CharactersService', 'updateDetails', null, null, null, null, correlationId);
	}

	async updateInventory(correlationId, characterId, inventory) {
		try {
			const response = await this._serviceCommunicationRest.postById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters/inventory', characterId, inventory);
			this._logger.debug('CharactersService', 'updateInventory', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateInventory', err, correlationId);
		}

		return this._error('CharactersService', 'updateInventory', null, null, null, null, correlationId);
	}

	async updateScenario(correlationId, characterId, scenario) {
		try {
			const response = await this._serviceCommunicationRest.postById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'characters/scenario', characterId, scenario);
			this._logger.debug('CharactersService', 'updateScenario', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'updateScenario', err, correlationId);
		}

		return this._error('CharactersService', 'updateScenario', null, null, null, null, correlationId);
	}

	async valid(correlationId, name) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/valid', params: [ encodeURI(name) ] });
			this._logger.debug('CharactersService', 'valid', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('CharactersService', 'valid', err, correlationId);
		}

		return this._error('CharactersService', 'valid', null, null, null, null, correlationId);
	}
}

export default CharactersService;
