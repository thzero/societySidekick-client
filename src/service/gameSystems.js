import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import Service from '@thzero/library_client/service/index';

class GameSystemsService extends Service {
	getServiceByGameSystemId(correlationId, gameSystemId) {
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

		if (service)
			return this._successResponse(service, correlationId);

		return this._error('GameSystemService', 'getServiceByGameSystemId', null, null, null, null, correlationId).add(`Invalid service for gamesystem '${gameSystemId}'.`);
	}
}

export default GameSystemsService;
