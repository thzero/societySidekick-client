import Constants from '@/constants';

import VersionService from '@thzero/library/service/version';

class AppVersionService extends VersionService {

	async _version() {
		return Constants.Version;
	}
}

export default AppVersionService;
