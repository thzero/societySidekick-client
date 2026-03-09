<template>
	<v-container>
		<v-row dense>
			<v-col
				v-for="item in news"
				:key="item.id"
				cols="12"
				class="pl-1 pr-1"
			>
				<v-card
					outlined
				>
					<v-card-item>
						<v-card-title>
							<span class="title text-capitalize">{{ item.title }}</span>
						</v-card-title>
						<v-card-subtitle>
							<v-row
								dense
								align="center"
								justify="end"
								class="mr-1"
							>
								<span class="caption">{{ getDateTimeHuman(item.timestamp) }}</span>
							</v-row>
						</v-card-subtitle>
					</v-card-item>
					<v-card-text class="body-1">
						<VtMarkdown v-model="item.article" />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { computed } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

export default {
	name: 'AppNews',
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
			success
		} = useBaseComponent(props, context);

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		const getDateTimeHuman = computed(() => {
			return LibraryMomentUtility.getDateTimeHuman(date);
		});
		const news = computed(() => {
			if (!serviceStore.news.latest)
				return [];
			const newsS = LibraryCommonUtility.sortByTimestamp(serviceStore.news.latest.filter(l => l.sticky));
			const news = LibraryCommonUtility.sortByTimestamp(serviceStore.news.latest.filter(l => !l.sticky));
			return newsS.concat(news);
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
			getDateTimeHuman,
			news
		};
	}
};
</script>

<style scoped>
</style>
