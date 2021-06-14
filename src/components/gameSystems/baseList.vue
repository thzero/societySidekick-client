<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import base from '@/components/base';

import AppUtility from '@/utility/app';

export default {
	name: 'BaseList',
	extends: base,
	props: {
		gameSystemFilterOverride: {
			type: String,
			default: null
		},
		externalListType: {
			type: String,
			default: null
		}
	},
	data: () => ({
		seasonFilterOverride: null
	}),
	computed: {
		gameSystemFilter: {
			get: function () {
				if (this.isExternalListScenarios) {
					if (this.gameSystemFilterOverrideI)
						return this.gameSystemFilterOverrideI;

					return this.gameSystemFilterOverride;
				}

				return AppUtility.settings().getSettingsUserGameSystemFilter(this.correlationId(), this.$store.state.user.user, (settings) => settings.gameSystemFilter);
			},
			set: function (newVal) {
				if (this.isExternalListScenarios) {
					this.gameSystemFilterOverrideI = newVal;
					return;
				}

				AppUtility.settings().updateSettingsUserGameSystemFilter(this.correlationId(), this.$store, this.$store.state.user.user, newVal, (settings) => { return settings.gameSystemFilter = newVal; });
			}
		},
		gameSystems() {
			const results = this.$store.state.gameSystems;
			return results ? results.filter(l => l.active) : [];
		},
		isExternalList() {
			return (this.externalListType === Constants.ExternalListTypes.Favorites || this.externalListType === Constants.ExternalListTypes.Scenarios);
		},
		isExternalListFavorites() {
			return this.externalListType === Constants.ExternalListTypes.Favorites;
		},
		isExternalListScenarios() {
			return this.externalListType === Constants.ExternalListTypes.Scenarios;
		},
		// GameSystems Update
		isGameSystemDungeonsAndDragons5e() {
			return this.gameSystemFilter === SharedConstants.GameSystems.DungeonsAndDragons5e.id;
		},
		isGameSystemPathfinder2e() {
			return this.gameSystemFilter === SharedConstants.GameSystems.Pathfinder2e.id;
		},
		isGameSystemStarfinder1e() {
			return this.gameSystemFilter === SharedConstants.GameSystems.Starfinder1e.id;
		}
	}
};
</script>
