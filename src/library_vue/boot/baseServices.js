import BaseServices from '@thzero/library_client/boot/baseServices';

import eventService from '../service/event';
import routerService from '../service/router';
import storeService from '../service/store';
import translateService from '../service/translate';

class VueBaseServices extends BaseServices {
	_initializInjector(framework, injector) {
		framework.prototype.$injector = injector;
	}

	_initializeEvent(injector) {
		return new eventService(injector);
	}

	_initializeRouter(injector) {
		return new routerService(injector);
	}

	_initializeStore(injector) {
		return new storeService(injector);
	}

	_initializeTranslate(injector) {
		return new translateService(injector);
	}
}

export default VueBaseServices;
