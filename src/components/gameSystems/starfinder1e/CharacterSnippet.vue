<script>
import Constants from '@/constants';

import CharacterGameSystemSnippet from '@/components/gameSystems/CharacterGameSystemSnippet';

export default {
	name: 'Starfinder1eCharacterSnippet',
	extends: CharacterGameSystemSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>
