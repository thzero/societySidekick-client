<template>
	<v-container class="pa-0">
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="news"
					:sort-by="[ { key: 'timestamp', order: 'asc' } ]"
					class="elevation-1"
				>
					<template #top>
						<v-toolbar
							flat
							color="white"
						>
							<v-toolbar-title>{{ $t('titles.news') }}</v-toolbar-title>
							<v-divider
								class="mx-4"
								inset
								vertical
							/>
							<v-spacer />
							<v-btn
								color="primary"
								class="mb-2"
								@click="dialogEditOpen(null, true)"
							>
								{{ $t('titles.new') }}
							</v-btn>
						</v-toolbar>
					</template>
					<template #[`item.gameSystemId`]="{ item }">
						<span>{{ getGameSystemName(item.gameSystemId) }}</span>
					</template>
					<template #[`item.article`]="{ item }">
						<VtMarkdown :model-value="item.article" />
					</template>
					<template #[`item.sticky`]="{ item }">
						<span>{{ item.sticky ? $t('strings.yes') : $t('strings.no') }}</span>
					</template>
					<template #[`item.requiresAuth`]="{ item }">
						<span>{{ item.requiresAuth ? $t('strings.yes') : $t('strings.no') }}</span>
					</template>
					<template #[`item.status`]="{ item }">
						<span>{{ $t(`news.status.${item.status}`) }}</span>
					</template>
					<template #[`item.timestamp`]="{ item }">
						<span>{{ getDateHuman(item.timestamp) }}</span>
					</template>
					<template #[`item.action`]="{ item }">
						<v-icon
							size="small"
							class="mr-2"
							@click="dialogEditOpen(item, false)"
						>
							mdi-pencil
						</v-icon>
						<v-icon
							size="small"
							@click="dialogDeleteOpen(item)"
						>
							mdi-delete
						</v-icon>
					</template>
					<template #no-data>
						{{ $t('news.noData') }}
					</template>
				</v-data-table>
				<EditDialog
					ref="editDialogRef"
					:label="dialogEditItemTitle"
					:signal="dialogEditSignal.signal"
					@cancel="dialogEditCancel"
					@ok="dialogEditOk"
				/>
				<VtConfirmationDialog
					:non-recoverable="true"
					:signal="dialogDeleteSignal.signal"
					:pre-complete-ok="dialogDeletePreCompleteOk"
					@cancel="dialogDeleteCancel"
					@ok="dialogDeleteOk"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import NewsData from '@/common/data/news';

import { useAdminBaseListingComponent } from '@/components/admin/baseListing';

import EditDialog from '@/components/admin/news/EditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtMarkdown from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdown';

export default {
	name: 'AdminNewsListing',
	components: {
		EditDialog,
		VtConfirmationDialog,
		VtMarkdown
	},
	setup(props, context) {
		const editDialogRef = ref(null);

		const base = useAdminBaseListingComponent(props, context, {
			editDialogRef,
			defaultItem: () => LibraryCommonUtility.instantiate(new NewsData()),
			initializeHeaders: () => [
				{ title: LibraryClientUtility.$trans.t('news.name'), align: 'start', key: 'title' },
				{ title: LibraryClientUtility.$trans.t('news.gameSystem'), align: 'start', key: 'gameSystemId' },
				{ title: LibraryClientUtility.$trans.t('news.article'), align: 'start', sortable: false, key: 'article' },
				{ title: LibraryClientUtility.$trans.t('news.sticky'), align: 'start', key: 'sticky' },
				{ title: LibraryClientUtility.$trans.t('news.requiresAuth'), align: 'start', key: 'requiresAuth' },
				{ title: LibraryClientUtility.$trans.t('news.publishDate'), align: 'start', key: 'timestamp' },
				{ title: LibraryClientUtility.$trans.t('news.statusName'), align: 'start', key: 'status' },
				{ title: LibraryClientUtility.$trans.t('news.actions'), align: 'end', key: 'action', sortable: false }
			],
			async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
				return await dispatcher.adminNews.deleteAdminNews(correlationId, id);
			}
		});

		const news = computed(() => {
			const mod = LibraryClientUtility.$store.adminNews;
			return mod && mod.news ? mod.news.slice(0) : [];
		});

		const getDateHuman = (timestamp) => {
			return LibraryMomentUtility.getDateHuman(timestamp);
		};

		onMounted(async () => {
			await LibraryClientUtility.$store.dispatcher.adminNews.searchNews(base.correlationId(), {});
		});

		return {
			...base,
			editDialogRef,
			news,
			getDateHuman
		};
	}
};
</script>

<style scoped>
</style>
