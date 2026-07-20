<template>
	<table width="100%"><tbody>
		<tr>
			<td>
				<!-- eslint-disable vue/no-mutating-props -->
				<VtNumberFieldWithValidation
					ref="levelRef"
					v-model="modelValue.level"
					vid="level"
					:label="$t('forms.equipment.level')"
				/>
				<!--eslint-enable-->
			</td>
			<td>
				<!-- eslint-disable vue/no-mutating-props -->
				<VtNumberFieldWithValidation
					ref="bulkRef"
					v-model="modelValue.bulk"
					vid="bulk"
					:label="$t('forms.equipment.bulk')"
				/>
				<!--eslint-enable-->
			</td>
		</tr>
	</tbody></table>
</template>

<script>
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';

export default {
	name: 'Pathfinder2eAdminEquipmentEditSnippet',
	components: {
		VtNumberFieldWithValidation
	},
	props: {
		// must be included in props
		modelValue: {
			type: null,
			default: null
		}
	}
};
</script>

<style scoped>
</style>
