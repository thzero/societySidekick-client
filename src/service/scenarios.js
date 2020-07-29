import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ScenariosService extends RestExternalService {
	async listing(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'scenarios/listing', params: [ gameSystemId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async played(characterId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'scenarios/played', params: [ characterId ] });
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}
}

export default ScenariosService;
