<template>
	<VtFormDialog
		:label="label"
		:signal="signal"
		:validation="validation"
		:pre-complete-ok="preComplete"
		max-width="1200px"
		width="1200px"
		@close="cancel"
		@ok="ok"
	>
		<VtTextFieldWithValidation
			ref="titleRef"
			v-model="innerValue.title"
			vid="title"
			:validation="validation"
			:label="$t('forms.title')"
			:counter="30"
		/>

		<VtSelectWithValidation
			ref="gameSystemRef"
			v-model="gameSystemId"
			vid="gameSystem"
			:validation="validation"
			:items="gameSystems"
			:label="$t('forms.news.gameSystem')"
		/>

		<VtMarkdownEditor
			:key="randomKey"
			ref="articleRef"
			v-model="innerValue.article"
			vid="article"
			:validation="validation"
			:options="editorOptions"
		/>

		<VtCheckboxWithValidation
			ref="stickyRef"
			v-model="innerValue.sticky"
			vid="sticky"
			:validation="validation"
			:label="$t('forms.news.sticky')"
		/>

		<VtCheckboxWithValidation
			ref="requiresAuthRef"
			v-model="innerValue.requiresAuth"
			vid="requiresAuth"
			:validation="validation"
			:label="$t('forms.news.requiresAuth')"
		/>

		<VtDateTimePickerFieldWithValidationTemp
			ref="timestampRef"
			v-model="innerValue.timestamp"
			vid="timestamp"
			:validation="validation"
			:output-type="outputType"
			:date-format="dateFormat"
			:time-format="timeFormat"
			:label="$t('forms.news.publishDate')"
		/>
	</VtFormDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';

import { useAdminFormDialogComponent } from '@/components/admin/VAdminFormDialog';

import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtDateTimePickerFieldWithValidationTemp from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldWithValidationTemp';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdownEditor';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'AdminNewsEditDialog',
	components: {
		VtCheckboxWithValidation,
		VtDateTimePickerFieldWithValidationTemp,
		VtFormDialog,
		VtMarkdownEditor,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const base = useAdminFormDialogComponent(props, context, {
			async preCompleteSubmitCreate(correlationId, dispatcher, value) {
				delete value.timestamp;
				delete value.updatedTimestamp;
				return await dispatcher.adminNews.createAdminNews(correlationId, value);
			},
			async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
				return await dispatcher.adminNews.updateAdminNews(correlationId, value);
			}
		});

		return {
			...base,
			reset: base.resetDialog,
			validation: useVuelidate({ $scope: 'AdminNewsEditDialog' })
		};
	},
	validations() {
		return {
			innerValue: {
				title: {
					required,
					minLength: minLength(3),
					maxLength: maxLength(30),
					$autoDirty: true
				},
				article: {
					$autoDirty: true
				},
				sticky: {
					$autoDirty: true
				},
				requiresAuth: {
					$autoDirty: true
				},
				timestamp: {
					required,
					$autoDirty: true
				}
			},
			gameSystemId: {
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
