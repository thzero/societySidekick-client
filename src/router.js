import Vue from 'vue';
import VueRouter from 'vue-router';

import GlobalUtility from '@thzero/library_client/utility/global';

Vue.use(VueRouter);

const router = new VueRouter({
	scrollBehavior: () => ({ x: 0, y: 0 }),
	routes: [
		{
			path: '/',
			component: () => import('./layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'default',
					component: () => import('./components/Home.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/home',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-home" */ './components/Home.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/cards',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-cards" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
			children: [
				{
					path: '',
					name: 'cards',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-cards" */ './components/Cards.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/cards/:gamerTag/:key',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-cards" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
			children: [
				{
					path: '',
					name: 'cardsGamerTagKey',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-cards" */ './components/Cards.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/favorites',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-cards" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-cards" */ './components/Favorites.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/scenarios/:gamerTag/:key',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-scenarios" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-scenarios" */ './components/Scenarios.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/character/:id',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-character" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'character',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-character" */ './components/gameSystems/Character.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/admin',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ '@/library_vue_vuetify/layouts/AdminLayout.vue'),
			children: [
				{
					path: '',
					name: 'admin',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-admin" */ './components/admin/Admin.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		// {
		//	 path: '/about',
		//	 component: () => import('./layouts/MainLayout.vue'),
		//	 children: [
		//		 {
		//			 path: '',
		//			 name: 'about',
		//			 component: () => import('./components/About.vue'),
		//			 meta: {
		//				 requiresAuth: false
		//			 }
		//		 }
		//	 ]
		// },
		{
			path: '/openSource',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-openSource" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'openSource',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-openSource" */ './components/OpenSource.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/settings',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-settings" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'settings',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-settings" */ './components/Settings.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/support',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'support',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-support" */ './components/Support.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/auth',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ '@/library_vue_vuetify/layouts/AuthLayout.vue'),
			children: [
				{
					path: '',
					name: 'auth',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-auth" */ './components/Auth.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/notFound',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
			children: [
				{
					path: '',
					name: 'notFound',
					component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-notFound" */ './components/NotFound.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '*',
			component: () => import(/* webpackPrefetch: true */ /* webpackChunkName: "group-blank" */ '@/library_vue_vuetify/layouts/BlankLayout.vue'),
			meta: {
				notFound: true,
				requiresAuth: false
			}
		}
	]
});

// eslint-disable-next-line
router.beforeResolve((to, from, next) => {
	if (to.matched.some(record => record.meta.notFound)) {
		GlobalUtility.$navRouter.push('/notFound');
		return;
	}

	next();
});

export default router;
