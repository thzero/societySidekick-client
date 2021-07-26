<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import CharacterGameSystemSnippet from '@/components/gameSystems/CharacterGameSystemSnippet';

export default {
	name: 'Pathfinder2eCharacterSnippet',
	extends: CharacterGameSystemSnippet,
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>
