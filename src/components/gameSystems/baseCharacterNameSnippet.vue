<script>
import { computed } from 'vue';

import GameSystemsUtility from '@/utility/gameSystems';

import { useBaseComponent } from '@/components/base';

// Base character-name snippet composable. The leaf provides gameSystemId() and
// secondaryFormat(number) via options (replacing the old abstract method overrides).
export function useGameSystemBaseCharacterNameSnippetComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const gameSystemId = (options && options.gameSystemId) ? options.gameSystemId : () => { return base.notImplementedError(); };
	const secondaryFormat = (options && options.secondaryFormat) ? options.secondaryFormat : (number) => number;

	const secondary = computed(() => {
		let userNumber = GameSystemsUtility.gameSystemNumber(base.correlationId(), props.user, gameSystemId());
		userNumber = '#' + (userNumber ? userNumber : '******');
		const number = (props.value.number ? props.value.number : '*') + '';
		if (props.includeCharacterNumber)
			return `${props.prefix}${userNumber}-${secondaryFormat(number)}${props.suffix}`;
		return `${props.prefix}#${secondaryFormat(number)}${props.suffix}`;
	});

	return {
		...base,
		secondary
	};
};
</script>
