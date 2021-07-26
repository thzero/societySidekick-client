<script>
import Constants from '@/constants';
import Pathfinder2eSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import VueUtility from '@/library_vue/utility';

import ScenarioLookupDialog from '@/components/gameSystems/ScenarioLookupDialog';

export default {
	name: 'Pathfinder2eScenarioLookupDialog',
	extends: ScenarioLookupDialog,
	computed: {
		scenarioAdventures() {
			return VueUtility.selectBlank(this.lookups.scenarioAdventures);
		}
	},
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		},
		scenarioListFilterInitial() {
			return Pathfinder2eSharedConstants.ScenarioAdventures.INITIAL;
		}
	}
};
</script>

<style scoped>
</style>
