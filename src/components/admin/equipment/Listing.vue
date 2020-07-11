<template>
	<v-container pa-0>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="equipment"
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
							<v-toolbar-title>{{ $t('admin.equipment') }}</v-toolbar-title>
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
					<template v-slot:item.category="{ item }">
						<span>{{ getCategoryName(item.gameSystemId, item.category) }}</span>
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
						{{ $t('equipment.noData') }}
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
import EditDialog from '@/components/admin/equipment/EditDialog';

import ScenarioData from '@/common/data/scenario';

export default {
	name: 'BaseAdminEquipmentListing',
	components: {
		EditDialog
	},
	extends: baseList,
	computed: {
		equipment() {
			const equipment = this.$store.state.adminEquipment.equipment;
			return equipment ? equipment.slice(0) : [];
		}
	},
	async mounted() {
		await this.$store.dispatcher.adminEquipment.searchEquipment({});
	},
	methods: {
		defaultItem() {
			return new ScenarioData();
		},
		async dialogDeletePreCompleteOkDelete(dispatcher, id) {
			return await dispatcher.adminEquipment.deleteAdminEquipment(id);
		},
		getCategoryName(gameSystemId, category) {
			const lookups = this.getLookupsByGameSystemId(gameSystemId);
			return lookups ? this.getLookupName(lookups.equipmentCategories, category) : '';
		},
		initializeHeaders() {
			return [
				{ text: this.$trans.t('equipment.name'), align: 'left', value: 'name', },
				{ text: this.$trans.t('equipment.category'), align: 'left', value: 'category' },
				{ text: this.$trans.t('equipment.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: this.$trans.t('equipment.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>

<style scoped>
</style>
