import Vue from 'vue';

import EventService from '@thzero/library/service/event';

class VueEventService extends EventService {
	// eslint-disable-next-line
	emit(channel, value) {
		Vue.prototype.$EventBus.$emit(channel, value);
	}
}

export default VueEventService;
