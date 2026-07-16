import RestExternalService from '@thzero/library_client/service/externalRest';

import LibraryCommonUtility from '@thzero/library_common/utility';

import security from '@/common/security/user';

const KeyEnforcer = 'character';

class CharacterRestExternalService extends RestExternalService {
	constructor() {
		super();

		this._enforcer = null;
	}

	async init(injector) {
		await super.init(injector);

		// 0.18 signature: initSecurity(correlationId, key, model, policies)
		await this._serviceSecurity.initSecurity(LibraryCommonUtility.correlationId(), KeyEnforcer, security.options);
	}

	async validate(correlationId, sub, dom, obj, act) {
		return await this._validate(correlationId, KeyEnforcer, sub, null, 'character', act);
	}

	async validateEdit(correlationId, character, user, act) {
		const userRole = await this._getUserRole(character, user);
		if (!userRole)
			return false;

		const results = await this.validate(correlationId, userRole, null, 'character', act);
		return results;
	}

	async _getUserRole(user, control) {
		if (!user || !control)
			return false;

		return user.role ? user.role : 'user';
	}
}

export default CharacterRestExternalService;
