import app from '@/components/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/library_vue/boot/plugins/vuetify';

import bootStarter from '@thzero/library_client_firebase/boot/starter';
import bootAsyncComputed from '@/library_vue/boot/asyncComputed';
import bootDaysJs from '@thzero/library_client/boot/daysJs';
import bootEventBus from '@/library_vue/boot/eventBus';
import booti18n from '@/boot/i18n';
import bootServices from '@/boot/services';
import bootValidate from '@/boot/validate';
import bootVueScrollTo from '@/library_vue/boot/scrollTo';
import bootWebComponents from '@/library_vue/boot/webComponents';

import start from '@/library_vue/boot/main';
start(app, router, store, vuetify, [ bootAsyncComputed, booti18n, bootDaysJs, bootEventBus, bootServices, bootValidate, bootVueScrollTo, bootWebComponents ], bootStarter);
