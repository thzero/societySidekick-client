import { defineComponent, h } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import { mount as vueMount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// A router whose current route is `path`, matched against `pattern`, so a
// component's useRoute() sees the params it would in the app.
export const createTestRouter = async (path = '/', pattern = path) => {
	const router = createRouter({
		history: createMemoryHistory(),
		routes: [ { path: pattern, component: { render: () => null } }, { path: '/:catchAll(.*)*', component: { render: () => null } } ]
	});
	await router.push(path);
	await router.isReady();
	return router;
};

// Mounts with a fresh Vuetify. A caller's global plugins and mocks are added to
// Vuetify's rather than replacing them.
export const mount = (component, options = {}) => {
	const global = options.global ?? {};
	return vueMount(component, {
		...options,
		global: {
			...global,
			plugins: [ createVuetify({ components, directives }), ...(global.plugins ?? []) ],
			mocks: { $t: (key) => key, ...(global.mocks ?? {}) }
		}
	});
};

// Mounts a renderless component around a composable, so a test drives it
// through props and emits; returns the wrapper and what the composable returned.
// errorHandler receives what the component throws, as app.config.errorHandler.
export const mountComposable = (composable, { props = {}, emits = [], options, attrs = {}, router, errorHandler } = {}) => {
	let api;
	const Component = defineComponent({
		props,
		emits,
		setup(propsI, context) {
			api = composable(propsI, context, options);
			return () => h('div');
		}
	});
	const wrapper = mount(Component, {
		props: attrs,
		global: {
			plugins: router ? [ router ] : [],
			...(errorHandler ? { config: { errorHandler } } : {})
		}
	});
	return { wrapper, api };
};

// the minimum of a vuelidate instance the form composables touch
export const validation = (valid = true) => ({
	$validate: async () => valid,
	$reset: async () => {},
	$invalid: !valid,
	$silentErrors: [],
	$anyDirty: true
});
