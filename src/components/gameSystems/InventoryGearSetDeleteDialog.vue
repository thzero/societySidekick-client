<template>
	<VtFormDialog
		:label="$t('strings.delete') +' ' + $t('characters.inventories.gearSets.name')"
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
import AppUtility from '@/utility/app';

import { useBaseInventoryGearSetDialogComponent } from '@/components/gameSystems/baseInventoryGearSetDialog';

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export default {
	name: 'InventoryGearSetDeleteDialog',
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
			return await AppUtility.settings().updateSettingsUserGameSystem(correlationId, LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, props.gameSystemId, base.gearSetId.value, (settings, newVal) => {
				if (!newVal && !props.gameSystemId)
					return base.error('InventoryGearSetDeleteDialog', 'preCompleteConfirm', null, null, null, null, correlationId).addGeneric(LibraryClientUtility.$trans.t('errors.inventories.eitherGearSetOrName'));
				settings.gearSets = settings.gearSets.filter(l => l.id !== newVal);
			});
		};
		const preComplete = async (correlationId) => {
			dialogConfirmSignal.value.open();
			return base.error('InventoryGearSetDeleteDialog', 'preCompleted', null, null, null, null, correlationId);
		};

		return {
			...base,
			dialogConfirmSignal,
			dialogConfirmOk,
			preComplete,
			preCompleteConfirm,
			validation: useVuelidate({ $scope: 'InventoryGearSetDeleteDialog' })
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
