<script>
import Constants from '@/constants';

import ScenarioGameSystemSnippet from '@/components/gameSystems/ScenarioGameSystemSnippet';
import CharacterNameSnippet from '@/components/gameSystems/pathfinder2e/CharacterNameSnippet';

export default {
	name: 'Pathfinder2eScenarioSnippet',
	components: {
		CharacterNameSnippet
	},
	extends: ScenarioGameSystemSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		},
		scenarioLookupAdventureName(value) {
			return this.serviceGameSystem.scenarioLookupAdventureName(this.correlationId(), value, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>
