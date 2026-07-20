<template>
	<div class="about">
		<h1>This is an about page</h1>
	</div>
</template>

<script>
import { useBaseAboutComponent } from '@thzero/library_client_vue3/components/baseAbout';

export default {
	name: 'About',
	setup(props, context) {
		// TODO(migration): baseAbout requires options.emails.{contributing,inquiry}. skick has no
		// Site/emails constant (see src/constants.js), so empty placeholders are passed to keep the
		// composable from throwing. Populate these once an email config is added (the current
		// template renders no email bindings, so nothing is displayed yet).
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
			emailsContributing,
			emailsContributingTitle,
			emailsInquiry,
			emailsInquiryTitle
		} = useBaseAboutComponent(props, context, {
			emails: {
				contributing: '',
				inquiry: ''
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
			successResponse,
			emailsContributing,
			emailsContributingTitle,
			emailsInquiry,
			emailsInquiryTitle
		};
	}
};
</script>

<style scoped>
</style>
