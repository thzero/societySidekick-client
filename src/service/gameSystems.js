import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import Service from '@thzero/library/service/index';

import Response from '@thzero/library/response';

class GameSystemsService extends Service {
	getServiceByGameSystemId(gameSystemId) {
		// GameSystems Update
		let service = null;
		switch (gameSystemId) {
			case SharedConstants.GameSystems.Pathfinder2e.id:
				service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
				break;
			case SharedConstants.GameSystems.Starfinder1e.id:
				service = this._injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
				break;
		}

		const response = Response.success();
		response.results = service;
		return service ? response : Response.error(`Invalid service for gamesystem '${gameSystemId}'.`);
	}
}

export default GameSystemsService;
