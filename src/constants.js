// import LibraryConstants from '@thzero/library_client/constants'
import SharedConstants from '@/common/constants';

const BaseKeys = {
	SERVICE_GAMESYSTEMS: 'serviceGameSystems.' ,
	SERVICE_GAMESYSTEMS_RULES: 'serviceGameSystemsRules.'
};

const Constants = {
	InjectorKeys: {
		SERVICE_ADMIN_BOONS: 'serviceAdminBoons',
		SERVICE_ADMIN_CLASSES: 'serviceAdminClasses',
		SERVICE_ADMIN_EQUIPMENT: 'serviceAdminEquipment',
		SERVICE_ADMIN_FACTIONS: 'serviceAdminFactions',
		SERVICE_ADMIN_SCENARIOS: 'serviceAdminScenarios',

		SERVICE_API: 'serviceApi',
		SERVICE_BOONS: 'serviceBoons',
		SERVICE_CLASSES: 'serviceClasses',
		SERVICE_CHARACTERS: 'serviceCharacters',
		SERVICE_EQUIPMENT: 'serviceEquipment',
		SERVICE_FACTIONS: 'serviceFactions',

		// GameSystems Update
		SERVICE_GAMESYSTEMS: 'serviceGameSystems',
		SERVICE_GAMESYSTEMS_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS + SharedConstants.GameSystems.Starfinder1e.id,
		SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E: BaseKeys.SERVICE_GAMESYSTEMS_RULES + SharedConstants.GameSystems.Pathfinder2e.id,
		SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E: BaseKeys.SERVICE_GAMESYSTEMS_RULES + SharedConstants.GameSystems.Starfinder1e.id,

		SERVICE_ORGANIZEDPLAY: 'serviceOrganizedPlay',
		SERVICE_SCENARIOS: 'serviceScenarios'
	},
	ErrorCodes: {
		Suffix: 'errors',
		SuffixParams: 'errors.params',
		Default: 'error'
	},
	ExternalListTypes: {
		Favorites: 'favorites',
		Scenarios: 'scenarios'
	},
	Features: {
		Favorites: true,
		RememberMe: false,
		Statistics: false
	}
};

export default Constants;
