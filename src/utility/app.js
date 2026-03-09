import LibraryClientConstants from '@thzero/library_client/constants.js';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import SettingsUser from '@/data/settingsUser';

class AppUtility {
	static isDebug = false;

	static initializeSettingsUser() {
		const settings = new SettingsUser();
		return settings;
	}

	static _injector = null;
	static set injector(value) {
		AppUtility._injector = value;
	}

	static get injector() {
		return AppUtility._injector;
	}

	static usageMetricsMeasurementTag(correlationId, tag) {
		(async () => {
			const serviceUsageMetrics = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_USAGE_METRICS);
			await serviceUsageMetrics.tag(correlationId, tag);
		})();
	}
}

export default AppUtility;
