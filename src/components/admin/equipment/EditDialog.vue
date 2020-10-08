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
						:label="$t('forms.equipment.gameSystem')"
					/>
				</td>
				<td>
					<VNumberFieldWithValidation
						ref="cost"
						v-model="innerValue.cost"
						rules="min_value:0|max_value:999999999|"
						vid="cost"
						:label="$t('forms.equipment.cost')"
						step="1"
					/>
				</td>
			</tr>
		</table>

		<table width="100%">
			<tr>
				<td class="pr-2">
					<VSelectWithValidation
						ref="category"
						v-model="innerValue.category"
						vid="category"
						:items="categories"
						:label="$t('forms.equipment.category')"
					/>
				</td>
				<td>
					<VSelectWithValidation
						ref="categorySecondary"
						v-model="innerValue.categorySecondary"
						vid="categorySecondary"
						:items="secondaryCategories"
						:label="$t('forms.equipment.secondaryCategory')"
					/>
				</td>
				<td>
					<VSelectWithValidation
						ref="categoryTertiary"
						v-model="innerValue.categoryTertiary"
						vid="categoryTertiary"
						:items="tertiaryCategories"
						:label="$t('forms.equipment.tertiaryCategory')"
					/>
				</td>
			</tr>
			<tr>
				<td>
					<!-- // GameSystems Update -->
					<Pathfinder2eEquipmentSnippet
						v-if="isGameSystemPathfinder2e"
						v-model="innerValue"
					/>
					<Starfinder1eEquipmentSnippet
						v-if="isGameSystemStarfinder1e"
						v-model="innerValue"
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
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

import Pathfinder2eEquipmentSnippet from '@/components/admin/gameSystems/pathfinder2e/equipmentEditSnippet';
import Starfinder1eEquipmentSnippet from '@/components/admin/gameSystems/starfinder1e/equipmentEditSnippet';

export default {
	name: 'AdminEquipmentEditDialog',
	components: {
		VAdminFormDialog,
		VMarkdownEditor,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation,
		Pathfinder2eEquipmentSnippet,
		Starfinder1eEquipmentSnippet
	},
	extends: VAdminFormDialog,
	computed: {
		categories: {
			get() {
				const lookups = this.initLookupsByGameSystemId(this.correlationId(), this.gameSystemId);
				return lookups ? lookups.equipmentCategories : [];
			},
			cache: false
		},
		secondaryCategories: {
			get() {
				const lookups = this.initLookupsByGameSystemId(this.correlationId(), this.gameSystemId);
				return lookups ? lookups.equipmentSecondaryCategories : [];
			},
			cache: false
		},
		tertiaryCategories: {
			get() {
				const lookups = this.initLookupsByGameSystemId(this.correlationId(), this.gameSystemId);
				return lookups ? lookups.equipmentTertiaryCategories : [];
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
			return await dispatcher.adminEquipment.createAdminEquipment(correlationId, value);
		},
		async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
			delete value.timestamp;
			return await dispatcher.adminEquipment.updateAdminEquipment(correlationId, value);
		},
		// eslint-disable-next-line
		resetDialogI(correlationId, value) {
		}
	}
};
</script>

<style scoped>
</style>
