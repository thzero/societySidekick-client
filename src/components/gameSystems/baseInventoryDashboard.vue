<script>
import Utility from '@thzero/library_common/utility';
import AppUtility from '@/utility/app';

import baseDashboard from '@/components/baseDashboard';
import InventoryGearSetDeleteDialog from '@/components/gameSystems/InventoryGearSetDeleteDialog';
import InventoryGearSetLoadDialog from '@/components/gameSystems/InventoryGearSetLoadDialog';
import InventoryGearSetSaveDialog from '@/components/gameSystems/InventoryGearSetSaveDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BaseInventoryDashboard',
	components: {
		InventoryGearSetDeleteDialog,
		InventoryGearSetLoadDialog,
		InventoryGearSetSaveDialog
	},
	extends: baseDashboard,
	data: () => ({
		collapseInner: false,
		dialogInventory: new DialogSupport(),
		dialogInventoryItem: null,
		dialogInventoryGearSetDeleteSupport: new DialogSupport(),
		dialogInventoryGearSetLoadSupport: new DialogSupport(),
		dialogInventoryGearSetSaveSupport: new DialogSupport(),
		fab: false,
		snackbar: false,
		snackbarText: ''
	}),
	computed: {
		collapse: {
			get: function () {
				return this.collapseInner;
			},
			set: function (newVal) {
				this.collapseInner = newVal;
			}
		},
		groupedLines() {
			if (!this.value || !this.value.inventory)
				return [];

			let name;
			let order;
			let scenario;
			let temp;
			let list = [];
			for (const inv of this.value.inventory) {
				scenario = this.scenarioById(inv.boughtScenarioId);
				if (!scenario)
					continue;
				name = this.scenarioNameById(scenario.scenarioId);
				order = scenario.order;
				temp = list.find(l => l.order == order);
				if (!temp) {
					temp = { order: order, name: name, inventory: [] };
					list.push(temp);
				}
				temp.inventory.push(inv);
			}

			list = Utility.sortByOrder(list, true);
			for (const item of list)
				item.inventory = this.groupedLines3(item.inventory);

			return list;
		},
		groupedLines2() {
			if (!this.value || !this.value.inventory)
				return [];

			let size = 1;
			const length = this.value.inventory.length;
			if (length >= 4) {
				if (this.$vuetify.breakpoint.mdAndUp);
					size = length / 2;
			}

			return this.value.inventory.reduce((accumulator, article, index) => {
				let jndex = size > 1 ? index < size ? 0 : 1 : 0;
				if (!accumulator[jndex])
					accumulator[jndex] = [];
				accumulator[jndex].push(article);
				return accumulator;
			}, [ ]);
		},
		hasGearSets() {
			if (!this.value)
				return false;

			const gearSets = AppUtility.settings().getSettingsUserGameSystem(this.$store.state.user.user, this.value.gameSystemId, (settings) => { return settings.gearSets; });
			return gearSets && gearSets.length > 0;
		},
		hasInventory() {
			return this.value && this.value.inventory && this.value.inventory.length > 0;
		},
		hasScenarios() {
			return this.value && this.value.scenarios && this.value.scenarios.length > 0;
		}
	},
	methods: {
		async dialogInventoryEdit(value) {
			await this.$refs.inventoryDialog.reset({ id: value.id, character: this.clone(this.value) });
			this.dialogInventory.open();
		},
		async dialogInventoryNew() {
			const item = this.initInventory();
			delete item.id;
			const character = this.clone(this.value);
			character.inventory = character.inventory ? character.inventory : [];
			character.inventory.push(item);
			const last = Utility.sortByOrder(character.scenarios).slice(-1).pop();
			item.boughtScenarioId = last ? last.id : null;
			await this.$refs.inventoryDialog.reset({ id: item.id, character: character });
			this.dialogInventory.open();
		},
		async dialogInventoryGearSetDelete() {
			await this.$refs.inventoryGearSetDeleteDialog.reset();
			this.dialogInventoryGearSetDeleteSupport.open();
		},
		async dialogInventoryGearSetLoad() {
			await this.$refs.inventoryGearSetLoadDialog.reset();
			this.dialogInventoryGearSetLoadSupport.open();
		},
		async dialogInventoryGearSetSave() {
			await this.$refs.inventoryGearSetSaveDialog.reset();
			this.dialogInventoryGearSetSaveSupport.open();
		},
		dialogInventorOk() {
			this.snackbarText = this.$trans.t('messages.inventories.successInventory');
			this.snackbar = true;
			this.dialogInventory.ok();
		},
		dialogInventoryGearSetDeleteOk() {
			this.snackbarText = this.$trans.t('messages.inventories.successGearSetDelete');
			this.snackbar = true;
			this.dialogInventoryGearSetDeleteSupport.ok();

		},
		dialogInventoryGearSetLoadOk() {
			this.snackbarText = this.$trans.t('messages.inventories.successGearSetLoad');
			this.snackbar = true;
			this.dialogInventoryGearSetLoadSupport.ok();

		},
		dialogInventoryGearSetSaveOk() {
			this.snackbarText = this.$trans.t('messages.inventories.successGearSetSave');
			this.snackbar = true;
			this.dialogInventoryGearSetSaveSupport.ok();
		},
		groupedLines3(list) {
			let size = 1;
			const length = list.length;
			if (this.$vuetify.breakpoint.mdAndUp)
				size = length / 2;

			return list.reduce((accumulator, article, index) => {
				let jndex = size > 1 ? index < size ? 0 : 1 : 0;
				if (!accumulator[jndex])
					accumulator[jndex] = [];
				accumulator[jndex].push(article);
				return accumulator;
			}, [ ]);
		},
		initInventory() {
			this.notImplementedError();
		},
		scenarioById(id) {
			return this.value.scenarios.find(l => l.id === id);
		},
		scenarioName(id) {
			if (!this.character || !this.character.inventory)
				return '';

			const scenario = this.scenarioById(id);
			if (!scenario)
				return '';

			return this.scenarioNameById(scenario.scenarioId, this.$store);
		},
		scenarioNameById(id) {
			return id ? this.serviceGameSystem.determineScenarioNameById(id, this.$store) : '';
		}
	}
};
</script>

<style scoped>
</style>
