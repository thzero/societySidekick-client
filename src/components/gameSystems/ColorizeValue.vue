<template>
	<span
		class="body-2"
		:style="'color: ' + calculate(value)"
	>
		{{ output }}
	</span>
</template>

<script>
import { computed } from 'vue';

import colorizeValueProps from '@/components/gameSystems/colorizeValueProps';

// Exported composable so the Status/Experience variants can override calculateValue.
export function useColorizeValue(props, context, options) {
	const calculateValue = (options && options.calculateValue) ? options.calculateValue : (value) => value;

	const calculateColors = (level) => {
		if (level == 1)
			return 'green';
		if (level == 2)
			return 'orange';
		return 'red';
	};
	const calculate = (value) => {
		return calculateColors(calculateValue(value));
	};

	const output = computed(() => {
		return props.displayValue ? props.displayValue : props.value;
	});

	return {
		calculate,
		calculateColors,
		calculateValue,
		output
	};
};

export default {
	name: 'ColorizeValue',
	props: {
		...colorizeValueProps
	},
	setup(props, context) {
		const { calculate, output } = useColorizeValue(props, context);
		return { calculate, output };
	}
};
</script>
