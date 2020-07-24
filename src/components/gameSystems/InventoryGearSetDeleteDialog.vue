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

import VConfirmationDialog from '@/library_vue/components/VConfirmationDialog';
import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';

import Response from '@thzero/library_common/response';

import baseInventoryGearSetDialog from '@/components/gameSystems/baseInventoryGearSetDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

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
		async preComplete() {
			this.dialogConfirmSignal.open();
			return this.error();
		},
		async preCompleteConfirm() {
			const response = await AppUtility.settings().updateSettingsUserGameSystem(this.$store, this.$store.state.user.user, this.gameSystemId, this.gearSetId, (settings, newVal) => {
				if (!newVal && !this.gameSystemId)
					return Response.error().addGeneric(this.$trans.t('errors.inventories.eitherGearSetOrName'));

				settings.gearSets = settings.gearSets.filter(l => l.id !== newVal);
			});

			return response;
		}
	}
};
</script>

<style scoped>
</style>
