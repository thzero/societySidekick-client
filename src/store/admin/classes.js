import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		classes: null
	}),
	actions: {
		async createAdminClass(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.create(correlationId, item);
			this.$logger.debug('store.admin.classes', 'createAdminClass', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminClasses(correlationId, response.results ? response.results : null);
			return response;
		},
		async deleteAdminClass(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.delete(correlationId, id);
			this.$logger.debug('store.admin.classes', 'deleteAdminClass', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				LibraryUtility.deleteArrayById(this.classes, id);
			return response;
		},
		async searchAdminClasses(correlationId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.search(correlationId, params);
			this.$logger.debug('store.admin.classes', 'searchAdminClasses', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminClassesListing(correlationId, response.results ? response.results.data : null);
			return response;
		},
		async updateAdminClass(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES);
			const response = await service.update(correlationId, item);
			this.$logger.debug('store.admin.classes', 'updateAdminClass', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminClasses(correlationId, response.results ? response.results : null);
			return response;
		},
		async setAdminClasses(correlationId, item) {
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.a', item, correlationId);
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.b', this.classes, correlationId);
			this.classes = LibraryUtility.updateArrayByObject(this.classes, item, true);
			this.$logger.debug('store.admin.classes', 'setAdminClasses', 'item.c', this.classes, correlationId);
		},
		async setAdminClassesListing(correlationId, list) {
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.a', list, correlationId);
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.b', this.classes, correlationId);
			this.classes = list;
			this.$logger.debug('store.admin.classes', 'setAdminClassesListing', 'list.c', this.classes, correlationId);
		}
	},
	dispatcher: {
		async createAdminClass(correlationId, item) {
			return await LibraryClientUtility.$store.adminClasses.createAdminClass(correlationId, item);
		},
		async deleteAdminClass(correlationId, id) {
			return await LibraryClientUtility.$store.adminClasses.deleteAdminClass(correlationId, id);
		},
		async searchAdminClasses(correlationId, params) {
			await LibraryClientUtility.$store.adminClasses.searchAdminClasses(correlationId, params);
		},
		async updateAdminClass(correlationId, item) {
			return await LibraryClientUtility.$store.adminClasses.updateAdminClass(correlationId, item);
		}
	}
};

export default store;
