<script>
import { computed } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useGameSystemBaseGameSystemSnippetComponent } from '@/components/gameSystems/baseGameSystemSnippet';

// Character snippet logic composable. The template lives in the per-game-system leaf.
export function useCharacterGameSystemSnippetComponent(props, context, options) {
	const base = useGameSystemBaseGameSystemSnippetComponent(props, context, options);

	const className = computed(() => {
		return (base.serviceGameSystem ? base.serviceGameSystem.classNamesAndLevels(base.correlationId(), props.value, LibraryClientUtility.$store) : '');
	});
	const statusColor = computed(() => {
		return 'color: ' + (props.value.status === 'dead' ? 'red' : 'green');
	});
	const statusName = computed(() => {
		return base.serviceGameSystem.characterLookupStatusName(base.correlationId(), props.value.status, base.lookups.value);
	});

	return {
		...base,
		className,
		statusColor,
		statusName
	};
};
</script>
