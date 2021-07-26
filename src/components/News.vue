<template>
	<v-container
		grid-list-sm
		pa-0
	>
		<v-layout
			wrap
		>
			<v-flex
				v-for="item in news"
				:key="item.id"
				xs12
				pl-1
				pr-1
			>
				<v-card
					outlined
				>
					<v-card-title>
						<span class="title text-capitalize">{{ item.title }}</span>
						<v-row
							align="center"
							justify="end"
							class="mr-1"
						>
							<span class="caption">{{ getDateHuman(item.timestamp) }}</span>
						</v-row>
					</v-card-title>
					<v-card-text class="body-1">
						<VMarkdown v-model="item.article" />
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import base from '@/library_vue/components/base';
import VMarkdown from '@/library_vue_vuetify/components/markup/VMarkdown';

export default {
	name: 'News',
	components: {
		VMarkdown
	},
	extends: base,
	computed: {
		news() {
			if (!GlobalUtility.$store.state.news.latest)
				return [];
			const newsS = LibraryUtility.sortByTimestamp(GlobalUtility.$store.state.news.latest.filter(l => l.sticky));
			let news = LibraryUtility.sortByTimestamp(GlobalUtility.$store.state.news.latest.filter(l => !l.sticky));
			return newsS.concat(news);
		}
	}
};
</script>

<style scoped>
</style>
