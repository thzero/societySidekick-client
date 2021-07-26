<script>
import Constants from '@/constants';

import SharedConstants from '@/common/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import InventoryDialog from '@/components/gameSystems/InventoryDialog';

export default {
	name: 'Pathfinder2eInventoryDialog',
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
			return SharedConstants.GameSystems.Pathfinder2e.id;
		},
		initializeServices() {
			this.rulesGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		},
		transCurrency() {
			return GlobalUtility.$trans.t('characters.gameSystems.pathfinder2e.currency');
		}
	}
};
</script>

<style scoped>
.scenarioCard {
	padding-top: 2px;
}
</style>
