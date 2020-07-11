import Vue from 'vue';

import Service from '@thzero/library/service/index';

class VuexStoreService extends Service {
	get dispatcher() {
		return Vue.prototype.$store.dispatcher;
	}

	get getters() {
		return Vue.prototype.$store.getters;
	}

	get state() {
		return Vue.prototype.$store.state;
	}
}

export default VuexStoreService;
