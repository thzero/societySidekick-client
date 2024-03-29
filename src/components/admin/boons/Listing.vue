<template>
	<v-container pa-0>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="boons"
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
							<v-toolbar-title>{{ $t('admin.boons') }}</v-toolbar-title>
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
					<template #[`item.factionId`]="{ item }">
						<span>{{ getFactionName(item.factionId) }}</span>
					</template>
					<template #[`item.scenario`]="{ item }">
						<span>{{ scenarioName(item) }}</span>
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
						{{ $t('boons.noData') }}
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
import EditDialog from '@/components/admin/boons/EditDialog';

import BoonData from '@/common/data/boon';

export default {
	name: 'BaseAdminBoonsListing',
	components: {
		EditDialog
	},
	extends: baseListing,
	computed: {
		boons() {
			const boons = GlobalUtility.$store.state.adminBoons.boons;
			return boons ? boons.slice(0) : [];
		}
	},
	async mounted() {
		const correlationId = this.correlationId();
		await GlobalUtility.$store.dispatcher.adminFactions.searchAdminFactions(correlationId, {});
		await GlobalUtility.$store.dispatcher.adminScenarios.searchAdminScenarios(correlationId, {});
		await GlobalUtility.$store.dispatcher.adminBoons.searchAdminBoons(correlationId, {});
	},
	methods: {
		defaultItem() {
			return new BoonData();
		},
		async dialogDeletePreCompleteOkDelete(dispatcher, id) {
			return await dispatcher.adminBoons.deleteAdminBoon(id);
		},
		getTypeName(gameSystemId, type) {
			const lookups = this.getLookupsByGameSystemId(gameSystemId);
			return lookups ? this.getLookupName(lookups.boonTypes, type) : '';
		},
		initializeHeaders() {
			return [
				{ text: GlobalUtility.$trans.t('boons.name'), align: 'left', value: 'name', },
				{ text: GlobalUtility.$trans.t('boons.type'), align: 'left', value: 'type' },
				{ text: GlobalUtility.$trans.t('boons.scenario'), align: 'left', value: 'scenario' },
				{ text: GlobalUtility.$trans.t('boons.faction'), align: 'left', value: 'factionId' },
				{ text: GlobalUtility.$trans.t('boons.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: GlobalUtility.$trans.t('boons.actions'), align: 'right', value: 'action', sortable: false }
			];
		},
		getFactionName(factionId) {
			if (!GlobalUtility.$store.state.adminFactions.factions)
				return null;
			const faction = GlobalUtility.$store.state.adminFactions.factions.find(l => l.id === factionId);
			return faction ? faction.name : null;
		},
		scenarioName(item) {
			if (!item)
				return '';
			const scenario = GlobalUtility.$store.getters.getAdminScenario(item.scenarioId);
			if (!scenario)
				return '';
			return scenario.name;
			//return item && item.scenario ? item.scenario.name : ''
		}
	}
};
</script>

<style scoped>
</style>
