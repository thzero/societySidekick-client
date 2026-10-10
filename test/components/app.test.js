import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { flushPromises } from '@vue/test-utils';

import { useAppComponent } from '@/components/appBase';

import { mountComposable } from '../helpers/mount';
import { createServices, K } from '../helpers/services';
import { installStore, resetStore } from '../helpers/store';

// the theme composable's useTheme records the theme it is changed to
const theme = vi.hoisted(() => ({ global: { name: { value: null } }, change(name) { this.global.name.value = name; } }));
vi.mock('vuetify', async (original) => ({ ...(await original()), useTheme: () => theme }));

let services;
let store;

beforeAll(async () => {
	services = createServices();
	store = await installStore(services);
});

beforeEach(() => {
	resetStore();
	vi.clearAllMocks();
});

describe('app theme', () => {
	let matchMedia;

	beforeEach(() => {
		matchMedia = window.matchMedia;
		theme.global.name.value = null;
	});

	afterEach(() => {
		window.matchMedia = matchMedia;
	});

	// Mounts appBase with the system preferring dark or light; returns the
	// listener appBase registered for system changes.
	const app = (dark) => {
		const media = { matches: dark, addEventListener: vi.fn(), removeEventListener: vi.fn() };
		window.matchMedia = vi.fn(() => media);
		mountComposable(useAppComponent);
		// the last: the mount helper's Vuetify registers its own first
		return media.addEventListener.mock.calls.at(-1)[1];
	};

	it('uses the dark variant when the system prefers dark', () => {
		app(true);

		expect(theme.global.name.value).toBe('defaultThemeDark');
	});

	it('uses the light theme when the system prefers light', () => {
		app(false);

		expect(theme.global.name.value).toBe('defaultTheme');
	});

	it('uses the user\'s theme', async () => {
		await store.user.setUserTheme('c', 'otherTheme');

		app(true);

		expect(theme.global.name.value).toBe('otherThemeDark');
	});

	it('follows the system when it switches', () => {
		const listener = app(false);

		listener({ matches: true });
		expect(theme.global.name.value).toBe('defaultThemeDark');

		listener({ matches: false });
		expect(theme.global.name.value).toBe('defaultTheme');
	});
});

describe('app start', () => {
	it('initializes the store and the character lookups on mount', async () => {
		window.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));

		mountComposable(useAppComponent);
		await flushPromises();

		expect(services[K.SERVICE_API].initialize).toHaveBeenCalled();
		expect(services[K.SERVICE_CHARACTERS].initialize).toHaveBeenCalled();
	});
});
