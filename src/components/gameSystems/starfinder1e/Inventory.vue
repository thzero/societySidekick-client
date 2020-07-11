<script>
import Constants from '@/constants';

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
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>