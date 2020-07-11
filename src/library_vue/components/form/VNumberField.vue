<template>
	<v-text-field
		v-model="innerValue"
		type="number"
		:class="displayClass"
		:readonly="readonly"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script>
import baseControlEdit from '../baseControlEdit';

export default {
	name: 'NumberField',
	extends: baseControlEdit,
	props: {
		// must be included in props
		value: {
			type: null,
			default: null
		},
		negativeColor: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		displayClass() {
			return this.negativeColor ? (this.value < 0 ? 'text-negative' : null) : null;
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

<style>
	.text-negative input{
		color: red !important;
	}
</style>
