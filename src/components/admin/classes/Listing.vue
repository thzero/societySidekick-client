<template>
	<v-container pa-0>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="classes"
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
							<v-toolbar-title>{{ $t('admin.classes') }}</v-toolbar-title>
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
					<template #[`item.type`]="{ item }">
						<span>{{ getTypeName(item.gameSystemId, item.type) }}</span>
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
						{{ $t('classes.noData') }}
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

import baseListing from '@/components/admin/baseListing';
import EditDialog from '@/components/admin/classes/EditDialog';

import ClassData from '@/common/data/class';

export default {
	name: 'BaseAdminClassesListing',
	components: {
		EditDialog
	},
	extends: baseListing,
	computed: {
		classes() {
			const classes = GlobalUtility.$store.state.adminClasses.classes;
			return classes ? classes.slice(0) : [];
		}
	},
	async mounted() {
		await GlobalUtility.$store.dispatcher.adminClasses.searchAdminClasses(this.correlationId(), {});
	},
	methods: {
		defaultItem() {
			return new ClassData();
		},
		async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
			return await dispatcher.adminClasses.deleteAdminClass(correlationId, id);
		},
		getTypeName(gameSystemId, type) {
			const lookups = this.getLookupsByGameSystemId(gameSystemId);
			return lookups ? this.getLookupName(lookups.classTypes, type) : '';
		},
		initializeHeaders() {
			return [
				{ text: GlobalUtility.$trans.t('classes.name'), align: 'left', value: 'name', },
				{ text: GlobalUtility.$trans.t('classes.type'), align: 'left', value: 'type' },
				{ text: GlobalUtility.$trans.t('classes.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: GlobalUtility.$trans.t('classes.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>

<style scoped>
</style>
