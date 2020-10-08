<template>
	<VAdminFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		max-width="750px"
		@cancel="cancel"
		@ok="ok"
	>
		<VTextFieldWithValidation
			ref="name"
			v-model="innerValue.name"
			vid="name"
			rules="required|min:3|max:30|"
			:label="$t('forms.name')"
			:counter="30"
		/>

		<table width="100%">
			<tr>
				<td class="pr-2">
					<VSelectWithValidation
						ref="gameSystem"
						v-model="gameSystemId"
						vid="gameSystem"
						:items="gameSystems"
						:label="$t('forms.classes.gameSystem')"
					/>
				</td>
				<td>
					<VSelectWithValidation
						ref="type"
						v-model="innerValue.type"
						vid="type"
						:items="types"
						:label="$t('forms.classes.type')"
					/>
				</td>
			</tr>
		</table>

		<VMarkdownEditor
			:key="randomKey"
			ref="description"
			v-model="innerValue.description"
			vid="description"
			:options="editorOptions"
		/>
	</VAdminFormDialog>
</template>

<script>
import VAdminFormDialog from '@/components/admin/VAdminFormDialog';
import VMarkdownEditor from '@/library_vue/components/markup/VMarkdownEditor';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'AdminClassesEditDialog',
	components: {
		VAdminFormDialog,
		VMarkdownEditor,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VAdminFormDialog,
	computed: {
		types: {
			get() {
				const lookups = this.initLookupsByGameSystemId(this.correlationId(), this.gameSystemId);
				return lookups ? lookups.classTypes : [];
			},
			cache: false
		}
	},
	methods: {
		// eslint-disable-next-line
		async preCompleteI(correlationId, value) {
		},
		async preCompleteSubmitCreate(correlationId, dispatcher, value) {
			delete value.timestamp;
			delete value.updatedTimestamp;
			return await dispatcher.adminClasses.createAdminClass(correlationId, value);
		},
		async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
			delete value.timestamp;
			return await dispatcher.adminClasses.updateAdminClass(correlationId, value);
		},
		// eslint-disable-next-line
		resetDialogI(correlationId, value) {
		}
	}
};
</script>

<style scoped>
</style>
