import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ClassesService extends RestExternalService {
	async listing(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'classes/listing', params: [ gameSystemId ] });
			this._logger.debug('ClassesService', 'listing', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('ClassesService', 'listing', err);
		}

		return this._error('ClassesService', 'listing');
	}
}

export default ClassesService;
