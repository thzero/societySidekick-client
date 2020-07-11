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
		serviceGameSystems: null
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
		getServiceByGameSystemId(gameSystemId) {
			if (!gameSystemId)
				return null;
			const response = this.serviceGameSystems.getServiceByGameSystemId(gameSystemId);
			if (!response || !response.success)
				return null;
			return response.results;
		},
		initializeServices() {
			this.serviceGameSystems = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
		},
		initialize() {
			for (const gameSystem in SharedConstants.GameSystems)
				this.initLookupsByGameSystemId(SharedConstants.GameSystems[gameSystem].id);
		},
		initLookupsByGameSystemId(gameSystemId) {
			const service = this.getServiceByGameSystemId(gameSystemId);
			if (!service)
				return;
			const lookups = service ? service.initializeLookups(this.$injector) : null;
			this.lookups.push({ gameSystemId: gameSystemId, lookups: lookups });
		}
	}
};
</script>
