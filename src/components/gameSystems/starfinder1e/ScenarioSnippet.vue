<script>
import Constants from '@/constants';

import ScenarioGameSystemSnippet from '@/components/gameSystems/ScenarioGameSystemSnippet';
import CharacterNameSnippet from '@/components/gameSystems/starfinder1e/CharacterNameSnippet';

export default {
	name: 'Starfinder1eScenarioSnippet',
	components: {
		CharacterNameSnippet
	},
	extends: ScenarioGameSystemSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		},
		scenarioLookupAdventureName(value) {
			return this.serviceGameSystem.scenarioLookupAdventureName(value, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>
