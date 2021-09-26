<script>
import Constants from '@/constants';
import Starfinder1eSharedConstants from '@/common/gameSystems/starfinder1e/constants';

import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import ScenarioLookupDialog from '@/components/gameSystems/ScenarioLookupDialog';

export default {
	name: 'Starfinder1eScenarioLookupDialog',
	extends: ScenarioLookupDialog,
	computed: {
		scenarioAdventures() {
			return LibraryUtility.selectBlank(this.lookups.scenarioAdventures);
		}
	},
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		},
		scenarioListFilterInitial() {
			return Starfinder1eSharedConstants.ScenarioAdventures.INITIAL;
		}
	}
};
</script>

<style scoped>
</style>
