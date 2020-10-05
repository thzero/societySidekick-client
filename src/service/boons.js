import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class BoonsService extends RestExternalService {
	async listing(correlationId, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'boons/listing', params: [ gameSystemId ] });
			this._logger.debug('BoonsService', 'listing', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('BoonsService', 'listing', err, correlationId);
		}

		return this._error('BoonsService', 'listing', null, null, null, null, correlationId);
	}

	async played(correlationId, characterId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'boons/played', params: [ characterId ] });
			this._logger.debug('BoonsService', 'played', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('BoonsService', 'played', err, correlationId);
		}

		return this._error('BoonsService', 'played', null, null, null, null, correlationId);
	}
}

export default BoonsService;
