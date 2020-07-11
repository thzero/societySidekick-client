import Vue from 'vue';

import Constants from '../constants';
import LibraryConstants from '@thzero/library/constants';

class Utility {
	static applyError(error, messageParams) {
		if (!error)
			return null;

		if (!error.code && !String.isNullOrEmpty(error.message)) {
			return {
				message: error.message,
				field: (error.field ? error.field : Constants.ErrorFields.Generic)
			};
		}

		let messageCode = error.code;
		if (error.type)
			messageCode = `${messageCode}.${error.type}`;
		if (error.prefix)
			messageCode = `${error.prefix}.${messageCode}`;
		messageParams = { ...messageParams, ...error.params };

		let param;
		for (const field in messageParams) {
			param = messageParams[field];
			if (param.il8n) {
				let suffix = param.suffix;
				if (String.isNullOrEmpty(suffix))
					suffix = Constants.ErrorCodes.SuffixParams;
				param.value = Vue.prototype.$trans.t(`${suffix}.${param.value}`);
			}
			messageParams[field] = param.value;
		}

		if (String.isNullOrEmpty(messageCode))
			messageCode = Constants.ErrorCodes.Default;

		return {
			message: Vue.prototype.$trans.t(`${Constants.ErrorCodes.Suffix}.${messageCode}`, messageParams),
			field: (error.field ? error.field : Constants.ErrorFields.Generic)
		};
	}

	static checkId(to, from, next) {
		return Utility.checkHasParams(to, from, next, 'id');
	}

	static checkHasParams(to, from, next, keys) {
		if (!to || !to.params) {
			Utility.invalid(next);
			return false;
		}

		if (!keys)
			return true;

		if (!Array.isArray(keys))
			keys = [ keys ];

		for (const key of keys) {
			if (!to.params[key] || (String.isNullOrEmpty(to.params[key])) || (to.params[key] === 'null') || (to.params[key] === 'undefined')) {
				Utility.invalid(next);
				return false;
			}
		}

		if (next)
			next();

		return true;
	}

	static fullscreen(vuetify) {
		return vuetify.breakpoint.xs;
	}

	static handleError(object, serverErrors, response) {
		if (!object || !serverErrors || !response)
			return;

		let errors = {};
		let error;
		for (const field in response.errors) {
			error = Utility.applyError(response.errors[field]);
			if (error.field === Constants.ErrorFields.Generic) {
				serverErrors.push(error.message);
				continue;
			}
			// eslint-disable-next-line
			if (!errors.hasOwnProperty(error.field))
				errors[error.field] = [];
			errors[error.field].push(error.message);
		}

		object.setErrors(errors);
		// object.validation().applyResult({
		//     errors: [ Vue.prototype.$trans.t(`${Constants.ErrorCodes.Suffix}.${messageCode}`, messageParams) ],
		//     valid: false,
		//     failedRules: {} // should be empty since this is a manual error.
		//   })
	}

	static invalid(next) {
		if (next) {
			next('/');
			return;
		}

		Vue.prototype.$navRouter.push('/');
	}

	static settings() {
		return Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_SETTINGS);
	}

	static updateArrayById(array, object) {
		if (!object)
			return;

		// let index = array.findIndex(function(element) {
		// 	return element && element.id == object.id
		// })
		// if (index === -1)
		// 	array.push(object)
		// else
		// 	array[index] = object

		// return array
		let result = [
			...array.filter(element => element.id !== object.id),
			object
		];
		return result;
	}
}

export default Utility;
