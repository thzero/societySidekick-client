import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';

class GameSystemsUtility {
	static gameSystemNumber(user, gameSystemId) {
		if (!user || !user.settings)
			return '';

		return AppUtility.settings().getSettingsUserGameSystem(user, gameSystemId, (settings) => { return settings.number; });
	}

	static numberName(id, trans) {
		// GameSystems Update
		if (id === SharedConstants.GameSystems.DungeonsAndDragons5e.id)
			return trans.t('forms.gameSystems.dungeonsAndDragons5e.number');
		if (id === SharedConstants.GameSystems.Pathfinder2e.id)
			return trans.t('forms.gameSystems.pathfinder2e.number');
		return '';
	}
}

export default GameSystemsUtility;
