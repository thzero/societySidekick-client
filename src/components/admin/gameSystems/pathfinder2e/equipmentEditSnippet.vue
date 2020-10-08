<template>
	<table width="100%">
		<tr>
			<td>
				<!-- eslint-disable vue/no-mutating-props -->
				<VNumberFieldWithValidation
					ref="level"
					v-model="value.level"
					vid="level"
					:label="$t('forms.equipment.level')"
				/>
				<!--eslint-enable-->
			</td>
			<td>
				<!-- eslint-disable vue/no-mutating-props -->
				<VNumberFieldWithValidation
					ref="bulk"
					v-model="value.bulk"
					vid="bulk"
					:label="$t('forms.equipment.bulk')"
				/>
				<!--eslint-enable-->
			</td>
		</tr>
	</table>
</template>

<script>
import baseEdit from '@/library_vue/components/baseEdit';
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';

export default {
	name: 'Pathfinder2eAdminEquipmentEditSnippet',
	components: {
		VNumberFieldWithValidation
	},
	extends: baseEdit,
	props: {
		// must be included in props
		value: {
			type: null,
			default: null
		}
	}
};
</script>

<style scoped>
</style>
