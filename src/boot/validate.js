import BaseValidationBoot from '@thzero/library_client_vue3/boot/baseValidation';

class ValidationBoot extends BaseValidationBoot {
	_initialize(extend) {
		super._initialize(extend);

		extend('gearSetSave', {
			params: ['target'],
			validate(value, { target }) {
				return !(!value && !target);
			},
			message: 'Gear set save issue'
		});
	}
}

export default ValidationBoot;
