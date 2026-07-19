<template>
	<VtFormDialog
		:label="$t('locations.name')"
		:signal="signal"
		:validation="validation"
		:pre-complete-ok="preCompleteResponseOk"
		@close="cancel"
		@ok="ok"
	>
		<v-card
			variant="outlined"
			rounded="0"
		>
			<v-card-text>
				<VtTextFieldWithValidation
					ref="nameRef"
					v-model="name"
					vid="name"
					:validation="validation"
					:label="$t('forms.name')"
					:counter="50"
				/>
				<VtTextFieldWithValidation
					ref="locationRef"
					v-model="location"
					vid="location"
					:validation="validation"
					:label="$t('forms.locations.name')"
					:counter="50"
				/>
				<VtCheckboxWithValidation
					ref="onlineRef"
					v-model="online"
					vid="online"
					:validation="validation"
					:label="$t('forms.locations.online')"
				/>
			</v-card-text>
		</v-card>
	</VtFormDialog>
</template>

<script>
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import AppUtility from '@/utility/app';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

// TODO(migration): old dialog did `extends VFormDialog`; re-shaped to WRAP <VtFormDialog> and
// delegate via events (matches ShareDialog.vue). Human review:
//  1. cancel/close/signal wiring — if reopen-after-cancel misbehaves, emit('cancel') from close().
//  2. user source: uses serviceStore.user in place of GlobalUtility.$store.state.user.user.
//  3. vee-validate string rules "required|min:3|max:50" ported to vuelidate below.
export default {
	name: 'LocationDialog',
	components: {
		VtCheckboxWithValidation,
		VtFormDialog,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
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
			successResponse
		} = useBaseComponent(props, context);

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		const id = ref(null);
		const location = ref(null);
		const online = ref(false);
		const name = ref(null);

		const cancel = async () => {
			context.emit('cancel');
		};
		const close = async () => {
		};
		const ok = async () => {
			context.emit('ok');
			return true;
		};
		const preCompleteResponseOk = async (correlationIdI) => {
			const model = { name: name.value, location: location.value, online: online.value };
			return AppUtility.settings().updateSettingsUserLocation(correlationIdI, LibraryClientUtility.$store, serviceStore.user, id.value, model, (settings, newVal) => {
				settings.location = newVal.location;
				settings.name = newVal.name;
				settings.online = newVal.online;
			});
		};
		const reset = async (correlationIdI, value) => {
			id.value = value ? value.id : LibraryCommonUtility.generateId();
			location.value = value ? value.location : null;
			name.value = value ? value.name : null;
			online.value = value ? value.online : false;
		};

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
			serviceStore,
			id,
			location,
			online,
			name,
			cancel,
			close,
			ok,
			preCompleteResponseOk,
			reset,
			validation: useVuelidate({ $scope: 'LocationDialog' })
		};
	},
	validations() {
		return {
			name: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(50),
				$autoDirty: true
			},
			location: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(50),
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
