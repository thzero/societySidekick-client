import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import AppConstants from '@/utility/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'default',
				component: () => import(/* webpackChunkName: "group-main" */ './components/Home.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/contact',
		component: () => import(/* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'contact',
				component: () => import(/* webpackChunkName: "group-main" */ './components/Contact.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/openSource',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'openSource',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/OpenSource.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/privacy',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'privacy',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Privacy.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/settings',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'settings',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Settings.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	// {
	// 	path: '/about',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'about',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/About.vue'),
	// 			meta: {
	// 				requiresAuth: false
	// 			}
	// 		}
	// 	]
	// },
	// {
	// 	path: '/support',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ './layouts/MainLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'support',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Support.vue'),
	// 			meta: {
	// 				requiresAuth: false
	// 			}
	// 		}
	// 	]
	// },
	{
		path: '/auth',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-layouts" */ '@thzero/library_client_vue3_vuetify3/layouts/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'auth',
				component: () => import('./components/Auth.vue'),
				meta: {
					requiresAuth: false
				}
			}
		]
	},
	{
		path: '/admin',
		component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ '@thzero/library_client_vue3_vuetify3/layouts/AdminLayout.vue'),
		children: [
			{
				path: '',
				name: 'admin',
				component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ './components/admin/Admin.vue'),
				meta: {
					requiresAuth: true,
					requiresAuthRoles: [ 'admin' ]
				}
			}
		]
	},
	// {
	// 	path: '/:catchAll(.*)*',
	// 	component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-catchAll" */ '@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
	// 	children: [
	// 		{
	// 			path: '',
	// 			name: 'notFound',
	// 			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-catchAll" */ '@thzero/library_client_vue3_vuetify3/components/VNotFound.vue'),
	// 			meta: {
	// 				requiresAuth: false
	// 			}
	// 		}
	// 	]
	// }
];

routes.push(
{
	path: '/:catchAll(.*)*',
	component: () => import(/* webpackChunkName: "group-layouts" */ '@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
	children: [
		{
			path: '',
			name: 'notFound',
			component: () => import(/* webpackChunkName: "group-main" */ '@thzero/library_client_vue3_vuetify3/components/VtNotFound.vue'),
			meta: {
				requiresAuth: false
			}
		}
	]
});

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	// history: createWebHashHistory(process.env.BASE_URL),
	routes
});

// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
	if (to.matched.some(record => record.meta.notFound)) {
		LibraryClientUtility.$navRouter.push('/notFound');
		return;
	}

	next();
});

export default router;
