import LibraryConstants from '@thzero/library_client/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

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
		// 0.18 lib deletes user.settings on load; canonical settings live at $store.user.settings.
		const settings = (user && user.settings) ? user.settings : LibraryClientUtility.$store.user.settings;
		if (!user || !settings || !settings.gamerTagSearch || !id)
			return null;

		const gamerTagSearch = settings.gamerTagSearch;
		return `${gamerTagSearch}/${id}`;
	}

	static initializeSettingsUser() {
		return new SettingsUser();
	}

	static settings() {
		return LibraryClientUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_SETTINGS);
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
		if (!user)
			return '';

		const settings = (user && user.settings) ? user.settings : LibraryClientUtility.$store.user.settings;
		const userName = settings && settings.gamerTag ? settings.gamerTag : user.external && user.external.name ? user.external.name : '******';
		return userName;
	}
}

export default AppUtility;
