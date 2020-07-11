import LibraryConstants from '@thzero/library/constants';

import RestExternalService from '@thzero/library/service/externalRest';

class ClassesService extends RestExternalService {
	async listing(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'classes/listing', params: [ gameSystemId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}
}

export default ClassesService;
