import Vue from 'vue';
import VueRouter from 'vue-router';

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
			component: () => import(/* webpackChunkName: "group-home" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					component: () => import(/* webpackChunkName: "group-home" */ './components/Home.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/cards',
			component: () => import(/* webpackChunkName: "group-cards" */ './library_vue/layouts/BlankLayout.vue'),
			children: [
				{
					path: '',
					name: 'cards',
					component: () => import(/* webpackChunkName: "group-cards" */ './components/Cards.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/cards/:gamerTag/:key',
			component: () => import(/* webpackChunkName: "group-cards" */ './library_vue/layouts/BlankLayout.vue'),
			children: [
				{
					path: '',
					name: 'cardsGamerTagKey',
					component: () => import(/* webpackChunkName: "group-cards" */ './components/Cards.vue'),
					meta: {
						requiresAuth: false
					}
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
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/scenarios/:gamerTag/:key',
			component: () => import(/* webpackChunkName: "group-scenarios" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					component: () => import(/* webpackChunkName: "group-scenarios" */ './components/Scenarios.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/character/:id',
			component: () => import(/* webpackChunkName: "group-character" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'character',
					component: () => import(/* webpackChunkName: "group-character" */ './components/gameSystems/Character.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/admin',
			component: () => import(/* webpackChunkName: "group-admin" */ './library_vue/layouts/AdminLayout.vue'),
			children: [
				{
					path: '',
					name: 'admin',
					component: () => import(/* webpackChunkName: "group-admin" */ './components/admin/Admin.vue'),
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
			component: () => import(/* webpackChunkName: "group-openSource" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'openSource',
					component: () => import(/* webpackChunkName: "group-openSource" */ './components/OpenSource.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/settings',
			component: () => import(/* webpackChunkName: "group-settings" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'settings',
					component: () => import(/* webpackChunkName: "group-settings" */ './components/Settings.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/support',
			component: () => import(/* webpackChunkName: "group-support" */ './layouts/MainLayout.vue'),
			children: [
				{
					path: '',
					name: 'support',
					component: () => import(/* webpackChunkName: "group-support" */ './components/Support.vue'),
					meta: {
						requiresAuth: true
					}
				}
			]
		},
		{
			path: '/auth',
			component: () => import(/* webpackChunkName: "group-auth" */ './library_vue/layouts/AuthLayout.vue'),
			children: [
				{
					path: '',
					name: 'auth',
					component: () => import(/* webpackChunkName: "group-auth" */ './components/Auth.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '/notFound',
			component: () => import(/* webpackChunkName: "group-notFound" */ './library_vue/layouts/BlankLayout.vue'),
			children: [
				{
					path: '',
					name: 'notFound',
					component: () => import(/* webpackChunkName: "group-notFound" */ './components/NotFound.vue'),
					meta: {
						requiresAuth: false
					}
				}
			]
		},
		{
			path: '*',
			component: () => import(/* webpackChunkName: "group-blank" */ './library_vue/layouts/BlankLayout.vue'),
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
		Vue.prototype.$navRouter.push('/notFound');
		return;
	}

	next();
});

export default router;
