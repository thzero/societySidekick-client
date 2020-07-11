<script>
import Constants from '@/constants';

import Inventory from '@/components/gameSystems/Inventory';

export default {
	name: 'Pathfinder2eInventory',
	extends: Inventory,
	props: {
		character: {
			type: Object,
			default: null
		}
	},
	methods: {
		initService() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>