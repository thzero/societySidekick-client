<template>
	<div>
		<v-row
			dense
			:pt-4="$vuetify.display.smAndDown && newsCount > 0"
			:pt-2="$vuetify.display.mdAndUp || newsCount === 0"
		>
			<v-col
				v-if="$vuetify.display.mdAndUp && newsCount > 0"
				col="12"
				md="4"
				class="pb-4"
			>
				<v-card
					class="mb-2"
					height="100%"
				>
					<v-card-item>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-item>
					<News />
					<!-- <v-overlay
						:model-value="!initializeCompleted"
						contained
						class="align-center justify-center"
					>
						<v-progress-circular
							:size="70"
							:width="7"
							color="purple"
							indeterminate
						></v-progress-circular>
					</v-overlay> -->
					<LoadingOverlay
						:signal="!initializeCompleted"
					/>
				</v-card>
			</v-col>
			<v-col
				col="12"
				:md="newsCount > 0 ? 8 : 12"
				:pl-2="$vuetify.display.mdAndUp"
			>
				<v-card
					class="mb-2"
				>
					<!-- <v-overlay
						:model-value="!initializeCompleted"
						contained
						class="align-center justify-center"
					>
						<v-progress-circular
							:size="70"
							:width="7"
							color="purple"
							indeterminate
						></v-progress-circular>
					</v-overlay> -->
					<LoadingOverlay
						:signal="!initializeCompleted"
					/>
				</v-card>
			</v-col>
			<v-col
				v-if="$vuetify.display.smAndDown && newsCount > 0"
				id="element"
				cols="12"
				class="pb-4"
			>
				<v-card
					class="mb-2"
				>
					<v-card-text>
						<v-badge :content="newsCount" inline>
 							<p class="text-h5">
								{{ $t('titles.newsLatest') }}&nbsp;&nbsp;
							</p>
						</v-badge>
					</v-card-text>
					<News />
					<LoadingOverlay
						:signal="!initializeCompleted"
					/>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { useHomeBaseComponent } from '@/components/homeBase';

import News from '@/components/News';
import LoadingOverlay from '@/components/LoadingOverlay';
import VtLoadingOverlay from '@thzero/library_client_vue3_vuetify3/components/VtLoadingOverlay';

export default {
	name: 'AppHome',
	components: {
		LoadingOverlay,
		News,
		VtLoadingOverlay
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
			serviceStore,
			features,
			initializeCompleted,
			clickUrl,
			contentDescription,
			contentLink,
			contentTitle,
			hasContent,
			hasContentInfo,
			info,
			isLoggedIn,
			newsCount,
			user,
			userDisplayName,
			webSiteInject
		} = useHomeBaseComponent(props, context);

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
			serviceStore,
			features,
			initializeCompleted,
			clickUrl,
			contentDescription,
			contentLink,
			contentTitle,
			hasContent,
			hasContentInfo,
			info,
			isLoggedIn,
			newsCount,
			user,
			userDisplayName,
			webSiteInject
		};
	}
};
</script>

<style scoped>
/* Container holding the image and the text */
.container {
  position: relative;
  text-align: center;
  color: white;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 35%;
  transform: rotate(-25deg);
  color: red;
  font-weight: bold;
  font-size: xx-large;
}
html, body {
height: 100%;
margin: 0;
}
.container {
display: flex;
flex-direction: column;
height: 100%;
}
.header, .footer {
height: 50px; /* Fixed height */
background-color: lightgray;
}
.content {
flex-grow: 1; /* Fills remaining space */
background-color: lightblue;
}
</style>
