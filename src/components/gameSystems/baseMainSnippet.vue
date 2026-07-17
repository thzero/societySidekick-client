<script>
import { useBaseEditComponent } from '@/components/baseEdit';

// Base gameSystem "main" snippet composable (edit-flavored). The leaf resolves its
// game-system service and passes it via options.serviceGameSystem.
export function useGameSystemBaseMainSnippetComponent(props, context, options) {
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
		setErrors,
		formatCurrency,
		formatNumber
	} = useBaseEditComponent(props, context, options);

	const serviceGameSystem = (options && options.serviceGameSystem) ? options.serviceGameSystem : null;

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
		formatNumber,
		serviceGameSystem
	};
};
</script>
