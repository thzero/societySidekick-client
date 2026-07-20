<template>
	<v-container class="pa-0">
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="scenarios"
					multi-sort
					:sort-by="[ { key: 'gameSystemId', order: 'desc' }, { key: 'season', order: 'asc' }, { key: 'scenario', order: 'asc' }, { key: 'name', order: 'asc' } ]"
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
						{{ $t('scenarios.noData') }}
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

import ScenarioData from '@/common/data/scenario';

import { useAdminBaseListingComponent } from '@/components/admin/baseListing';

import EditDialog from '@/components/admin/scenarios/EditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';

export default {
	name: 'BaseAdminScenariosListing',
	components: {
		EditDialog,
		VtConfirmationDialog
	},
	setup(props, context) {
		const editDialogRef = ref(null);

		const base = useAdminBaseListingComponent(props, context, {
			editDialogRef,
			defaultItem: () => new ScenarioData(),
			initializeHeaders: () => [
				{ title: LibraryClientUtility.$trans.t('scenarios.name'), align: 'start', key: 'name' },
				{ title: LibraryClientUtility.$trans.t('scenarios.season'), align: 'start', key: 'season' },
				{ title: LibraryClientUtility.$trans.t('scenarios.identifier'), align: 'start', key: 'scenario' },
				{ title: LibraryClientUtility.$trans.t('scenarios.type'), align: 'start', key: 'type' },
				{ title: LibraryClientUtility.$trans.t('scenarios.repeatable'), align: 'start', key: 'repeatable' },
				{ title: LibraryClientUtility.$trans.t('scenarios.gameSystem'), align: 'start', key: 'gameSystemId' },
				{ title: LibraryClientUtility.$trans.t('scenarios.actions'), align: 'end', key: 'action', sortable: false }
			],
			async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
				return await dispatcher.adminScenarios.deleteAdminScenario(correlationId, id);
			}
		});

		const getTypeName = (gameSystemId, type) => {
			const lookups = base.getLookupsByGameSystemId(gameSystemId);
			return lookups ? base.getLookupName(lookups.scenarioAdventures, type) : '';
		};

		const scenarios = computed(() => {
			const scenarios = LibraryClientUtility.$store.adminScenarios.scenarios;
			return scenarios ? scenarios.slice(0) : [];
		});

		onMounted(async () => {
			await LibraryClientUtility.$store.dispatcher.adminScenarios.searchAdminScenarios(base.correlationId(), {});
		});

		return {
			...base,
			editDialogRef,
			scenarios,
			getTypeName
		};
	}
};
</script>

<style scoped>
</style>
