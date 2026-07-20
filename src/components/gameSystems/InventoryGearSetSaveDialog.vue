<template>
	<VtFormDialog
		:label="$t('strings.save') +' ' + $t('characters.inventories.gearSets.name')"
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
					:items="gearSetsBlank"
					:label="$t('characters.inventories.gearSets.name')"
				/>
				<VtTextFieldWithValidation
					ref="nameRef"
					v-model="name"
					vid="name"
					:validation="validation"
					:label="$t('forms.name')"
					:counter="30"
				/>
				<v-alert
					density="compact"
					variant="outlined"
					class="mb-0 mt-4"
				>
					<span class="body-2">{{ $t('messages.inventories.renameGearSet') }}</span>
				</v-alert>
			</v-card-text>
		</v-card>
		<VtConfirmationDialog
			:non-recoverable="true"
			:message="$t('questions.areYouSureNonRecoverableGearSetSave')"
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
import { maxLength, minLength, requiredIf } from '@vuelidate/validators';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import Response from '@thzero/library_common/response';
import AppUtility from '@/utility/app';

import { useBaseInventoryGearSetDialogComponent } from '@/components/gameSystems/baseInventoryGearSetDialog';

import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export default {
	name: 'InventoryGearSetSaveDialog',
	components: {
		VtConfirmationDialog,
		VtFormDialog,
		VtSelectWithValidation,
		VtTextFieldWithValidation
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
		inventory: {
			type: Array,
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
		const rename = async (correlationId) => {
			return await AppUtility.settings().updateSettingsUserGameSystem(LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, props.gameSystemId, { gearSetId: base.gearSetId.value, name: base.name.value }, (settings, newVal) => {
				if (!newVal && !props.gameSystemId)
					return base.error('InventoryGearSetSaveDialog', 'rename', null, null, null, null, correlationId).addGeneric(LibraryClientUtility.$trans.t('errors.invalidRequest'));
				const name = String.trim(newVal.name);
				const gearSet = settings.gearSets.find(l => l.id === newVal.gearSetId);
				if (!gearSet)
					return base.error('InventoryGearSetSaveDialog', 'rename', null, null, null, null, correlationId).addGeneric(LibraryClientUtility.$trans.t('errors.inventories.renameInvalidGearSet'));
				gearSet.name = name;
				return Response.success(correlationId);
			});
		};
		const save = async (correlationId) => {
			return await AppUtility.settings().updateSettingsUserGameSystem(correlationId, LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, props.gameSystemId, { gearSetId: base.gearSetId.value, name: base.name.value, inventory: props.inventory }, (settings, newVal) => {
				if (!newVal && !props.gameSystemId)
					return base.error('InventoryGearSetSaveDialog', 'save', null, null, null, null, correlationId).addGeneric(LibraryClientUtility.$trans.t('errors.invalidRequest'));
				if (newVal.name && newVal.gearSetId)
					return base.error('InventoryGearSetSaveDialog', 'save', null, null, null, null, correlationId).addGeneric(LibraryClientUtility.$trans.t('errors.inventories.eitherGearSetOrName'));
				let gearSet;
				if (newVal.name) {
					const name = String.trim(newVal.name);
					gearSet = settings.gearSets.find(l => l.name.toLowerCase() === name.toLowerCase());
					if (!gearSet) {
						gearSet = { id: LibraryCommonUtility.generateId(), name: name, inventory: [] };
						settings.gearSets.push(gearSet);
					}
				}
				else
					gearSet = settings.gearSets.find(l => l.id === newVal.gearSetId);
				if (!gearSet)
					return base.error('InventoryGearSetSaveDialog', 'save', null, null, null, null, correlationId);
				gearSet.inventory = (newVal.inventory ? newVal.inventory : []).map(l => {
					return { item: l.item, itemId: l.itemId, quantity: l.quantity, value: l.value };
				});
			});
		};
		const preCompleteConfirm = async (correlationId) => {
			await save(correlationId);
			return base.success(correlationId);
		};
		const preComplete = async (correlationId) => {
			if (!base.gearSetId.value && !base.name.value)
				return base.error('InventoryGearSetSaveDialog', 'preComplete', null, null, null, null, correlationId).addGeneric(LibraryClientUtility.$trans.t('errors.inventories.eitherGearSetOrName'));
			if (!String.isNullOrEmpty(base.name.value) && base.gearSetId.value)
				return await rename(correlationId);
			if (base.gearSetId.value) {
				dialogConfirmSignal.value.open(correlationId);
				return base.error('InventoryGearSetSaveDialog', 'preComplete', null, null, null, null, correlationId);
			}
			return await save(correlationId);
		};

		return {
			...base,
			dialogConfirmSignal,
			dialogConfirmOk,
			preComplete,
			preCompleteConfirm,
			rename,
			save,
			validation: useVuelidate({ $scope: 'InventoryGearSetSaveDialog' })
		};
	},
	validations() {
		return {
			gearSetId: {
				requiredIf: requiredIf(function () { return !this.name; }),
				$autoDirty: true
			},
			name: {
				requiredIf: requiredIf(function () { return !this.gearSetId; }),
				minLength: minLength(3),
				maxLength: maxLength(30),
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
