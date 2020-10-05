import AppUtility from '@/utility/app';
import LibraryUtility from '@thzero/library_common/utility';

import BaseSettings from '@thzero/library_client/service/baseSettings';

import Response from '@thzero/library_common/response';

import SettingsLocation from '@/common/data/settingsLocation';
import SettingsFavorite from '@/common/data/settingsFavorite';
import SettingsGameSystem from '@/common/data/settingsGameSystem';
import SettingsScenario from '@/common/data/settingsScenario';

class Settings extends BaseSettings {
	deleteSettingsUserFavorite(correlationId, store, user, id) {
		if (!store)
			return Response.error('Settings', 'deleteSettingsUserFavorite', null, null, null, null, correlationId);

		const settings = this.mergeUser(correlationId, user.settings);
		settings.favorites = LibraryUtility.deleteArrayById(settings.favorites, id);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	deleteSettingsUserLocation(correlationId, store, user, id) {
		if (!store)
			return Response.error('Settings', 'deleteSettingsUserLocation', null, null, null, null, correlationId);

		const settings = this.mergeUser(correlationId, user.settings);
		settings.locations = LibraryUtility.deleteArrayById(settings.locations, id);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	getSettingsUserBoons(correlationId, user, funcAttribute) {
		if (!user || !user.settings)
			return null;

		return funcAttribute(user.settings.boons);
	}

	getSettingsUserFavorite(correlationId, user, userId) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(correlationId, user.settings);
		let favorite = settings.favorites.find(l => l.id === userId);
		if (!favorite)
			favorite = new SettingsFavorite();
		return favorite.favorite;
	}

	getSettingsUserFavorites(correlationId, user) {
		if (!user || !user.settings)
			return null;

		return user.settings.favorites ? user.settings.favorites : [];
	}

	getSettingsUserLocation(correlationId, user, id) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(correlationId, user.settings);
		const location = settings.locations.find(l => l.id === id);
		return location;
	}

	getSettingsUserLocations(correlationId, user) {
		if (!user || !user.settings)
			return null;

		return user.settings.locations ? user.settings.locations : [];
	}

	getSettingsUserGamerTag(correlationId, user) {
		if (!user || !user.settings)
			return null;

		return user.settings.gamerTag;
	}

	getSettingsUserGameSystem(correlationId, user, gameSystemFilter, funcAttribute) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(correlationId, user.settings);
		let gameSystem = settings.gameSystems.find(l => l.id === gameSystemFilter);
		if (!gameSystem)
			gameSystem = new SettingsGameSystem();
		return funcAttribute(gameSystem);
	}

	getSettingsUserGameSystemFilter(correlationId, user, funcAttribute) {
		if (!user || !user.settings)
			return null;

		const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
		return funcAttribute(settings.home);
	}

	getSettingsUserScenarios(correlationId, user, funcAttribute) {
		if (!user || !user.settings)
			return null;
		return funcAttribute(user.settings.scenarios);
	}

	getSettingsUserScenariosGameSystem(correlationId, user, gameSystemFilter, funcAttribute) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(correlationId, user.settings);
		let gameSystem = settings.scenarios.additional.find(l => l.id === gameSystemFilter);
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

		const settings = this.mergeUser(correlationId, user.settings);
		func(settings.boons, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserFavorite(correlationId, store, user, userId, newVal) {
		if (!store)
			return Response.error('Settings', 'updateSettingsUserFavorite', null, null, null, null, correlationId);

		const settings = this.mergeUser(correlationId, user.settings);
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
			return Response.error('Settings', 'updateSettingsUserGameSystem', null, null, null, null, correlationId);


		const settings = this.mergeUser(correlationId, user.settings);
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
			return Response.error('Settings', 'updateSettingsUserGameSystemFilter', null, null, null, null, correlationId);

		const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
		func(settings.home, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserLocation(correlationId, store, user, id, newVal, func) {
		if (!store)
			return Response.error('Settings', 'updateSettingsUserLocation', null, null, null, null, correlationId);

		const settings = this.mergeUser(correlationId, user.settings);
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

		const settings = this.mergeUser(correlationId, user.settings);
		func(settings.scenarios, newVal);
		return store.dispatcher.user.setUserSettings(correlationId, settings);
	}

	updateSettingsUserScenariosGameSystem(correlationId, store, user, gameSystemFilter, newVal, func) {
		if (!store)
			return Response.error('Settings', 'updateSettingsUserScenariosGameSystem', null, null, null, null, correlationId);

		const settings = this.mergeUser(correlationId, user.settings);
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
