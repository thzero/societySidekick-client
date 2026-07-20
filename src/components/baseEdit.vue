<script>
import { useBaseEditComponent as useLibraryBaseEditComponent } from '@thzero/library_client_vue3/components/baseEdit';

// skick's edit-component composable: the library baseEdit composable plus skick's
// number-formatting helpers. skick edit components call this from setup().
export function useBaseEditComponent(props, context, options) {
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
		successResponse,
		isSaving,
		serverErrors,
		setErrors
	} = useLibraryBaseEditComponent(props, context, options);

	const formatCurrency = (value) => {
		return value ? Number(value).toLocaleString() : '';
	};
	const formatNumber = (value) => {
		return value ? Number(value).toLocaleString() : '';
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
		isSaving,
		serverErrors,
		setErrors,
		formatCurrency,
		formatNumber
	};
};
</script>
