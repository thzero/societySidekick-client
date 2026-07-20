<template>
	<v-container class="pa-0">
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="boons"
					multi-sort
					:sort-by="[ { key: 'gameSystemId', order: 'desc' }, { key: 'name', order: 'asc' } ]"
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
						{{ $t('boons.noData') }}
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

import BoonData from '@/common/data/boon';

import { useAdminBaseListingComponent } from '@/components/admin/baseListing';

import EditDialog from '@/components/admin/boons/EditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';

export default {
	name: 'BaseAdminBoonsListing',
	components: {
		EditDialog,
		VtConfirmationDialog
	},
	setup(props, context) {
		const editDialogRef = ref(null);

		const base = useAdminBaseListingComponent(props, context, {
			editDialogRef,
			defaultItem: () => new BoonData(),
			initializeHeaders: () => [
				{ title: LibraryClientUtility.$trans.t('boons.name'), align: 'start', key: 'name' },
				{ title: LibraryClientUtility.$trans.t('boons.type'), align: 'start', key: 'type' },
				{ title: LibraryClientUtility.$trans.t('boons.scenario'), align: 'start', key: 'scenario' },
				{ title: LibraryClientUtility.$trans.t('boons.faction'), align: 'start', key: 'factionId' },
				{ title: LibraryClientUtility.$trans.t('boons.gameSystem'), align: 'start', key: 'gameSystemId' },
				{ title: LibraryClientUtility.$trans.t('boons.actions'), align: 'end', key: 'action', sortable: false }
			],
			async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
				return await dispatcher.adminBoons.deleteAdminBoon(correlationId, id);
			}
		});

		const getTypeName = (gameSystemId, type) => {
			const lookups = base.getLookupsByGameSystemId(gameSystemId);
			return lookups ? base.getLookupName(lookups.boonTypes, type) : '';
		};
		const getFactionName = (factionId) => {
			if (!LibraryClientUtility.$store.adminFactions.factions)
				return null;
			const faction = LibraryClientUtility.$store.adminFactions.factions.find(l => l.id === factionId);
			return faction ? faction.name : null;
		};
		const scenarioName = (item) => {
			if (!item)
				return '';
			const scenario = LibraryClientUtility.$store.getters.getAdminScenario(base.correlationId(), item.scenarioId);
			if (!scenario)
				return '';
			return scenario.name;
		};

		const boons = computed(() => {
			const boons = LibraryClientUtility.$store.adminBoons.boons;
			return boons ? boons.slice(0) : [];
		});

		onMounted(async () => {
			const correlationId = base.correlationId();
			await LibraryClientUtility.$store.dispatcher.adminFactions.searchAdminFactions(correlationId, {});
			await LibraryClientUtility.$store.dispatcher.adminScenarios.searchAdminScenarios(correlationId, {});
			await LibraryClientUtility.$store.dispatcher.adminBoons.searchAdminBoons(correlationId, {});
		});

		return {
			...base,
			editDialogRef,
			getTypeName,
			getFactionName,
			scenarioName,
			boons
		};
	}
};
</script>

<style scoped>
</style>
