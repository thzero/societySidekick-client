<template>
	<ValidationProvider
		:vid="vid"
		:name="$attrs.label"
		:rules="rules"
		:bail="rulesBail"
		:immediate="true"
	>
		<v-select
			v-model="innerValue"
			slot-scope="{ errors, valid }"
			:error-messages="errors"
			:success="valid"
			:items="innerItems"
			:label="$attrs.label"
			:flat="flat"
			:hide-details="hideDetails"
			:multiple="multiple"
			:solo-inverted="soloInverted"
			:item-text="text"
			item-value="id"
		/>
	</ValidationProvider>
</template>

<script>
import baseControlEdit from '../baseControlEdit';

export default {
	name: 'SelectWithValidation',
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
		flat: {
			type: Boolean,
			default: false
		},
		hideDetails: {
			type: Boolean,
			default: false
		},
		items: {
			type: [Object, Array],
			default: null
		},
		multiple: {
			type: Boolean,
			default: false
		},
		soloInverted: {
			type: Boolean,
			default: false
		},
		// must be included in props
		value: {
			type: null,
			default: null
		}
	},
	data: () => ({
		innerItems: []
	}),
	watch: {
		// Handles external model changes.
		items(newVal) {
			this.innerItems = newVal;
		},
		// Handles external model changes.
		value(newVal) {
			this.initValue(newVal);
		}
	},
	mounted() {
		if (this.items)
			this.innerItems = this.items;
		this.initValue(this.value);
	},
	methods: {
		text: (item) => item.displayName ? item.displayName : item.name,
		validation() {
			return this.$refs.prv;
		}
	}
};
</script>

<style scoped>
</style>
