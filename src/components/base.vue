<script>
import { ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent as useLibraryBaseComponent } from '@thzero/library_client_vue3/components/base';

// skick's foundational component composable. Wraps the library base composable and
// adds skick-wide helpers (formatting + markup display). skick components call this
// from setup() instead of the old Options-API `extends base`.
export function useBaseComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse
	} = useLibraryBaseComponent(props, context, options);

	const hover = ref(null);

	const formatCurrency = (value) => {
		return value ? Number(value).toLocaleString() : '';
	};
	const formatNumber = (value) => {
		return value ? Number(value).toLocaleString() : '';
	};
	const handleDisplay = (value) => {
		LibraryClientUtility.$EventBus.emit('display-markup', value);
	};
	const handleDisplayHover = (value, delay) => {
		delay = delay ? delay : 1000;
		if (hover.value)
			clearTimeout(hover.value);
		hover.value = setTimeout(() => { LibraryClientUtility.$EventBus.emit('display-markup', value); }, delay);
	};
	const handleDisplayHoverClear = () => {
		if (hover.value)
			clearTimeout(hover.value);
	};

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		successResponse,
		hover,
		formatCurrency,
		formatNumber,
		handleDisplay,
		handleDisplayHover,
		handleDisplayHoverClear
	};
};
</script>
