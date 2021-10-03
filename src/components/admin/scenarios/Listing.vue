<template>
	<v-container pa-0>
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="scenarios"
					multi-sort
					:sort-by="[ 'gameSystemId', 'season', 'scenario', 'name' ]"
					:sort-desc="[ true, false, false, false ]"
					class="elevation-1"
				>
					<template #top>
						<v-toolbar
							flat
							color="white"
						>
							<v-toolbar-title>{{ $t('admin.scenarios') }}</v-toolbar-title>
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
					<template #[`item.repeatable`]="{ item }">
						<span>{{ item.repeatable ? $t('strings.yes') : $t('strings.no') }}</span>
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
						{{ $t('scenarios.noData') }}
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
import EditDialog from '@/components/admin/scenarios/EditDialog';

import ScenarioData from '@/common/data/scenario';

export default {
	name: 'BaseAdminScenariosListing',
	components: {
		EditDialog
	},
	extends: baseListing,
	computed: {
		scenarios() {
			const scenarios = GlobalUtility.$store.state.adminScenarios.scenarios;
			return scenarios ? scenarios.slice(0) : [];
		}
	},
	async mounted() {
		await GlobalUtility.$store.dispatcher.adminScenarios.searchAdminScenarios(this.correlationId(), {});
	},
	methods: {
		defaultItem() {
			return new ScenarioData();
		},
		dialogDeletePreCompleteDispatcher(correlationId, dispatcher) {
			return dispatcher.adminScenarios;
		},
		async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
			return await dispatcher.adminScenarios.deleteAdminScenario(correlationId, id);
		},
		getTypeName(gameSystemId, type) {
			const lookups = this.getLookupsByGameSystemId(gameSystemId);
			return lookups ? this.getLookupName(lookups.scenarioAdventures, type) : '';
		},
		initializeHeaders() {
			return [
				{ text: GlobalUtility.$trans.t('scenarios.name'), align: 'left', value: 'name', },
				{ text: GlobalUtility.$trans.t('scenarios.season'), align: 'left', value: 'season' },
				{ text: GlobalUtility.$trans.t('scenarios.identifier'), align: 'left', value: 'scenario' },
				{ text: GlobalUtility.$trans.t('scenarios.type'), align: 'left', value: 'type' },
				{ text: GlobalUtility.$trans.t('scenarios.repeatable'), align: 'left', value: 'repeatable' },
				{ text: GlobalUtility.$trans.t('scenarios.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: GlobalUtility.$trans.t('scenarios.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>

<style scoped>
</style>
