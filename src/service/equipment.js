import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class EquipmentService extends RestExternalService {
	async search(gameSystemId, params) {
		try {
			const response = await this._serviceCommunicationRest.post(LibraryConstants.ExternalKeys.BACKEND, { url: 'equipment/search', params: [ gameSystemId ] }, params);
			this._logger.debug('EquipmentService', 'search', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('EquipmentService', 'search', err);
		}

		return this._error('EquipmentService', 'search');
	}
}

export default EquipmentService;
