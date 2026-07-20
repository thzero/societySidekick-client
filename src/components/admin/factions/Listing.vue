<template>
	<v-container class="pa-0">
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="factions"
					multi-sort
					:sort-by="[ { key: 'gameSystemId', order: 'desc' }, { key: 'name', order: 'asc' } ]"
					class="elevation-1"
				>
					<template #top>
						<v-toolbar
							flat
							color="white"
						>
							<v-toolbar-title>{{ $t('admin.factions') }}</v-toolbar-title>
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
						{{ $t('factions.noData') }}
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

import FactionData from '@/common/data/faction';

import { useAdminBaseListingComponent } from '@/components/admin/baseListing';

import EditDialog from '@/components/admin/factions/EditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';

export default {
	name: 'BaseAdminFactionsListing',
	components: {
		EditDialog,
		VtConfirmationDialog
	},
	setup(props, context) {
		const editDialogRef = ref(null);

		const base = useAdminBaseListingComponent(props, context, {
			editDialogRef,
			defaultItem: () => new FactionData(),
			initializeHeaders: () => [
				{ title: LibraryClientUtility.$trans.t('factions.name'), align: 'start', key: 'name' },
				{ title: LibraryClientUtility.$trans.t('factions.gameSystem'), align: 'start', key: 'gameSystemId' },
				{ title: LibraryClientUtility.$trans.t('factions.actions'), align: 'end', key: 'action', sortable: false }
			],
			async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
				return await dispatcher.adminFactions.deleteAdminFaction(correlationId, id);
			}
		});

		const factions = computed(() => {
			const factions = LibraryClientUtility.$store.adminFactions.factions;
			return factions ? factions.slice(0) : [];
		});

		onMounted(async () => {
			await LibraryClientUtility.$store.dispatcher.adminFactions.searchAdminFactions(base.correlationId(), {});
		});

		return {
			...base,
			editDialogRef,
			factions
		};
	}
};
</script>

<style scoped>
</style>
