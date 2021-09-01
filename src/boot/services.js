import Constants from '@/constants';

// Admin Update
import adminBoonsService from '@/service/admin/boons';
import adminClassesService from '@/service/admin/classes';
import adminEquipmentService from '@/service/admin/equipment';
import adminFactionsService from '@/service/admin/factions';
import adminScenariosService from '@/service/admin/scenarios';

import apiService from '@/service/api';
import authService from '@thzero/library_client_firebase/service';
import boonsService from '@/service/boons';
import classesService from '@/service/classes';
import charactersService from '@/service/characters';
import equipmentService from '@/service/equipment';
import factionsService from '@/service/factions';
import gameSystemsService from '@/service/gameSystems';
import organizedPlayService from '@/service/organizedPlay';
import restCommunicationService from '@thzero/library_client_service_rest_axios';
import scenariosService from '@/service/scenarios';
import settingsService from '@/service/settings';
import userService from '@/service/user';
import versionService from '@/service/version';

// GameSystems Update
import gameSystemsPathfinder2eService from '@/common/gameSystems/pathfinder2e/service/index';
import gameSystemsStarfinder1eService from '@/common/gameSystems/starfinder1e/service/index';
import gameSystemsRulesPathfinder2eService from '@/common/gameSystems/pathfinder2e/service/rules';
import gameSystemsRulesStarfinder1eService from '@/common/gameSystems/starfinder1e/service/rules';

import BaseServices from '@thzero/library_client_vue/boot/baseServices';

class Services extends BaseServices {
	_initialize() {
		super._initialize();
		
		// Admin Update
		this._inject(Constants.InjectorKeys.SERVICE_ADMIN_BOONS, new adminBoonsService());
		this._inject(Constants.InjectorKeys.SERVICE_ADMIN_CLASSES, new adminClassesService());
		this._inject(Constants.InjectorKeys.SERVICE_ADMIN_EQUIPMENT, new adminEquipmentService());
		this._inject(Constants.InjectorKeys.SERVICE_ADMIN_FACTIONS, new adminFactionsService());
		this._inject(Constants.InjectorKeys.SERVICE_ADMIN_SCENARIOS, new adminScenariosService());

		this._inject(Constants.InjectorKeys.SERVICE_API, new apiService());
		this._inject(Constants.InjectorKeys.SERVICE_BOONS, new boonsService());
		this._inject(Constants.InjectorKeys.SERVICE_CLASSES, new classesService());
		this._inject(Constants.InjectorKeys.SERVICE_CHARACTERS, new charactersService());
		this._inject(Constants.InjectorKeys.SERVICE_EQUIPMENT, new equipmentService());
		this._inject(Constants.InjectorKeys.SERVICE_FACTIONS, new factionsService());
		this._inject(Constants.InjectorKeys.SERVICE_ORGANIZEDPLAY, new organizedPlayService());
		this._inject(Constants.InjectorKeys.SERVICE_SCENARIOS, new scenariosService());

		// GameSystems Update
		this._inject(Constants.InjectorKeys.SERVICE_GAMESYSTEMS, new gameSystemsService());
		this._inject(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E, new gameSystemsPathfinder2eService());
		this._inject(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E, new gameSystemsStarfinder1eService());
		this._inject(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E, new gameSystemsRulesPathfinder2eService());
		this._inject(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E, new gameSystemsRulesStarfinder1eService());
	}

	_initializeAuth() {
		return new authService();
	}

	_initializeCommunicationRest() {
		return new restCommunicationService();
	}

	_initializeSettings() {
		return new settingsService();
	}

	_initializeUser() {
		return new userService();
	}

	_initializeVersion() {
		return new versionService();
	}
}

export default Services;
