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
		async getFactionListing(correlationId, gameSystemId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_FACTIONS);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.factions', 'getFactionListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				await this.setFactionListing(correlationId, listing);
				return listing;
			}
			return [];
		},
		async setFactionListing(correlationId, listing) {
			this.$logger.debug('store.factions', 'setFactionListing', 'list.a', listing, correlationId);
			this.$logger.debug('store.factions', 'setFactionListing', 'list.b', this.listing, correlationId);
			if (!listing)
				return;
				listing.forEach((item) => {
				this.listing = LibraryUtility.updateArrayByObject(this.listing, item, true);
			});
			this.$logger.debug('store.factions', 'setFactionListing', 'list.c', this.listing, correlationId);
		}
	},
	getters: {
		getFaction(correlationId, id) {
			if (LibraryClientUtility.$store.factions.listing == null)
				return null;
			return LibraryClientUtility.$store.factions.listing.find(faction => faction.id === id);
		}
	},
	dispatcher: {
		async getFactionListing(correlationId, gameSystemId) {
			await LibraryClientUtility.$store.factions.getFactionListing(correlationId, gameSystemId);
		}
	}
};

export default store;
