import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const storeClasses = {
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
		async getClassListing(correlationId, gameSystemId) {
			const now = LibraryMomentUtility.getTimestamp();
			const ttlContent = this.listingTtl ? this.listingTtl : 0;
			const delta = now - ttlContent;
			// if (this.content && (this.content.length > 0) && (delta <= this.contentTtlDiff))
			if (this._checkTtl(this.content, delta, this.contentTtlDiff))
				return Response.success(correlationId, this.listing);

			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_CLASSES);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.classes', 'setClassListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				setClassListing(correlationId, listing);
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
			this.listingTtl = LibraryMomentUtility.getTimestamp();
			this.$logger.debug('store.boons', 'setClassListing', 'list.c', this.listing, correlationId);
		}
	},
	getters: {
		getClass(correlationId, id) {
			if (this.listing == null)
				return null;
			return this.listing.find(item => item.id === id);
		}
	},
	dispatcher: {
		async getClassListing(correlationId, gameSystemId) {
			return await LibraryClientUtility.boons.$store.getClassListing(correlationId, gameSystemId);
		}
	}
};

export default storeClasses;
