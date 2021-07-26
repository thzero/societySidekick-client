<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import InventoryDialog from '@/components/gameSystems/InventoryDialog';

export default {
	name: 'Starfinder1eInventoryDialog',
	extends: InventoryDialog,
	computed: {
		characterCurrencyTotal() {
			return this.character ? this.character.currencyTotal : 0;
		},
		characterScenarioCurrencyTotal: {
			get: function () {
				if (!this.character || !this.character.scenarios || !this.innerValue)
					return 0;

				const scenario = this.character.scenarios.find(l => l.id === this.innerValue.boughtScenarioId);
				if (!scenario)
					return 0;

				return scenario.currencySpendable;
			},
			set: function() {},
			cache: false
		}
	},
	methods: {
		gameSystemId() {
			return SharedConstants.GameSystems.Starfinder1e.id;
		},
		initializeServices() {
			this.rulesGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E);
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		},
		transCurrency() {
			return GlobalUtility.$trans.t('characters.gameSystems.starfinder1e.currency');
		}
	}
};
</script>

<style scoped>
.scenarioCard {
	padding-top: 2px;
}
</style>
