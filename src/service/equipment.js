import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class EquipmentService extends RestExternalService {
	async search(correlationId, gameSystemId, params) {
		try {
			const response = await this._serviceCommunicationRest.post(correlationId, LibraryConstants.ExternalKeys.BACKEND, { url: 'equipment/search', params: [ gameSystemId ] }, params);
			this._logger.debug('EquipmentService', 'search', 'response', response, correlationId);
			return response;
		}
		catch(err) {
			this._logger.exception('EquipmentService', 'search', err, correlationId);
		}

		return this._error('EquipmentService', 'search', null, null, null, null, correlationId);
	}
}

export default EquipmentService;
