<script>
import Constants from '@/constants';

import InventoryDashboard from '@/components/gameSystems/InventoryDashboard';

import CharacterDetails from '@/components/gameSystems/pathfinder2e/CharacterDetails';
import Inventory from '@/components/gameSystems/pathfinder2e/Inventory';
import InventoryDialog from '@/components/gameSystems/pathfinder2e/InventoryDialog';

import InventoryItem from '@/common/gameSystems/pathfinder2e/data/characterInventory';

export default {
	name: 'Pathfinder2eInventoryDashboard',
	components: {
		CharacterDetails,
		Inventory,
		InventoryDialog
	},
	extends: InventoryDashboard,
	methods: {
		initInventory() {
			return new InventoryItem();
		},
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
