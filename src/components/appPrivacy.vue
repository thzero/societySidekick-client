<script>
import { useBasePrivacyComponent } from '@thzero/library_client_vue3/components/basePrivacy';

export function useAppPrivacyComponent(props, context, options) {
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
			privacyMarkup
		} = useBasePrivacyComponent(props, context, options);

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
		privacyMarkup
	};
};
</script>
