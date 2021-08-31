<template>
	<VFormDialog
		ref="form"
		:label="$t('strings.save') +' ' + $t('characters.inventories.gearSets.name')"
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
					:items="gearSetsBlank"
					:label="$t('characters.inventories.gearSets.name')"
					:rules-bail="false"
					:rules="rulesGameSetId"
				/>
				<VTextFieldWithValidation
					ref="name"
					v-model="name"
					vid="name"
					:label="$t('forms.name')"
					:rules="rulesGameSetName"
					:rules-bail="false"
					:counter="30"
				/>
				<v-alert
					dense
					outlined
					class="mb-0 mt-4"
				>
					<span class="body-2">{{ $t('messages.inventories.renameGearSet') }}</span>
				</v-alert>
			</v-card-text>
		</v-card>
		<VConfirmationDialog
			:non-recoverable="true"
			:message="$t('questions.areYouSureNonRecoverableGearSetSave')"
			:signal="dialogConfirmSignal.signal"
			:pre-complete-ok="preCompleteConfirm"
			@cancel="dialogConfirmSignal.cancel()"
			@ok="dialogConfirmOk"
		/>
	</VFormDialog>
</template>

<script>
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import AppUtility from '@/utility/app';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';
import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

import baseInventoryGearSetDialog from '@/components/gameSystems/baseInventoryGearSetDialog';

import DialogSupport from '@/library_vue_components/components/support/dialog';

export default {
	name: 'InventoryGearSetSaveDialog',
	components: {
		VConfirmationDialog,
		VFormDialog,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: baseInventoryGearSetDialog,
	props: {
		inventory: {
			type: Array,
			default: null
		}
	},
	data: () => ({
		dialogConfirmSignal: new DialogSupport()
	}),
	computed: {
		rulesGameSetId() {
			return !this.name ? 'required|' : ''; //'gearSetSave:@name'
		},
		rulesGameSetName() {
			return !this.gearSetId ? 'required|min:3|max:30|' : 'min:3|max:30|'; //'gearSetSave:@gearSetId|min:3|max:30|'
		}
	},
	methods: {
		async dialogConfirmOk() {
			this.$emit('ok');
		},
		async preComplete(correlationId) {
			if (!this.gearSetId && !this.name)
				return this.error('InventoryGearSetSaveDialog', 'preComplete', null, null, null, null, correlationId).addGeneric(GlobalUtility.$trans.t('errors.inventories.eitherGearSetOrName'));

			if (!String.isNullOrEmpty(this.name) && this.gearSetId)
				return await this.rename(correlationId);

			if (this.gearSetId) {
				this.dialogConfirmSignal.open(correlationId);
				return this.error('InventoryGearSetSaveDialog', 'preComplete', null, null, null, null, correlationId);
			}

			return await this.save(correlationId);
		},
		async preCompleteConfirm(correlationId) {
			await this.save(correlationId);
			return this.success(correlationId);
		},
		async rename(correlationId) {
			const response = await AppUtility.settings().updateSettingsUserGameSystem(GlobalUtility.$store, GlobalUtility.$store.state.user.user, this.gameSystemId, { gearSetId: this.gearSetId, name: this.name }, (settings, newVal) => {
				if (!newVal && !this.gameSystemId)
					return this.error('InventoryGearSetSaveDialog', 'rename', null, null, null, null, correlationId).addGeneric(GlobalUtility.$trans.t('errors.invalidRequest'));

				const name = String.trim(newVal.name);
				const gearSet = settings.gearSets.find(l => l.id === newVal.gearSetId);
				if (!gearSet)
					return this.error('InventoryGearSetSaveDialog', 'rename', null, null, null, null, correlationId).addGeneric(GlobalUtility.$trans.t('errors.inventories.renameInvalidGearSet'));

				gearSet.name = name;

				return Response.success(correlationId);
			});

			return response;
		},
		async save(correlationId) {
			const response = await AppUtility.settings().updateSettingsUserGameSystem(correlationId, GlobalUtility.$store, GlobalUtility.$store.state.user.user, this.gameSystemId, { gearSetId: this.gearSetId, name: this.name, inventory: this.inventory }, (settings, newVal) => {
				if (!newVal && !this.gameSystemId)
					return this.error('InventoryGearSetSaveDialog', 'save', null, null, null, null, correlationId).addGeneric(GlobalUtility.$trans.t('errors.invalidRequest'));

				if (newVal.name && newVal.gearSetId)
					return this.error('InventoryGearSetSaveDialog', 'save', null, null, null, null, correlationId).addGeneric(GlobalUtility.$trans.t('errors.inventories.eitherGearSetOrName'));

				let gearSet;
				if (newVal.name) {
					const name = String.trim(newVal.name);
					gearSet = settings.gearSets.find(l => l.name.toLowerCase() === name.toLowerCase());
					if (!gearSet) {
						gearSet = { id: LibraryUtility.generateId(), name: name, inventory: [] };
						settings.gearSets.push(gearSet);
					}
				}
				else
					gearSet = settings.gearSets.find(l => l.id === newVal.gearSetId);

				if (!gearSet)
					return this.error('InventoryGearSetSaveDialog', 'save', null, null, null, null, correlationId);

				gearSet.inventory = (newVal.inventory ? newVal.inventory : []).map(l => {
					return {
						item: l.item,
						itemId: l.itemId,
						quantity: l.quantity,
						value: l.value
					};
				});
			});

			return response;
		}
	}
};
</script>

<style scoped>
</style>
