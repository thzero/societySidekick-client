import LibraryConstants from '@thzero/library_client/constants';

import BaseUserService from '@thzero/library_client/service/baseUser';

class UserService extends BaseUserService {
	async init(injector) {
		await super.init(injector);

		this._serviceCommunicationRest = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
		this._serviceStore = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	}

	async fetchFavoritesByGamerId(correlationId, user) {
		if (!user)
			return this._error('UserService', 'fetchFavoritesByGamerId', 'Invalid user.', null, null, null, correlationId);

		this._logger.debug('UserService', 'fetchFavoritesByGamerId', 'userId', user.id, correlationId);
		try {
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'user/favorites', user.id);
			this._logger.debug('UserService', 'fetchFavoritesByGamerId', 'response', response, correlationId);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('UserService', 'fetchFavoritesByGamerId', err, correlationId);
		}

		return this._error('UserService', 'fetchFavoritesByGamerId', null, null, null, null, correlationId);
	}

	async fetchByGamerId(correlationId, gamerId) {
		if (!gamerId)
			return this._error('UserService', 'fetchByGamerId', 'Invalid gamerId.');

		this._logger.debug('UserService', 'fetchByGamerId', 'gamerId', gamerId, correlationId);
		try {
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'user/gamerId', gamerId);
			this._logger.debug('UserService', 'fetchByGamerId', 'response', response, correlationId);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('UserService', 'fetchByGamerId', err, correlationId);
		}

		return this._error('UserService', 'fetchByGamerId', null, null, null, null, correlationId);
	}

	async fetchByGamerTag(correlationId, gamerTag) {
		if (!gamerTag)
			return this._error('UserService', 'fetchByGamerTag', 'Invalid gamerTag.', null, null, null, correlationId);

		this._logger.debug('UserService', 'fetchByGamerTag', 'gamerTag', gamerTag, correlationId);
		try {
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'user/gamerTag', gamerTag);
			this._logger.debug('UserService', 'fetchByGamerTag', 'response', response, correlationId);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('UserService', 'fetchByGamerTag', err, correlationId);
		}

		return this._error('UserService', 'fetchByGamerTag', null, null, null, null, correlationId);
	}
}

export default UserService;
