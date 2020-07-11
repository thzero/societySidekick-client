<script>
import Constants from '@/constants';

import baseScenarioNameSnippet from '@/components/gameSystems/baseScenarioNameSnippet';

export default {
	name: 'Pathfinder2eScenarioNameSnippet',
	extends: baseScenarioNameSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
