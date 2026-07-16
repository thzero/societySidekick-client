import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		boons: null
	}),
	actions: {
		async createAdminBoon(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.create(correlationId, item);
			this.$logger.debug('store.admin.boons', 'createAdminBoon', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminBoons(correlationId, response.results ? response.results : null);
			return response;
		},
		async deleteAdminBoon(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.delete(correlationId, id);
			this.$logger.debug('store.admin.boons', 'deleteAdminBoon', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				LibraryUtility.deleteArrayById(this.boons, id);
			return response;
		},
		async searchAdminBoons(correlationId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.search(correlationId, params);
			this.$logger.debug('store.admin.boons', 'searchAdminBoons', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminBoonsListing(correlationId, response.results ? response.results.data : null);
			return response;
		},
		async updateAdminBoon(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_BOONS);
			const response = await service.update(correlationId, item);
			this.$logger.debug('store.admin.boons', 'updateAdminBoon', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminBoons(correlationId, response.results ? response.results : null);
			return response;
		},
		async setAdminBoons(correlationId, item) {
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.a', item, correlationId);
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.b', this.boons, correlationId);
			this.boons = LibraryUtility.updateArrayByObject(this.boons, item, true);
			this.$logger.debug('store.admin.boons', 'setAdminBoons', 'item.c', this.boons, correlationId);
		},
		async setAdminBoonsListing(correlationId, list) {
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.a', list, correlationId);
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.b', this.boons, correlationId);
			this.boons = list;
			this.$logger.debug('store.admin.boons', 'setAdminBoonsListing', 'list.c', this.boons, correlationId);
		}
	},
	dispatcher: {
		async createAdminBoon(correlationId, item) {
			return await LibraryClientUtility.$store.adminBoons.createAdminBoon(correlationId, item);
		},
		async deleteAdminBoon(correlationId, id) {
			return await LibraryClientUtility.$store.adminBoons.deleteAdminBoon(correlationId, id);
		},
		async searchAdminBoons(correlationId, params) {
			await LibraryClientUtility.$store.adminBoons.searchAdminBoons(correlationId, params);
		},
		async updateAdminBoon(correlationId, item) {
			return await LibraryClientUtility.$store.adminBoons.updateAdminBoon(correlationId, item);
		}
	}
};

export default store;
