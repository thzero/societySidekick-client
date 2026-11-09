import { describe, expect, it } from 'vitest';

import { ref } from 'vue';

import { useInvalidStep } from '@/components/gameSystems/invalidStep';

// Shaped like a vuelidate instance: the step headers of the scenario dialogs
// read 'scenarioName' and 'innerValue.fameFactionId' from it.
const validation = (fameFactionInvalid) => ref({
	scenarioName: { $invalid: false },
	innerValue: {
		currencyEarned: { $invalid: false },
		fameFactionId: { $invalid: fameFactionInvalid }
	}
});

describe('useInvalidStep', () => {
	it('flags a step whose nested rule is invalid', () => {
		const invalidStep = useInvalidStep(validation(true));
		expect(invalidStep('innerValue.fameFactionId')).toBe(true);
	});

	it('does not flag a step whose rules are all valid', () => {
		const invalidStep = useInvalidStep(validation(false));
		expect(invalidStep('innerValue.fameFactionId')).toBe(false);
		expect(invalidStep('scenarioName', 'innerValue.currencyEarned')).toBe(false);
	});

	it('flags a step when any one of its rules is invalid', () => {
		const invalidStep = useInvalidStep(validation(true));
		expect(invalidStep('scenarioName', 'innerValue.fameFactionId')).toBe(true);
	});

	it('does not flag a path that is not in the instance', () => {
		const invalidStep = useInvalidStep(validation(true));
		expect(invalidStep('innerValue.missing')).toBe(false);
		expect(invalidStep('missing.fameFactionId')).toBe(false);
	});

	it('follows the instance as it changes', () => {
		const instance = validation(false);
		const invalidStep = useInvalidStep(instance);
		expect(invalidStep('innerValue.fameFactionId')).toBe(false);
		instance.value = validation(true).value;
		expect(invalidStep('innerValue.fameFactionId')).toBe(true);
	});
});
