<template>
	<VFormDialog
		:label="$t('titles.new') + ' ' + $t('characters.name')"
		:signal="signal"
		:pre-complete-ok="preComplete"
		@close="close"
		@cancel="cancel"
		@ok="ok"
		@open="open"
	>
		<VTextFieldWithValidation
			ref="name"
			v-model="name"
			rules="required|min:3|max:30|"
			vid="name"
			:label="$t('forms.name')"
			:counter="30"
		/>
		<VSelectWithValidation
			ref="gameSystem"
			v-model="gameSystemId"
			rules="required"
			vid="gameSystem"
			:items="gameSystems"
			:label="$t('forms.gameSystem')"
		/>
		<VNumberFieldWithValidation
			ref="number"
			v-model="number"
			rules="required|numeric|min_value:1|max_value:99|"
			vid="number"
			:label="$t('forms.number')"
			step="1"
			:counter="2"
		/>
	</VFormDialog>
</template>

<script>
import Constants from '@/constants';

import Utility from '@thzero/library/utility';

import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'CharacterNewDialog',
	components: {
		VFormDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	data: () => ({
		gameSystemId: null,
		name: '',
		number: null,
		serviceCharacters: null
	}),
	computed: {
		gameSystems() {
			const results = this.$store.state.gameSystems;
			return results ? results.filter(l => l.active) : [];
		}
	},
	watch: {
		async gameSystemId(newValue) {
			if (newValue) {
				const response = await this.serviceCharacters.fetchNumber(this.gameSystemId);
				this.number = response && response.success ? response.results : null;
				return;
			}

			this.number = null;
		}
	},
	created() {
		this.serviceCharacters = this.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
	},
	methods: {
		async close() {
		},
		async cancel() {
			this.$emit('cancel');
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		async open() {
			this.fieldType = null;
			this.name = '';
		},
		async preComplete() {
			const name = String.trim(this.name);
			const number = String.trim(this.number + '');
			const response = await this.$store.dispatcher.characters.createCharacter(this.gameSystemId, name, number);
			this.logger.debug(response);
			if (response && response.success) {
				this.$navRouter.push(Utility.formatUrl({ url: '/character', params: [ response.results.id ]}));
				return response;
			}

			return response;
		},
		async resetDialog() {
			this.gameSystemId = null;
			this.name = '';
			this.number = null;
		}
	}
};
</script>

<style scoped>
</style>
