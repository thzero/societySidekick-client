<template>
	<v-container pa-0>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="factions"
					multi-sort
					:sort-by="[ 'gameSystemId', 'name' ]"
					:sort-desc="[ true, false, false, false ]"
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
								dark
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
							small
							class="mr-2"
							@click="dialogEditOpen(item, false)"
						>
							edit
						</v-icon>
						<v-icon
							small
							@click="dialogDeleteOpen(item)"
						>
							delete
						</v-icon>
					</template>
					<template #no-data>
						{{ $t('factions.noData') }}
					</template>
				</v-data-table>
				<EditDialog
					ref="editDialog"
					:label="dialogEditItemTitle"
					:signal="dialogEditSignal.signal"
					@cancel="dialogEditCancel"
					@ok="dialogEditOk"
				/>
				<VConfirmationDialog
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
import GlobalUtility from '@thzero/library_client/utility/global';

import baseList from '@/components/admin/baseList';
import EditDialog from '@/components/admin/factions/EditDialog';

import FactionData from '@/common/data/faction';

export default {
	name: 'BaseAdminFactionsListing',
	components: {
		EditDialog
	},
	extends: baseList,
	computed: {
		factions() {
			const factions = GlobalUtility.$store.state.adminFactions.factions;
			return factions ? factions.slice(0) : [];
		}
	},
	async mounted() {
		await GlobalUtility.$store.dispatcher.adminFactions.searchAdminFactions(this.correlationId(), {});
	},
	methods: {
		defaultItem() {
			return new FactionData();
		},
		async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
			return await dispatcher.adminFactions.deleteAdminFaction(correlationId, id);
		},
		initializeHeaders() {
			return [
				{ text: GlobalUtility.$trans.t('factions.name'), align: 'left', value: 'name', },
				{ text: GlobalUtility.$trans.t('factions.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: GlobalUtility.$trans.t('factions.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>

<style scoped>
</style>
