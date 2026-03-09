import { between, decimal, email, helpers, maxLength, minLength, required } from '@vuelidate/validators';

export const useContactValidation = {
	message: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(500),
		$autoDirty: true
	},
	name: {
		required,
		minLength: minLength(3),
		maxLength: maxLength(32),
		$autoDirty: true
	},
	email: {
		required,
		email,
		minLength: minLength(3),
		maxLength: maxLength(55),
		$autoDirty: true
	}
};
