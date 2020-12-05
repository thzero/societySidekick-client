import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import VueUtility from '../../utility/index';

const store = {
	state: {
		authCompleted: false,
		claims: null,
		isLoggedIn: false,
		token: null,
		tokenResult: null,
		user: null
	},
	actions: {
		// eslint-disable-next-line
		async getUserFavorites(correlationId) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
			const response = await service.fetchFavoritesByGamerId(correlationId, this.state.user.user);
			this.$logger.debug('store.user', 'getUserFavorites', 'response', response);
			return response;
		},
		async refreshUserSettings({ commit }, correlationId) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
			const response = await service.refreshSettings(correlationId, this.state.user.user);
			this.$logger.debug('store.user', 'refreshUserSettings', 'response', response);
			if (response && response.success && response.results)
				commit('setUserSettings', { correlationId: correlationId, user: response.results });
			return response;
		},
		async resetUser({ commit }, correlationId) {
			commit('resetUser', correlationId);
		},
		async setUserAuthCompleted({ commit }, params) {
			commit('setUserAuthCompleted', params);
		},
		async setUserClaims({ commit }, params) {
			commit('setUserClaims', params);
		},
		async setUserLoggedIn({ commit }, params) {
			commit('setUserLoggedIn', params);
		},
		async setUserSettings({ commit }, params) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
			params.settings = VueUtility.settings().mergeUser(params.correlationId, params.settings);
			const response = await service.updateSettings(params.correlationId, this.state.user.user, params.settings);
			this.$logger.debug('store.user', 'setUserSettings', 'response', response);
			if (response && response.success && response.results)
				commit('setUserSettings', { correlationId: params.correlationId, user: response.results });
			return response;
		},
		async setUserTokenResult({ commit }, params) {
			commit('setUserTokenResult', params);
		},
		async setUser({ commit }, params) {
			commit('setUser', params);
		}
	},
	mutations: {
		// eslint-disable-next-line
		resetUser(state, correlationId) {
			state.claims = null;
			state.isLoggedIn = false;
			state.token = null;
			state.tokenResult = null;
			state.user = null;
		},
		setUserAuthCompleted(state, params) {
			state.authCompleted = params.authCompleted;
		},
		setUserClaims(state, params) {
			state.claims = params.claims;
		},
		setUserLoggedIn(state, params) {
			state.isLoggedIn = params.isLoggedIn;
		},
		setUserSettings(state, params) {
			params.user.settings = VueUtility.settings().mergeUser(params.correlationId, params.user.settings);
			state.user = params.user;
		},
		setUserTokenResult(state, params) {
			state.tokenResult = params.tokenResult;
			state.token = params.tokenResult ? params.tokenResult.token : null;
		},
		setUser(state, params) {
			if (params.user)
				params.user.settings = VueUtility.settings().mergeUser(params.correlationId, params.user.settings);
			state.user = params.user;
		}
	},
	dispatcher: {
		async getUserFavorites(correlationId) {
			return await Vue.prototype.$store.dispatch('getUserFavorites', correlationId);
		},
		async refreshUserSettings(correlationId) {
			await Vue.prototype.$store.dispatch('refreshUserSettings', correlationId);
		},
		async resetUser(correlationId) {
			await Vue.prototype.$store.dispatch('resetUser', correlationId);
		},
		async setAuthCompleted(correlationId, authCompleted) {
			await Vue.prototype.$store.dispatch('setUserAuthCompleted', { correlationId: correlationId, authCompleted: authCompleted });
		},
		async setClaims(correlationId, claims) {
			await Vue.prototype.$store.dispatch('setUserClaims', { correlationId: correlationId, authCompleted: claims });
		},
		async setLoggedIn(correlationId, isLoggedIn) {
			await Vue.prototype.$store.dispatch('setUserLoggedIn', { correlationId: correlationId, isLoggedIn: isLoggedIn });
		},
		async setUserSettings(correlationId, settings) {
			return await Vue.prototype.$store.dispatch('setUserSettings', { correlationId: correlationId, settings: settings });
		},
		async setTokenResult(correlationId, tokenResult) {
			await Vue.prototype.$store.dispatch('setUserTokenResult', { correlationId: correlationId, tokenResult: tokenResult });
		},
		async setUser(correlationId, user) {
			await Vue.prototype.$store.dispatch('setUser', { correlationId: correlationId, user: user });
		}
	}
};

export default store;
