<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import baseList from '@/library_vue/components/admin/baseList';
import VConfirmationDialog from '@/library_vue/components/VConfirmationDialog';

export default {
	name: 'BaseAdminList',
	components: {
		VConfirmationDialog
	},
	extends: baseList,
	data: () => ({
		serviceGameSystemsUtility: null
	}),
	methods: {
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
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
			const response = this.serviceGameSystemsUtility.getServiceByGameSystemId(correlationId, gameSystemId);
			if (!response || !response.success)
				return null;
			return response.results;
		},
		initializeServices() {
			this.serviceGameSystemsUtility = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
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
			const lookups = service ? service.initializeLookups(correlationId, this.$injector) : null;
			this.lookups.push({ gameSystemId: gameSystemId, lookups: lookups });
		}
	}
};
</script>
