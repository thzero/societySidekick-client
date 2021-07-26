<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import BoonDialog from '@/components/gameSystems/BoonDialog';

import BoonLookupDialog from '@/components/gameSystems/starfinder1e/BoonLookupDialog';

import CharacterBoon from '@/common/gameSystems/starfinder1e/data/characterBoon';

export default {
	name: 'Starfinder1eBoonDialog',
	components: {
		BoonLookupDialog
	},
	extends: BoonDialog,
	methods: {
		gameSystemId() {
			return SharedConstants.GameSystems.Starfinder1e.id;
		},
		initResponseDetails(correlationId, details) {
			return details;
		},
		initBoon() {
			return new CharacterBoon();
		},
		initializeServices() {
			this.rulesGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E);
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
