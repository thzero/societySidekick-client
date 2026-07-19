<script>
import { computed, ref, watch } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseComponent } from '@/components/base';

// Reusable inventory-dialog logic composable. The per-game-system leaf owns the template (VtFormDialog
// wrapper + fields) and passes services/callbacks via options:
//   { serviceGameSystem, rulesGameSystem, gameSystemId(), transCurrency() }
export function useBaseInventoryDialogComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;
	const rulesGameSystem = options.rulesGameSystem;

	const character = ref(null);
	const innerValue = ref({});
	const isNew = ref(false);
	const item = ref(null);
	const itemId = ref(null);
	const scenarios = ref([]);

	const scenarioName = (correlationId, scenario) => {
		return scenario ? serviceGameSystem.scenarioName(correlationId, scenario) : '';
	};

	const total = computed(() => {
		if (!innerValue.value)
			return 0;
		return rulesGameSystem.calculateItemTotalFixed(innerValue.value.quantity, innerValue.value.value);
	});
	const quantity = computed(() => {
		return item.value ? innerValue.value.quantity * item.value.quantity : innerValue.value.quantity;
	});
	const characterCurrencyCurrent = computed({
		get: () => rulesGameSystem.calculateCharacterCurrencyCurrent(base.correlationId(), character.value, total.value),
		set: () => {}
	});
	const characterScenarioCurrencyCurrent = computed({
		get: () => {
			if (!character.value || !character.value.scenarios || !innerValue.value)
				return 0;
			const scenario = character.value.scenarios.find(l => l.id === innerValue.value.boughtScenarioId);
			if (!scenario)
				return 0;
			return rulesGameSystem.calculateCharacterCurrencyScenario(base.correlationId(), scenario, total.value);
		},
		set: () => {}
	});
	const characterScenarios = computed(() => {
		if (!character.value || !character.value.scenarios)
			return [];
		const correlationId = base.correlationId();
		const list = character.value.scenarios.slice(0);
		for (const s of list) {
			s.scenario = scenarios.value.find(l => l.id == s.scenarioId);
			s.displayName = s.order + ') ' + scenarioName(correlationId, s.scenario);
			s.name = s.scenario ? s.scenario.name : '';
		}
		return LibraryCommonUtility.sortByOrder(list, true);
	});
	const characterScenariosBlank = computed(() => {
		return LibraryCommonUtility.selectBlank(characterScenarios.value.slice(0));
	});
	const isItemOrItemId = computed(() => {
		const hasItem = innerValue.value.item && innerValue.value.item !== '';
		const hasItemId = itemId.value && itemId.value !== '';
		if (!hasItem && !hasItemId)
			return 0;
		if (hasItemId)
			return 1;
		return 2;
	});

	const gameSystemId = () => {
		return options.gameSystemId ? options.gameSystemId() : rulesGameSystem.gameSystemId();
	};
	const transCurrency = () => {
		return options.transCurrency ? options.transCurrency() : '';
	};

	const cancel = async () => {
		context.emit('cancel');
	};
	const close = async () => {
	};
	const ok = async () => {
		context.emit('ok');
		return true;
	};
	const initScenarios = async () => {
		return serviceGameSystem.scenarios(base.correlationId(), LibraryClientUtility.$store);
	};
	const onChange = (newValue) => {
		if (!newValue)
			return;
		const correlationId = base.correlationId();
		(async () => {
			rulesGameSystem.calculateCharacter(correlationId, character.value, null, newValue.id);
		})().catch(err => {
			base.logger.error('BaseInventoryDialog', 'onChange', null, err, null, null, correlationId);
		});
	};
	const preCompleteResponseDelete = async (correlationId) => {
		return await LibraryClientUtility.$store.dispatcher.characters.deleteCharacterInventory(correlationId, character.value.id, innerValue.value.id);
	};
	const preCompleteResponseOk = async (correlationId) => {
		const inventory = {
			id: innerValue.value.id,
			updatedTimestamp: character.value.updatedTimestamp,
			gameSystemId: gameSystemId(),
			timestamp: innerValue.value.timestamp,
			boughtScenarioId: innerValue.value.boughtScenarioId,
			item: String.trim(innerValue.value.item),
			itemId: itemId.value,
			quantity: String.trim(innerValue.value.quantity),
			soldScenarioId: innerValue.value.soldScenarioId,
			usedScenarioId: innerValue.value.usedScenarioId,
			used: String.trim(innerValue.value.used),
			value: String.trim(innerValue.value.value)
		};
		if (!innerValue.value.item && !itemId.value) {
			const response = base.error('BaseInventoryDialog', 'preCompleteResponseOk', null, null, null, null, correlationId);
			response.addGeneric(LibraryClientUtility.$trans.t('errors.inventories.eitherItemOrName'));
			return response;
		}
		const response = await LibraryClientUtility.$store.dispatcher.characters.updateCharacterInventory(correlationId, character.value.id, inventory);
		base.logger.debug('BaseInventoryDialog', 'preCompleteResponseOk', 'response', response, correlationId);
		return response;
	};
	const querySelection = async (newVal) => {
		let results = [];
		newVal = newVal ? String.trim(newVal) : newVal;
		if (newVal && newVal.length >= 3)
			results = await LibraryClientUtility.$store.dispatcher.equipment.equipmentSearch(base.correlationId(), gameSystemId(), { name: newVal });
		return LibraryCommonUtility.selectBlank(results);
	};
	const resetDialog = async (correlationId, value) => {
		itemId.value = null;
		character.value = value.character;
		const temp = value.character.inventory.find(l => l.id == value.id);
		temp.timestamp = temp.timestamp ? LibraryCommonUtility.convertTimestampToLocal(temp.timestamp).valueOf() : LibraryCommonUtility.getTimestampLocal().valueOf();
		isNew.value = value && !value.id;
		innerValue.value = temp;
	};

	// itemId watcher: resolve the equipment item + backfill item name/value (was a static watch + a
	// dynamically-recreated $watch in resetDialog; folded into one persistent watcher).
	watch(itemId, (newValue) => {
		if (!newValue) {
			item.value = null;
			if (innerValue.value) {
				innerValue.value.item = null;
				innerValue.value.value = null;
			}
			return;
		}
		item.value = LibraryClientUtility.$store.equipment.listing.find(l => l.id === newValue);
		const equip = LibraryClientUtility.$store.getters.getEquipment(base.correlationId(), newValue);
		if (equip && innerValue.value) {
			innerValue.value.item = equip.name;
			innerValue.value.value = equip.cost;
		}
	});
	watch(innerValue, (newValue) => {
		onChange(newValue);
	}, { deep: true });

	// created(): load scenarios.
	(async () => {
		scenarios.value = await initScenarios();
	})();

	return {
		...base,
		serviceGameSystem,
		rulesGameSystem,
		character,
		innerValue,
		isNew,
		item,
		itemId,
		scenarios,
		total,
		quantity,
		characterCurrencyCurrent,
		characterScenarioCurrencyCurrent,
		characterScenarios,
		characterScenariosBlank,
		isItemOrItemId,
		gameSystemId,
		transCurrency,
		cancel,
		close,
		ok,
		initScenarios,
		onChange,
		preCompleteResponseDelete,
		preCompleteResponseOk,
		querySelection,
		resetDialog,
		reset: resetDialog,
		scenarioName
	};
};
</script>
