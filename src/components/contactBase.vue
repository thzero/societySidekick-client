<script>
import { onMounted, ref } from 'vue';
import useVuelidate from '@vuelidate/core';

import emailjs from '@emailjs/browser';

import AppUtility from '@/utility/app';

import { useBasePageEditComponent } from '@thzero/library_client_vue3/components/basePageEdit';

export function useContactBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCheck,
		leaveCheck
	} = useBasePageEditComponent(props, context, options);
	
	const name = ref('');
	const email = ref(null);
	const message = ref(null);
	
	const requestReset = ref(0);

	const cancel = async () => {
		await reset(correlationId(), true);
	};
	const close = async () => {
	};
	const ok = async () => {
		return true;
	};
	const open = async () => {
	};
	const preCompleteOk = async (correlationId) => {
		try {
			if (!options || !options.template)
				throw Error('Invalid template.');

			const params = {
				from_name: name.value,
				from_email: email.value,
    			message: message.value
			};
			emailjs.send('service_0co4jpe', options.template, params, '0I0Jcv00MB270U2Dw')
				.then((result) => {
					console.log('SUCCESS!', result.text);
				}, (error) => {
					console.log('FAILED...', error.text);
				});
			return success(correlationId);
		}
		catch (err) {
			logger.exception('AppSettings', 'preCompleteOk', err, correlationId);
			return error('AppSettings', 'preCompleteOk', null, err, null, null, correlationId);
		}
	};
	// eslint-disable-next-line
	const resetAdditional = (correlationId, previous) => {
		email.value = null;
		message.value = null;
		name.value = null;
	};

	onMounted(async () => {
		AppUtility.usageMetricsMeasurementTag(correlationId(), options && options.measurementId ? options.measurementId : 'contact');

		if (options && options.formRef && options.formRef.value)
			await options.formRef.value.reset(correlationId, false);
	});
	
	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse,
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCheck,
		leaveCheck,
		name,
		email,
		message,
		requestReset,
		cancel,
		close,
		ok,
		open,
		preCompleteOk,
		resetAdditional,
		scope: 'Contacts',
		validation: useVuelidate({ $scope: 'Contacts' })
	};
};
</script>
