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
					<template v-slot:top>
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
					<template v-slot:[`item.gameSystemId`]="{ item }">
						<span>{{ getGameSystemName(item.gameSystemId) }}</span>
					</template>
					<template v-slot:[`item.gameSystemId`]="{ item }">
						<span>{{ getGameSystemName(item.gameSystemId) }}</span>
					</template>
					<template v-slot:[`item.factionId`]="{ item }">
						<span>{{ getFactionName(item.factionId) }}</span>
					</template>
					<template v-slot:[`item.scenario`]="{ item }">
						<span>{{ scenarioName(item) }}</span>
					</template>
					<template v-slot:[`item.type`]="{ item }">
						<span>{{ getTypeName(item.gameSystemId, item.type) }}</span>
					</template>
					<template v-slot:[`item.action`]="{ item }">
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
import baseList from '@/components/admin/baseList';
import EditDialog from '@/components/admin/boons/EditDialog';

import BoonData from '@/common/data/boon';

export default {
	name: 'BaseAdminBoonsListing',
	components: {
		EditDialog
	},
	extends: baseList,
	computed: {
		boons() {
			const boons = this.$store.state.adminBoons.boons;
			return boons ? boons.slice(0) : [];
		}
	},
	async mounted() {
		const correlationId = this.correlationId();
		await this.$store.dispatcher.adminFactions.searchAdminFactions(correlationId, {});
		await this.$store.dispatcher.adminScenarios.searchAdminScenarios(correlationId, {});
		await this.$store.dispatcher.adminBoons.searchAdminBoons(correlationId, {});
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
				{ text: this.$trans.t('boons.name'), align: 'left', value: 'name', },
				{ text: this.$trans.t('boons.type'), align: 'left', value: 'type' },
				{ text: this.$trans.t('boons.scenario'), align: 'left', value: 'scenario' },
				{ text: this.$trans.t('boons.faction'), align: 'left', value: 'factionId' },
				{ text: this.$trans.t('boons.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: this.$trans.t('boons.actions'), align: 'right', value: 'action', sortable: false }
			];
		},
		getFactionName(factionId) {
			if (!this.$store.state.adminFactions.factions)
				return null;
			const faction = this.$store.state.adminFactions.factions.find(l => l.id === factionId);
			return faction ? faction.name : null;
		},
		scenarioName(item) {
			if (!item)
				return '';
			const scenario = this.$store.getters.getAdminScenario(item.scenarioId);
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
