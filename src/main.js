import '@mdi/font/css/materialdesignicons.css'
// import { aliases, fa } from 'vuetify/iconsets/fa';
// import { mdi } from 'vuetify/iconsets/mdi';
// import 'animate.css';

import 'vuetify/styles';

import AppConstants from '@/constants';

// import bootStarter from '@thzero/library_client_firebase/boot/starter';
import bootStarter from '@thzero/library_client_firebase_vue/boot/starter';
// import bootAsyncComputed from '@thzero/library_client_vue3/boot/asyncComputed';
import bootEventBus from '@thzero/library_client_vue3/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootServices from '@/boot/services';
// import bootUi from '@thzero/library_client_vue3_vuetify3/boot/ui';
import bootUi from '@/boot/ui';
import bootValidate from '@/boot/validate';
// import bootWebComponents from '@thzero/library_client_vue3/boot/webComponents';
import bootCookieComply from '@thzero/library_client_vue3_vuetify3/boot/cookie';

import router from '@/router';

import store from '@/store/pinia';

import start from '@thzero/library_client_vue3/boot/main';

// import App from '@/components/App.vue';
import App from '@/components/App.vue';

start(App, router, store, [ booti18n, bootEventBus, bootServices, bootValidate, bootUi, bootCookieComply ], bootStarter, {
	idGenerator: {
		alphabet: AppConstants.IdGenerator.alphabet,
		lengthLong: AppConstants.IdGenerator.lengthLong,
		lengthShort: AppConstants.IdGenerator.lengthShort
	}
});
