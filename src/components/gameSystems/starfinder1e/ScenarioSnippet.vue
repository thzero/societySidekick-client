<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

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
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		},
		scenarioLookupAdventureName(value) {
			return this.serviceGameSystem.scenarioLookupAdventureName(this.correlationId(), value, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>
