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
			ref="nameRef"
			v-model="innerValue.name"
			vid="name"
			:validation="validation"
			:label="$t('forms.name')"
			:counter="30"
		/>

		<VtSelectWithValidation
			ref="gameSystemRef"
			v-model="gameSystemId"
			vid="gameSystem"
			:validation="validation"
			:items="gameSystems"
			:label="$t('forms.factions.gameSystem')"
		/>

		<VtMarkdownEditor
			:key="randomKey"
			ref="descriptionRef"
			v-model="innerValue.description"
			vid="description"
			:validation="validation"
			:options="editorOptions"
		/>
	</VtFormDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';

import { useAdminFormDialogComponent } from '@/components/admin/VAdminFormDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdownEditor';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'AdminFactionsEditDialog',
	components: {
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
				return await dispatcher.adminFactions.createAdminFaction(correlationId, value);
			},
			async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
				delete value.timestamp;
				return await dispatcher.adminFactions.updateAdminFaction(correlationId, value);
			}
		});

		return {
			...base,
			reset: base.resetDialog,
			validation: useVuelidate({ $scope: 'AdminFactionsEditDialog' })
		};
	},
	validations() {
		return {
			innerValue: {
				name: {
					required,
					minLength: minLength(3),
					maxLength: maxLength(30),
					$autoDirty: true
				},
				description: {
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
