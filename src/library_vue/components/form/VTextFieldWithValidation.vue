<template>
	<ValidationProvider
		ref="prv"
		:vid="vid"
		:name="$attrs.label"
		:rules="rules"
		:bail="rulesBail"
		:immediate="true"
	>
		<v-text-field
			v-model="innerValue"
			slot-scope="{ errors, valid }"
			:error-messages="errors"
			:readonly="readonly"
			:success="valid"
			v-bind="$attrs"
			v-on="$listeners"
		/>
	</ValidationProvider>
</template>

<script>
import baseControlEdit from '../baseControlEdit';

export default {
	name: 'TextFieldWithValidation',
	extends: baseControlEdit,
	props: {
		rules: {
			type: [Object, String],
			default: ''
		},
		rulesBail: {
			type: Boolean,
			default: true
		},
		rulesImmediate: {
			type: Boolean,
			default: false
		},
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
	},
	methods: {
		validation() {
			return this.$refs.prv;
		}
	}
};
</script>

<style scoped>
</style>
