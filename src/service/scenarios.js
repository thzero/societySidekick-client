import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ScenariosService extends RestExternalService {
	async listing(correlationId, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'scenarios/listing', params: [ gameSystemId ] });
			this._logger.debug('ScenariosService', 'listing', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('ScenariosService', 'listing', err, correlationId);
		}

		return this._error('ScenariosService', 'listing', null, null, null, null, correlationId);
	}

	async played(correlationId, characterId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'scenarios/played', params: [ characterId ] });
			this._logger.debug('ScenariosService', 'played', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('ScenariosService', 'played', err, correlationId);
		}

		return this._error('ScenariosService', 'played', null, null, null, null, correlationId);
	}
}

export default ScenariosService;
