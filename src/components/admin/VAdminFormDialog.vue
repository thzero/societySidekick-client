<script>
import { computed } from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useVtAdminFormDialogComponent } from '@thzero/library_client_vue3_vuetify3/components/admin/VtAdminFormDialog';

export function useAdminFormDialogComponent(props, context, options) {
	const base = useVtAdminFormDialogComponent(props, context, options);

	let serviceGameSystemsUtility = null;

	const gameSystems = computed(() => {
		return LibraryCommonUtility.selectBlank(LibraryClientUtility.$store.gameSystems);
	});
	// GameSystems Update
	const isGameSystemDungeonsAndDragons5e = computed(() => {
		return base.gameSystemId.value === SharedConstants.GameSystems.DungeonsAndDragons5e.id;
	});
	const isGameSystemPathfinder2e = computed(() => {
		return base.gameSystemId.value === SharedConstants.GameSystems.Pathfinder2e.id;
	});
	const isGameSystemStarfinder1e = computed(() => {
		return base.gameSystemId.value === SharedConstants.GameSystems.Starfinder1e.id;
	});

	const getServiceByGameSystemId = (correlationId, gameSystemId) => {
		if (!gameSystemId)
			return null;

		const response = serviceGameSystemsUtility.getServiceByGameSystemId(correlationId, gameSystemId);
		if (base.hasFailed(response))
			return null;

		return response.results;
	};
	const initLookupsByGameSystemId = (correlationId, gameSystemId) => {
		const service = getServiceByGameSystemId(correlationId, gameSystemId);
		const lookups = service ? service.initializeLookups(correlationId, LibraryClientUtility.$injector) : null;
		return lookups;
	};
	const initializeServices = () => {
		serviceGameSystemsUtility = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
	};

	const serviceGameSystem = computed(() => {
		return getServiceByGameSystemId(base.correlationId(), base.gameSystemId.value);
	});

	initializeServices();

	return {
		...base,
		gameSystems,
		isGameSystemDungeonsAndDragons5e,
		isGameSystemPathfinder2e,
		isGameSystemStarfinder1e,
		serviceGameSystem,
		getServiceByGameSystemId,
		initLookupsByGameSystemId,
		initializeServices
	};
};
</script>
