<template>
	<VtFormDialog
		:label="$t('strings.load') +' ' + $t('characters.inventories.gearSets.name')"
		:signal="signal"
		:validation="validation"
		:pre-complete-ok="preComplete"
		@close="cancel"
		@ok="ok"
	>
		<v-card
			tile
			variant="outlined"
		>
			<v-card-text>
				<VtSelectWithValidation
					ref="gearSetIdRef"
					v-model="gearSetId"
					vid="gearSetId"
					:validation="validation"
					:items="gearSets"
					:label="$t('characters.inventories.gearSets.name')"
				/>
			</v-card-text>
		</v-card>
		<VtConfirmationDialog
			:non-recoverable="true"
			:message="$t('questions.areYouSureNonRecoverableGearSetLoad')"
			:signal="dialogConfirmSignal.signal"
			:pre-complete-ok="preCompleteConfirm"
			@cancel="dialogConfirmSignal.cancel()"
			@ok="dialogConfirmOk"
		/>
	</VtFormDialog>
</template>

<script>
import { ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseInventoryGearSetDialogComponent } from '@/components/gameSystems/baseInventoryGearSetDialog';

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export default {
	name: 'InventoryGearSetLoadDialog',
	components: {
		VtConfirmationDialog,
		VtFormDialog,
		VtSelectWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		},
		gameSystemId: {
			type: String,
			default: null
		},
		characterId: {
			type: String,
			default: null
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const base = useBaseInventoryGearSetDialogComponent(props, context, {});

		const dialogConfirmSignal = ref(new DialogSupport());

		const dialogConfirmOk = async () => {
			context.emit('ok');
		};
		const preCompleteConfirm = async (correlationId) => {
			const response = await LibraryClientUtility.$store.dispatcher.characters.loadCharacterInventory(correlationId, props.characterId, base.gearSetId.value);
			base.logger.debug('InventoryGearSetLoadDialog', 'preCompleteConfirm', 'response', response, correlationId);
			return response;
		};
		const preComplete = async (correlationId) => {
			const character = LibraryClientUtility.$store.getters.getCharacter(correlationId, props.characterId);
			if (character) {
				if (character.inventory && character.inventory.length > 0) {
					dialogConfirmSignal.value.open(correlationId);
					return base.error('InventoryGearSetLoadDialog', 'preComplete', null, null, null, null, correlationId);
				}
			}
			return preCompleteConfirm(correlationId);
		};

		return {
			...base,
			dialogConfirmSignal,
			dialogConfirmOk,
			preComplete,
			preCompleteConfirm,
			validation: useVuelidate({ $scope: 'InventoryGearSetLoadDialog' })
		};
	},
	validations() {
		return {
			gearSetId: {
				required,
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
