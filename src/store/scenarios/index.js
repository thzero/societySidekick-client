import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const storeScenarios = {
	pluginPersistPaths: {
		persist: [
			'listing',
			'listingTtl',
			'played',
			'playedTtl'
		]
	},
	state: () => ({
		listing: [],
		listingTtl: 0,
		listingTtlDiff: 1000 * 60 * 30,
		played: [],
		playedTtl: 0,
		playedTtlDiff: 1000 * 60 * 30,
	}),
	actions: {
		async getScenarioListing(correlationId, gameSystemId) {
			const now = LibraryMomentUtility.getTimestamp();
			const ttlContent = this.listingTtl ? this.listingTtl : 0;
			const delta = now - ttlContent;
			// if (this.content && (this.content.length > 0) && (delta <= this.contentTtlDiff))
			if (this._checkTtl(this.content, delta, this.contentTtlDiff))
				return Response.success(correlationId, this.listing);

			const service = LibraryClientUtility.$injector.getService(AppConstants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				setScenarioListing(correlationId, listing);
				return listing;
			}
			return [];
		},
		async getScenarioListingPlayed(correlationId, characterId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.played(correlationId, characterId);
			this.$logger.debug('store.scenarios', 'getScenarioListingPlayed', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				setScenarioListingPlayed(correlationId, response.results ? response.results : null, characterId);
			return response;
		},
		async setScenarioListing(correlationId, listing) {
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.a', listing, correlationId);
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.b', this.played, correlationId);
			if (!listing)
				return;
			listing.forEach((item) => {
				this.played = LibraryUtility.updateArrayByObject(this.played, item, true);
			});
			this.playedTtl = LibraryMomentUtility.getTimestamp();
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.c', this.played, correlationId);
		},
		setScenarioListingPlayed(correlationId, listing) {
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.a', listing, correlationId);
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.b', this.played, correlationId);
			const results = this.played.find(played => played.id === characterId);
			this.played = LibraryUtility.updateArrayByObject(this.played, results, true);
			if (!results)
				this.played = LibraryUtility.updateArrayByObject(this.played, results, true);
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.c', this.played, correlationId);
		}
	},
	getters: {
		getScenario(correlationId) {
			if (this.listing == null)
				return null;
			return this.listing.find(item => item.id === id);
		},
		getScenarioPlayed(correlationId, characterId) {
			if (this.played == null)
				return null;
			const results = this.played.find(played => played.id === characterId);
			return results ? results.played : [];
		}
	},
	dispatcher: {
		async getScenarioListing(correlationId, gameSystemId) {
			return await LibraryClientUtility.scenarios.$store.getScenarioListing(correlationId, gameSystemId);
		},
		async getScenarioListingPlayed(correlationId, characterId) {
			return await LibraryClientUtility.scenarios.$store.getScenarioListing(correlationId, characterId);
		}
	}
};

export default storeScenarios;
