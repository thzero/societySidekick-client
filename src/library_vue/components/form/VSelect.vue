<template>
	<v-select
		v-model="innerValue"
		:items="innerItems"
		:label="$attrs.label"
		:flat="flat"
		:hide-details="hideDetails"
		:solo-inverted="soloInverted"
		:item-text="text"
		item-value="id"
	/>
</template>

<script>
import baseControlEdit from '../baseControlEdit';

export default {
	name: 'Select',
	extends: baseControlEdit,
	props: {
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
		text: (item) => item.displayName ? item.displayName : item.name
	}
};
</script>

<style scoped>
</style>
