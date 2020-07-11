import Vue from 'vue';

import LibraryConstants from '@thzero/library/constants';

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
		async getUserFavorites() {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
			const response = await service.fetchFavoritesByGamerId(this.state.user.user);
			this.$logger.debug('getUserFavorites', response);
			return response;
		},
		async resetUser({ commit }) {
			commit('resetUser');
		},
		async setUserAuthCompleted({ commit }, authCompleted) {
			commit('setUserAuthCompleted', authCompleted);
		},
		async setUserClaims({ commit }, claims) {
			commit('setUserClaims', claims);
		},
		async setUserLoggedIn({ commit }, isLoggedIn) {
			commit('setUserLoggedIn', isLoggedIn);
		},
		async setUserSettings({ commit }, settings) {
			const service = this._vm.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
			settings = VueUtility.settings().mergeUser(settings);
			const response = await service.updateSettings(this.state.user.user, settings);
			this.$logger.debug('setUserSettings', response);
			if (response && response.success && response.results)
				commit('setUserSettings', response.results);
			return response;
		},
		async setUserTokenResult({ commit }, tokenResult) {
			commit('setUserTokenResult', tokenResult);
		},
		async setUser({ commit }, user) {
			commit('setUser', user);
		}
	},
	mutations: {
		resetUser(state) {
			state.claims = null;
			state.isLoggedIn = false;
			state.token = null;
			state.tokenResult = null;
			state.user = null;
		},
		setUserAuthCompleted(state, authCompleted) {
			state.authCompleted = authCompleted;
		},
		setUserClaims(state, claims) {
			state.claims = claims;
		},
		setUserLoggedIn(state, isLoggedIn) {
			state.isLoggedIn = isLoggedIn;
		},
		setUserSettings(state, user) {
			user.settings = VueUtility.settings().mergeUser(user.settings);
			state.user = user;
		},
		setUserTokenResult(state, tokenResult) {
			state.tokenResult = tokenResult;
			state.token = tokenResult ? tokenResult.token : null;
		},
		setUser(state, user) {
			if (user)
				user.settings = VueUtility.settings().mergeUser(user.settings);
			state.user = user;
		}
	},
	dispatcher: {
		async getUserFavorites() {
			return await Vue.prototype.$store.dispatch('getUserFavorites');
		},
		async resetUser() {
			await Vue.prototype.$store.dispatch('resetUser');
		},
		async setAuthCompleted(authCompleted) {
			await Vue.prototype.$store.dispatch('setUserAuthCompleted', authCompleted);
		},
		async setClaims(claims) {
			await Vue.prototype.$store.dispatch('setUserClaims', claims);
		},
		async setLoggedIn(isLoggedIn) {
			await Vue.prototype.$store.dispatch('setUserLoggedIn', isLoggedIn);
		},
		async setUserSettings(settings) {
			return await Vue.prototype.$store.dispatch('setUserSettings', settings);
		},
		async setTokenResult(tokenResult) {
			await Vue.prototype.$store.dispatch('setUserTokenResult', tokenResult);
		},
		async setUser(user) {
			await Vue.prototype.$store.dispatch('setUser', user);
		}
	}
};

export default store;
