import { createRouter, createWebHistory } from 'vue-router';

// Phase 1: minimal router so the app boots under vue-router 4. Phase 2 rebuilds
// the real routes (home, cards, favorites, characters, scenarios, character,
// admin, openSource, settings, support, auth, notFound) against the new layouts.
const Home = {
	name: 'Phase1Home',
	template: '<div style="padding:24px;color:#fff;font-family:sans-serif">' +
		'<h2>Society Sidekick</h2>' +
		'<p>Phase 1 boot OK &mdash; Vite + Vue 3 + Vuetify 3 are serving.</p>' +
		'</div>'
};

const routes = [
	{
		path: '/:pathMatch(.*)*',
		name: 'default',
		component: Home,
		meta: { requiresAuth: false }
	}
];

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior: () => ({ left: 0, top: 0 }),
	routes
});

export default router;
