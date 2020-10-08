import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ClassesService extends RestExternalService {
	async listing(correlationId, gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'classes/listing', params: [ gameSystemId ] });
			this._logger.debug('ClassesService', 'listing', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('ClassesService', 'listing', err, correlationId);
		}

		return this._error('ClassesService', 'listing', null, null, null, null, correlationId);
	}
}

export default ClassesService;
