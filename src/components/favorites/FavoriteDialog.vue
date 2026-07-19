<template>
	<VtFormDialog
		:label="$t('favorites.name')"
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
					:counter="30"
				/>
				<VtCheckboxWithValidation
					ref="favoriteRef"
					v-model="favorite"
					vid="favorite"
					:validation="validation"
					:label="$t('favorites.name')"
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
//  3. vee-validate string rule "required|min:3|max:30" ported to vuelidate below.
export default {
	name: 'FavoriteDialog',
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
		const favorite = ref(null);
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
			return AppUtility.settings().updateSettingsUserFavorite(correlationIdI, LibraryClientUtility.$store, serviceStore.user, id.value, favorite.value);
		};
		const reset = async (correlationIdI, value) => {
			id.value = value ? value.id : LibraryCommonUtility.generateId();
			favorite.value = value ? value.favorite : null;
			name.value = value ? value.name : null;
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
			favorite,
			name,
			cancel,
			close,
			ok,
			preCompleteResponseOk,
			reset,
			validation: useVuelidate({ $scope: 'FavoriteDialog' })
		};
	},
	validations() {
		return {
			name: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(30),
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
