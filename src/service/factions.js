import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class FactionsService extends RestExternalService {
	async listing(correlationId, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'factions/listing', params: [ gameSystemId ] });
			this._logger.debug('FactionsService', 'listing', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('FactionsService', 'listing', err, correlationId);
		}

		return this._error('FactionsService', 'listing', null, null, null, null, correlationId);
	}
}

export default FactionsService;
