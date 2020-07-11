<script>
import Constants from '@/constants';

import InventoryDashboard from '@/components/gameSystems/InventoryDashboard';

import CharacterDetails from '@/components/gameSystems/starfinder1e/CharacterDetails';
import Inventory from '@/components/gameSystems/starfinder1e/Inventory';
import InventoryDialog from '@/components/gameSystems/starfinder1e/InventoryDialog';

import InventoryItem from '@/common/gameSystems/starfinder1e/data/characterInventory';

export default {
	name: 'Starfinder1eInventoryDashboard',
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
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
