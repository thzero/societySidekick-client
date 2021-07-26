<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import Inventory from '@/components/gameSystems/Inventory';

export default {
	name: 'Starfinder1eInventory',
	extends: Inventory,
	props: {
		character: {
			type: Object,
			default: null
		}
	},
	methods: {
		initService() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>