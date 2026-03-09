<script>
import { computed, ref, watch } from 'vue';
import useVuelidate from '@vuelidate/core';

import AppConstants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseSettingsComponent } from '@thzero/library_client_vue3/components/baseSettings';

export function useAppSettingsComponent(props, context, formRef) {
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
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCallback,
		leaveCheck,
		cancel,
		close,
		fab,
		hasPicture,
		name,
		ok,
		open,
		picture,
		preComplete,
		preCompleteI,
		requestReset,
		serviceStore,
		serviceUsers,
		user
	} = useBaseSettingsComponent(props, context, {
		formRef: formRef
	});

	const gamerTag = ref('');

	const measurementUnitsSelect = computed(() => {
		return [AppConstants.MeasurementUnits.english.id, AppConstants.MeasurementUnits.metrics.id].map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + item + '.title') }; });
	});

	const keyword = 'Default'.toLowerCase(); // otherwise gives a '_sfc_main is not defined' error as Vite is looking for lower case version of the keyword

	const measurementUnitTrans = (object, key, subKey) => {
		return Object.getOwnPropertyNames(object).filter(l => l !== keyword).map((item) => { return { id: item, name: LibraryClientUtility.$trans.t('measurementUnits.' + key + '.' + subKey + '.' + item + 'Abbr') }; });
	};
	const preCompleteOk = async (correlationId) => {
		try {
			const settings = serviceStore.getters.user.getUserSettings();
			if (!settings.measurementUnits)
				settings.measurementUnits = {};

			settings.gamerTag = gamerTag.value;

			return await serviceStore.dispatcher.user.setUserSettings(correlationId, settings);
		}
		catch (err) {
			logger.exception('AppSettings', 'preCompleteOk', err, correlationId);
			return error('AppSettings', 'preCompleteOk', null, err, null, null, correlationId);
		}
	};
	// eslint-disable-next-line
	const resetAdditional = (correlationId, previous) => {
		const settings = serviceStore.getters.user.getUserSettings();
		if (!settings.measurementUnits)
			settings.measurementUnits = {};

		gamerTag.value = !String.isNullOrEmpty(settings.gamerTag) ? settings.gamerTag : '';
	};
	const resetIdCheck = (id, values) => {
		const temp = values.find(l => l.id === id);
		return !String.isNullOrEmpty(temp) ? temp.id : null;
	};
	// watch(() => user.value,
	// 	(value, newValue) => {
	// 		if (value !== newValue)
	// 			resetAdditional(correlationId);
	// 	}
	// );

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
		isSaving,
		serverErrors,
		setErrors,
		beforeUnload,
		dirty,
		dirtyCallback,
		leaveCheck,
		cancel,
		close,
		fab,
		hasPicture,
		name,
		ok,
		open,
		picture,
		preComplete,
		preCompleteI,
		requestReset,
		serviceStore,
		serviceUsers,
		user,
		gamerTag,
		preCompleteOk,
		resetAdditional,
		resetIdCheck,
		scope: 'AppSettings',
		validation: useVuelidate({ $scope: 'AppSettings' })
	};
};
</script>
