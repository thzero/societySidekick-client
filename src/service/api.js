import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import RestExternalService from '@thzero/library_client/service/externalRest';

class ApiService extends RestExternalService {
	async initialize() {
		try {
			const version = {
				client: Constants.Version
			};
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'initialize');
			this._logger.debug('ApiService', 'initialize', 'response', response);
			if (response && response.success) {
				version.server = response.results.version;
				response.results.version = version;
			}

			return response;
		}
		catch(err) {
			this._logger.exception('ApiService', 'initialize', err);
		}

		return this._error('ApiService', 'initialize');
	}

	async gameSystems() {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'gameSystems');
			this._logger.debug('ApiService', 'gameSystems', 'response', response);
			return response;
		}
		catch(err) {
			this._logger.exception('ApiService', 'gameSystems', err);
		}

		return this._error('ApiService', 'gameSystems');
	}
}

export default ApiService;
