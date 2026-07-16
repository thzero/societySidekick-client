import Vuei18nBaseBoot from '@thzero/library_client_vue3/boot/basei18n';

import en from '@/locales/en/index.json';

const resources = { en };

export default class Vuei18nBoot extends Vuei18nBaseBoot {
	_initMessages() {
		return resources;
	}
}
