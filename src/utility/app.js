import Vue from 'vue';

import LibraryConstants from '@thzero/library/constants';
import SharedConstants from '@/common/constants';

import SettingsUser from '@/common/data/settingsUser';

class AppUtility {
	static findSharedConstantsGameSystemByFriendlyId(friendlyId) {
		const gameSystem = Object.values(SharedConstants.GameSystems).find(l => l.friendlyId === friendlyId);
		return gameSystem;
	}

	static findSharedConstantsGameSystemById(id) {
		const gameSystem = Object.values(SharedConstants.GameSystems).find(l => l.id === id);
		return gameSystem;
	}

	static generateShareKeyForUser(user, id) {
		if (!user || !user.id || !id)
			return null;

		return `${user.id}/${id}`;
	}

	static generateShareKeyForUserByGamerTag(user, id) {
		if (!user || !user.settings.gamerTagSearch || !id)
			return null;

		const gamerTagSearch = user.settings.gamerTagSearch;
		return `${gamerTagSearch}/${id}`;
	}

	static initializeSettingsUser() {
		return new SettingsUser();
	}

	static settings() {
		return Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_SETTINGS);
	}

	static validateSettingsUserGameSystems(settings) {
		if (!settings)
			return settings;

		const dungeonsAndDragons5e = settings.gameSystems.find(l => l.id == SharedConstants.GameSystems.DungeonsAndDragons5e.id);
		if (!dungeonsAndDragons5e)
			settings.gameSystems.push({ id: SharedConstants.GameSystems.DungeonsAndDragons5e.id, number: null });
		const pathfinder2e = settings.gameSystems.find(l => l.id == SharedConstants.GameSystems.Pathfinder2e.id);
		if (!pathfinder2e)
			settings.gameSystems.push({ id: SharedConstants.GameSystems.Pathfinder2e.id, number: null });

		return settings;
	}

	static userDisplayName(user) {
		if (!user || !user.settings)
			return '';

		const settings = user.settings ? user.settings : AppUtility.initializeSettingsUser();
		const userName = settings && settings.gamerTag ? settings.gamerTag : user.external && user.external.name ? user.external.name : '******';
		return userName;
	}
}

export default AppUtility;
