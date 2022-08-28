<template>
	<VFormDialog
		:label="$t('locations.name')"
		:signal="signal"
		:pre-complete-ok="preCompleteResponseOk"
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
				<VTextFieldWithValidation
					ref="name"
					v-model="name"
					rules="required|min:3|max:50|"
					vid="name"
					:label="$t('forms.name')"
					:counter="50"
				/>
				<VTextFieldWithValidation
					ref="location"
					v-model="location"
					rules="required|min:3|max:50|"
					vid="location"
					:label="$t('forms.locations.name')"
					:counter="50"
				/>
				<VCheckboxWithValidation
					ref="online"
					v-model="online"
					vid="sticky"
					:label="$t('forms.locations.online')"
				/>
			</v-card-text>
		</v-card>
	</VFormDialog>
</template>

<script>
import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import VCheckboxWithValidation from '@/library_vue_vuetify/components/form/VCheckboxWithValidation';
import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'LocationDialog',
	components: {
		VCheckboxWithValidation,
		VFormDialog,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	data: () => ({
		id: null,
		location: null,
		online: false,
		name: null
	}),
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		async close() {
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		async preCompleteResponseOk(correlationId) {
			const location = { name: this.name, location: this.location, online: this.online };
			const response = AppUtility.settings().updateSettingsUserLocation(correlationId, GlobalUtility.$store, GlobalUtility.$store.state.user.user, this.id, location, (settings, newVal) => {
				settings.location = newVal.location;
				settings.name = newVal.name;
				settings.online = newVal.online;
			});
			return response;
		},
		// eslint-disable-next-line
		async resetDialog(correlationId, value) {
			this.id = value ? value.id : LibraryUtility.generateId();
			this.location = value ? value.location : null;
			this.name = value ? value.name : null;
			this.online = value ? value.online : false;
		}
	}
};
</script>
