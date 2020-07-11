import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import BaseCharactersService from '@/service/baseCharacters';

class CharactersService extends BaseCharactersService {
	_getRulesByGameSystemId(gameSystemId) {
		let service = null;
		switch (gameSystemId) {
			// GameSystems Update
			case SharedConstants.GameSystems.Pathfinder2e.id:
				service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
				break;
			case SharedConstants.GameSystems.Starfinder1e.id:
				service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E);
				break;
		}

		return service;
	}
}

export default CharactersService;
