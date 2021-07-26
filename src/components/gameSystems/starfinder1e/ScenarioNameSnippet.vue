<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseScenarioNameSnippet from '@/components/gameSystems/baseScenarioNameSnippet';

export default {
	name: 'Starfinder1eScenarioNameSnippet',
	extends: baseScenarioNameSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
