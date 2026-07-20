<template>
	<v-container class="pa-0">
		<v-row>
			<v-col>
				<v-data-table
					:headers="headers"
					:items="users"
					multi-sort
					:sort-by="[ { key: 'external.name', order: 'asc' } ]"
					class="elevation-1"
				>
					<template #[`item.roles`]="{ item }">
						<span>{{ item && item.roles ? item.roles.join(', ') : '' }}</span>
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
						{{ $t('users.noData') }}
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

import UserData from '@/common/data/user';

import { useAdminBaseListingComponent } from '@/components/admin/baseListing';

import EditDialog from '@/components/admin/users/EditDialog';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';

export default {
	name: 'AdminUsersListing',
	components: {
		EditDialog,
		VtConfirmationDialog
	},
	setup(props, context) {
		const editDialogRef = ref(null);

		const base = useAdminBaseListingComponent(props, context, {
			editDialogRef,
			defaultItem: () => new UserData(),
			initializeHeaders: () => [
				{ title: LibraryClientUtility.$trans.t('users.name'), align: 'start', key: 'external.name' },
				{ title: LibraryClientUtility.$trans.t('users.id'), align: 'start', key: 'external.id' },
				{ title: LibraryClientUtility.$trans.t('users.externalId'), align: 'start', key: 'external.externalId' },
				{ title: LibraryClientUtility.$trans.t('users.roles'), align: 'start', key: 'roles' },
				{ title: LibraryClientUtility.$trans.t('users.actions'), align: 'end', key: 'action', sortable: false }
			],
			async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
				return await dispatcher.adminUsers.deleteAdminUser(correlationId, id);
			}
		});

		const users = computed(() => {
			const mod = LibraryClientUtility.$store.adminUsers;
			return mod && mod.users ? mod.users.slice(0) : [];
		});

		onMounted(async () => {
			await LibraryClientUtility.$store.dispatcher.adminUsers.searchAdminUsers(base.correlationId(), {});
		});

		return {
			...base,
			editDialogRef,
			users
		};
	}
};
</script>

<style scoped>
</style>
