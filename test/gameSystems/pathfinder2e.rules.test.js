import { describe, expect, it, vi } from 'vitest';

import SharedConstants from '@/common/constants';
import Pathfinder2eSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import Response from '@thzero/library_common/response';

import RulesService from '@/common/gameSystems/pathfinder2e/service/rules';

const Adventures = Pathfinder2eSharedConstants.ScenarioAdventures;
const Events = Pathfinder2eSharedConstants.ScenarioEvents;
const Participants = SharedConstants.ScenarioParticipants;
const Speeds = Pathfinder2eSharedConstants.ScenarioAdvancementSpeeds;

// without init(), which would only add the injected services; the logger is
// what _error needs
const rules = () => {
	const service = new RulesService();
	service._logger = { debug() {}, error() {}, exception() {}, warn() {} };
	return service;
};

// a played scenario as the character keeps it
const played = (order, extra = {}) => ({
	id: `s${order}`,
	order,
	status: SharedConstants.CharactersStatus.ACTIVE,
	scenarioStatus: SharedConstants.ScenarioStatus.INITIAL,
	experiencePointsEarned: 4,
	currencyEarned: 10,
	...extra
});

const character = (scenarios, extra = {}) => ({ id: 'c1', scenarios, inventory: [], ...extra });

const calculate = async (value, user = null, service = rules()) => {
	const response = await service.calculateCharacter('c', value, user);
	expect(response.success).toBe(true);
	return value;
};

describe('levels', () => {
	it.each([
		[ 0, 1 ],
		[ 11, 1 ],
		[ 12, 2 ],
		[ 23.5, 2 ],
		[ 24, 3 ],
		[ 228, 20 ]
	])('%s experience points is level %s', (xp, level) => {
		expect(rules().calculateLevel('c', xp)).toBe(level);
	});

	it.each([
		[ 0, 12 ],
		[ 4, 8 ],
		[ 11, 1 ],
		[ 12, 12 ]
	])('%s experience points is %s from the next level', (xp, remaining) => {
		expect(rules().calculateExperienceToNextLevel('c', xp)).toBe(remaining);
	});
});

describe('what a scenario earns', () => {
	const scenario = (type, extra = {}) => ({ scenario: { type }, ...extra });

	it.each([
		[ Adventures.BOUNTY, 1 ],
		[ Adventures.QUEST, 1 ],
		[ Adventures.SCENARIO, 4 ],
		[ Adventures.ADVENTURE, 0 ],
		[ Adventures.ADVENTURE_PATH, 12 ],
		[ Adventures.ACHIEVEMENT_POINTS, 12 ]
	])('a %s earns %s experience points', (type, xp) => {
		expect(rules().calculateScenarioExperiencePointsEarned('c', scenario(type))).toBe(xp);
	});

	it('a module earns what was entered', () => {
		expect(rules().calculateScenarioExperiencePointsEarned('c', scenario(Adventures.MODULE, { experiencePointsEarned: 7 }))).toBe(7);
	});

	it.each([
		[ Adventures.BOUNTY, 1 ],
		[ Adventures.QUEST, 1 ],
		[ Adventures.SCENARIO, 4 ],
		[ Adventures.ADVENTURE, 0 ],
		[ Adventures.ADVENTURE_PATH, 12 ],
		[ Adventures.MODULE, null ]
	])('a %s earns %s fame', (type, fame) => {
		expect(rules().calculateScenarioFameEarned('c', scenario(type))).toBe(fame);
	});

	it.each([
		[ Adventures.SCENARIO, 8 ],
		[ Adventures.BOUNTY, 2 ],
		[ Adventures.QUEST, 2 ],
		[ Adventures.ADVENTURE_PATH, 24 ],
		[ Adventures.ADVENTURE, 0 ]
	])('a %s earns %s downtime', (type, downtime) => {
		expect(rules().calculateScenarioDowntimePointsEarned('c', scenario(type))).toBe(downtime);
	});

	it('halves the downtime at slow advancement', () => {
		expect(rules().calculateScenarioDowntimePointsEarned('c', scenario(Adventures.SCENARIO, { scenarioAdvancementSpeed: Speeds.SLOW }))).toBe(4);
	});

	it.each([
		[ Adventures.SCENARIO, Participants.PLAYER, Events.STANDARD, 4 ],
		[ Adventures.SCENARIO, Participants.PLAYER, Events.PREMIER_PLUS, 6 ],
		[ Adventures.SCENARIO, Participants.GAMEMASTER, Events.STANDARD, 8 ],
		[ Adventures.BOUNTY, Participants.GAMEMASTER, Events.PREMIER, 2.5 ],
		[ Adventures.ADVENTURE_PATH, Participants.GAMEMASTER, Events.PREMIER_PLUS, 36 ]
	])('a %s, as %s at a %s event, earns %s achievement points', (type, participant, event, points) => {
		const value = scenario(type, { scenarioParticipant: participant, scenarioEvent: event });

		expect(rules().calculateScenarioAchievementPointsEarned('c', value)).toBe(points);
	});

	it('earns no achievement points for a combination not in the table', () => {
		const value = scenario(Adventures.SCENARIO, { scenarioParticipant: Participants.INITIAL, scenarioEvent: Events.STANDARD });

		expect(rules().calculateScenarioAchievementPointsEarned('c', value)).toBe(0);
	});

	it('fills in everything a scenario earns', () => {
		const value = scenario(Adventures.SCENARIO, { scenarioParticipant: Participants.PLAYER, scenarioEvent: Events.STANDARD });

		rules().calculateScenario('c', value);

		expect(value).toMatchObject({ achievementPointsEarned: 4, downtimePointsEarned: 8, experiencePointsEarned: 4, fameEarned: 4 });
	});

	it.each([ 'calculateScenarioExperiencePointsEarned', 'calculateScenarioFameEarned', 'calculateScenarioDowntimePointsEarned', 'calculateScenarioAchievementPointsEarned' ])('%s earns nothing without a scenario', (method) => {
		expect(rules()[method]('c', null)).toBe(0);
	});

	it.each([
		[ Adventures.SCENARIO, true ],
		[ Adventures.BOUNTY, true ],
		[ Adventures.ADVENTURE, false ],
		[ Adventures.MODULE, false ]
	])('a %s is an adventure scenario: %s', (type, expected) => {
		expect(rules().isAdventureScenario('c', scenario(type))).toBe(expected);
	});
});

describe('item totals', () => {
	it('multiplies the quantity by the value', () => {
		expect(rules().calculateItemTotal('c', 3, 1.5)).toBe(4.5);
	});

	it('avoids floating point error', () => {
		expect(rules().calculateItemTotal('c', 3, 0.1)).toBe(0.3);
	});

	it('is 0 without a quantity or a value', () => {
		expect(rules().calculateItemTotal('c', null, 5)).toBe(0);
		expect(rules().calculateItemTotal('c', 5, 0)).toBe(0);
	});
});

describe('calculateCharacter', () => {
	it('refuses a missing character', async () => {
		const response = await rules().calculateCharacter('c', null);

		expect(response.success).toBe(false);
	});

	it('adds up the experience points and the level', async () => {
		const value = await calculate(character([ played(1), played(2), played(3) ]));

		expect(value.experiencePoints).toBe(12);
		expect(value.level).toBe(2);
		expect(value.experiencePointsToNextLevel).toBe(12);
	});

	it('keeps a running total on each scenario, in play order', async () => {
		const value = await calculate(character([ played(3), played(1), played(2) ]));

		const byOrder = [ ...value.scenarios ].sort((a, b) => a.order - b.order);
		expect(byOrder.map((l) => l.experiencePoints)).toEqual([ 4, 8, 12 ]);
		expect(byOrder.map((l) => l.level)).toEqual([ 1, 1, 2 ]);
		expect(byOrder.map((l) => l.currencySpendable)).toEqual([ 10, 20, 30 ]);
	});

	// it checked scenarioAdventure, which nothing sets, so the starting
	// scenario was never seen as initial; saved scenarios keep only the scenarioId
	it('gives the starting scenario no level', async () => {
		const value = await calculate(character([ played(1, { scenarioId: Pathfinder2eSharedConstants.ScenarionInitialId, experiencePointsEarned: 0 }), played(2) ]));

		expect(value.scenarios.find((l) => l.id === 's1').level).toBeNull();
		expect(value.scenarios.find((l) => l.id === 's2').level).toBe(1);
	});

	it.each([
		[ 'the starting scenario, saved', { scenarioId: Pathfinder2eSharedConstants.ScenarionInitialId }, true ],
		[ 'a starting scenario in the dialog', { scenario: { type: Adventures.INITIAL } }, true ],
		[ 'any other scenario', { scenarioId: 'other', scenario: { type: Adventures.SCENARIO } }, false ]
	])('%s is initial: %s', (name, item, expected) => {
		expect(rules().calculateCharacterScenarioInitial('c', item)).toBe(expected);
	});

	it.each([ SharedConstants.ScenarioStatus.IGNORE, SharedConstants.ScenarioStatus.REPEATED ])('leaves out a scenario marked %s', async (scenarioStatus) => {
		const value = await calculate(character([ played(1), played(2, { scenarioStatus }) ]));

		expect(value.experiencePoints).toBe(4);
		expect(value.currencyTotal).toBe(10);
	});

	it('counts a replay', async () => {
		const value = await calculate(character([ played(1), played(2, { scenarioStatus: SharedConstants.ScenarioStatus.REPLAY }) ]));

		expect(value.experiencePoints).toBe(8);
	});

	it('takes the status of a scenario that ends the character, and counts nothing from it', async () => {
		const value = await calculate(character([ played(1), played(2, { status: SharedConstants.CharactersStatus.DEAD }) ]));

		expect(value.status).toBe(SharedConstants.CharactersStatus.DEAD);
		expect(value.experiencePoints).toBe(4);
	});

	it('adds income and takes off spending', async () => {
		const value = await calculate(character([ played(1, { currencyIncomeEarned: 2.5, currencySpent: 4 }) ]));

		expect(value.currencyEarned).toBe(10);
		expect(value.currencyIncomeEarned).toBe(2.5);
		expect(value.currencyGained).toBe(12.5);
		expect(value.currencySpent).toBe(4);
		expect(value.currencyTotal).toBe(8.5);
	});

	it('takes off what was bought, and gives back half of what was sold', async () => {
		const inventory = [
			{ id: 'i1', quantity: 2, value: 3, boughtScenarioId: 's1' },
			{ id: 'i2', quantity: 1, value: 4, boughtScenarioId: 's1', soldScenarioId: 's2' }
		];
		const value = await calculate(character([ played(1), played(2) ], { inventory }));

		expect(value.currencyBought).toBe(10);
		expect(value.currencySold).toBe(2);
		expect(value.currencyTotal).toBe(12);
		expect(value.scenarios.find((l) => l.id === 's2').currencySold).toBe(2);
	});

	it('leaves the item being edited out of the totals', async () => {
		const inventory = [ { id: 'i1', quantity: 2, value: 3, boughtScenarioId: 's1' } ];
		const value = character([ played(1) ], { inventory });

		await rules().calculateCharacter('c', value, null, 'i1');

		expect(value.currencyBought).toBe(0);
		expect(value.currencyTotal).toBe(10);
	});

	it('adds up fame by faction, with a grand total last', async () => {
		const value = await calculate(character([
			played(1, { fameFactionId: 'f1', fameEarned: 4 }),
			played(2, { fameFactionId: 'f2', fameEarned: 4 }),
			played(3, { fameFactionId: 'f1', fameEarned: 4, fameSpent: 3 })
		]));

		expect(value.fame).toEqual([
			{ id: 'f1', earned: 8, spent: 3, remaining: 5 },
			{ id: 'f2', earned: 4, spent: 0, remaining: 4 },
			{ earned: 12, spent: 3, remaining: 9 }
		]);
	});

	it('adds up reputation by faction, the additional faction included', async () => {
		const value = await calculate(character([
			played(1, { reputationFactionId: 'f1', reputationEarned: 4 }),
			played(2, { reputationFactionId: 'f1', reputationEarned: 4, reputationAdditionalFactionId: 'f2', reputationAdditionalEarned: 2 })
		]));

		expect(value.reputation).toEqual([ { id: 'f1', earned: 8 }, { id: 'f2', earned: 2 } ]);
	});

	it('adds up the achievement points', async () => {
		const value = await calculate(character([ played(1, { achievementPointsEarned: 4 }), played(2, { achievementPointsEarned: 8 }) ]));

		expect(value.achievementPoints).toBe(12);
	});

	it('cleans up its working fields', async () => {
		const value = await calculate(character([ played(1, { fameFactionId: 'f1', fameEarned: 4, reputationFactionId: 'f1', reputationEarned: 4 }) ]));

		expect(value).not.toHaveProperty('factionF');
		expect(value).not.toHaveProperty('factionR');
	});

	describe('with a user', () => {
		const gameSystemId = SharedConstants.GameSystems.Pathfinder2e.id;

		const withCharacters = (others) => {
			const service = rules();
			service._serviceCharacters = { listing: vi.fn(async () => Response.success('c', { data: others })) };
			return service;
		};

		it('totals the achievement points across the user\'s characters, this one counted once', async () => {
			const user = { settings: { gameSystems: [] } };
			const service = withCharacters([ { id: 'c1', achievementPoints: 99 }, { id: 'c2', achievementPoints: 10 }, { id: 'c3' } ]);

			await calculate(character([ played(1, { achievementPointsEarned: 4 }) ]), user, service);

			expect(service._serviceCharacters.listing).toHaveBeenCalledWith(null, user, gameSystemId);
			expect(user.settings.gameSystems).toEqual([ expect.objectContaining({ id: gameSystemId, achievementPoints: 14 }) ]);
		});

		it('gives a user without game system settings some', async () => {
			const user = { settings: {} };

			await calculate(character([ played(1) ]), user, withCharacters([]));

			expect(user.settings.gameSystems).toEqual([ expect.objectContaining({ id: gameSystemId }) ]);
		});

		it('updates the game system settings the user has', async () => {
			const user = { settings: { gameSystems: [ { id: gameSystemId, achievementPoints: 1 } ] } };

			await calculate(character([ played(1, { achievementPointsEarned: 4 }) ]), user, withCharacters([]));

			expect(user.settings.gameSystems).toEqual([ { id: gameSystemId, achievementPoints: 4 } ]);
		});
	});
});

describe('calculateScenarioLevel', () => {
	it('is the level reached with the scenario', () => {
		const scenarios = [ played(1), played(2), played(3) ];
		const value = character(scenarios);

		expect(rules().calculateScenarioLevel('c', value, scenarios[1])).toBe(1);
		expect(rules().calculateScenarioLevel('c', value, scenarios[2])).toBe(2);
	});

	it('counts a scenario not yet saved', () => {
		const value = character([ played(1), played(2) ]);

		expect(rules().calculateScenarioLevel('c', value, played(3, { id: 'new' }))).toBe(2);
	});

	it('leaves out ignored scenarios played before it', () => {
		const value = character([ played(1), played(2, { scenarioStatus: SharedConstants.ScenarioStatus.IGNORE }) ]);

		expect(rules().calculateScenarioLevel('c', value, played(3, { id: 'new' }))).toBe(1);
	});

	it('is nothing without a character or a scenario', () => {
		expect(rules().calculateScenarioLevel('c', null, played(1))).toBeNull();
		expect(rules().calculateScenarioLevel('c', character([]), null)).toBeNull();
	});
});
