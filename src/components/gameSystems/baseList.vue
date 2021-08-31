<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/components/base';

import ShareDialog from '@/components/ShareDialog';

import DialogSupport from '@/library_vue_components/components/support/dialog';

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
		extractTypes() {
			return Constants.ExtractTypes;
		},
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
		clickExtract(type) {
			this.extract(this.correlationId(), type);
		},
		dialogShareOpen() {
			this.$refs.shareDialog.openDialog(this.gameSystemFilter);
			this.dialogShare.open();
		},
		download(content, type, user, defaultName) {
			let filename = user.settings && !String.isNullOrEmpty(user.settings.gamerTag) ? user.settings.gamerTag.toLowerCase() : defaultName;
			if (type == Constants.ExtractTypes.Csv)
				this.downloadCsv(content, filename);
			else if (type == Constants.ExtractTypes.Text)
				this.downloadText(content, filename);
		},
		downloadI(content, filename, mimeType) {
			mimeType = mimeType || 'application/octet-stream';

			const file = new File([content], 'shit.csv', { type: mimeType });
            // location.href = URL.createObjectURL(file);

			let anchor = document.createElement('a');
			anchor.download = filename;
			anchor.href = (window.webkitURL || window.URL).createObjectURL(file);
			anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
			anchor.click();
		},
		downloadCsv(content, filename) {
			this.downloadI(content, filename + '.csv', 'text/csv;encoding:utf-8');
		},
		downloadText(content, filename) {
			this.downloadI(content, filename + '.txt', 'text/text;encoding:utf-8');
		},
		extract(correlationId, type) {
		}
	}
};
</script>
