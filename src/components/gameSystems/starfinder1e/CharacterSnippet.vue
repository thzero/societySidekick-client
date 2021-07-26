<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import CharacterGameSystemSnippet from '@/components/gameSystems/CharacterGameSystemSnippet';

export default {
	name: 'Starfinder1eCharacterSnippet',
	extends: CharacterGameSystemSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>
