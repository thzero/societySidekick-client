import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createServices, failed, K, ok } from '../helpers/services';
import { installStore, resetStore } from '../helpers/store';

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

describe('install', () => {
	it.each([ 'adminBoons', 'adminScenarios', 'boons', 'characters', 'classes', 'equipment', 'factions', 'scenarios' ])('registers the %s module', (key) => {
		expect(store[key]).toBeTruthy();
	});

	// the game system services and the dialogs call the domain getters flat,
	// as Vuex had them, not under their module (getters.scenarios.getScenario)
	it.each([ 'getBoon', 'getCharacter', 'getClass', 'getEquipment', 'getFaction', 'getScenario', 'getScenarioPlayed' ])('serves %s from the root getters', (name) => {
		expect(store.getters[name]).toBeTypeOf('function');
	});
});

describe('initialize', () => {
	it('keeps the game systems, plans and version from the api', async () => {
		const gameSystems = [ { id: 'pathfinder2e' } ];
		services[K.SERVICE_API].initialize.mockResolvedValueOnce(ok({ gameSystems: { data: gameSystems }, plans: [ { id: 'free' } ], version: { major: 1 } }));

		await store.dispatcher.initialize('c');

		expect(store.gameSystems).toEqual(gameSystems);
		expect(store.organizedPlay).toEqual(gameSystems);
		expect(store.plans).toEqual([ { id: 'free' } ]);
		expect(store.version).toEqual({ major: 1 });
	});

	it('keeps what it had when the api fails', async () => {
		store.gameSystems = [ { id: 'kept' } ];
		services[K.SERVICE_API].initialize.mockResolvedValueOnce(failed());

		await store.dispatcher.initialize('c');

		expect(store.gameSystems).toEqual([ { id: 'kept' } ]);
	});
});

describe('getters', () => {
	it('finds a game system by id', () => {
		store.gameSystems = [ { id: 'pathfinder2e' }, { id: 'starfinder1e' } ];

		expect(store.getters.getGameSystem('c', 'starfinder1e')).toEqual({ id: 'starfinder1e' });
		expect(store.getters.getGameSystem('c', 'nope')).toBeUndefined();
	});

	it('finds a character by id', () => {
		store.characters.characters = [ { id: 'c1', name: 'Khartan' } ];

		expect(store.getters.getCharacter('c', 'c1')).toEqual({ id: 'c1', name: 'Khartan' });
	});
});

describe('scenarios played', () => {
	it('keeps what a character has played', async () => {
		const played = [ { scenarioId: 's1', characterId: 'c1' } ];
		services[K.SERVICE_SCENARIOS].played.mockResolvedValueOnce(ok(played));

		await store.dispatcher.scenarios.getScenarioListingPlayed('c', 'c1');

		expect(services[K.SERVICE_SCENARIOS].played).toHaveBeenCalledWith('c', 'c1');
		expect(store.getters.getScenarioPlayed('c', 'c1')).toEqual(played);
	});

	it('replaces what it had for the character', async () => {
		services[K.SERVICE_SCENARIOS].played.mockResolvedValueOnce(ok([ { scenarioId: 's1' } ]));
		await store.dispatcher.scenarios.getScenarioListingPlayed('c', 'c1');

		services[K.SERVICE_SCENARIOS].played.mockResolvedValueOnce(ok([ { scenarioId: 's2' } ]));
		await store.dispatcher.scenarios.getScenarioListingPlayed('c', 'c1');

		expect(store.getters.getScenarioPlayed('c', 'c1')).toEqual([ { scenarioId: 's2' } ]);
		expect(store.scenarios.played).toHaveLength(1);
	});

	it('has played nothing for a character it has not loaded', () => {
		expect(store.getters.getScenarioPlayed('c', 'unknown')).toEqual([]);
	});
});

describe('settings', () => {
	it('merges new settings into what it has', async () => {
		store.settings = { a: 1, nested: { b: 2 } };

		await store.dispatcher.setSettings('c', { nested: { c: 3 } });

		expect(store.settings).toEqual({ a: 1, nested: { b: 2, c: 3 } });
	});
});
