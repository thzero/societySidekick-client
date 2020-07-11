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
					<template v-slot:top>
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
					<template v-slot:item.gameSystemId="{ item }">
						<span>{{ getGameSystemName(item.gameSystemId) }}</span>
					</template>
					<template v-slot:item.action="{ item }">
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
					<template v-slot:no-data>
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
			const factions = this.$store.state.adminFactions.factions;
			return factions ? factions.slice(0) : [];
		}
	},
	async mounted() {
		await this.$store.dispatcher.adminFactions.searchAdminFactions({});
	},
	methods: {
		defaultItem() {
			return new FactionData();
		},
		async dialogDeletePreCompleteOkDelete(dispatcher, id) {
			return await dispatcher.adminFactions.deleteAdminFaction(id);
		},
		initializeHeaders() {
			return [
				{ text: this.$trans.t('factions.name'), align: 'left', value: 'name', },
				{ text: this.$trans.t('factions.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: this.$trans.t('factions.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>

<style scoped>
</style>
