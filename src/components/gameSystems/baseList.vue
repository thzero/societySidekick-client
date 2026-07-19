<script>
import { computed, ref } from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

import { useBaseComponent } from '@/components/base';

// Base list composable (Character/Scenario lists). Shared filter/gameSystem computeds and
// download helpers. The consuming component owns the ShareDialog ref, `dialogShareOpen`,
// `clickExtract` and the abstract `extract` (they are ref-coupled / game-system specific).
export function useGameSystemBaseListComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const dialogShare = ref(new DialogSupport());
	const gameSystemFilterOverrideI = ref(null);
	const seasonFilterOverride = ref(null);

	const extractTypes = computed(() => {
		return Constants.ExtractTypes;
	});
	const isExternalListCharacters = computed(() => {
		return props.externalListType === Constants.ExternalListTypes.Characters;
	});
	const isExternalListFavorites = computed(() => {
		return props.externalListType === Constants.ExternalListTypes.Favorites;
	});
	const isExternalListScenarios = computed(() => {
		return props.externalListType === Constants.ExternalListTypes.Scenarios;
	});
	const isExternalList = computed(() => {
		return (isExternalListCharacters.value || isExternalListFavorites.value || isExternalListScenarios.value);
	});
	const gameSystemFilter = computed({
		get() {
			if (isExternalListCharacters.value || isExternalListScenarios.value) {
				if (gameSystemFilterOverrideI.value)
					return gameSystemFilterOverrideI.value;
				return props.gameSystemFilterOverride;
			}
			return AppUtility.settings().getSettingsUserGameSystemFilter(base.correlationId(), LibraryClientUtility.$store.user.user, (settings) => settings.gameSystemFilter);
		},
		set(newVal) {
			if (isExternalListCharacters.value || isExternalListScenarios.value) {
				gameSystemFilterOverrideI.value = newVal;
				return;
			}
			AppUtility.settings().updateSettingsUserGameSystemFilter(base.correlationId(), LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, newVal, (settings) => { return settings.gameSystemFilter = newVal; });
		}
	});
	const gameSystemName = computed({
		get() {
			const results = LibraryClientUtility.$store.getters.getGameSystem(base.correlationId(), gameSystemFilter.value);
			return results ? results.name : '';
		},
		set() {}
	});
	const gameSystems = computed(() => {
		const results = LibraryClientUtility.$store.gameSystems;
		return results ? results.filter(l => l.active) : [];
	});
	// GameSystems Update
	const isGameSystemDungeonsAndDragons5e = computed(() => {
		return gameSystemFilter.value === SharedConstants.GameSystems.DungeonsAndDragons5e.id;
	});
	const isGameSystemPathfinder2e = computed(() => {
		return gameSystemFilter.value === SharedConstants.GameSystems.Pathfinder2e.id;
	});
	const isGameSystemStarfinder1e = computed(() => {
		return gameSystemFilter.value === SharedConstants.GameSystems.Starfinder1e.id;
	});

	const downloadI = (content, filename, mimeType) => {
		mimeType = mimeType || 'application/octet-stream';
		const file = new File([content], 'shit.csv', { type: mimeType });
		let anchor = document.createElement('a');
		anchor.download = filename;
		anchor.href = (window.webkitURL || window.URL).createObjectURL(file);
		anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
		anchor.click();
	};
	const downloadCsv = (content, filename) => {
		downloadI(content, filename + '.csv', 'text/csv;encoding:utf-8');
	};
	const downloadText = (content, filename) => {
		downloadI(content, filename + '.txt', 'text/text;encoding:utf-8');
	};
	const download = (content, type, user, defaultName) => {
		const settingsFilename = (user && user.settings) ? user.settings : LibraryClientUtility.$store.user.settings;
		let filename = settingsFilename && !String.isNullOrEmpty(settingsFilename.gamerTag) ? settingsFilename.gamerTag.toLowerCase() : defaultName;
		if (type == Constants.ExtractTypes.Csv)
			downloadCsv(content, filename);
		else if (type == Constants.ExtractTypes.Text)
			downloadText(content, filename);
	};

	return {
		...base,
		dialogShare,
		gameSystemFilterOverrideI,
		seasonFilterOverride,
		extractTypes,
		isExternalList,
		isExternalListCharacters,
		isExternalListFavorites,
		isExternalListScenarios,
		gameSystemFilter,
		gameSystemName,
		gameSystems,
		isGameSystemDungeonsAndDragons5e,
		isGameSystemPathfinder2e,
		isGameSystemStarfinder1e,
		download,
		downloadI,
		downloadCsv,
		downloadText
	};
};
</script>
