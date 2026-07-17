<template>
	<span
		class="body-2"
		:style="'color: ' + calculate(value)"
	>
		{{ output }}
	</span>
</template>

<script>
import { useColorizeValue } from '@/components/gameSystems/ColorizeValue';

import colorizeValueProps from '@/components/gameSystems/colorizeValueProps';

export default {
	name: 'ExperienceColorizeValue',
	props: {
		...colorizeValueProps
	},
	setup(props, context) {
		// Original used the default calculateValue (no serviceGameSystem-based override).
		const { calculate, output } = useColorizeValue(props, context);
		return { calculate, output };
	}
};
</script>
