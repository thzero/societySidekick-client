import { describe, expect, it } from 'vitest';

// Loads every module in src, so a broken import or a syntax error fails here
// rather than in the browser on the route that happens to load it.
// main.js is left out: importing it boots the whole app.
const modules = import.meta.glob([
	'../src/**/*.{js,vue}',
	'!../src/main.js',
	'!../src/openSource.js'
]);

// Modules that cannot load yet, each with the reason. it.fails keeps the
// suite green while they are broken and fails once one is fixed, so the
// entry gets removed.
const broken = {
	// Vue 2 leftovers that nothing imports; the app uses the per game system
	// BoonDialogs and store/pinia.js
	'../src/components/gameSystems/BoonDialog.vue': 'imports @/library_vue, which no longer exists',
	'../src/components/maps/google/VGoogleMapLoader.vue': 'imports @/library_vue, which no longer exists',
	'../src/components/maps/google/VGoogleMapMarker.vue': 'imports @/library_vue, which no longer exists',
	'../src/store/index.js': 'imports @thzero/library_client_vue, the Vue 2 library'
};

describe('modules', () => {
	const names = Object.keys(modules).sort();

	it('finds the source', () => {
		expect(names.length).toBeGreaterThan(100);
	});

	for (const name of names) {
		const test = broken[name] ? it.fails : it;
		test(`${name} loads`, async () => {
			const module = await modules[name]();
			expect(module).toBeTruthy();
		});
	}
});
