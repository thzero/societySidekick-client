<script>
import Constants from '@/constants';
import Starfinder1eSharedConstants from '@/common/gameSystems/starfinder1e/constants';

import Utility from '@thzero/library/utility';

import ScenarioLookupDialog from '@/components/gameSystems/ScenarioLookupDialog';

export default {
	name: 'Starfinder1eScenarioLookupDialog',
	extends: ScenarioLookupDialog,
	computed: {
		scenarioAdventures() {
			return Utility.selectBlank(this.lookups.scenarioAdventures);
		}
	},
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		},
		scenarioListFilterInitial() {
			return Starfinder1eSharedConstants.ScenarioAdventures.INITIAL;
		}
	}
};
</script>

<style scoped>
</style>
