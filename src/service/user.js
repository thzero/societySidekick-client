import LibraryConstants from '@thzero/library_client/constants';

import BaseUserService from '@thzero/library_client/service/baseUser';

class UserService extends BaseUserService {
	async init(injector) {
		await super.init(injector);

		this._serviceCommunicationRest = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
		this._serviceStore = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	}

	async fetchFavoritesByGamerId(user) {
		if (!user)
			return this._error('UserService', 'fetchFavoritesByGamerId');

		this._logger.debug('UserService', 'fetchFavoritesByGamerId', 'userId', user.id);
		try {
			const response = await this._serviceCommunicationRest.getById(LibraryConstants.ExternalKeys.BACKEND, 'user/favorites', user.id);
			this._logger.debug('UserService', 'fetchFavoritesByGamerId', 'response', response);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('UserService', 'fetchFavoritesByGamerId', err);
		}

		return this._error();
	}

	async fetchByGamerId(gamerId) {
		if (!gamerId)
			return this._error();

		this._logger.debug('UserService', 'fetchByGamerId', 'gamerId', gamerId);
		try {
			const response = await this._serviceCommunicationRest.getById(LibraryConstants.ExternalKeys.BACKEND, 'user/gamerId', gamerId);
			this._logger.debug('UserService', 'fetchByGamerId', 'response', response);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('UserService', 'fetchByGamerId', err);
		}

		return this._error('UserService', 'fetchByGamerId');
	}

	async fetchByGamerTag(gamerTag) {
		if (!gamerTag)
			return this._error();

		this._logger.debug('UserService', 'fetchByGamerTag', 'gamerTag', gamerTag);
		try {
			const response = await this._serviceCommunicationRest.getById(LibraryConstants.ExternalKeys.BACKEND, 'user/gamerTag', gamerTag);
			this._logger.debug('UserService', 'fetchByGamerTag', 'response', response);
			if (response && response.success)
				return response;
		}
		catch(err) {
			this._logger.exception('UserService', 'fetchByGamerTag', err);
		}

		return this._error('UserService', 'fetchByGamerTag', );
	}
}

export default UserService;
