<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

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
		initResponseDetails(correlationId, details) {
			return details;
		},
		initBoon() {
			return new CharacterBoon();
		},
		initializeServices() {
			this.rulesGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
.gameSystemScenarioCard {
	padding-top: 2px;
}
</style>
