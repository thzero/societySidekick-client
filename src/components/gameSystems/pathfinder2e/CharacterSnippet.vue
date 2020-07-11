<script>
import Constants from '@/constants';

import CharacterGameSystemSnippet from '@/components/gameSystems/CharacterGameSystemSnippet';

export default {
	name: 'Pathfinder2eCharacterSnippet',
	extends: CharacterGameSystemSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>
