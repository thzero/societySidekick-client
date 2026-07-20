<template>
	<span
		class="body-2"
		:style="'color: ' + calculate(value)"
	>
		{{ output }}
	</span>
</template>

<script>
import SharedConstants from '@/common/constants';

import { useColorizeValue } from '@/components/gameSystems/ColorizeValue';

import colorizeValueProps from '@/components/gameSystems/colorizeValueProps';

export default {
	name: 'StatusColorizeValue',
	props: {
		...colorizeValueProps
	},
	setup(props, context) {
		const calculateValue = (value) => {
			return value === SharedConstants.CharactersStatus.DEAD ? 3 : 1;
		};

		const { calculate, output } = useColorizeValue(props, context, { calculateValue });
		return { calculate, output };
	}
};
</script>
