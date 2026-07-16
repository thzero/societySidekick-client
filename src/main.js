import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

import bootEventBus from '@thzero/library_client_vue3/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootUi from '@/boot/ui';
import bootValidate from '@/boot/validate';

import router from '@/router';

import store from '@/store/pinia';

import start from '@thzero/library_client_vue3/boot/main';

import App from '@/components/App.vue';

// Phase 1: minimal boot to verify the Vite/Vue3/Vuetify3 toolchain serves.
// bootServices + the firebase starter are wired in Phase 2.
start(App, router, store, [ booti18n, bootEventBus, bootValidate, bootUi ], null, {
	idGenerator: {
		alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	}
});
