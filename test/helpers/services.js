import { vi } from 'vitest';

import mitt from 'mitt';

import Constants from '@/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import Response from '@thzero/library_common/response';

import PiniaStoreService from '@thzero/library_client_vue3_store_pinia/service/store/index';

export const K = { ...LibraryClientConstants.InjectorKeys, ...Constants.InjectorKeys };
export const ok = (results) => Response.success('test', results);
export const failed = () => Response.error('test', 'failed');

export const logger = () => ({ debug() {}, error() {}, exception: vi.fn(), info() {}, info2() {}, warn() {} });

// Stub services for what the app resolves through the injector. Each call
// builds fresh vi.fn()s; pass overrides to replace any of them, or to add the
// game system services a test needs.
export const createServices = (overrides = {}) => ({
	[K.SERVICE_LOGGER]: logger(),
	[K.SERVICE_CONFIG]: { get: () => null, getBackend: () => null },
	[K.SERVICE_MARKUP_PARSER]: { render: (correlationId, markup) => `<p>${markup}</p>`, trimResults: (correlationId, value) => value },
	[K.SERVICE_USER]: {},
	[K.SERVICE_API]: {
		initialize: vi.fn(async () => ok({ gameSystems: { data: [] }, plans: [], version: {} })),
		gameSystems: vi.fn(async () => ok({ data: [] }))
	},
	[K.SERVICE_CHARACTERS]: {
		initialize: vi.fn(async () => ok({ lookups: null })),
		listing: vi.fn(async () => ok({ data: [] }))
	},
	[K.SERVICE_SCENARIOS]: {
		listing: vi.fn(async () => ok({ data: [] })),
		played: vi.fn(async () => ok([]))
	},
	[K.SERVICE_STORE]: new PiniaStoreService(),
	...overrides
});

// Points the app's service locator at the given services, with an event bus,
// a recording router and a translator that echoes the key.
export const useServices = (services = createServices()) => {
	LibraryClientUtility.$injector = { getService: (key) => services[key] ?? null };
	LibraryClientUtility.$EventBus = mitt();
	LibraryClientUtility.$navRouter = { push: vi.fn() };
	LibraryClientUtility.$trans = { locale: 'en', t: (key) => key };
	return services;
};
