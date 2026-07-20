import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

import AppUtility from '@/utility/app';

import Response from '@thzero/library_common/response';

import BaseStore from '@thzero/library_client_vue3_store_pinia/store/index';

// Domain modules (ported from Vuex modules to the Pinia module shape).
import adminBoons from '@/store/admin/boons';
import adminClasses from '@/store/admin/classes';
import adminEquipment from '@/store/admin/equipment';
import adminFactions from '@/store/admin/factions';
import adminNews from '@/store/admin/news';
import adminScenarios from '@/store/admin/scenarios';
import adminUsers from '@/store/admin/users';
import boons from '@/store/boons';
import characters from '@/store/characters';
import classes from '@/store/classes';
import equipment from '@/store/equipment';
import factions from '@/store/factions';
import scenarios from '@/store/scenarios';

// Vuex exposed every module getter FLAT on `$store.getters`; the pinia lib nests them under the module
// key (`$store.getters.classes.getClass`). skick's common game-system services call them flat
// (`store.getters.getClass`, `getFaction`, `getScenario`, ...), so merge the domain-module getters into
// the root getters. Captured here at import time because module registration deletes `module.getters`.
const domainGetters = Object.assign(
	{},
	boons.getters,
	characters.getters,
	classes.getters,
	equipment.getters,
	factions.getters,
	scenarios.getters,
	adminScenarios.getters
);

class AppStore extends BaseStore {
	_initModules(addModule) {
		return [
			addModule('adminBoons', adminBoons),
			addModule('adminClasses', adminClasses),
			addModule('adminEquipment', adminEquipment),
			addModule('adminFactions', adminFactions),
			addModule('adminNews', adminNews),
			addModule('adminScenarios', adminScenarios),
			addModule('adminUsers', adminUsers),
			addModule('boons', boons),
			addModule('characters', characters),
			addModule('classes', classes),
			addModule('equipment', equipment),
			addModule('factions', factions),
			addModule('scenarios', scenarios)
		];
	}

	_initPluginPersistConfig() {
		return {
			persist: {
				key: 'skick',
				storage: localStorage,
				paths: [
					...[
						'plans',
						'settings',
						'version'
					],
					...this._initPluginPersistConfigPaths(),
					...this._initPluginPersistConfigPathsTtl()
				]
			}
		};
	}

	_initPluginPersistConfigPaths() {
		return [];
	}

	_initPluginPersistConfigPathsTtl() {
		return [];
	}

	_initStoreConfigActions() {
		return Object.assign(this._initStoreConfigActionsBase(), this._initStoreConfigActionsAdditional());
	}

	_initStoreConfigActionsBase() {
		return {};
	}

	_initStoreConfigActionsAdditional() {
		return {
			async getGameSystems(correlationId) {
				const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
				const response = await service.gameSystems(correlationId);
				this.$logger.debug('store', 'getGameSystems', 'response', response, correlationId);
				if (Response.hasSucceeded(response))
					await this.setGameSystems(correlationId, response.results ? response.results.data : []);
			},
			async getOrganizedPlay(correlationId) {
				const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
				const response = await service.gameSystems(correlationId);
				this.$logger.debug('store', 'getOrganizedPlay', 'response', response, correlationId);
				if (Response.hasSucceeded(response))
					await this.setOrganizedPlay(correlationId, response.results ? response.results.data : []);
			},
			async setGameSystems(correlationId, gameSystems) {
				this.$logger.debug('store', 'setGameSystems', 'gameSystems.a', gameSystems, correlationId);
				this.gameSystems = gameSystems;
				this.$logger.debug('store', 'setGameSystems', 'gameSystems.b', this.gameSystems, correlationId);
			},
			async setOrganizedPlay(correlationId, organizedPlay) {
				this.$logger.debug('store', 'setOrganizedPlay', 'organizedPlay.a', organizedPlay, correlationId);
				this.organizedPlay = organizedPlay;
				this.$logger.debug('store', 'setOrganizedPlay', 'organizedPlay.b', this.organizedPlay, correlationId);
			},
			async setSettings(correlationId, settings) {
				this.settings = LibraryCommonUtility.merge3({}, this.settings, settings);
			},
			// Overrides the library base `initialize` action to use skick's SERVICE_API.
			async initialize(correlationId) {
				const service = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_API);
				const response = await service.initialize(correlationId);
				this.$logger.debug('store', 'initialize', 'response', response, correlationId);
				if (Response.hasSucceeded(response)) {
					await this.setGameSystems(correlationId, response.results.gameSystems.data);
					await this.setOrganizedPlay(correlationId, response.results.gameSystems.data);
					await this.setPlans(correlationId, response.results.plans);
					await this.setVersion(correlationId, response.results.version);
				}
			}
		};
	}

	_initStoreConfigGetters() {
		return Object.assign(this._initStoreConfigGettersBase(), this._initStoreConfigGettersAdditional());
	}

	_initStoreConfigGettersBase() {
		return {};
	}

	_initStoreConfigGettersAdditional() {
		return {
			...domainGetters,
			getGameSystem(correlationId, id) {
				if (LibraryClientUtility.$store.gameSystems == null)
					return null;
				return LibraryClientUtility.$store.gameSystems.find(gameSystem => gameSystem.id === id);
			},
			getOrganizedPlay(correlationId, id) {
				if (LibraryClientUtility.$store.organizedPlay == null)
					return null;
				return LibraryClientUtility.$store.organizedPlay.find(gameSystem => gameSystem.id === id);
			},
			getPlan(correlationId, id) {
				if (LibraryClientUtility.$store.plans == null)
					return null;
				return LibraryClientUtility.$store.plans.find(plan => plan.id === id);
			}
		};
	}

	_initStoreConfigDispatchers() {
		return Object.assign(this._initStoreConfigDispatchersBase(), this._initStoreConfigDispatchersAdditional());
	}

	_initStoreConfigDispatchersBase() {
		return {};
	}

	_initStoreConfigDispatchersAdditional() {
		return {
			async getGameSystems(correlationId) {
				await LibraryClientUtility.$store.getGameSystems(correlationId);
			},
			async getOrganizedPlay(correlationId) {
				await LibraryClientUtility.$store.getOrganizedPlay(correlationId);
			},
			async initialize(correlationId) {
				await LibraryClientUtility.$store.initialize(correlationId);
			},
			async setSettings(correlationId, settings) {
				await LibraryClientUtility.$store.setSettings(correlationId, settings);
			}
		};
	}

	_initStoreConfigState() {
		return Object.assign(this._initStoreConfigStateBase(), this._initStoreConfigStateAdditional());
	}

	_initStoreConfigStateBase() {
		return {};
	}

	_initStoreConfigStateAdditional() {
		return {
			gameSystems: [],
			organizedPlay: [],
			settings: AppUtility.initializeSettingsUser()
		};
	}

	_initStoreConfig() {
		return {
			state: () => (this._initStoreConfigState()),
			actions: this._initStoreConfigActions(),
			getters: this._initStoreConfigGetters(),
			dispatcher: this._initStoreConfigDispatchers()
		};
	}
}

export default AppStore;
