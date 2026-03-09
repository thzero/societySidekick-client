import AppSharedConstants from '@/utility/constants';

import apiService from '@/service/api';
import authService from '@thzero/library_client_firebase/service';
import featuresService from '@/service/features';
import newsService from '@/service/news';
import restCommunicationService from '@thzero/library_client_service_rest_fetch';
import securityService from '@/service/security';
import settingsService from '@/service/settings';
import storeService from '@thzero/library_client_vue3_store_pinia/service/store/index';
import userService from '@/service/user';
import utilityService from '@/service/utility';
import versionService from '@/service/version';

import RootServicesBoot from '@thzero/library_client_vue3/boot/rootServices';

class ServiceBoot extends RootServicesBoot {
	_initialize() {
		super._initialize();

		this._injectService(AppSharedConstants.InjectorKeys.SERVICE_API, new apiService());
	}

	_initializeAuth() {
		return new authService();
	}

	_initializeCommunicationRest() {
		return new restCommunicationService();
	}

	_initializeFeatures() {
		return new featuresService();
	}

	_initializeNews() {
		return new newsService();
	}

	_initializeSecurity() {
		return new securityService();
	}

	_initializeSettings() {
		return new settingsService();
	}

	_initializeStore(injector) {
		return new storeService(injector);
	}

	_initializeUser() {
		return new userService();
	}

	_initializeUtility() {
		return new utilityService();
	}

	_initializeVersion() {
		return new versionService();
	}
}

export default ServiceBoot;
