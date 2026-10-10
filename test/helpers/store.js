import LibraryClientUtility from '@thzero/library_client/utility/index';

import BaseStore from '@thzero/library_client_vue3_store_pinia/store/index';
import news from '@thzero/library_client_vue3_store_pinia/store/news/index';
import user from '@thzero/library_client_vue3_store_pinia/store/user/index';

import characters from '@/store/characters';
import scenarios from '@/store/scenarios';

import AppStore from '@/store/pinia';

import { createServices, useServices } from './services';

// The app's real store without the persistence plugin, which needs browser
// storage and is not what these tests are about.
class TestStore extends AppStore {
	_initPluginPersistType() {
		return BaseStore.PersistanceTypeOverride;
	}

	_initPluginPersistOverride() {
		return () => {};
	}
}

const defaults = () => new TestStore()._initStoreConfigState();

// Installs the store the way main.js does, through the package's Vue plugin.
// Once per test file: installing registers the modules into module-level
// config. Call resetStore() in beforeEach to start each test clean.
export const installStore = async (services = createServices()) => {
	useServices(services);
	const store = new TestStore();
	await store.initialize();
	const setup = store.setup();
	setup.func.install({}, setup.options);
	return LibraryClientUtility.$store;
};

// Puts the app's state back to its defaults, and the state of the modules the
// tests use. Pinia's $reset cannot: the base store hands pinia the same state
// object every time.
export const resetStore = () => {
	const assign = (target, state) => {
		for (const [ key, value ] of Object.entries(state))
			target[key] = value;
	};
	assign(LibraryClientUtility.$store, defaults());
	assign(LibraryClientUtility.$store.news, news.state());
	assign(LibraryClientUtility.$store.user, user.state());
	assign(LibraryClientUtility.$store.characters, characters.state());
	assign(LibraryClientUtility.$store.scenarios, scenarios.state());
};
