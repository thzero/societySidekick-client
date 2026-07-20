import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		news: null
	}),
	actions: {
		async createAdminNews(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.create(correlationId, item);
			this.$logger.debug('store.admin.news', 'createAdminNews', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminNews(correlationId, response.results ? response.results : null);
			return response;
		},
		async deleteAdminNews(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.delete(correlationId, id);
			this.$logger.debug('store.admin.news', 'deleteAdminNews', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				LibraryUtility.deleteArrayById(this.news, id);
			return response;
		},
		async searchAdminNews(correlationId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.search(correlationId, params);
			this.$logger.debug('store.admin.news', 'searchAdminNews', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminNewsListing(correlationId, response.results ? response.results.data : null);
			return response;
		},
		async updateAdminNews(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_NEWS);
			const response = await service.update(correlationId, item);
			this.$logger.debug('store.admin.news', 'updateAdminNews', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminNews(correlationId, response.results ? response.results : null);
			return response;
		},
		async setAdminNews(correlationId, item) {
			this.news = LibraryUtility.updateArrayByObject(this.news, item, true);
		},
		async setAdminNewsListing(correlationId, list) {
			this.news = list;
		}
	},
	dispatcher: {
		async createAdminNews(correlationId, item) {
			return await LibraryClientUtility.$store.adminNews.createAdminNews(correlationId, item);
		},
		async deleteAdminNews(correlationId, id) {
			return await LibraryClientUtility.$store.adminNews.deleteAdminNews(correlationId, id);
		},
		async searchNews(correlationId, params) {
			await LibraryClientUtility.$store.adminNews.searchAdminNews(correlationId, params);
		},
		async updateAdminNews(correlationId, item) {
			return await LibraryClientUtility.$store.adminNews.updateAdminNews(correlationId, item);
		}
	}
};

export default store;
