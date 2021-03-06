import RestExternalService from '@thzero/library_client/service/externalRest';

import security from '@/common/security/user';

const KeyEnforcer = 'character';

class CharacterRestExternalService extends RestExternalService {
	constructor() {
		super();

		this._enforcer = null;
	}

	async init(injector) {
		await super.init(injector);

		this._enforcer = this._serviceSecurity.initSecurity(KeyEnforcer, security.options);
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
