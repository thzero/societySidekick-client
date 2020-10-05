<template>
	<VFormDialog
		:label="$t('favorites.name')"
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
				<VCheckboxWithValidation
					ref="sticky"
					v-model="favorite"
					vid="sticky"
					:label="$t('favorites.name')"
				/>
			</v-card-text>
		</v-card>
	</VFormDialog>
</template>

<script>
import AppUtility from '@/utility/app';
import LibraryUtility from '@thzero/library_common/utility';

import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VCheckboxWithValidation from '@/library_vue/components/form/VCheckboxWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'FavoriteDialog',
	components: {
		VFormDialog,
		VCheckboxWithValidation,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	data: () => ({
		id: null,
		favorite: null,
		name: null
	}),
	methods: {
		// eslint-disable-next-line
		async cancel() {
			this.$emit('cancel');
		},
		// eslint-disable-next-line
		async close() {
		},
		// eslint-disable-next-line
		async ok() {
			this.$emit('ok');
			return true;
		},
		// eslint-disable-next-line
		async preCompleteResponseOk(correlationId) {
			return AppUtility.settings().updateSettingsUserFavorite(correlationId, this.$store, this.$store.state.user.user, this.id, this.favorite);
		},
		// eslint-disable-next-line
		async resetDialog(correlationId, value) {
			this.id = value ? value.id : LibraryUtility.generateId();
			this.favorite = value ? value.favorite : null;
			this.name = value ? value.name : null;
		}
	}
};
</script>
