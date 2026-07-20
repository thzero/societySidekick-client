<template>
	<VtFormDialog
		:label="$t('titles.new') + ' ' + $t('characters.name')"
		:signal="signal"
		:validation="validation"
		:pre-complete-ok="preComplete"
		@close="cancel"
		@ok="ok"
		@open="open"
	>
		<VtTextFieldWithValidation
			ref="nameRef"
			v-model="name"
			vid="name"
			:validation="validation"
			:label="$t('forms.name')"
			:counter="30"
		/>
		<VtSelectWithValidation
			ref="gameSystemRef"
			v-model="gameSystemId"
			vid="gameSystem"
			:validation="validation"
			:items="gameSystems"
			:label="$t('forms.gameSystem')"
		/>
		<VtNumberFieldWithValidation
			ref="numberRef"
			v-model="number"
			vid="number"
			:validation="validation"
			:label="$t('forms.number')"
			step="1"
			:min="1"
			:max="99"
			:counter="2"
		/>
	</VtFormDialog>
</template>

<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';
import { maxLength, maxValue, minLength, minValue, numeric, required } from '@vuelidate/validators';

import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseComponent } from '@/components/base';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'CharacterNewDialog',
	components: {
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const base = useBaseComponent(props, context);

		const serviceCharacters = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);

		const gameSystemId = ref(null);
		const name = ref('');
		const number = ref(null);

		const gameSystems = computed(() => {
			const results = LibraryClientUtility.$store.gameSystems;
			return results ? results.filter(l => l.active) : [];
		});

		watch(gameSystemId, async (newValue) => {
			if (newValue) {
				const response = await serviceCharacters.fetchNumber(base.correlationId(), gameSystemId.value);
				number.value = response && response.success ? response.results : null;
				return;
			}
			number.value = null;
		});

		const close = async () => {
		};
		const cancel = async () => {
			context.emit('cancel');
		};
		const ok = async () => {
			context.emit('ok');
			return true;
		};
		const open = async () => {
			name.value = '';
		};
		const preComplete = async (correlationId) => {
			const nameV = String.trim(name.value);
			const numberV = String.trim(number.value + '');
			const response = await LibraryClientUtility.$store.dispatcher.characters.createCharacter(correlationId, { gameSystemId: gameSystemId.value, name: nameV, number: numberV });
			base.logger.debug('CharacterNewDialog', 'preComplete', 'response', response, correlationId);
			if (base.hasSucceeded(response)) {
				LibraryClientUtility.$router.push(LibraryCommonUtility.formatUrl({ url: '/character', params: [ response.results.id ]}));
				return response;
			}
			return response;
		};
		const reset = async () => {
			gameSystemId.value = null;
			name.value = '';
			number.value = null;
		};

		return {
			...base,
			gameSystemId,
			name,
			number,
			gameSystems,
			close,
			cancel,
			ok,
			open,
			preComplete,
			reset,
			resetDialog: reset,
			validation: useVuelidate({ $scope: 'CharacterNewDialog' })
		};
	},
	validations() {
		return {
			name: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(30),
				$autoDirty: true
			},
			gameSystemId: {
				required,
				$autoDirty: true
			},
			number: {
				required,
				numeric,
				minValue: minValue(1),
				maxValue: maxValue(99),
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
