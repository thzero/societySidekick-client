<template>
	<v-row dense>
		<v-col cols="12" md="2" />
		<v-col cols="12" md="8">
			<v-toolbar
				density="compact"
			>
				<v-toolbar-title class="text-center text-h5 text-contrast">
					<span>{{ $t('titles.privacy') }}</span>
				</v-toolbar-title>
			</v-toolbar>
		</v-col>
	</v-row>
	<v-row dense>
		<v-col cols="12" md="2" />
		<v-col cols="12" md="8">
			<v-card>
				<v-card-text>
<div class="mt-4">
	<p>
<VtMarkdown v-model="privacyMarkup" :use-github=false />
	</p>
</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useBasePrivacyComponent } from '@thzero/library_client_vue3/components/basePrivacy';

import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

export default {
	name: 'Support',
	components: {
		VtMarkdown
	},
	setup(props, context) {
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
		} = useBasePrivacyComponent(props, context);

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
	}
};
</script>

<style scoped>
</style>
