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
		async getClassListing(correlationId, gameSystemId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CLASSES);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.classes', 'setClassListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				await this.setClassListing(correlationId, listing);
				return listing;
			}
			return [];
		},
		async setClassListing(correlationId, listing) {
			this.$logger.debug('store.classes', 'setClassListing', 'list.a', listing, correlationId);
			this.$logger.debug('store.classes', 'setClassListing', 'list.b', this.listing, correlationId);
			if (!listing)
				return;
				listing.forEach((item) => {
					this.listing = LibraryUtility.updateArrayByObject(this.listing, item, true);
			});
			this.$logger.debug('store.classes', 'setClassListing', 'list.c', this.listing, correlationId);
		}
	},
	getters: {
		getClass(correlationId, id) {
			if (LibraryClientUtility.$store.classes.listing == null)
				return null;
			return LibraryClientUtility.$store.classes.listing.find(item => item.id === id);
		}
	},
	dispatcher: {
		async getClassListing(correlationId, gameSystemId) {
			await LibraryClientUtility.$store.classes.getClassListing(correlationId, gameSystemId);
		}
	}
};

export default store;
