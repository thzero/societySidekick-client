import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		equipment: null
	}),
	actions: {
		async createAdminEquipment(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.create(correlationId, item);
			this.$logger.debug('store.admin.equipment', 'createAdminEquipment', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminEquipment(correlationId, response.results ? response.results : null);
			return response;
		},
		async deleteAdminEquipment(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.delete(correlationId, id);
			this.$logger.debug('store.admin.equipment', 'deleteAdminEquipment', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				LibraryUtility.deleteArrayById(this.equipment, id);
			return response;
		},
		async searchAdminEquipment(correlationId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.search(correlationId, params);
			this.$logger.debug('store.admin.equipment', 'searchAdminEquipment', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminEquipmentListing(correlationId, response.results ? response.results.data : null);
			return response;
		},
		async updateAdminEquipment(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT);
			const response = await service.update(correlationId, item);
			this.$logger.debug('store.admin.equipment', 'updateAdminEquipment', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminEquipment(correlationId, response.results ? response.results : null);
			return response;
		},
		async setAdminEquipment(correlationId, item) {
			this.$logger.debug('store.admin.equipment', 'setAdminEquipment', 'item.a', item, correlationId);
			this.$logger.debug('store.admin.equipment', 'setAdminEquipment', 'item.b', this.equipment, correlationId);
			this.equipment = LibraryUtility.updateArrayByObject(this.equipment, item, true);
			this.$logger.debug('store.admin.equipment', 'setAdminEquipment', 'item.c', this.equipment, correlationId);
		},
		async setAdminEquipmentListing(correlationId, list) {
			this.$logger.debug('store.admin.equipment', 'setAdminEquipmentListing', 'list.a', list, correlationId);
			this.$logger.debug('store.admin.equipment', 'setAdminEquipmentListing', 'list.b', this.equipment, correlationId);
			this.equipment = list;
			this.$logger.debug('store.admin.equipment', 'setAdminEquipmentListing', 'list.c', this.equipment, correlationId);
		}
	},
	dispatcher: {
		async createAdminEquipment(correlationId, item) {
			return await LibraryClientUtility.$store.adminEquipment.createAdminEquipment(correlationId, item);
		},
		async deleteAdminEquipment(correlationId, id) {
			return await LibraryClientUtility.$store.adminEquipment.deleteAdminEquipment(correlationId, id);
		},
		async searchEquipment(correlationId, params) {
			await LibraryClientUtility.$store.adminEquipment.searchAdminEquipment(correlationId, params);
		},
		async updateAdminEquipment(correlationId, item) {
			return await LibraryClientUtility.$store.adminEquipment.updateAdminEquipment(correlationId, item);
		}
	}
};

export default store;
