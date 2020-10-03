<script>
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility';

import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VAutoCompleteWithValidation from '@/library_vue/components/form/VAutoCompleteWithValidation';
import VNumberField from '@/library_vue/components/form/VNumberField';
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'BaseInventoryDialog',
	components: {
		VFormDialog,
		VAutoCompleteWithValidation,
		VNumberField,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	data: () => ({
		character: null,
		innerValue: {},
		isNew: false,
		item: null,
		itemId: null,
		rulesGameSystem: null,
		scenarios: [],
		serviceGameSystem: null,
		watch: null
	}),
	computed: {
		characterCurrencyCurrent: {
			get: function () {
				return this.rulesGameSystem.calculateCharacterCurrencyCurrent(this.character, this.total);
			},
			set: function() {},
			cache: false
		},
		characterScenarioCurrencyCurrent: {
			get: function () {
				if (!this.character || !this.character.scenarios || !this.innerValue)
					return 0;

				const scenario = this.character.scenarios.find(l => l.id === this.innerValue.boughtScenarioId);
				if (!scenario)
					return 0;

				return this.rulesGameSystem.calculateCharacterCurrencyScenario(scenario, this.total);
			},
			set: function() {},
			cache: false
		},
		characterScenarios() {
			if (!this.character || !this.character.scenarios)
				return [];

			let scenarios = this.character.scenarios.slice(0);
			for (const item of scenarios) {
				item.scenario = this.scenarios.find(l => l.id == item.scenarioId);
				item.displayName = item.order + ') ' + this.scenarioName(item.scenario);
				item.name = item.scenario ? item.scenario.name : '';
			}

			return LibraryUtility.sortByOrder(scenarios, true);
		},
		characterScenariosBlank() {
			return VueUtility.selectBlank(this.characterScenarios.slice(0));
		},
		isItemOrItemId() {
			const hasItem = this.innerValue.item && this.innerValue.item !== '';
			const hasItemId = this.itemId && this.itemId !== '';
			if (!hasItem && !hasItemId)
				return 0;
			if (hasItemId)
				return 1;
			return 2;
		},
		quantity: {
			get: function () {
				// const value = this.innerValue
				// const quantity = value.quantity
				return this.item ? this.innerValue.quantity * this.item.quantity : this.innerValue.quantity;
			},
			cache: false
		},
		total: {
			get: function () {
				if (!this.innerValue)
					return 0;
				return this.rulesGameSystem.calculateItemTotalFixed(this.innerValue.quantity, this.innerValue.value);
			},
			cache: false
		},
		usedRules() {
			// return 'decimal:0|min_value:0|max_value:99|'
			const rules = 'decimal:0|min_value:0|max_value:' + (this.quantity ? this.quantity : '99') + '|';
			return rules;
		}
	},
	watch: {
		itemId(newValue) {
			if (!newValue) {
				this.item = null;
				return;
			}

			this.item = this.$store.state.equipment.listing.find(l => l.id === newValue);
		},
		innerValue: {
			// eslint-disable-next-line
			handler(newValue) {
				this.onChange(newValue);
			},
			deep: true
		}
	},
	async created() {
		this.initializeServices();
		this.scenarios = await this.initScenarios();
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		async close() {
		},
		gameSystemId() {
			return this.rulesGameSystem.gameSystemId();
		},
		async initScenarios() {
			return this.serviceGameSystem.scenarios(this.$store);
		},
		initializeServices() {
			this.notImplementedError();
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		onChange(newValue) {
			if (!newValue)
				return;

			const self = this;
			(async () => {
				self.rulesGameSystem.calculateCharacter(self.character, null, newValue.id);
			})().catch(err => {
				self.logger.error('BaseInventoryDialog', 'onChange', err);
			});
		},
		async preCompleteResponseDelete() {
			return await this.$store.dispatcher.characters.deleteCharacterInventory(this.character.id, this.innerValue.id);
		},
		async preCompleteResponseOk() {
			const inventory = {
				id: this.innerValue.id,
				updatedTimestamp: this.character.updatedTimestamp,
				gameSystemId: this.gameSystemId(),
				timestamp: this.innerValue.timestamp,
				boughtScenarioId: this.innerValue.boughtScenarioId,
				item: String.trim(this.innerValue.item),
				itemId: this.itemId,
				quantity: String.trim(this.innerValue.quantity),
				soldScenarioId: this.innerValue.soldScenarioId,
				usedScenarioId: this.innerValue.usedScenarioId,
				used: String.trim(this.innerValue.used),
				value: String.trim(this.innerValue.value)
			};
			if (!this.innerValue.item && !this.itemId) {
				const response = this.error();
				response.addGeneric(this.$trans.t('errors.inventories.eitherItemOrName'));
				return response;
			}
			const response = await this.$store.dispatcher.characters.updateCharacterInventory(this.character.id, inventory);
			this.logger.debug('BaseInventoryDialog', 'preCompleteResponseOk', response);
			return response;
		},
		async querySelection(newVal) {
			let results = [];
			newVal = newVal ? String.trim(newVal) : newVal;
			if (newVal &&newVal.length >= 3)
				results = await this.$store.dispatcher.equipment.equipmentSearch(this.gameSystemId(), { name: newVal });
			return VueUtility.selectBlank(results);
		},
		async resetDialog(value) {
			this.itemId = null;
			this.character = value.character;
			const temp = value.character.inventory.find(l => l.id == value.id);
			temp.timestamp = temp.timestamp ? LibraryUtility.convertTimestampToLocal(temp.timestamp).valueOf() : LibraryUtility.getTimestampLocal().valueOf();
			this.isNew = value && !value.id;
			this.innerValue = temp;

			if (this.watch)
				this.watch();

			this.watch = this.$watch('itemId', async (newVal) => {
				if (newVal) {
					const item = this.$store.getters.getEquipment(newVal);
					if (item) {
						this.innerValue.item = item.name;
						this.innerValue.value = item.cost;
						return;
					}
				}

				this.innerValue.item = null;
				this.innerValue.value = null;
			});
		},
		scenarioName(scenario) {
			return scenario ? this.serviceGameSystem.scenarioName(scenario) : '';
		},
		transCurrency() {
			return '';
		}
	}
};
</script>
