import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class FactionsService extends RestExternalService {
	async listing(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'factions/listing', params: [ gameSystemId ] });
			this._logger.debug('FactionsService', 'listing', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('FactionsService', 'listing', err);
		}

		return this._error('FactionsService', 'listing');
	}
}

export default FactionsService;
