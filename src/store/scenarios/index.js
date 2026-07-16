import Constants from '@/constants';
import LibraryConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

const store = {
	state: () => ({
		listing: [],
		played: []
	}),
	actions: {
		async getScenarioListing(correlationId, gameSystemId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.listing(correlationId, gameSystemId);
			this.$logger.debug('store.scenarios', 'getScenarioListing', 'response', response, correlationId);
			if (Response.hasSucceeded(response)) {
				const listing = response.results ? response.results.data : null;
				await this.setScenarioListing(correlationId, listing);
				return listing;
			}
			return [];
		},
		async getScenarioListingPlayed(correlationId, characterId) {
			const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_SCENARIOS);
			const response = await service.played(correlationId, characterId);
			this.$logger.debug('store.scenarios', 'getScenarioListingPlayed', 'response', response, correlationId);
			if (Response.hasSucceeded(response))
				await this.setScenarioListingPlayed(correlationId, response.results ? response.results : null, characterId);
			return response;
		},
		async setScenarioListing(correlationId, listing) {
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.a', listing, correlationId);
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.b', this.listing, correlationId);
			if (!listing)
				return;

				listing.forEach((item) => {
				this.listing = LibraryUtility.updateArrayByObject(this.listing, item, true);
			});
			this.$logger.debug('store.scenarios', 'setScenarioListing', 'list.c', this.listing, correlationId);
		},
		async setScenarioListingPlayed(correlationId, played, characterId) {
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.a', played, correlationId);
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.b', this.played, correlationId);
			const results = this.played.find(played => played.id === characterId);
			if (!results)
				this.played.push({ id: characterId, played: played });
			else
				results.played = played;
			this.$logger.debug('store.scenarios', 'setScenarioListingPlayed', 'item.c', this.played, correlationId);
		}
	},
	getters: {
		getScenario(correlationId, id) {
			if (LibraryClientUtility.$store.scenarios.listing == null)
				return null;
			return LibraryClientUtility.$store.scenarios.listing.find(scenario => scenario.id === id);
		},
		getScenarioPlayed(correlationId, characterId) {
			if (LibraryClientUtility.$store.scenarios.played == null)
				return null;
			const results = LibraryClientUtility.$store.scenarios.played.find(played => played.id === characterId);
			return results ? results.played : [];
		}
	},
	dispatcher: {
		async getScenarioListing(correlationId, gameSystemId) {
			await LibraryClientUtility.$store.scenarios.getScenarioListing(correlationId, gameSystemId);
		},
		async getScenarioListingPlayed(correlationId, characterId) {
			return await LibraryClientUtility.$store.scenarios.getScenarioListingPlayed(correlationId, characterId);
		}
	}
};

export default store;
