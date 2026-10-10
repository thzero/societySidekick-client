import { describe, expect, it } from 'vitest';

import SharedConstants from '@/common/constants';
import Starfinder1eSharedConstants from '@/common/gameSystems/starfinder1e/constants';

import RulesService from '@/common/gameSystems/starfinder1e/service/rules';

const Adventures = Starfinder1eSharedConstants.ScenarioAdventures;

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
	scenario: { type: Adventures.SCENARIO },
	experiencePointsEarned: 1,
	currencyEarned: 100,
	...extra
});

// reputation as Starfinder1eCharacterData starts it; calculateCharacterInit
// resets fame but not reputation, which calculateCharacterAdditional reads
const character = (scenarios, extra = {}) => ({ id: 'c1', scenarios, inventory: [], reputation: [], ...extra });

const calculate = async (value) => {
	const response = await rules().calculateCharacter('c', value, null);
	expect(response.success).toBe(true);
	return value;
};

describe('levels', () => {
	it.each([
		[ 0, 1 ],
		[ 2, 1 ],
		[ 3, 2 ],
		[ 5.5, 2 ],
		[ 6, 3 ],
		[ 57, 20 ]
	])('%s experience points is level %s', (xp, level) => {
		expect(rules().calculateLevel('c', xp)).toBe(level);
	});

	it.each([
		[ 0, 3 ],
		[ 1, 2 ],
		[ 2, 1 ],
		[ 3, 3 ]
	])('%s experience points is %s from the next level', (xp, remaining) => {
		expect(rules().calculateExperienceToNextLevel('c', xp)).toBe(remaining);
	});

	it.each([
		[ Adventures.SCENARIO, true ],
		[ Adventures.QUEST, false ],
		[ Adventures.MODULE, false ]
	])('a %s is an adventure scenario: %s', (type, expected) => {
		expect(rules().isAdventureScenario('c', { scenario: { type } })).toBe(expected);
	});

	// starfinder1e/ScenarioDialog.vue's initResponseDetails calls it when the
	// dialog saves, but only the Pathfinder 2e rules have it, so saving a
	// Starfinder scenario throws a TypeError
	it.fails('can work out the reputation a scenario earns', () => {
		expect(rules().calculateScenarioReputationEarned).toBeTypeOf('function');
	});
});

describe('calculateCharacter', () => {
	it('adds up the experience points and the level', async () => {
		const value = await calculate(character([ played(1), played(2), played(3), played(4) ]));

		expect(value.experiencePoints).toBe(4);
		expect(value.level).toBe(2);
		expect(value.experiencePointsToNextLevel).toBe(2);
		expect(value.currencyTotal).toBe(400);
	});

	it('gives the starting scenario no level', async () => {
		const value = await calculate(character([ played(1, { scenario: { type: Adventures.INITIAL }, experiencePointsEarned: 0 }), played(2) ]));

		expect(value.scenarios.find((l) => l.id === 's1').level).toBeNull();
		expect(value.scenarios.find((l) => l.id === 's2').level).toBe(1);
	});

	it.each([ SharedConstants.ScenarioStatus.IGNORE, SharedConstants.ScenarioStatus.REPEATED ])('leaves out a scenario marked %s', async (scenarioStatus) => {
		const value = await calculate(character([ played(1), played(2, { scenarioStatus }) ]));

		expect(value.experiencePoints).toBe(1);
		expect(value.currencyTotal).toBe(100);
	});

	it('levels each class once per scenario taken in it', async () => {
		const value = await calculate(character([
			played(1, { classId: 'soldier' }),
			played(2, { classId: 'soldier' }),
			played(3, { classId: 'mystic' }),
			played(4)
		]));

		expect(value.classes).toEqual([ { id: 'soldier', level: 2 }, { id: 'mystic', level: 1 } ]);
	});

	it('adds up fame by faction, with a grand total last, and counts it as reputation', async () => {
		const value = await calculate(character([
			played(1, { fameFactionId: 'f1', fameEarned: 2 }),
			played(2, { fameFactionId: 'f2', fameEarned: 2 }),
			played(3, { fameFactionId: 'f1', fameEarned: 2, fameSpent: 1 })
		]));

		expect(value.fame).toEqual([
			{ id: 'f1', earned: 4, spent: 1, remaining: 3 },
			{ id: 'f2', earned: 2, spent: 0, remaining: 2 },
			{ earned: 6, spent: 1, remaining: 5 }
		]);
		expect(value.reputationEarned).toBe(6);
	});

	it('cleans up its working fields', async () => {
		const value = await calculate(character([ played(1, { classId: 'soldier', fameFactionId: 'f1', fameEarned: 2 }) ]));

		expect(value).not.toHaveProperty('class');
		expect(value).not.toHaveProperty('factionF');
	});
});

describe('calculateCharacterScenarioCanSelectClass', () => {
	it('lets the first scenario pick a class', () => {
		const scenarios = [ played(1) ];

		expect(rules().calculateCharacterScenarioCanSelectClass('c', character(scenarios), scenarios[0])).toBe(true);
	});

	it('does not let the starting scenario pick a class', () => {
		const scenarios = [ played(1, { scenario: { type: Adventures.INITIAL } }) ];

		expect(rules().calculateCharacterScenarioCanSelectClass('c', character(scenarios), scenarios[0])).toBe(false);
	});

	it('lets a scenario that gains a level pick a class', async () => {
		const value = await calculate(character([ played(1), played(2) ]));

		expect(rules().calculateCharacterScenarioCanSelectClass('c', value, played(3))).toBe(true);
	});

	it('does not let a scenario that gains no level pick a class', async () => {
		const value = await calculate(character([ played(1) ]));

		expect(rules().calculateCharacterScenarioCanSelectClass('c', value, played(2))).toBe(false);
	});

	it('is false without a character', () => {
		expect(rules().calculateCharacterScenarioCanSelectClass('c', null, played(1))).toBe(false);
	});
});
