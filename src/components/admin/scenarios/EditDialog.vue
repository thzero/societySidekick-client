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
			rules="required|min:3|max:50|"
			:label="$t('forms.name')"
			:counter="50"
		/>

		<table width="100%">
			<tr>
				<td class="pr-2">
					<VSelectWithValidation
						ref="gameSystem"
						v-model="gameSystemId"
						vid="gameSystem"
						:items="gameSystems"
						:label="$t('forms.scenarios.gameSystem')"
					/>
				</td>
				<td>
					<VSelectWithValidation
						ref="type"
						v-model="innerValue.type"
						vid="type"
						:items="types"
						:label="$t('forms.scenarios.type')"
					/>
				</td>
			</tr>
		</table>

		<table width="100%">
			<tr>
				<td class="pr-2">
					<VNumberFieldWithValidation
						ref="season"
						v-model="innerValue.season"
						rules="min_value:0|max_value:99|"
						vid="season"
						:label="$t('forms.scenarios.season')"
						step="1"
					/>
				</td>
				<td class="pr-2">
					<VTextFieldWithValidation
						ref="scenario"
						v-model="innerValue.scenario"
						vid="scenario"
						:label="$t('forms.scenarios.identifier')"
					/>
				</td>
				<td>
					<VCheckboxWithValidation
						ref="repeatable"
						v-model="innerValue.repeatable"
						vid="repeatable"
						:label="$t('forms.scenarios.repeatable')"
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
import Utility from '@thzero/library_common/utility';

import VAdminFormDialog from '@/components/admin/VAdminFormDialog';
import VCheckboxWithValidation from '@/library_vue/components/form/VCheckboxWithValidation';
import VMarkdownEditor from '@/library_vue/components/markup/VMarkdownEditor';
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'AdminScenariosEditDialog',
	components: {
		VAdminFormDialog,
		VCheckboxWithValidation,
		VMarkdownEditor,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VAdminFormDialog,
	computed: {
		types: {
			get() {
				const lookups = this.initLookupsByGameSystemId(this.gameSystemId);
				return lookups ? lookups.scenarioAdventures : [];
			},
			cache: false
		}
	},
	methods: {
		preCompleteI(value) {
			value.repeatable = value.repeatable ? value.repeatable : false;
		},
		async preCompleteSubmitCreate(dispatcher, value) {
			delete value.timestamp;
			delete value.updatedTimestamp;
			return await dispatcher.adminScenarios.createAdminScenario(value);
		},
		async preCompleteSubmitUpdate(dispatcher, value) {
			delete value.timestamp;
			value.season = value.season ? value.season : null;
			return await dispatcher.adminScenarios.updateAdminScenario(value);
		},
		resetDialogI(value) {
			value.updatedTimestamp = value.updatedTimestamp ? value.updatedTimestamp : Utility.getTimestamp();
		}
	}
};
</script>

<style scoped>
</style>
