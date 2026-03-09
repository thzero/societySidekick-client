<script>
import AppConstants from '@/constants';

import { useBaseAboutComponent } from '@thzero/library_client_vue3/components/baseAbout';

export function useAppAboutComponent(props, context, options) {
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
		emailsContributing,
		emailsContributingTitle,
		emailsInquiry,
		emailsInquiryTitle
	} = useBaseAboutComponent(props, context, {
		emails: {
			contributing: AppConstants.Site.emails.contributing,
			inquiry: AppConstants.Site.emails.inquiry
		}
	});

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
		emailsContributing,
		emailsContributingTitle,
		emailsInquiry,
		emailsInquiryTitle
	};
};
</script>
