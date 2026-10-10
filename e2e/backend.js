// A stand-in for the skick backend. The e2e build talks to the baseUrl in
// src/config/e2e.json; every request to it is answered here from the
// fixtures below, so the e2e tests never touch a real service.

export const ok = (results) => ({ success: true, results });
export const failed = () => ({ success: false, results: null });

export const gameSystems = {
	pathfinder2e: 'nFxpKVcCusf4qztVj9CpT5',
	starfinder1e: 'hZZ8KYnj5gzbFSRC4yb4PE'
};

// the starting scenario every character gets (ScenarionInitialId)
export const scenarioInitialId = 'ciHt2sZZFDtRuaq1YDzkiy';

const stamp = { createdTimestamp: 1, updatedTimestamp: 1 };

export const factions = [
	{ id: 'f-envoy', gameSystemId: gameSystems.pathfinder2e, name: 'Envoys\' Alliance', ...stamp },
	{ id: 'f-horizon', gameSystemId: gameSystems.pathfinder2e, name: 'Horizon Hunters', ...stamp }
];

export const classes = [
	{ id: 'c-fighter', gameSystemId: gameSystems.pathfinder2e, name: 'Fighter', ...stamp },
	{ id: 'c-wizard', gameSystemId: gameSystems.pathfinder2e, name: 'Wizard', ...stamp }
];

// A long description, as the real ones are: the lookup dialog has to scroll it.
const long = 'When the spirit of a long-dead cyclops managed to re-activate an age-old ritual to summon forth a demon lord onto Golarion, you rushed into action. '.repeat(6);

export const scenarios = [
	{ id: scenarioInitialId, gameSystemId: gameSystems.pathfinder2e, name: 'Initial', type: 'initial', ...stamp },
	{ id: 's-1-01', gameSystemId: gameSystems.pathfinder2e, name: 'The Absalom Initiation', scenario: '1-01', season: '1', type: 'scenario', description: long, ...stamp },
	{ id: 's-2-22', gameSystemId: gameSystems.pathfinder2e, name: 'Breaking the Storm: Excising Ruination', scenario: '2-22', season: '2', type: 'scenario', ...stamp },
	{ id: 's-2-24', gameSystemId: gameSystems.pathfinder2e, name: 'Breaking the Storm: Parting Clouds', scenario: '2-24', season: '2', type: 'scenario', description: long, ...stamp },
	{ id: 's-b-01', gameSystemId: gameSystems.pathfinder2e, name: 'The Whitefang Wyrm', scenario: 'B1', season: '1', type: 'bounty', description: long, ...stamp }
];

const characterScenario = (id, scenarioId, order, extra = {}) => ({
	id,
	scenarioId,
	order,
	gameSystemId: gameSystems.pathfinder2e,
	status: 'active',
	scenarioStatus: 'initial',
	scenarioParticipant: 'player',
	scenarioEvent: 'standard',
	scenarioAdvancementSpeed: 'standard',
	experiencePointsEarned: 0,
	currencyEarned: 0,
	timestamp: 1625356800000,
	...extra
});

// As the backend returns a character: the totals already worked out.
export const character = () => ({
	id: 'ch-1',
	userId: 'u-user',
	gameSystemId: gameSystems.pathfinder2e,
	name: 'Khartan the Wild',
	number: '2001',
	tagLine: '',
	status: 'active',
	classId: 'c-fighter',
	factionId: 'f-envoy',
	archetypeIds: [],
	boons: [],
	inventory: [],
	scenarios: [
		characterScenario('cs-0', scenarioInitialId, 0, { currencyEarned: 15, scenarioAdvancementSpeed: 'initial', scenarioEvent: 'initial' }),
		characterScenario('cs-1', 's-1-01', 1, { experiencePointsEarned: 4, currencyEarned: 8, fameFactionId: 'f-envoy', fameEarned: 4 })
	],
	achievementPoints: 4,
	experiencePoints: 4,
	experiencePointsToNextLevel: 8,
	level: 1,
	currencyEarned: 23,
	currencyTotal: 23,
	currencyBought: 0,
	currencyGained: 23,
	currencyIncomeEarned: 0,
	currencySold: 0,
	currencySpent: 0,
	fame: [ { id: 'f-envoy', earned: 4, spent: 0, remaining: 4 }, { earned: 4, spent: 0, remaining: 4 } ],
	reputation: [],
	...stamp
});

// the player whose characters a shared link shows
export const sharer = { id: 'u-sharer', gamerId: 'g-sharer', gamerTag: 'sharer', external: { name: 'Sam Sharer' }, settings: { gameSystems: [] } };

export const gameSystemsListing = () => ([
	{ id: gameSystems.pathfinder2e, name: 'Pathfinder 2e', friendlyId: 'pathfinder2e', active: true, ...stamp },
	{ id: gameSystems.starfinder1e, name: 'Starfinder 1e', friendlyId: 'starfinder1e', active: true, ...stamp }
]);

export const news = () => ([
	{ id: 'n1', title: 'First News', article: 'Something happened', status: 'active', type: 'main', publishDate: 1, sticky: false, ...stamp }
]);

const listing = (data) => ok({ data, count: data.length, total: data.length });

// Each handler gets { method, path, params, body } and returns the JSON to
// send, or a { status, json } pair. The path is relative to the baseUrl.
export const defaultRoutes = () => ({
	'GET initialize': () => ok({ gameSystems: listing(gameSystemsListing()).results, plans: listing([]).results, version: { major: 0, minor: 15, patch: 41, date: '10/10/2026' } }),
	'GET plans': () => listing([]),
	'GET version': () => ok({ major: 0, minor: 15, patch: 41, date: '10/10/2026' }),
	'GET utility/openSource': () => ok([]),
	'POST utility/logger': () => ok(null),
	'POST usageMetrics/tag': () => ok(null),
	'GET news/latest/:timestamp': () => listing(news()),
	'POST users/refresh/settings': () => ok(null),
	'POST users/update/settings': ({ body }) => ok({ settings: body?.settings ?? {} }),
	'GET users/favorites/:id': () => listing([]),
	// a shared link, /characters/:gamerId/:gameSystem
	'GET users/gamerId/:gamerId': ({ params }) => params.gamerId === sharer.gamerId ? ok(sharer) : failed(),
	'GET characters/listing/gamerId/:gamerId/:gameSystemId': ({ params }) => listing(params.gamerId === sharer.gamerId ? [ character() ] : []),
	'GET characters/initialize': () => ok({ lookups: { status: [ { id: 'active', name: 'Active' }, { id: 'dead', name: 'Dead' }, { id: 'retired', name: 'Retired' } ] } }),
	'POST characters/listing': () => listing([ character() ]),
	'GET characters/listing/favorites': () => listing([]),
	'GET characters/:id': ({ params }) => params.id === 'ch-1' ? ok(character()) : failed(),
	'POST characters': ({ body }) => ok(body),
	'GET boons/listing/:gameSystemId': () => listing([]),
	'GET boons/played/:characterId': () => ok([]),
	'GET classes/listing/:gameSystemId': ({ params }) => listing(classes.filter((l) => l.gameSystemId === params.gameSystemId)),
	'GET factions/listing/:gameSystemId': ({ params }) => listing(factions.filter((l) => l.gameSystemId === params.gameSystemId)),
	'GET scenarios/listing/:gameSystemId': ({ params }) => listing(scenarios.filter((l) => l.gameSystemId === params.gameSystemId)),
	'GET scenarios/played/:characterId': () => ok([]),
	'POST equipment/search/:gameSystemId': () => listing([]),
	// the admin listings: news, boons, classes, equipment, factions, scenarios, users
	'POST admin/:type/search': () => listing([])
});

// Matches 'METHOD a/:b/c' patterns against a request; returns the params or null.
export const match = (pattern, method, path) => {
	const [ patternMethod, patternPath ] = pattern.split(' ');
	if (patternMethod !== method)
		return null;
	const want = patternPath.split('/');
	const have = path.split('/');
	if (want.length !== have.length)
		return null;
	const params = {};
	for (let i = 0; i < want.length; i++) {
		if (want[i].startsWith(':'))
			params[want[i].slice(1)] = decodeURIComponent(have[i]);
		else if (want[i] !== have[i])
			return null;
	}
	return params;
};
