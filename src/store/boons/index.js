import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const storeBoons = {
	pluginPersistPaths: {
		persist: [
			'listing',
			'listingTtl'
		]
	},
	state: () => ({
		listing: [],
		listingTtl: 0,
		listingTtlDiff: 1000 * 60 * 30,
	}),
	actions: {
		async getBoonListing(correlationId, gameSystemId) {
			const now = LibraryMomentUtility.getTimestamp();
			const ttlContent = this.listingTtl ? this.listingTtl : 0;
			const delta = now - ttlContent;
			// if (this.content && (this.content.length > 0) && (delta <= this.contentTtlDiff))
			if (this._checkTtl(this.content, delta, this.contentTtlDiff))
				return Response.success(correlationId, this.listing);

			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_BOONS);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.boons', 'setBoonListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				setBoonListing(correlationId, listing);
				return listing;
			}
			return [];
		},
		async setBoonListing(correlationId, listing) {
			this.$logger.debug('store.boons', 'setBoonListing', 'list.a', listing, correlationId);
			this.$logger.debug('store.boons', 'setBoonListing', 'list.b', this.listing, correlationId);
			if (!listing)
				return;
			listing.forEach((item) => {
				this.listing = LibraryUtility.updateArrayByObject(this.listing, item, true);
			});
			this.listingTtl = LibraryMomentUtility.getTimestamp();
			this.$logger.debug('store.boons', 'setBoonListing', 'list.c', this.listing, correlationId);
		}
	},
	getters: {
		getBoon(correlationId, id) {
			if (this.listing == null)
				return null;
			return this.listing.find(item => item.id === id);
		}
	},
	dispatcher: {
		async getBoonListing(correlationId, gameSystemId) {
			return await LibraryClientUtility.boons.$store.getBoonListing(correlationId, gameSystemId);
		}
	}
};

export default storeBoons;
