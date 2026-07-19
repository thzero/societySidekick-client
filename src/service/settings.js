import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryUtility from '@thzero/library_common/utility';

import BaseSettings from '@thzero/library_client/service/baseSettings';

import SettingsLocation from '@/common/data/settingsLocation';
import SettingsFavorite from '@/common/data/settingsFavorite';
import SettingsGameSystem from '@/common/data/settingsGameSystem';
import SettingsScenario from '@/common/data/settingsScenario';

class Settings extends BaseSettings {
	// In the 0.18 pinia user store, `setUser` moves settings to `$store.user.settings` (module state)
	// and DELETES `user.settings`. The `user` argument passed by callers (which is `$store.user.user`)
	// therefore no longer carries `.settings`, so all reads/writes must source the canonical settings
	// from the store. `mergeUser` returns a fresh clone seeded with the SettingsUser defaults, so the
	// full sub-object shape (home/boons/scenarios/...) is always present.
	_settings(correlationId) {
		return this.mergeUser(correlationId, LibraryClientUtility.$store.user.settings);
	}

	deleteSettingsUserFavorite(correlationId, store, user, id) {
		if (!store)
			return this._error('Settings', 'deleteSettingsUserFavorite', null, null, null, null, correlationId);

		const settings = this._settings(correlationId);
		settings.favorites = LibraryUtility.deleteArrayById(settings.favorites, id);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	deleteSettingsUserLocation(correlationId, store, user, id) {
		if (!store)
			return this._error('Settings', 'deleteSettingsUserLocation', null, null, null, null, correlationId);

		const settings = this._settings(correlationId);
		settings.locations = LibraryUtility.deleteArrayById(settings.locations, id);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	getSettingsUserBoons(correlationId, user, funcAttribute) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		if (!settings.boons)
			return null;
		return funcAttribute(settings.boons);
	}

	getSettingsUserFavorite(correlationId, user, userId) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		if (!settings.favorites)
			return null;
		let favorite = settings.favorites.find(l => l.id === userId);
		if (!favorite)
			favorite = new SettingsFavorite();
		return favorite.favorite;
	}

	getSettingsUserFavorites(correlationId, user) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		return settings.favorites ? settings.favorites : [];
	}

	getSettingsUserLocation(correlationId, user, id) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		return settings.locations ? settings.locations.find(l => l.id === id) : null;
	}

	getSettingsUserLocations(correlationId, user) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		return settings.locations ? settings.locations : [];
	}

	getSettingsUserGamerTag(correlationId, user) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		return settings.gamerTag;
	}

	getSettingsUserGameSystem(correlationId, user, gameSystemFilter, funcAttribute) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		let gameSystem = settings.gameSystems ? settings.gameSystems.find(l => l.id === gameSystemFilter) : null;
		if (!gameSystem)
			gameSystem = new SettingsGameSystem();
		return funcAttribute(gameSystem);
	}

	getSettingsUserGameSystemFilter(correlationId, user, funcAttribute) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		return funcAttribute(settings.home);
	}

	getSettingsUserScenarios(correlationId, user, funcAttribute) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		if (!settings.scenarios)
			return null;
		return funcAttribute(settings.scenarios);
	}

	getSettingsUserScenariosGameSystem(correlationId, user, gameSystemFilter, funcAttribute) {
		if (!user)
			return null;

		const settings = this._settings(correlationId);
		let gameSystem = settings.scenarios ? settings.scenarios.additional.find(l => l.id === gameSystemFilter) : null;
		if (!gameSystem)
			gameSystem = new SettingsScenario();
		return funcAttribute(gameSystem);
	}

	initializeUser() {
		return AppUtility.initializeSettingsUser();
	}

	updateSettingsUserBoons(correlationId, store, user, newVal, func) {
		if (!store)
			return;

		const settings = this._settings(correlationId);
		func(settings.boons, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserFavorite(correlationId, store, user, userId, newVal) {
		if (!store)
			return this._error('Settings', 'updateSettingsUserFavorite', null, null, null, null, correlationId);

		const settings = this._settings(correlationId);
		let favorite = settings.favorites.find(l => l.id === userId);
		if (!favorite) {
			favorite = new SettingsFavorite();
			favorite.id = userId;
			settings.favorites.push(favorite);
		}
		favorite.favorite = newVal;
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserGameSystem(correlationId, store, user, gameSystemFilter, newVal, func) {
		if (!store)
			return this._error('Settings', 'updateSettingsUserGameSystem', null, null, null, null, correlationId);


		const settings = this._settings(correlationId);
		let gameSystem = settings.gameSystems.find(l => l.id === gameSystemFilter);
		if (!gameSystem) {
			gameSystem = new SettingsGameSystem(gameSystemFilter);
			settings.gameSystems.push(gameSystem);
		}
		func(gameSystem, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserGameSystemFilter(correlationId, store, user, newVal, func) {
		if (!store)
			return this._error('Settings', 'updateSettingsUserGameSystemFilter', null, null, null, null, correlationId);

		const settings = this._settings(correlationId);
		func(settings.home, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserLocation(correlationId, store, user, id, newVal, func) {
		if (!store)
			return this._error('Settings', 'updateSettingsUserLocation', null, null, null, null, correlationId);

		const settings = this._settings(correlationId);
		let location = settings.locations.find(l => l.id === id);
		if (!location) {
			location = new SettingsLocation();
			location.id = LibraryUtility.generateId();
			settings.locations.push(location);
		}
		func(location, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserScenarios(correlationId, store, user, newVal, func) {
		if (!store)
			return;

		const settings = this._settings(correlationId);
		func(settings.scenarios, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserScenariosGameSystem(correlationId, store, user, gameSystemFilter, newVal, func) {
		if (!store)
			return this._error('Settings', 'updateSettingsUserScenariosGameSystem', null, null, null, null, correlationId);

		const settings = this._settings(correlationId);
		let scenario = settings.scenarios.additional.find(l => l.id === gameSystemFilter);
		if (!scenario) {
			scenario = new SettingsScenario();
			scenario.id = gameSystemFilter;
			settings.scenarios.additional.push(scenario);
		}
		func(scenario, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}
}

export default Settings;
