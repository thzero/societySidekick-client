<script>
import Constants from '@/constants';

import baseScenarioNameSnippet from '@/components/gameSystems/baseScenarioNameSnippet';

export default {
	name: 'Starfinder1eScenarioNameSnippet',
	extends: baseScenarioNameSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
