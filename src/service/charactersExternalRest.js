import RestExternalService from '@thzero/library/service/externalRest';

import security from '@/common/security/user';

const KeyEnforcer = 'character';

class CharacterRestExternalService extends RestExternalService {
	constructor() {
		super();

		this._enforcer = null;
	}

	async init(injector) {
		await super.init(injector);

		this._enforcer = this._security.initSecurity(KeyEnforcer, security.options);
	}

	async validate(sub, dom, obj, act) {
		return await this._validate(KeyEnforcer, sub, null, 'character', act);
	}

	async validateEdit(character, user, act) {
		const userRole = await this._getUserRole(character, user);
		if (!userRole)
			return false;

		const results = await this.validate(userRole, null, 'character', act);
		return results;
	}

	async _getUserRole(user, control) {
		if (!user || !control)
			return false;

		return user.role ? user.role : 'user';
	}
}

export default CharacterRestExternalService;
