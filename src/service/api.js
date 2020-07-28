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
			this._logger.debug('response', response);
			if (response && response.success) {
				version.server = response.results.version;
				response.results.version = version;
			}

			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}

	async gameSystems() {
		try {
			const response = await this._serviceCommunicationRest.get(LibraryConstants.ExternalKeys.BACKEND, 'gameSystems');
			this._logger.debug('response', response);
			return response;
		}
		catch(err) {
			this._logger.exception(err);
		}

		return this._error();
	}
}

export default ApiService;
