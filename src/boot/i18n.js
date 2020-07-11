import VueBasei18n from '@/library_vue/boot/basei18n';

import resources from '@/locales';

export default class AppVueBasei18n extends VueBasei18n {
	_initMessages() {
		return resources;
	}
}
