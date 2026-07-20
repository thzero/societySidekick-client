import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@/style/app.css';

import bootStarter from '@thzero/library_client_firebase_vue/boot/starter';
import bootEventBus from '@thzero/library_client_vue3/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootServices from '@/boot/services';
import bootUi from '@/boot/ui';
import bootValidate from '@/boot/validate';

import router from '@/router';

import store from '@/store/pinia';

import start from '@thzero/library_client_vue3/boot/main';

import App from '@/components/App.vue';

start(App, router, store, [ booti18n, bootEventBus, bootServices, bootValidate, bootUi ], bootStarter, {
	idGenerator: {
		alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	}
});
