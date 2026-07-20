<template>
	<VtFormDialog
		:label="label"
		:signal="signal"
		:validation="validation"
		:pre-complete-ok="preComplete"
		max-width="1200px"
		width="1200px"
		@close="cancel"
		@ok="ok"
	>
		<v-row>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="idRef"
					v-model="id"
					vid="id"
					:validation="validation"
					:label="$t('forms.id')"
					:readonly="true"
				/>
			</v-col>
			<v-col cols="6">
				<VtTextFieldWithValidation
					ref="externalIdRef"
					v-model="externalId"
					vid="externalId"
					:validation="validation"
					:label="$t('forms.externalId')"
					:readonly="true"
				/>
			</v-col>
		</v-row>

		<VtTextFieldWithValidation
			ref="nameRef"
			v-model="name"
			vid="name"
			:validation="validation"
			:label="$t('forms.name')"
			:readonly="true"
		/>

		<VtSelectWithValidation
			ref="rolesRef"
			v-model="innerValue.roles"
			vid="roles"
			:validation="validation"
			:items="roles"
			:multiple="true"
			:label="$t('forms.roles')"
		/>
	</VtFormDialog>
</template>

<script>
import { computed } from 'vue';

import useVuelidate from '@vuelidate/core';

import SharedConstants from '@/common/constants';

import { useVtAdminFormDialogComponent } from '@thzero/library_client_vue3_vuetify3/components/admin/VtAdminFormDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'AdminUsersEditDialog',
	components: {
		VtFormDialog,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const base = useVtAdminFormDialogComponent(props, context, {
			async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
				const item = {
					id: value.id,
					roles: value.roles,
					updatedTimestamp: value.updatedTimestamp
				};
				return await dispatcher.adminUsers.updateAdminUser(correlationId, item);
			}
		});

		const id = computed(() => {
			return base.innerValue.value ? base.innerValue.value.id : '';
		});
		const externalId = computed(() => {
			return base.innerValue.value && base.innerValue.value.external ? base.innerValue.value.external.id : '';
		});
		const name = computed(() => {
			return base.innerValue.value && base.innerValue.value.external ? base.innerValue.value.external.name : '';
		});
		const roles = computed(() => {
			return Object.values(SharedConstants.Roles);
		});

		return {
			...base,
			id,
			externalId,
			name,
			roles,
			reset: base.resetDialog,
			validation: useVuelidate({ $scope: 'AdminUsersEditDialog' })
		};
	},
	validations() {
		return {
			innerValue: {
				roles: {
					$autoDirty: true
				}
			}
		};
	}
};
</script>

<style scoped>
</style>
