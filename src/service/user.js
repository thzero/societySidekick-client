import LibraryConstants from '@thzero/library_client/constants';

import VueBaseUserService from '@thzero/library_client_vue3/service/baseUser';

class UserService extends VueBaseUserService {
	constructor() {
		super();

		this._serviceCommunicationRest = null;
		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceCommunicationRest = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_COMMUNICATION_REST);
		this._serviceStore = this._injector.getService(LibraryConstants.InjectorKeys.SERVICE_STORE);
	}

	// The lib's BaseUserService.refreshSettings() calls this._refreshSettingsUpdate() (a naming
	// mismatch — the base only defines _refreshSettingsCommunication), so the app must supply it.
	//
	// IMPORTANT: return success with NO results. The lib pinia store's refreshUserSettings() does
	// `this.setUser(response.results)` (one arg) — but setUser(correlationId, user) takes two, so a
	// non-empty results lands in the correlationId slot, leaves user undefined, and NULLS the logged-in
	// user (signs you out). Returning no results makes refreshUserSettings skip that buggy call.
	// (The real fix is upstream: refreshUserSettings should call setUser(correlationId, response.results).)
	// eslint-disable-next-line no-unused-vars
	async _refreshSettingsUpdate(correlationId, user) {
		return this._success(correlationId);
	}

	async fetchFavoritesByGamerId(correlationId, user) {
		if (!user)
			return this._error('UserService', 'fetchFavoritesByGamerId', 'Invalid user.', null, null, null, correlationId);

		this._logger.debug('UserService', 'fetchFavoritesByGamerId', 'userId', user.id, correlationId);
		try {
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'users/favorites', user.id);
			this._logger.debug('UserService', 'fetchFavoritesByGamerId', 'response', response, correlationId);
			if (this._hasSucceeded(response))
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
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'users/gamerId', gamerId);
			this._logger.debug('UserService', 'fetchByGamerId', 'response', response, correlationId);
			if (this._hasSucceeded(response))
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
			const response = await this._serviceCommunicationRest.getById(correlationId, LibraryConstants.ExternalKeys.BACKEND, 'users/gamerTag', gamerTag);
			this._logger.debug('UserService', 'fetchByGamerTag', 'response', response, correlationId);
			if (this._hasSucceeded(response))
				return response;
		}
		catch(err) {
			this._logger.exception('UserService', 'fetchByGamerTag', err, correlationId);
		}

		return this._error('UserService', 'fetchByGamerTag', null, null, null, null, correlationId);
	}
}

export default UserService;
