<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseListing from '@/library_vue/components/admin/baseListing';

export default {
	name: 'VuetifyBaseAdminList',
	extends: baseListing,
	data: () => ({
		serviceGameSystems: null
	}),
	methods: {
		getGameSystemName(id) {
			const results = GlobalUtility.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		getLookupByGameSystemId(gameSystemId) {
			const gameSystem = this.lookups.find(l => l.gameSystemId === gameSystemId);
			return gameSystem ? gameSystem.lookups : null;
		},
		getLookupsByGameSystemId(gameSystemId) {
			if (!gameSystemId)
				return '';

			return this.getLookupByGameSystemId(gameSystemId);
		},
		getServiceByGameSystemId(correlationId, gameSystemId) {
			if (!gameSystemId)
				return null;
			const response = this.serviceGameSystems.getServiceByGameSystemId(correlationId, gameSystemId);
			if (this.hasFailed(response))
				return null;
			return response.results;
		},
		initializeServices() {
			this.serviceGameSystems = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
		},
		initialize() {
			const correlationId = this.correlationId();
			for (const gameSystem in SharedConstants.GameSystems)
				this.initLookupsByGameSystemId(correlationId, SharedConstants.GameSystems[gameSystem].id);
		},
		initLookupsByGameSystemId(correlationId, gameSystemId) {
			const service = this.getServiceByGameSystemId(correlationId, gameSystemId);
			if (!service)
				return;
			const lookups = service ? service.initializeLookups(correlationId, GlobalUtility.$injector) : null;
			this.lookups.push({ gameSystemId: gameSystemId, lookups: lookups });
		}
	}
};
</script>
