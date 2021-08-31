<template>
	<VFormDialog
		ref="form"
		:label="$t('strings.load') +' ' + $t('characters.inventories.gearSets.name')"
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
			:message="$t('questions.areYouSureNonRecoverableGearSetLoad')"
			:signal="dialogConfirmSignal.signal"
			:pre-complete-ok="preCompleteConfirm"
			@cancel="dialogConfirmSignal.cancel()"
			@ok="dialogConfirmOk"
		/>
	</VFormDialog>
</template>

<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';

import baseInventoryGearSetDialog from '@/components/gameSystems/baseInventoryGearSetDialog';

import DialogSupport from '@/library_vue_components/components/support/dialog';

export default {
	name: 'InventoryGearSetLoadDialog',
	components: {
		VConfirmationDialog,
		VFormDialog,
		VSelectWithValidation
	},
	extends: baseInventoryGearSetDialog,
	props: {
		characterId: {
			type: String,
			default: null
		}
	},
	data: () => ({
		dialogConfirmSignal: new DialogSupport()
	}),
	methods: {
		async dialogConfirmOk() {
			this.$emit('ok');
		},
		async preComplete(correlationId) {
			const character = GlobalUtility.$store.getters.getCharacter(this.characterId);
			if (character) {
				if (character.inventory && character.inventory.length > 0) {
					this.dialogConfirmSignal.open(correlationId);
					return this.error('InventoryGearSetLoadDialog', 'preComplete', null, null, null, null, correlationId);
				}
			}

			return this.preCompleteConfirm();
		},
		async preCompleteConfirm(correlationId) {
			const response = await GlobalUtility.$store.dispatcher.characters.loadCharacterInventory(correlationId, this.characterId, this.gearSetId);
			this.logger.debug('InventoryGearSetLoadDialog', 'preCompleteConfirm', 'response', response, correlationId);
			return response;
		}
	}
};
</script>

<style scoped>
</style>
