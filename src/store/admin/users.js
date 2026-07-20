import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		users: null
	}),
	actions: {
		async deleteAdminUser(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.delete(correlationId, id);
			this.$logger.debug('store.admin.users', 'deleteAdminUser', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				LibraryUtility.deleteArrayById(this.users, id);
			return response;
		},
		async searchAdminUsers(correlationId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.search(correlationId, params);
			this.$logger.debug('store.admin.users', 'searchAdminUsers', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminUsersListing(correlationId, response.results ? response.results.data : null);
			return response;
		},
		async updateAdminUser(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_USERS);
			const response = await service.update(correlationId, item);
			this.$logger.debug('store.admin.users', 'updateAdminUser', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminUsers(correlationId, response.results ? response.results : null);
			return response;
		},
		async setAdminUsers(correlationId, item) {
			this.users = LibraryUtility.updateArrayByObject(this.users, item, true);
		},
		async setAdminUsersListing(correlationId, list) {
			this.users = list;
		}
	},
	dispatcher: {
		async deleteAdminUser(correlationId, id) {
			return await LibraryClientUtility.$store.adminUsers.deleteAdminUser(correlationId, id);
		},
		async searchAdminUsers(correlationId, params) {
			await LibraryClientUtility.$store.adminUsers.searchAdminUsers(correlationId, params);
		},
		async updateAdminUser(correlationId, item) {
			return await LibraryClientUtility.$store.adminUsers.updateAdminUser(correlationId, item);
		}
	}
};

export default store;
