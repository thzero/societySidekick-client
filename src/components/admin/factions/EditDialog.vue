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

		<VSelectWithValidation
			ref="gameSystem"
			v-model="gameSystemId"
			vid="gameSystem"
			:items="gameSystems"
			:label="$t('forms.factions.gameSystem')"
		/>

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
	name: 'AdminFactionsEditDialog',
	components: {
		VAdminFormDialog,
		VMarkdownEditor,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VAdminFormDialog,
	methods: {
		// eslint-disable-next-line
		preCompleteI(value) {
		},
		async preCompleteSubmitCreate(dispatcher, value) {
			delete value.timestamp;
			delete value.updatedTimestamp;
			return await dispatcher.adminFactions.createAdminFaction(value);
		},
		async preCompleteSubmitUpdate(dispatcher, value) {
			delete value.timestamp;
			return await dispatcher.adminFactions.updateAdminFaction(value);
		},
		// eslint-disable-next-line
		resetDialogI(value) {
		}
	}
};
</script>

<style scoped>
</style>
