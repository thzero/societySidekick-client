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
					rules="required|min:3|max:30|"
					vid="name"
					:label="$t('forms.name')"
					:counter="30"
				/>
				<VTextFieldWithValidation
					ref="location"
					v-model="location"
					rules="required|min:3|max:30|"
					vid="location"
					:label="$t('locations.name')"
					:counter="30"
				/>
			</v-card-text>
		</v-card>
	</VFormDialog>
</template>

<script>
import Utility from '@thzero/library/utility';
import AppUtility from '@/utility/app';

import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'LocationDialog',
	components: {
		VFormDialog,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	data: () => ({
		id: null,
		location: null,
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
		async preCompleteResponseOk() {
			const response = AppUtility.settings().updateSettingsUserLocation(this.$store, this.$store.state.user.user, this.id, { name: this.name, location: this.location }, (settings, newVal) => {
				settings.name = newVal.name;
				settings.location = newVal.location;
			});
			return response;
		},
		// eslint-disable-next-line
		async resetDialog(value) {
			this.id = value ? value.id : Utility.generateId();
			this.location = value ? value.location : null;
			this.name = value ? value.name : null;
		}
	}
};
</script>
