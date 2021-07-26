import app from '@/components/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/library_vue/boot/plugins/vuetify';

import bootStarter from '@thzero/library_client_firebase/boot/starter';
import bootAsyncComputed from '@/library_vue/boot/asyncComputed';
import bootEventBus from '@/library_vue/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootServices from '@/boot/services';
import bootValidate from '@/boot/validate';
import bootVueScrollTo from '@/library_vue_vuetify/boot/scrollTo';
import bootWebComponents from '@/library_vue_vuetify/boot/webComponents';

import start from '@/library_vue_vuetify/boot/main';
start(app, router, store, vuetify, [ bootAsyncComputed, booti18n, bootEventBus, bootServices, bootValidate, bootVueScrollTo, bootWebComponents ], bootStarter);
