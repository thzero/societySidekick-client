import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		factions: null
	}),
	actions: {
		async createAdminFaction(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.create(correlationId, item);
			this.$logger.debug('store.admin.factions', 'createAdminFaction', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminFactions(correlationId, response.results ? response.results : null);
			return response;
		},
		async deleteAdminFaction(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.delete(correlationId, id);
			this.$logger.debug('store.admin.factions', 'deleteAdminFaction', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				LibraryUtility.deleteArrayById(this.factions, id);
			return response;
		},
		async searchAdminFactions(correlationId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.search(correlationId, params);
			this.$logger.debug('store.admin.factions', 'searchAdminFactions', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminFactionsListing(correlationId, response.results ? response.results.data : null);
			return response;
		},
		async updateAdminFaction(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS);
			const response = await service.update(correlationId, item);
			this.$logger.debug('store.admin.factions', 'updateAdminFaction', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminFactions(correlationId, response.results ? response.results : null);
			return response;
		},
		async setAdminFactions(correlationId, item) {
			this.$logger.debug('store.admin.factions', 'setAdminFactions', 'item.a', item, correlationId);
			this.$logger.debug('store.admin.factions', 'setAdminFactions', 'item.b', this.factions, correlationId);
			this.factions = LibraryUtility.updateArrayByObject(this.factions, item, true);
			this.$logger.debug('store.admin.factions', 'setAdminFactions.c', this.factions, correlationId);
		},
		async setAdminFactionsListing(correlationId, list) {
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.a', list, correlationId);
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.b', this.factions, correlationId);
			this.factions = list;
			this.$logger.debug('store.admin.factions', 'setAdminFactionsListing', 'list.c', this.factions, correlationId);
		}
	},
	dispatcher: {
		async createAdminFaction(correlationId, item) {
			return await LibraryClientUtility.$store.adminFactions.createAdminFaction(correlationId, item);
		},
		async deleteAdminFaction(correlationId, id) {
			return await LibraryClientUtility.$store.adminFactions.deleteAdminFaction(correlationId, id);
		},
		async searchAdminFactions(correlationId, params) {
			await LibraryClientUtility.$store.adminFactions.searchAdminFactions(correlationId, params);
		},
		async updateAdminFaction(correlationId, item) {
			return await LibraryClientUtility.$store.adminFactions.updateAdminFaction(correlationId, item);
		}
	}
};

export default store;
