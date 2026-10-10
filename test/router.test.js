import { describe, expect, it } from 'vitest';

import router from '@/router';

const resolve = (path) => router.resolve(path);

// The page a path lands on: the leaf route's component, as the loader's
// source names it (several of the pages have no route name).
const page = (path) => {
	const leaf = resolve(path).matched.at(-1);
	const component = leaf?.components?.default;
	return component ? String(component).match(/\/([A-Za-z]+)\.vue/)?.[1] ?? null : null;
};

describe('router', () => {
	it.each([
		[ '/', 'default' ],
		[ '/cards', 'cards' ],
		[ '/cards/tag/k1', 'cardsGamerTagKey' ],
		[ '/character/c1', 'character' ],
		[ '/admin', 'admin' ],
		[ '/openSource', 'openSource' ],
		[ '/settings', 'settings' ],
		[ '/support', 'support' ],
		[ '/auth', 'auth' ],
		[ '/notFound', 'notFound' ]
	])('%s goes to %s', (path, name) => {
		expect(resolve(path).name).toBe(name);
	});

	it.each([
		[ '/', 'Home' ],
		[ '/home', 'Home' ],
		[ '/cards', 'Cards' ],
		[ '/cards/tag/k1', 'Cards' ],
		[ '/favorites', 'Favorites' ],
		[ '/characters/tag/k1', 'Characters' ],
		[ '/scenarios/tag/k1', 'Scenarios' ],
		[ '/character/c1', 'Character' ],
		[ '/admin', 'Admin' ],
		[ '/openSource', 'OpenSource' ],
		[ '/settings', 'Settings' ],
		[ '/support', 'Support' ],
		[ '/auth', 'Auth' ],
		[ '/notFound', 'NotFound' ]
	])('%s shows %s', (path, component) => {
		expect(page(path)).toBe(component);
	});

	it.each([
		[ '/cards/tag/k1', { gamerTag: 'tag', key: 'k1' } ],
		[ '/characters/tag/k1', { gamerTag: 'tag', key: 'k1' } ],
		[ '/scenarios/tag/k1', { gamerTag: 'tag', key: 'k1' } ],
		[ '/character/c1', { id: 'c1' } ]
	])('%s reads its params', (path, params) => {
		expect(resolve(path).params).toEqual(params);
	});

	it.each([ '/nowhere', '/character', '/characters/tag', '/character/c1/extra' ])('%s is not found', (path) => {
		expect(resolve(path).meta.notFound).toBe(true);
	});

	it('keeps the catch-all last, so it cannot hide a route', () => {
		const routes = router.options.routes;

		expect(routes[routes.length - 1].path).toBe('/:catchAll(.*)*');
	});

	it.each([ '/cards', '/character/c1', '/settings', '/support' ])('requires a login for %s', (path) => {
		expect(resolve(path).meta.requiresAuth).toBe(true);
	});

	it('requires an admin for /admin', () => {
		const meta = resolve('/admin').meta;

		expect(meta.requiresAuth).toBe(true);
		expect(meta.requiresAuthRoles).toEqual([ 'admin' ]);
	});

	// the shared links: a player hands out /characters/:gamerTag/:key and the
	// like to people who are not signed in
	it.each([ '/', '/home', '/cards/tag/k1', '/favorites', '/characters/tag/k1', '/scenarios/tag/k1', '/openSource', '/auth', '/notFound' ])('requires no login for %s', (path) => {
		expect(resolve(path).meta.requiresAuth).toBe(false);
	});

	it('loads every page component', async () => {
		const loaders = router.getRoutes()
			.flatMap((l) => Object.values(l.components ?? {}))
			.filter((l) => typeof l === 'function');

		expect(loaders.length).toBeGreaterThan(10);
		for (const load of loaders)
			expect((await load()).default).toBeTruthy();
	});
});
