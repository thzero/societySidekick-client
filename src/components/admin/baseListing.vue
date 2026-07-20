<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useAdminBaseListingComponent as useLibraryAdminBaseListingComponent } from '@thzero/library_client_vue3/components/admin/baseListing';

export function useAdminBaseListingComponent(props, context, options) {
	const base = useLibraryAdminBaseListingComponent(props, context, options);

	let serviceGameSystems = null;

	const getGameSystemName = (id) => {
		const results = LibraryClientUtility.$store.getters.getGameSystem(base.correlationId(), id);
		return results ? results.name : '';
	};
	const getLookupByGameSystemId = (gameSystemId) => {
		const gameSystem = base.lookups.value.find(l => l.gameSystemId === gameSystemId);
		return gameSystem ? gameSystem.lookups : null;
	};
	const getLookupsByGameSystemId = (gameSystemId) => {
		if (!gameSystemId)
			return '';

		return getLookupByGameSystemId(gameSystemId);
	};
	const getServiceByGameSystemId = (correlationId, gameSystemId) => {
		if (!gameSystemId)
			return null;
		const response = serviceGameSystems.getServiceByGameSystemId(correlationId, gameSystemId);
		if (base.hasFailed(response))
			return null;
		return response.results;
	};
	const initializeServices = () => {
		serviceGameSystems = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS);
	};
	const initLookupsByGameSystemId = (correlationId, gameSystemId) => {
		const service = getServiceByGameSystemId(correlationId, gameSystemId);
		if (!service)
			return;
		const lookups = service ? service.initializeLookups(correlationId, LibraryClientUtility.$injector) : null;
		base.lookups.value.push({ gameSystemId: gameSystemId, lookups: lookups });
	};
	const initialize = () => {
		const correlationId = base.correlationId();
		for (const gameSystem in SharedConstants.GameSystems)
			initLookupsByGameSystemId(correlationId, SharedConstants.GameSystems[gameSystem].id);
	};

	initializeServices();
	initialize();

	return {
		...base,
		getGameSystemName,
		getLookupByGameSystemId,
		getLookupsByGameSystemId,
		getServiceByGameSystemId,
		initializeServices,
		initLookupsByGameSystemId,
		initialize
	};
};
</script>
