import { createRouter, createWebHistory } from 'vue-router';

import LibraryClientUtility from '@thzero/library_client/utility/index';

const routes = [
	{
		path: '/',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'default',
				component: () => import('./components/Home.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/home',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('./components/Home.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/cards',
		component: () => import('@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
		children: [
			{
				path: '',
				name: 'cards',
				component: () => import('./components/Cards.vue'),
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/cards/:gamerTag/:key',
		component: () => import('@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
		children: [
			{
				path: '',
				name: 'cardsGamerTagKey',
				component: () => import('./components/Cards.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/favorites',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('./components/Favorites.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/characters/:gamerTag/:key',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('./components/Characters.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/scenarios/:gamerTag/:key',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				component: () => import('./components/Scenarios.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/character/:id',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'character',
				component: () => import('./components/gameSystems/Character.vue'),
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/admin',
		component: () => import('@thzero/library_client_vue3_vuetify3/layouts/AdminLayout.vue'),
		children: [
			{
				path: '',
				name: 'admin',
				component: () => import('./components/admin/Admin.vue'),
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/openSource',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'openSource',
				component: () => import('./components/OpenSource.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/settings',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'settings',
				component: () => import('./components/Settings.vue'),
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/support',
		component: () => import('./layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'support',
				component: () => import('./components/Support.vue'),
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/auth',
		component: () => import('@thzero/library_client_vue3_vuetify3/layouts/AuthLayout.vue'),
		children: [
			{
				path: '',
				name: 'auth',
				component: () => import('./components/Auth.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/notFound',
		component: () => import('@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
		children: [
			{
				path: '',
				name: 'notFound',
				component: () => import('./components/NotFound.vue'),
				meta: { requiresAuth: false }
			}
		]
	},
	{
		path: '/:catchAll(.*)*',
		component: () => import('@thzero/library_client_vue3_vuetify3/layouts/BlankLayout.vue'),
		meta: {
			notFound: true,
			requiresAuth: false
		}
	}
];

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior: () => ({ left: 0, top: 0 }),
	routes
});

router.beforeResolve((to, from) => {
	if (to.matched.some(record => record.meta.notFound)) {
		LibraryClientUtility.$navRouter.push('/notFound');
		return false;
	}
});

export default router;
