import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { flushPromises } from '@vue/test-utils';

import Pathfinder2eSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import { useBaseScenarioLookupDialogComponent } from '@/components/gameSystems/baseScenarioLookupDialog';

import { mountComposable } from '../helpers/mount';
import { createServices } from '../helpers/services';
import { installStore, resetStore } from '../helpers/store';

const Adventures = Pathfinder2eSharedConstants.ScenarioAdventures;
const initialId = Pathfinder2eSharedConstants.ScenarionInitialId;

const scenarios = [
	{ id: initialId, name: 'Initial', type: Adventures.INITIAL },
	{ id: 's1', name: 'The Absalom Initiation', season: '1', type: Adventures.SCENARIO, description: 'An initiation.' },
	{ id: 's2', name: 'Breaking the Storm: Excising Ruination', season: '2', type: Adventures.SCENARIO },
	{ id: 's3', name: 'Breaking the Storm: Parting Clouds', season: '2', type: Adventures.SCENARIO },
	{ id: 'b1', name: 'The Whitefang Wyrm', season: '1', type: Adventures.BOUNTY }
];

// the game system service, as the dialog uses it
const gameSystem = () => ({
	scenarios: vi.fn(() => scenarios),
	initializeLookups: vi.fn(() => ({ scenarioParticipants: [ { id: 'player', name: 'Player' }, { id: 'gamemaster', name: 'Game Master' } ] })),
	scenarioName: (correlationId, item) => item.name,
	scenarioDescription: (correlationId, item) => item.description ?? null
});

let store;

beforeAll(async () => {
	store = await installStore(createServices());
});

beforeEach(() => {
	resetStore();
});

const lookup = async ({ characterId = 'ch-1' } = {}) => {
	const { wrapper, api } = mountComposable(useBaseScenarioLookupDialogComponent, {
		props: [ 'signal', 'characterId', 'scenarioOverride', 'serviceGameSystemOverride' ],
		emits: [ 'cancel', 'ok' ],
		attrs: { characterId, serviceGameSystemOverride: gameSystem() },
		options: { scenarioListFilterInitial: () => initialId }
	});
	await flushPromises();
	return { wrapper, api };
};

const names = (api) => api.scenarios.value.map((l) => l.name);

describe('the scenario lookup', () => {
	it('lists every scenario but the starting one', async () => {
		const { api } = await lookup();

		expect(api.scenarios.value.map((l) => l.id)).toEqual([ 's1', 's2', 's3', 'b1' ]);
	});

	it('filters by name, ignoring case', async () => {
		const { api } = await lookup();

		api.scenarioNameFilter.value = 'STORM';

		expect(names(api)).toEqual([ 'Breaking the Storm: Excising Ruination', 'Breaking the Storm: Parting Clouds' ]);
	});

	it('filters by season', async () => {
		const { api } = await lookup();

		api.scenarioSeasonFilter.value = '1';

		expect(names(api)).toEqual([ 'The Absalom Initiation', 'The Whitefang Wyrm' ]);
	});

	it('filters by type', async () => {
		const { api } = await lookup();

		api.scenarioAdventureFilter.value = Adventures.BOUNTY;

		expect(names(api)).toEqual([ 'The Whitefang Wyrm' ]);
	});

	it('combines the filters', async () => {
		const { api } = await lookup();

		api.scenarioSeasonFilter.value = '2';
		api.scenarioNameFilter.value = 'parting';

		expect(names(api)).toEqual([ 'Breaking the Storm: Parting Clouds' ]);
	});

	it('offers each season once, after a blank', async () => {
		const { api } = await lookup();

		const seasons = api.scenariosSeasons.value.map((l) => l.id);
		expect(seasons.filter((l) => l)).toEqual([ '1', '2' ]);
		expect(seasons.length).toBe(3);
	});

	it('clears the filters and loads what the character has played on reset', async () => {
		const played = [ { index: 0, scenarioId: 's1', characterId: 'ch-1', scenarioParticipant: 'player', timestamp: 1625356800000 } ];
		await store.scenarios.setScenarioListingPlayed('c', played, 'ch-1');
		const { api } = await lookup();
		api.scenarioNameFilter.value = 'storm';
		api.scenarioSeasonFilter.value = '2';

		await api.reset('c');

		expect(api.scenarioNameFilter.value).toBeNull();
		expect(api.scenarioSeasonFilter.value).toBeNull();
		expect(api.getPlayed('s1')).toHaveLength(1);
		expect(api.getPlayed('s2')).toEqual([]);
	});

	it('names who played a scenario, and as what', async () => {
		store.characters.characters = [ { id: 'ch-1', name: 'Khartan the Wild', number: '2001' } ];
		const played = { scenarioId: 's1', characterId: 'ch-1', scenarioParticipant: 'gamemaster', timestamp: 1625356800000 };
		const { api } = await lookup();

		expect(api.playedCharacterName(played)).toBe('Khartan the Wild');
		expect(api.playedCharacterNumber(played)).toBe('2001');
		expect(api.scenarioParticipant(played.scenarioParticipant)).toBe('Game Master');
		expect(api.playedTimestamp(played)).toMatch(/2021/);
	});

	it('renders the description as markup, and nothing without one', async () => {
		const { api } = await lookup();

		expect(api.scenarioDescription(scenarios[1])).toBe('<p>An initiation.</p>');
		expect(api.scenarioDescription(scenarios[2])).toBeNull();
	});

	it('hands back the scenario it selects', async () => {
		const { wrapper, api } = await lookup();

		await api.ok('s2');

		expect(wrapper.emitted('ok')).toEqual([ [ 's2' ] ]);
	});

	it('says when it is cancelled', async () => {
		const { wrapper, api } = await lookup();

		await api.cancel();

		expect(wrapper.emitted('cancel')).toHaveLength(1);
	});
});
