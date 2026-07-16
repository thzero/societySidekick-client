import BaseStore from '@thzero/library_client_vue3_store_pinia/store/index';

// Phase 1: minimal store so the app boots. Phase 2 ports the Vuex root state
// (gameSystems, organizedPlay, plans, settings, version) and the domain modules
// (classes, boons, characters, equipment, factions, scenarios, admin/*).
class AppStore extends BaseStore {
	_initModules() {
		return [];
	}

	_initStoreConfig() {
		return {
			state: () => ({}),
			actions: {},
			getters: {},
			dispatcher: {}
		};
	}
}

export default AppStore;
