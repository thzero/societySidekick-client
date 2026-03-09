<template>
	<v-row dense>
		<v-col cols="0" md="3"></v-col>
		<v-col cols="12" md="6">
			<v-card>
				<v-card-text>
					<h1>{{ $t('titles.contact.name') }} {{ $t('titles.application') }}</h1>
				</v-card-text>
				<v-card-item>
					<VtFormControl
						ref="formContactRef"
						:validation="validation"
						button-clear-name="buttons.reset"
						button-ok-name="buttons.send"
						:pre-complete-ok="preCompleteOk"
						:reset-additional="resetAdditional"
						:dirty-callback="dirtyCheck"
					>
						<v-card>
							<v-card-text>
								<v-row dense>
									<v-col cols="12">
										<VtTextFieldWithValidation
											ref="nameRef"
											v-model="name"
											vid="name"
											:validation="validation"
											:label="$t('forms.name')"
										/>
									</v-col>
									<v-col cols="12">
										<VtTextFieldWithValidation
											ref="emailRef"
											v-model="email"
											vid="email"
											:validation="validation"
											:label="$t('forms.email')"
										/>
									</v-col>
									<v-col cols="12">
										<VtTextAreaWithValidation
											ref="messageRef"
											v-model="message"
											vid="message"
											:label="$t('forms.message')"
											:counter="300"
											:validation="validation"
											:readonly="false"
											:clearable="true"
											:rows="15"
										/>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</VtFormControl>
				</v-card-item>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { ref } from 'vue';

import LibraryCommonUtility from '@thzero/library_common/utility/index';

import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtTextAreaWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextAreaWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

import { useContactValidation } from '@/components/contactValidation';
import { useContactBaseComponent } from '@/components/contactBase.vue';

export default {
	name: 'Contacts',
	components: {
		VtFormControl,
		VtTextAreaWithValidation,
		VtTextFieldWithValidation
	},
	setup(props, context) {
		const formContactRef = ref(null);

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
			scope,
			validation
		} = useContactBaseComponent(props, context, {
			formRef: formContactRef,
			template: 'template_qw95kiu'
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
			scope,
			validation,
			formContactRef
		};
	},
	validations () {
		return Object.assign(LibraryCommonUtility.cloneDeep(useContactValidation), {
		});
	}
};
</script>

<style>
</style>
