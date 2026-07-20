import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		listing: []
	}),
	actions: {
		async equipmentSearch(correlationId, gameSystemId, params) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_EQUIPMENT);
			const response = await service.search(correlationId, gameSystemId, params);
			this.$logger.debug('store.equipment', 'equipmentSearch', 'response', response, correlationId);
			if (Response.hasSucceeded(response) && response.results && response.results.data) {
				const listing = response.results ? response.results.data : null;
				await this.setEquipmentListing(correlationId, listing);
				return listing;
			}
			return [];
		},
		async setEquipmentListing(correlationId, listing) {
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.a', listing, correlationId);
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.b', this.listing, correlationId);
			if (!listing)
				return;
				listing.forEach((item) => {
				this.listing = LibraryUtility.updateArrayByObject(this.listing, item, true);
			});
			this.$logger.debug('store.equipment', 'setEquipmentListing', 'list.c', this.listing, correlationId);
		}
	},
	getters: {
		getEquipment(correlationId, id) {
			if (LibraryClientUtility.$store.equipment.listing == null)
				return null;
			return LibraryClientUtility.$store.equipment.listing.find(item => item.id === id);
		}
	},
	dispatcher: {
		async equipmentSearch(correlationId, gameSystemId, params) {
			return await LibraryClientUtility.$store.equipment.equipmentSearch(correlationId, gameSystemId, params);
		}
	}
};

export default store;
