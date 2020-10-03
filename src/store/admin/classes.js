import Vue from 'vue';

import Constants from '@/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility/index';

const store = {
	state: {
		classes: null
	},
	actions: {
		async createAdminClass({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.create(item);
			this.$logger.debug('store.admin.classes', 'createAdminClass', 'response', response);
			if (response && response.success)
				commit('setAdminClasses', response.success && response.results ? response.results : null);
			return response;
		},
		async deleteAdminClass({ commit }, id) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.delete(id);
			this.$logger.debug('store.admin.classes', 'deleteAdminClass', 'response', response);
			if (response && response.success)
				commit('deleteAdminClass', id);
			return response;
		},
		async searchAdminClasses({ commit }, params) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.search(params);
			this.$logger.debug('store.admin.classes', 'searchAdminClasses', 'response', response);
			commit('setAdminClassesListing', response.success && response.results ? response.results.data : null);
		},
		async updateAdminClass({ commit }, item) {
			const service = this._vm.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.update(item);
			this.$logger.debug('store.admin.classes', 'updateAdminClass', 'response', response);
			if (response && response.success)
				commit('setAdminClasses', response.success && response.results ? response.results : null);
			return response;
		}
	},
	mutations: {
		deleteAdminClass(state, id) {
			return LibraryUtility.deleteArrayById(state.classes, id);
		},
		setAdminClasses(state, item) {
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.a', item);
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.b', state.classes);
			state.classes = VueUtility.updateArrayById(state.classes, item);
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.c', state.classes);
		},
		setAdminClassesListing(state, list) {
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.a', list);
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.b', state.classes);
			state.classes = list;
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.c', state.classes);
		}
	},
	dispatcher: {
		async createAdminClass(item) {
			return await Vue.prototype.$store.dispatch('createAdminClass', item);
		},
		async deleteAdminClass(id) {
			return await Vue.prototype.$store.dispatch('deleteAdminClass', id);
		},
		async searchAdminClasses(params) {
			await Vue.prototype.$store.dispatch('searchAdminClasses', params);
		},
		async updateAdminClass(item) {
			return await Vue.prototype.$store.dispatch('updateAdminClass', item);
		}
	}
};

export default store;
