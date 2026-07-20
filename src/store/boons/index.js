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
		async getBoonListing(correlationId, gameSystemId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_BOONS);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.boons', 'setBoonListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				await this.setBoonListing(correlationId, listing);
				return listing;
			}
		},
		async setBoonListing(correlationId, listing) {
			this.$logger.debug('store.boons', 'setBoonListing', 'list.a', listing, correlationId);
			this.$logger.debug('store.boons', 'setBoonListing', 'list..b', this.listing, correlationId);
			if (!listing)
				return;
			listing.forEach((item) => {
				this.listing = LibraryUtility.updateArrayByObject(this.listing, item, true);
			});
			this.$logger.debug('store.boons', 'setBoonListing', 'list..c', this.listing, correlationId);
		}
	},
	getters: {
		getBoon(correlationId, id) {
			if (LibraryClientUtility.$store.boons.listing == null)
				return null;
			return LibraryClientUtility.$store.boons.listing.find(boon => boon.id === id);
		}
	},
	dispatcher: {
		async getBoonListing(correlationId, gameSystemId) {
			await LibraryClientUtility.$store.boons.getBoonListing(correlationId, gameSystemId);
		}
	}
};

export default store;
