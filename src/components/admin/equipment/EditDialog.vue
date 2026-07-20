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
						:label="$t('forms.equipment.gameSystem')"
					/>
				</td>
				<td>
					<VtNumberFieldWithValidation
						ref="costRef"
						v-model="innerValue.cost"
						vid="cost"
						:validation="validation"
						:label="$t('forms.equipment.cost')"
						step="1"
					/>
				</td>
			</tr>
		</tbody></table>

		<table width="100%"><tbody>
			<tr>
				<td class="pr-2">
					<VtSelectWithValidation
						ref="categoryRef"
						v-model="innerValue.category"
						vid="category"
						:validation="validation"
						:items="categories"
						:label="$t('forms.equipment.category')"
					/>
				</td>
				<td>
					<VtSelectWithValidation
						ref="categorySecondaryRef"
						v-model="innerValue.categorySecondary"
						vid="categorySecondary"
						:validation="validation"
						:items="secondaryCategories"
						:label="$t('forms.equipment.secondaryCategory')"
					/>
				</td>
				<td>
					<VtSelectWithValidation
						ref="categoryTertiaryRef"
						v-model="innerValue.categoryTertiary"
						vid="categoryTertiary"
						:validation="validation"
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
import { maxLength, maxValue, minLength, minValue, numeric, required } from '@vuelidate/validators';

import { useAdminFormDialogComponent } from '@/components/admin/VAdminFormDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdownEditor';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

import Pathfinder2eEquipmentSnippet from '@/components/admin/gameSystems/pathfinder2e/equipmentEditSnippet';
import Starfinder1eEquipmentSnippet from '@/components/admin/gameSystems/starfinder1e/equipmentEditSnippet';

export default {
	name: 'AdminEquipmentEditDialog',
	components: {
		VtFormDialog,
		VtMarkdownEditor,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation,
		Pathfinder2eEquipmentSnippet,
		Starfinder1eEquipmentSnippet
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
				return await dispatcher.adminEquipment.createAdminEquipment(correlationId, value);
			},
			async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
				delete value.timestamp;
				return await dispatcher.adminEquipment.updateAdminEquipment(correlationId, value);
			}
		});

		const categories = computed(() => {
			const lookups = base.initLookupsByGameSystemId(base.correlationId(), base.gameSystemId.value);
			return lookups ? lookups.equipmentCategories : [];
		});
		const secondaryCategories = computed(() => {
			const lookups = base.initLookupsByGameSystemId(base.correlationId(), base.gameSystemId.value);
			return lookups ? lookups.equipmentSecondaryCategories : [];
		});
		const tertiaryCategories = computed(() => {
			const lookups = base.initLookupsByGameSystemId(base.correlationId(), base.gameSystemId.value);
			return lookups ? lookups.equipmentTertiaryCategories : [];
		});

		return {
			...base,
			reset: base.resetDialog,
			validation: useVuelidate({ $scope: 'AdminEquipmentEditDialog' }),
			categories,
			secondaryCategories,
			tertiaryCategories
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
				cost: {
					minValue: minValue(0),
					maxValue: maxValue(999999999),
					numeric,
					$autoDirty: true
				},
				category: {
					$autoDirty: true
				},
				categorySecondary: {
					$autoDirty: true
				},
				categoryTertiary: {
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
