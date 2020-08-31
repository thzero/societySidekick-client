import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class BoonsService extends RestExternalService {
	async listing(gameSystemId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'boons/listing', params: [ gameSystemId ] });
			this._logger.debug('BoonsService', 'listing', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('BoonsService', 'listing', err);
		}

		return this._error('BoonsService', 'listing');
	}

	async played(characterId) {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, { url: 'boons/played', params: [ characterId ] });
			this._logger.debug('BoonsService', 'played', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('BoonsService', 'played', err);
		}

		return this._error('BoonsService', 'played');
	}
}

export default BoonsService;
