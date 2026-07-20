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

		<table width="100%"><tbody>
			<tr>
				<td class="pr-2">
					<VtSelectWithValidation
						ref="gameSystemRef"
						v-model="gameSystemId"
						vid="gameSystem"
						:validation="validation"
						:items="gameSystems"
						:label="$t('forms.classes.gameSystem')"
					/>
				</td>
				<td>
					<VtSelectWithValidation
						ref="typeRef"
						v-model="innerValue.type"
						vid="type"
						:validation="validation"
						:items="types"
						:label="$t('forms.classes.type')"
					/>
				</td>
			</tr>
		</tbody></table>

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
import { computed } from 'vue';

import useVuelidate from '@vuelidate/core';
import { maxLength, minLength, required } from '@vuelidate/validators';

import { useAdminFormDialogComponent } from '@/components/admin/VAdminFormDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdownEditor';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'AdminClassesEditDialog',
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
				return await dispatcher.adminClasses.createAdminClass(correlationId, value);
			},
			async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
				delete value.timestamp;
				return await dispatcher.adminClasses.updateAdminClass(correlationId, value);
			}
		});

		const types = computed(() => {
			const lookups = base.initLookupsByGameSystemId(base.correlationId(), base.gameSystemId.value);
			return lookups ? lookups.classTypes : [];
		});

		return {
			...base,
			reset: base.resetDialog,
			validation: useVuelidate({ $scope: 'AdminClassesEditDialog' }),
			types
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
				type: {
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
