import BaseValidation from '@/library_vue_vuetify/boot/baseValidation';

class Validation extends BaseValidation {
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

export default Validation;
