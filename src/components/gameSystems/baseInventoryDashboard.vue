<script>
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseDashboardComponent } from '@/components/baseDashboard';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// Base inventory-dashboard composable. Leaf owns the template + registers its CharacterDetails/Inventory/
// InventoryDialog children (the shared GearSet dialogs are registered by the leaf too) and passes
// options { serviceGameSystem, initInventory(cid) }.
export function useBaseInventoryDashboardComponent(props, context, options) {
	const base = useBaseDashboardComponent(props, context, options);

	const display = useDisplay();

	const inventoryDialogRef = ref(null);
	const inventoryGearSetDeleteDialogRef = ref(null);
	const inventoryGearSetLoadDialogRef = ref(null);
	const inventoryGearSetSaveDialogRef = ref(null);

	const collapseInner = ref(false);
	const dialogInventory = ref(new DialogSupport());
	const dialogInventoryItem = ref(null);
	const dialogInventoryGearSetDeleteSupport = ref(new DialogSupport());
	const dialogInventoryGearSetLoadSupport = ref(new DialogSupport());
	const dialogInventoryGearSetSaveSupport = ref(new DialogSupport());
	const fab = ref(false);
	const snackbar = ref(false);
	const snackbarText = ref('');

	const collapse = computed({
		get: () => collapseInner.value,
		set: (newVal) => { collapseInner.value = newVal; }
	});

	const scenarioById = (id) => {
		return props.value.scenarios.find(l => l.id === id);
	};
	const scenarioNameById = (id) => {
		return id ? base.serviceGameSystem.determineScenarioNameById(base.correlationId(), id, LibraryClientUtility.$store) : '';
	};
	const scenarioName = (id) => {
		if (!props.value || !props.value.inventory)
			return '';
		const scenario = scenarioById(id);
		if (!scenario)
			return '';
		return scenarioNameById(scenario.scenarioId);
	};

	const groupedLines3 = (list) => {
		let size = 1;
		const length = list.length;
		if (display.mdAndUp.value)
			size = length / 2;
		return list.reduce((accumulator, article, index) => {
			const jndex = size > 1 ? index < size ? 0 : 1 : 0;
			if (!accumulator[jndex])
				accumulator[jndex] = [];
			accumulator[jndex].push(article);
			return accumulator;
		}, []);
	};

	const groupedLines = computed(() => {
		if (!props.value || !props.value.inventory)
			return [];

		let name;
		let order;
		let scenario;
		let temp;
		let list = [];
		for (const inv of props.value.inventory) {
			scenario = scenarioById(inv.boughtScenarioId);
			if (!scenario)
				continue;
			name = scenarioNameById(scenario.scenarioId);
			order = scenario.order;
			temp = list.find(l => l.order == order);
			if (!temp) {
				temp = { order: order, name: name, inventory: [] };
				list.push(temp);
			}
			temp.inventory.push(inv);
		}

		list = LibraryCommonUtility.sortByOrder(list, true);
		for (const item of list)
			item.inventory = groupedLines3(item.inventory);

		return list;
	});
	const groupedLines2 = computed(() => {
		if (!props.value || !props.value.inventory)
			return [];

		let size = 1;
		const length = props.value.inventory.length;
		if (length >= 4) {
			if (display.mdAndUp.value);
				size = length / 2;
		}

		return props.value.inventory.reduce((accumulator, article, index) => {
			const jndex = size > 1 ? index < size ? 0 : 1 : 0;
			if (!accumulator[jndex])
				accumulator[jndex] = [];
			accumulator[jndex].push(article);
			return accumulator;
		}, []);
	});
	const hasGearSets = computed(() => {
		if (!props.value)
			return false;
		const gearSets = AppUtility.settings().getSettingsUserGameSystem(base.correlationId(), LibraryClientUtility.$store.user.user, props.value.gameSystemId, (settings) => { return settings.gearSets; });
		return gearSets && gearSets.length > 0;
	});
	const hasInventory = computed(() => {
		return props.value && props.value.inventory && props.value.inventory.length > 0;
	});
	const hasScenarios = computed(() => {
		return props.value && props.value.scenarios && props.value.scenarios.length > 0;
	});

	const initInventory = (correlationId) => {
		return options.initInventory(correlationId);
	};

	const dialogInventoryEdit = async (value) => {
		await inventoryDialogRef.value.reset(base.correlationId(), { id: value.id, character: LibraryCommonUtility.cloneDeep(props.value) });
		dialogInventory.value.open();
	};
	const dialogInventoryNew = async () => {
		const item = initInventory(base.correlationId());
		delete item.id;
		const character = LibraryCommonUtility.cloneDeep(props.value);
		character.inventory = character.inventory ? character.inventory : [];
		character.inventory.push(item);
		const last = LibraryCommonUtility.sortByOrder(character.scenarios).slice(-1).pop();
		item.boughtScenarioId = last ? last.id : null;
		await inventoryDialogRef.value.reset(base.correlationId(), { id: item.id, character: character });
		dialogInventory.value.open();
	};
	const dialogInventoryGearSetDelete = async () => {
		await inventoryGearSetDeleteDialogRef.value.reset(base.correlationId(), null);
		dialogInventoryGearSetDeleteSupport.value.open();
	};
	const dialogInventoryGearSetLoad = async () => {
		await inventoryGearSetLoadDialogRef.value.reset(base.correlationId(), null);
		dialogInventoryGearSetLoadSupport.value.open();
	};
	const dialogInventoryGearSetSave = async () => {
		await inventoryGearSetSaveDialogRef.value.reset(base.correlationId(), null);
		dialogInventoryGearSetSaveSupport.value.open();
	};
	const dialogInventorOk = () => {
		snackbarText.value = LibraryClientUtility.$trans.t('messages.inventories.successInventory');
		snackbar.value = true;
		dialogInventory.value.ok();
	};
	const dialogInventoryGearSetDeleteOk = () => {
		snackbarText.value = LibraryClientUtility.$trans.t('messages.inventories.successGearSetDelete');
		snackbar.value = true;
		dialogInventoryGearSetDeleteSupport.value.ok();
	};
	const dialogInventoryGearSetLoadOk = () => {
		snackbarText.value = LibraryClientUtility.$trans.t('messages.inventories.successGearSetLoad');
		snackbar.value = true;
		dialogInventoryGearSetLoadSupport.value.ok();
	};
	const dialogInventoryGearSetSaveOk = () => {
		snackbarText.value = LibraryClientUtility.$trans.t('messages.inventories.successGearSetSave');
		snackbar.value = true;
		dialogInventoryGearSetSaveSupport.value.ok();
	};

	return {
		...base,
		inventoryDialogRef,
		inventoryGearSetDeleteDialogRef,
		inventoryGearSetLoadDialogRef,
		inventoryGearSetSaveDialogRef,
		collapseInner,
		dialogInventory,
		dialogInventoryItem,
		dialogInventoryGearSetDeleteSupport,
		dialogInventoryGearSetLoadSupport,
		dialogInventoryGearSetSaveSupport,
		fab,
		snackbar,
		snackbarText,
		collapse,
		groupedLines,
		groupedLines2,
		groupedLines3,
		hasGearSets,
		hasInventory,
		hasScenarios,
		initInventory,
		scenarioById,
		scenarioName,
		scenarioNameById,
		dialogInventoryEdit,
		dialogInventoryNew,
		dialogInventoryGearSetDelete,
		dialogInventoryGearSetLoad,
		dialogInventoryGearSetSave,
		dialogInventorOk,
		dialogInventoryGearSetDeleteOk,
		dialogInventoryGearSetLoadOk,
		dialogInventoryGearSetSaveOk
	};
};
</script>
