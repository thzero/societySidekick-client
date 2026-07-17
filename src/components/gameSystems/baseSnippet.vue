<script>
import { computed, ref } from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@/components/base';

// Base gameSystem snippet composable. The leaf component resolves its game-system service
// and passes it in via options.serviceGameSystem (replacing the old abstract initializeServices()).
export function useGameSystemBaseSnippetComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse,
		hover,
		formatCurrency,
		formatNumber,
		handleDisplay,
		handleDisplayHover,
		handleDisplayHoverClear
	} = useBaseComponent(props, context, options);

	const serviceGameSystem = (options && options.serviceGameSystem) ? options.serviceGameSystem : null;
	const lookups = ref({});

	const isExternalList = computed(() => {
		return (props.externalListType === Constants.ExternalListTypes.Favorites || props.externalListType === Constants.ExternalListTypes.Scenarios);
	});
	const isExternalListFavorites = computed(() => {
		return props.externalListType === Constants.ExternalListTypes.Favorites;
	});
	const isExternalListScenarios = computed(() => {
		return props.externalListType === Constants.ExternalListTypes.Scenarios;
	});
	// GameSystems Update
	const isGameSystemDungeonsAndDragons5e = computed(() => {
		return props.value && props.value.gameSystemId == SharedConstants.GameSystems.DungeonsAndDragons5e.id;
	});
	const isGameSystemPathfinder2e = computed(() => {
		return props.value && props.value.gameSystemId == SharedConstants.GameSystems.Pathfinder2e.id;
	});
	const isGameSystemStarfinder1e = computed(() => {
		return props.value && props.value.gameSystemId == SharedConstants.GameSystems.Starfinder1e.id;
	});

	const getGameSystemName = (id) => {
		const results = LibraryClientUtility.$store.getters.getGameSystem(correlationId(), id);
		return results ? results.name : '';
	};
	const initializeLookups = (correlationIdI) => {
		if (!serviceGameSystem)
			return [];
		return serviceGameSystem.initializeLookups(correlationIdI, LibraryClientUtility.$injector);
	};

	lookups.value = initializeLookups(correlationId());

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse,
		hover,
		formatCurrency,
		formatNumber,
		handleDisplay,
		handleDisplayHover,
		handleDisplayHoverClear,
		serviceGameSystem,
		lookups,
		isExternalList,
		isExternalListFavorites,
		isExternalListScenarios,
		isGameSystemDungeonsAndDragons5e,
		isGameSystemPathfinder2e,
		isGameSystemStarfinder1e,
		getGameSystemName,
		initializeLookups
	};
};
</script>
