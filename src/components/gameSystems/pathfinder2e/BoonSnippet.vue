<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import BoonGameSystemSnippet from '@/components/gameSystems/BoonGameSystemSnippet';
import CharacterNameSnippet from '@/components/gameSystems/pathfinder2e/CharacterNameSnippet';

export default {
	name: 'Pathfinder2eBoonSnippet',
	components: {
		CharacterNameSnippet
	},
	extends: BoonGameSystemSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		},
		scenarioLookupAdventureName(value) {
			return this.serviceGameSystem.scenarioLookupAdventureName(this.correlationId(), value, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>
