import Utility from '@thzero/library/utility';
import AppUtility from '@/utility/app';

import BaseSettings from '@thzero/library/service/baseSettings';

import Response from '@thzero/library/response';

import SettingsLocation from '@/common/data/settingsLocation';
import SettingsFavorite from '@/common/data/settingsFavorite';
import SettingsGameSystem from '@/common/data/settingsGameSystem';
import SettingsScenario from '@/common/data/settingsScenario';

class Settings extends BaseSettings {
	deleteSettingsUserFavorite(store, user, id) {
		if (!store)
			return Response.error();

		const settings = this.mergeUser(user.settings);
		settings.favorites = Utility.deleteArrayById(settings.favorites, id);
		return store.dispatcher.user.setUserSettings(settings);
	}

	deleteSettingsUserLocation(store, user, id) {
		if (!store)
			return Response.error();

		const settings = this.mergeUser(user.settings);
		settings.locations = Utility.deleteArrayById(settings.locations, id);
		return store.dispatcher.user.setUserSettings(settings);
	}

	getSettingsUserBoons(user, funcAttribute) {
		if (!user || !user.settings)
			return null;
		return funcAttribute(user.settings.boons);
	}

	getSettingsUserFavorite(user, userId) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(user.settings);
		let favorite = settings.favorites.find(l => l.id === userId);
		if (!favorite)
			favorite = new SettingsFavorite();
		return favorite.favorite;
	}

	getSettingsUserFavorites(user) {
		if (!user || !user.settings)
			return null;

		return user.settings.favorites ? user.settings.favorites : [];
	}

	getSettingsUserLocation(user, id) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(user.settings);
		const location = settings.locations.find(l => l.id === id);
		return location;
	}

	getSettingsUserLocations(user) {
		if (!user || !user.settings)
			return null;

		return user.settings.locations ? user.settings.locations : [];
	}

	getSettingsUserGamerTag(user) {
		if (!user || !user.settings)
			return null;

		return user.settings.gamerTag;
	}

	getSettingsUserGameSystem(user, gameSystemFilter, funcAttribute) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(user.settings);
		let gameSystem = settings.gameSystems.find(l => l.id === gameSystemFilter);
		if (!gameSystem)
			gameSystem = new SettingsGameSystem();
		return funcAttribute(gameSystem);
	}

	getSettingsUserGameSystemFilter(user, funcAttribute) {
		if (!user || !user.settings)
			return null;

		const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
		return funcAttribute(settings.home);
	}

	getSettingsUserScenarios(user, funcAttribute) {
		if (!user || !user.settings)
			return null;
		return funcAttribute(user.settings.scenarios);
	}

	getSettingsUserScenariosGameSystem(user, gameSystemFilter, funcAttribute) {
		if (!user || !user.settings)
			return null;

		const settings = this.mergeUser(user.settings);
		let gameSystem = settings.scenarios.additional.find(l => l.id === gameSystemFilter);
		if (!gameSystem)
			gameSystem = new SettingsScenario();
		return funcAttribute(gameSystem);
	}

	initializeUser() {
		return AppUtility.initializeSettingsUser();
	}

	updateSettingsUserBoons(store, user, newVal, func) {
		if (!store)
			return;

		const settings = this.mergeUser(user.settings);
		func(settings.boons, newVal);
		return store.dispatcher.user.setUserSettings(settings);
	}

	updateSettingsUserFavorite(store, user, userId, newVal) {
		if (!store)
			return Response.error();

		const settings = this.mergeUser(user.settings);
		let favorite = settings.favorites.find(l => l.id === userId);
		if (!favorite) {
			favorite = new SettingsFavorite();
			favorite.id = userId;
			settings.favorites.push(favorite);
		}
		favorite.favorite = newVal;
		return store.dispatcher.user.setUserSettings(settings);
	}

	updateSettingsUserGameSystem(store, user, gameSystemFilter, newVal, func) {
		if (!store)
			return Response.error();

		const settings = this.mergeUser(user.settings);
		let gameSystem = settings.gameSystems.find(l => l.id === gameSystemFilter);
		if (!gameSystem) {
			gameSystem = new SettingsGameSystem(gameSystemFilter);
			settings.gameSystems.push(gameSystem);
		}
		func(gameSystem, newVal);
		return store.dispatcher.user.setUserSettings(settings);
	}

	updateSettingsUserGameSystemFilter(store, user, newVal, func) {
		if (!store)
			return Response.error();

		const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
		func(settings.home, newVal);
		return store.dispatcher.user.setUserSettings(settings);
	}

	updateSettingsUserLocation(store, user, id, newVal, func) {
		if (!store)
			return Response.error();

		const settings = this.mergeUser(user.settings);
		let location = settings.locations.find(l => l.id === id);
		if (!location) {
			location = new SettingsLocation();
			location.id = Utility.generateId();
			settings.locations.push(location);
		}
		func(location, newVal);
		return store.dispatcher.user.setUserSettings(settings);
	}

	updateSettingsUserScenarios(store, user, newVal, func) {
		if (!store)
			return;

		const settings = this.mergeUser(user.settings);
		func(settings.scenarios, newVal);
		return store.dispatcher.user.setUserSettings(settings);
	}

	updateSettingsUserScenariosGameSystem(store, user, gameSystemFilter, newVal, func) {
		if (!store)
			return Response.error();

		const settings = this.mergeUser(user.settings);
		let scenario = settings.scenarios.additional.find(l => l.id === gameSystemFilter);
		if (!scenario) {
			scenario = new SettingsScenario();
			scenario.id = gameSystemFilter;
			settings.scenarios.additional.push(scenario);
		}
		func(scenario, newVal);
		return store.dispatcher.user.setUserSettings(settings);
	}
}

export default Settings;
