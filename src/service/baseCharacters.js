import LibraryConstants from '@thzero/library_client/constants';

import CharactersRestExternalService from '@/service/charactersExternalRest';

class CharactersService extends CharactersRestExternalService {
	async create(value) {
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, 'characters', value);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async delete(characterId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters', params: [ characterId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async deleteBoon(characterId, boonId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/boon', params: [ characterId, boonId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async deleteInventory(characterId, inventoryId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/inventory', params: [ characterId, inventoryId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async deleteScenario(characterId, scenarioId) {
		try {
			const response = await this._serviceCommunicationRest.delete(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/scenario', params: [ characterId, scenarioId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async fetch(id) {
		try {
			const response = await this._serviceCommunicationRest.getById(LibraryConstants.ExternalKeys.BACKEND, 'characters', id);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async fetchNumber(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.getById(LibraryConstants.ExternalKeys.BACKEND, 'characters/number', gameSystemId);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async initialize() {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'characters/initialize');
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async listing(sections) {
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing' }, sections);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async listingByFavorites() {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/favorites' });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async listingByGamerTag(gamerTag, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/gamerTag', params: [ gamerTag, gameSystemId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async listingByShortId(id, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/listing/gamerId', params: [ id, gameSystemId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async loadInventory(characterId, gearSetId) {
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/inventory/load', params: [ characterId, gearSetId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async update(character) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters', character.id, character);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async updateBoon(characterId, boon) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/boon', characterId, boon);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async updateDetails(details) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/details', details.id, details);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async updateInventory(characterId, inventory) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/inventory', characterId, inventory);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async updateScenario(characterId, scenario) {
		try {
			const response = await this._serviceCommunicationRest.postById(LibraryConstants.ExternalKeys.BACKEND, 'characters/scenario', characterId, scenario);
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async valid(name) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'characters/valid', params: [ encodeURI(name) ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}
}

export default CharactersService;
