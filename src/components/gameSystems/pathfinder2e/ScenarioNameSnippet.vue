<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseScenarioNameSnippet from '@/components/gameSystems/baseScenarioNameSnippet';

export default {
	name: 'Pathfinder2eScenarioNameSnippet',
	extends: baseScenarioNameSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
