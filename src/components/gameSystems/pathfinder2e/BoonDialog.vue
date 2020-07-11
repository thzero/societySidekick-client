<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import BoonDialog from '@/components/gameSystems/BoonDialog';

import BoonLookupDialog from '@/components/gameSystems/pathfinder2e/BoonLookupDialog';

import CharacterBoon from '@/common/gameSystems/pathfinder2e/data/characterBoon';

export default {
	name: 'Pathfinder2eBoonDialog',
	components: {
		BoonLookupDialog
	},
	extends: BoonDialog,
	methods: {
		gameSystemId() {
			return SharedConstants.GameSystems.Pathfinder2e.id;
		},
		initResponseDetails(details) {
			return details;
		},
		initBoon() {
			return new CharacterBoon();
		},
		initializeServices() {
			this.rulesGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
.gameSystemScenarioCard {
	padding-top: 2px;
}
</style>
