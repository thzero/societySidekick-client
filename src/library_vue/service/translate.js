import Vue from 'vue';

import TranslateService from '@thzero/library_client/service/translate';

class VueTranslateService extends TranslateService {
	// eslint-disable-next-line
	translate(id) {
		return Vue.prototype.$trans.t(id);
	}
}

export default VueTranslateService;
