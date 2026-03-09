import LibraryClientConstants from '@thzero/library_client/constants.js';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import BaseStore from '@thzero/library_client_vue3_store_pinia/store/index';

import boons from './boons';
import characters from './characters';
import classes from './classes';
import equipment from './equipment';
import factions from './factions';
import scenarios from './scenarios';

class AppStore extends BaseStore {
	_initModules(options, storeConfigPersist, pluginPersistType) {
		const storeFuncModules = [];
		storeFuncModules.push(options.addModule('boons', boons, options.actionDispatcher, options.actionGetters, storeConfigPersist, pluginPersistType, options.pluginPersistSetup, options.pluginPersistSetupOverride, options.pinia));
		storeFuncModules.push(options.addModule('characters', characters, options.actionDispatcher, options.actionGetters, storeConfigPersist, pluginPersistType, options.pluginPersistSetup, options.pluginPersistSetupOverride, options.pinia));
		storeFuncModules.push(options.addModule('classes', classes, options.actionDispatcher, options.actionGetters, storeConfigPersist, pluginPersistType, options.pluginPersistSetup, options.pluginPersistSetupOverride, options.pinia));
		storeFuncModules.push(options.addModule('equipment', equipment, options.actionDispatcher, options.actionGetters, storeConfigPersist, pluginPersistType, options.pluginPersistSetup, options.pluginPersistSetupOverride, options.pinia));
		storeFuncModules.push(options.addModule('factions', factions, options.actionDispatcher, options.actionGetters, storeConfigPersist, pluginPersistType, options.pluginPersistSetup, options.pluginPersistSetupOverride, options.pinia));
		storeFuncModules.push(options.addModule('scenarios', scenarios, options.actionDispatcher, options.actionGetters, storeConfigPersist, pluginPersistType, options.pluginPersistSetup, options.pluginPersistSetupOverride, options.pinia));
		return storeFuncModules;
	}

	_initPluginPersistConfig() {
		return {
			persist: {
				key: 'society.sidekick',
				storage: localStorage,
				paths: [
					...[
						// 'openSource',
						// 'plans',
						// 'user',
						// 'version'
					],
					...this._initPluginPersistConfigPaths(),
					...this._initPluginPersistConfigPathsTtl()
				]
			}
		};
	}

	_initPluginPersistConfigPaths() {
		return [
		];
	}

	_initPluginPersistConfigPathsTtl() {
		return [
		];
	}

	_initStoreConfigActions() {
		return Object.assign(this._initStoreConfigActionsBase(), this._initStoreConfigActionsAdditional());
	}

	_initStoreConfigActionsAdditional() {
		return {};
	}

	_initStoreConfigActionsBase() {
		return {
			async _initialize(correlationId, results) {
				const serviceFeatures = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_FEATURES);
				this.mobileOnly = serviceFeatures.features().MobileOnly;
			},
			_checkTtl(array, delta, diff) {
				// return (array && Array.isArray(array) && (array.length) > 0 && (delta <= diff));
				return (delta <= diff);
			}
		};
	}

	_initStoreConfigDispatchers() {
		return Object.assign(this._initStoreConfigDispatchersBase(), this._initStoreConfigDispatchersAdditional());
	}

	_initStoreConfigDispatchersAdditional() {
		return {};
	}

	_initStoreConfigDispatchersBase() {
		return {
		};
	}

	_initStoreConfigGetters() {
		return Object.assign(this._initStoreConfigGettersBase(), this._initStoreConfigGettersAdditional());
	}

	_initStoreConfigGettersAdditional() {
		return {};
	}

	_initStoreConfigGettersBase() {
		return {
			getOnline() {
				return LibraryClientUtility.$store.online;
			}
		};
	}

	_initStoreConfigState() {
		return Object.assign(this._initStoreConfigStateBase(), this._initStoreConfigStateAdditional());
	}

	_initStoreConfigStateAdditional() {
		return {};
	}

	_initStoreConfigStateBase() {
		return {
			checksumLastUpdate: [],
			gameSystems: [],
			online: {},
			organizedPlay: [],
			plans: [],
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
