<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/components/base';

import ShareDialog from '@/components/ShareDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BaseList',
	components: {
		ShareDialog
	},
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
		dialogShare: new DialogSupport(),
		seasonFilterOverride: null
	}),
	computed: {
		gameSystemFilter: {
			get: function () {
				if (this.isExternalListCharacters || this.isExternalListScenarios) {
					if (this.gameSystemFilterOverrideI)
						return this.gameSystemFilterOverrideI;

					return this.gameSystemFilterOverride;
				}

				return AppUtility.settings().getSettingsUserGameSystemFilter(this.correlationId(), GlobalUtility.$store.state.user.user, (settings) => settings.gameSystemFilter);
			},
			set: function (newVal) {
				if (this.isExternalListCharacters || this.isExternalListScenarios) {
					this.gameSystemFilterOverrideI = newVal;
					return;
				}

				AppUtility.settings().updateSettingsUserGameSystemFilter(this.correlationId(), GlobalUtility.$store, GlobalUtility.$store.state.user.user, newVal, (settings) => { return settings.gameSystemFilter = newVal; });
			}
		},
		gameSystemName: {
			get() {
				const results = GlobalUtility.$store.getters.getGameSystem(this.gameSystemFilter);
				return results ? results.name : '';
			},
			set() {}
		},
		gameSystems() {
			const results = GlobalUtility.$store.state.gameSystems;
			return results ? results.filter(l => l.active) : [];
		},
		isExternalList() {
			return (this.isExternalListCharacters || this.isExternalListFavorites || this.isExternalListScenarios);
		},
		isExternalListCharacters() {
			return this.externalListType === Constants.ExternalListTypes.Characters;
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
	},
	methods: {
		dialogShareOpen() {
			this.$refs.shareDialog.openDialog(this.gameSystemFilter);
			this.dialogShare.open();
		}
	}
};
</script>
