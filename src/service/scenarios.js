import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ScenariosService extends RestExternalService {
	async listing(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'scenarios/listing', params: [ gameSystemId ] });
			this._logger.debug('ScenariosService', 'listing', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('ScenariosService', 'listing', err);
		}

		return this._error('ScenariosService', 'listing');
	}

	async played(characterId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'scenarios/played', params: [ characterId ] });
			this._logger.debug('ScenariosService', 'played', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('ScenariosService', 'played', err);
		}

		return this._error('ScenariosService', 'played');
	}
}

export default ScenariosService;
