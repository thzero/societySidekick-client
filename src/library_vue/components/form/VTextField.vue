<template>
	<v-text-field
		v-model="innerValue"
		:readonly="readonly"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script>
import baseControlEdit from '../baseControlEdit';

export default {
	name: 'TextField',
	extends: baseControlEdit,
	props: {
		// must be included in props
		value: {
			type: null,
			default: null
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		// Handles external model changes.
		value(newVal) {
			this.initValue(newVal);
		}
	},
	mounted() {
		this.initValue(this.value);
	}
};
</script>

<style scoped>
</style>
