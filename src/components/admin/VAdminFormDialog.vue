<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import VueUtility from '@/library_vue/utility';

import baseAdminFormDialog from '@/library_vue/components/admin/VAdminFormDialog';

export default {
	name: 'BaseAdminFormDialog',
	extends: baseAdminFormDialog,
	data: () => ({
		gameSystemId: null,
		serviceGameSystems: null
	}),
	computed: {
		gameSystems() {
			return VueUtility.selectBlank(this.$store.state.gameSystems);
		},
		// GameSystems Update
		isGameSystemDungeonsAndDragons5e() {
			return this.gameSystemId === SharedConstants.GameSystems.DungeonsAndDragons5e.id;
		},
		isGameSystemPathfinder2e() {
			return this.gameSystemId === SharedConstants.GameSystems.Pathfinder2e.id;
		},
		isGameSystemStarfinder1e() {
			return this.gameSystemId === SharedConstants.GameSystems.Starfinder1e.id;
		},
		serviceGameSystem() {
			return this.getServiceByGameSystemId(this.correlationId(), this.gameSystemId);
		}
	},
	methods: {
		getServiceByGameSystemId(correlationId, gameSystemId) {
			if (!gameSystemId)
				return null;

			const response = this.serviceGameSystems.getServiceByGameSystemId(correlationId, gameSystemId);
			if (!response || !response.success)
				return null;

			return response.results;
		},
		initLookupsByGameSystemId(correlationId, gameSystemId) {
			const service = this.getServiceByGameSystemId(correlationId, gameSystemId);
			const lookups = service ? service.initializeLookups(correlationId, this.$injector) : null;
			return lookups;
		},
		initializeServices() {
			this.serviceGameSystems = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
		}
	}
};
</script>
