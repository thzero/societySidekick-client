<template>
	<span
		class="body-2"
		:style="'color: ' + calculate(value)"
	>
		{{ output }}
	</span>
</template>

<script>
export default {
	name: 'ColorizeValue',
	props: {
		displayValue: {
			type: [String],
			default: null
		},
		value: {
			type: [String, Number],
			default: null
		},
		serviceGameSystem: {
			type: Object,
			default: null
		}
	},
	computed: {
		output() {
			return this.displayValue ? this.displayValue : this.value;
		}
	},
	methods: {
		calculate(value) {
			const level = this.calculateValue(value);
			return this.calculateColors(level);
		},
		calculateColors(level) {
			if (level == 1)
				return 'green';
			if (level == 2)
				return 'orange';
			return 'red';
		},
		calculateValue(value) {
			return value;
		}
	}
};
</script>
