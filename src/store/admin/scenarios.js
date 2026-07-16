import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		scenarios: null
	}),
	actions: {
		async createAdminScenario(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.create(correlationId, item);
			this.$logger.debug('store.admin', 'createAdminScenario', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminScenarios(correlationId, response.results ? response.results : null);
			return response;
		},
		async deleteAdminScenario(correlationId, id) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.delete(correlationId, id);
			this.$logger.debug('store.admin', 'deleteAdminScenario', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				LibraryUtility.deleteArrayById(this.scenarios, id);
			return response;
		},
		async searchAdminScenarios(correlationId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.search(correlationId, params);
			this.$logger.debug('store.admin', 'searchAdminScenarios', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminScenariosListing(correlationId, response.results ? response.results.data : null);
			return response;
		},
		async updateAdminScenario(correlationId, item) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS);
			const response = await service.update(correlationId, item);
			this.$logger.debug('store.admin', 'updateAdminScenario', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setAdminScenarios(correlationId, response.results ? response.results : null);
			return response;
		},
		async setAdminScenarios(correlationId, item) {
			this.$logger.debug('store.admin', 'setAdminScenarios', 'item.a', item, correlationId);
			this.$logger.debug('store.admin', 'setAdminScenarios', 'item.b', this.scenarios, correlationId);
			this.scenarios = LibraryUtility.updateArrayByObject(this.scenarios, item, true);
			this.$logger.debug('store.admin', 'setAdminScenarios', 'item.c', this.scenarios, correlationId);
		},
		async setAdminScenariosListing(correlationId, list) {
			this.$logger.debug('store.admin', 'setAdminScenariosListing', 'list.a', list, correlationId);
			this.$logger.debug('store.admin', 'setAdminScenariosListing', 'list.b', this.scenarios, correlationId);
			this.scenarios = list;
			this.$logger.debug('store.admin', 'setAdminScenariosListing', 'list.c', this.scenarios, correlationId);
		}
	},
	getters: {
		getAdminScenario(correlationId, id) {
			if (LibraryClientUtility.$store.adminScenarios.scenarios == null)
				return null;
			return LibraryClientUtility.$store.adminScenarios.scenarios.find(scenario => scenario.id === id);
		}
	},
	dispatcher: {
		async createAdminScenario(correlationId, item) {
			return await LibraryClientUtility.$store.adminScenarios.createAdminScenario(correlationId, item);
		},
		async deleteAdminScenario(correlationId, id) {
			return await LibraryClientUtility.$store.adminScenarios.deleteAdminScenario(correlationId, id);
		},
		async searchAdminScenarios(correlationId, params) {
			await LibraryClientUtility.$store.adminScenarios.searchAdminScenarios(correlationId, params);
		},
		async updateAdminScenario(correlationId, item) {
			return await LibraryClientUtility.$store.adminScenarios.updateAdminScenario(correlationId, item);
		}
	}
};

export default store;
