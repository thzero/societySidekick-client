import { afterEach, beforeEach } from 'vitest';

import { enableAutoUnmount } from '@vue/test-utils';

// library_common installs String.isNullOrEmpty and friends onto the global String
import '@thzero/library_common/utility/string';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

// as the app's boot (rootServices): dayjs's locale plugins, which the date
// formatting needs
LibraryMomentUtility.initDateTime();

// jsdom lacks these browser APIs, and Vuetify and appBase reach for them
if (!globalThis.ResizeObserver) {
	globalThis.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
}
if (!window.matchMedia) {
	window.matchMedia = (query) => ({
		matches: false,
		media: query,
		addListener() {},
		removeListener() {},
		addEventListener() {},
		removeEventListener() {},
		dispatchEvent() { return false; }
	});
}
if (!('visualViewport' in globalThis))
	globalThis.visualViewport = undefined;

// Tests assign stubs to the LibraryClientUtility globals ($injector, $store,
// $EventBus, $navRouter, ...). Snapshot them before every test, after the file's
// imports and beforeAll hooks have run, and put them back afterwards, so one
// test's stubs cannot leak into the next.
const globals = () => Object.getOwnPropertyNames(LibraryClientUtility).filter((key) => key.startsWith('$'));
let saved;
beforeEach(() => {
	saved = new Map(globals().map((key) => [ key, LibraryClientUtility[key] ]));
});
afterEach(() => {
	for (const key of globals()) {
		if (!saved.has(key))
			delete LibraryClientUtility[key];
	}
	for (const [ key, value ] of saved)
		LibraryClientUtility[key] = value;
});

// Registered after the restore above, so it runs before it: a component
// unmounts while the globals it used are still in place.
enableAutoUnmount(afterEach);
