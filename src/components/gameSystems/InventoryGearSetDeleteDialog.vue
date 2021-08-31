<template>
	<VFormDialog
		ref="form"
		:label="$t('strings.delete') +' ' + $t('characters.inventories.gearSets.name')"
		:signal="signal"
		:pre-complete-ok="preComplete"
		:fullscreen="fullscreenInternal"
		@close="close"
		@cancel="cancel"
		@ok="ok"
	>
		<v-card
			tile
			outlined
		>
			<v-card-text>
				<VSelectWithValidation
					ref="gearSetId"
					v-model="gearSetId"
					vid="gearSetId"
					rules="required|"
					:items="gearSets"
					:label="$t('characters.inventories.gearSets.name')"
				/>
			</v-card-text>
		</v-card>
		<VConfirmationDialog
			:non-recoverable="true"
			:signal="dialogConfirmSignal.signal"
			:pre-complete-ok="preCompleteConfirm"
			@cancel="dialogConfirmSignal.cancel()"
			@ok="dialogConfirmOk"
		/>
	</VFormDialog>
</template>

<script>
import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';

import baseInventoryGearSetDialog from '@/components/gameSystems/baseInventoryGearSetDialog';

import DialogSupport from '@/library_vue_components/support/dialog';

export default {
	name: 'InventoryGearSetDeleteDialog',
	components: {
		VConfirmationDialog,
		VFormDialog,
		VSelectWithValidation
	},
	extends: baseInventoryGearSetDialog,
	data: () => ({
		dialogConfirmSignal: new DialogSupport()
	}),
	methods: {
		async dialogConfirmOk() {
			this.$emit('ok');
		},
		async preComplete(correlationId) {
			this.dialogConfirmSignal.open();
			return this.error('InventoryGearSetDeleteDialog', 'preCompleted', null, null, null, null, correlationId);
		},
		async preCompleteConfirm(correlationId) {
			const response = await AppUtility.settings().updateSettingsUserGameSystem(correlationId, GlobalUtility.$store, GlobalUtility.$store.state.user.user, this.gameSystemId, this.gearSetId, (settings, newVal) => {
				if (!newVal && !this.gameSystemId)
					return this.error('InventoryGearSetDeleteDialog', 'preCompleteConfirm', null, null, null, null, correlationId).addGeneric(GlobalUtility.$trans.t('errors.inventories.eitherGearSetOrName'));

				settings.gearSets = settings.gearSets.filter(l => l.id !== newVal);
			});

			return response;
		}
	}
};
</script>

<style scoped>
</style>
