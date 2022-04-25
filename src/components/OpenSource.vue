<script>
import VOpenSource from '@/library_vue_vuetify/components/VOpenSource';

export default {
	name: 'OpenSource',
	extends: VOpenSource,
	methods: {
		initializeDependenciesClient() {
			return [
				{
					category: 'client',
					name: '@thzero/library_client',
					url: 'https://github.com/thzero/library_client',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_client_firebase',
					url: 'https://github.com/thzero/library_client_firebase',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client_firebase/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_client_service_rest_axios',
					url: 'https://github.com/thzero/library_client_service_rest_axios',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client_service_rest_axios/blob/master/license.md'
				},
				{
					category: 'client',
					name: '@thzero/library_common',
					url: 'https://github.com/thzero/library_common',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_common/blob/master/license.md'
				},
				{
					category: 'client',
					name: 'axios',
					url: 'https://github.com/axios/axios',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/axios/axios/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'dayjs',
					url: 'https://github.com/iamkun/dayjs',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/iamkun/dayjs/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'dayjs-plugin-utc',
					url: 'https://github.com/guisturdy/dayjs-plugin-utc',
					licenseName: '??',
					licenseUrl: ''
				},
				// {
				//	 category: 'client',
				//	 name: 'decimal.js',
				//	 url: 'https://github.com/MikeMcl/decimal.js/',
				//	 licenseName: 'MIT',
				//	 licenseUrl: 'https://github.com/MikeMcl/decimal.js/blob/master/LICENCE.md'
				// },
				{
					category: 'client',
					name: 'decimal.js',
					url: 'https://github.com/MikeMcl/decimal.js-light',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
				},
				{
					category: 'client',
					name: 'firebase',
					url: 'https://github.com/firebase/firebase-js-sdk',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'github-markdown-css',
					url: 'https://github.com/sindresorhus/github-markdown-css',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/sindresorhus/github-markdown-css/blob/gh-pages/license'
				},
				{
					category: 'client',
					name: 'library_client',
					url: 'https://github.com/thzero/library_client',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_client/blob/master/license.md'
				},
				{
					category: 'client',
					name: 'lodash',
					url: 'https://github.com/lodash/lodash',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/lodash/lodash/blob/master/LICENSE'
				},
				// {
				//	 category: 'client',
				//	 name: 'markdown-it',
				//	 url: 'https://github.com/markdown-it/markdown-it',
				//	 licenseName: 'MIT',
				//	 licenseUrl: 'https://github.com/markdown-it/markdown-it/blob/master/LICENSE'
				// },
				// {
				//	 category: 'client',
				//	 name: 'remarkable',
				//	 url: 'https://github.com/jonschlinkert/remarkable',
				//	 licenseName: 'MIT',
				//	 licenseUrl: 'https://github.com/jonschlinkert/remarkable/blob/master/LICENSE'
				// },
				{
					category: 'client',
					name: 'short-uuid',
					url: 'https://github.com/oculus42/short-uuid',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/oculus42/short-uuid/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'thenBy.js',
					url: 'https://github.com/Teun/thenBy.js',
					licenseName: 'Apache License 2.0',
					licenseUrl: 'https://github.com/Teun/thenBy.js/blob/master/LICENSE.TXT'
				},
				{
					category: 'client',
					name: 'uuid',
					url: 'https://github.com/kelektiv/node-uuid',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/kelektiv/node-uuid/blob/master/LICENSE.md'
				},
				{
					category: 'client',
					name: 'vee-validate',
					url: 'https://github.com/logaretm/vee-validate',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/logaretm/vee-validate/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'vue',
					url: 'https://github.com/vuejs/vue',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/vue/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vue-async-computed',
					url: 'https://github.com/foxbenjaminfox/vue-async-computed',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/foxbenjaminfox/vue-async-computed/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'vue-i18n',
					url: 'https://github.com/kazupon/vue-i18n',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/kazupon/vue-i18n/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vue-router',
					url: 'https://github.com/vuejs/vue-router',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/vue-router/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vue-scrollto',
					url: 'https://github.com/rigor789/vue-scrollto',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/rigor789/vue-scrollto/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'vuetify',
					url: 'https://github.com/vuetifyjs/vuetify',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuetifyjs/vuetify/blob/master/LICENSE.md'
				},
				{
					category: 'client',
					name: 'vuetify-datetime-picker',
					url: 'https://github.com/darrenfang/vuetify-datetime-picker',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/darrenfang/vuetify-datetime-picker/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'veux',
					url: 'https://github.com/vuejs/vuex',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/vuex/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vuex-persist',
					url: 'https://github.com/championswimmer/vuex-persist',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/championswimmer/vuex-persist/blob/master/LICENSE.md'
				}
			];
		},
		initializeDependenciesServer() {
			return [
				{
					category: 'server',
					name: 'joi',
					url: 'https://github.com/sideway/joi',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/hapijs/joi/blob/master/LICENSE.md'
				},
				{
					category: 'server',
					name: '@joi/date',
					url: 'https://github.com/sideway/joi-date',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/hapijs/joi-date/blob/master/LICENSE.md'
				},
				{
					category: 'server',
					name: '@koa/cors',
					url: 'https://github.com/koajs/cors',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/koajs/cors/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: '@koa/router',
					url: 'https://github.com/ZijianHe/koa-router',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/ZijianHe/koa-router/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: '@thzero/library_common',
					url: 'https://github.com/thzero/library_common',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_common/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server',
					url: 'https://github.com/thzero/library_server',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_logger_pino',
					url: 'https://github.com/thzero/library_server_logger_pino',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_logger_pino/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_repository_mongo',
					url: 'https://github.com/thzero/library_server_repository_mongo',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_repository_mongo/blob/master/license.md'
				},
				{
					category: 'server',
					name: '@thzero/library_server_validation_joi',
					url: 'https://github.com/thzero/library_server_validation_joi',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_server_validation_joi/blob/master/license.md'
				},
				{
					category: 'server',
					name: 'async-mutex',
					url: 'https://github.com/DirtyHairy/async-mutex',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/DirtyHairy/async-mutex/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'config',
					url: 'https://github.com/lorenwest/node-config',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/lorenwest/node-config/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'dayjs',
					url: 'https://github.com/iamkun/dayjs',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/iamkun/dayjs/blob/dev/LICENSE'
				},
				{
					category: 'server',
					name: 'dayjs-plugin-utc',
					url: 'https://github.com/guisturdy/dayjs-plugin-utc',
					licenseName: '??',
					licenseUrl: ''
				},
				// {
				//	 category: 'server',
				//	 name: 'decimal.js',
				//	 url: 'https://github.com/MikeMcl/decimal.js/',
				//	 licenseName: 'MIT',
				//	 licenseUrl: 'https://github.com/MikeMcl/decimal.js/blob/master/LICENCE.md'
				// },
				{
					category: 'server',
					name: 'decimal.js',
					url: 'https://github.com/MikeMcl/decimal.js-light',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
				},
				{
					category: 'server',
					name: 'esm',
					url: 'https://github.com/standard-things/esm',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/standard-things/esm/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'firebase',
					url: 'https://github.com/firebase/firebase-js-sdk',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/firebase/firebase-js-sdk/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'koa',
					url: 'https://github.com/koajs/koa',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/koajs/koa/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'koa-body',
					url: 'https://github.com/dlau/koa-body',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/dlau/koa-body/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'koa-helmet',
					url: 'https://github.com/venables/koa-helmet',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/venables/koa-helmet/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'koa-static',
					url: 'https://github.com/koajs/static',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/koajs/static/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'lodash',
					url: 'https://github.com/lodash/lodash',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/lodash/lodash/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'mongodb',
					url: 'https://github.com/mongodb/node-mongodb-native',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/mongodb/node-mongodb-native/blob/master/LICENSE.md'
				},
				{
					category: 'server',
					name: 'pino',
					url: 'https://github.com/pinojs/pino',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/pinojs/pino/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'reflect-metadata',
					url: 'https://github.com/rbuckton/reflect-metadata',
					licenseName: 'Apache License 2.0',
					licenseUrl: 'https://github.com/rbuckton/reflect-metadata/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'short-uuid',
					url: 'https://github.com/oculus42/short-uuid',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/oculus42/short-uuid/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'swagger2-koa',
					url: 'https://github.com/carlansley/swagger2-koa',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/carlansley/swagger2-koa/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'terminus',
					url: 'https://github.com/godaddy/terminus',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/godaddy/terminus/blob/master/LICENSE'
				},
				{
					category: 'server',
					name: 'uuid',
					url: 'https://github.com/kelektiv/node-uuid',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/kelektiv/node-uuid/blob/master/LICENSE.md'
				}
			];
		}
	}
};
</script>
