import BaseValidationBoot from '@thzero/library_client_vue3/boot/baseValidation';

class ValidationBoot extends BaseValidationBoot {
	_initialize(extend) {
		super._initialize(extend);

		// NOTE (migration): the Vue2 build registered a global vee-validate rule here:
		//   extend('gearSetSave', { params: ['target'], validate(value, { target }) { return !(!value && !target); }, message: 'Gear set save issue' });
		// The Vue3 stack uses vuelidate (no global `extend`). Re-implement 'gearSetSave' as a
		// vuelidate validator in the gear-set save dialog when that component is migrated (Phase 4).
	}
}

export default ValidationBoot;
