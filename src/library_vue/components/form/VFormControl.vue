<template>
	<vue-fragment>
		<ValidationObserver
			ref="obs"
			v-slot="{ invalid }"
		>
			<v-card>
				<v-card-title class="headline">
					{{ label }}
				</v-card-title>
				<v-card-text>
					<v-form>
						<slot />
						<div
							v-for="(item, index) in serverErrors"
							:key="index"
							class="red--text text--lighten-1 v-messages"
						>
							{{ item }}
						</div>
					</v-form>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn
						v-if="buttonClear"
						color="primary lighten-1"
						text
						@click="clear"
					>
						{{ $t('buttons.clear') }}
					</v-btn>
					<v-btn
						v-if="buttonCancel"
						color="primary lighten-1"
						text
						@click="cancel"
					>
						{{ $t('buttons.cancel') }}
					</v-btn>
					<v-btn
						v-if="buttonOk"
						:disabled="invalid || disabled"
						color="green darken-1"
						text
						@click="submit"
					>
						{{ $t('buttons.ok') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</ValidationObserver>
	</vue-fragment>
</template>

<script>
import VueUtility from '@/library_vue/utility/index';

import baseEdit from '../baseEdit';

export default {
	name: 'FormControl',
	extends: baseEdit,
	props: {
		buttonCancel: {
			type: Boolean,
			default: true
		},
		buttonClear: {
			type: Boolean,
			default: true
		},
		buttonOk: {
			type: Boolean,
			default: true
		},
		label: {
			type: String,
			default: ''
		},
		preCompleteOk: {
			type: Function,
			default: null
		}
	},
	data: () => ({
		disabled: false
	}),
	methods: {
		cancel() {
			const correlationId = this.correlationId();
			this.serverErrors = [];
			this.clear(correlationId);
			this.logger.debug('FormControl', 'cancel', null, null, correlationId);
			this.$emit('cancel');
		},
		async clear(correlationId) {
			this.serverErrors = [];
			this.logger.debug('FormControl', 'clear', null, null, correlationId);
			this.$nextTick(async () => {
				await this.$refs.obs.reset(correlationId);
			});
			this.disabled = false;
		},
		observer() {
			this.$refs.obs;
		},
		reset(correlationId, value) {
			const timer = setInterval(async () => {
				clearInterval(timer);
				const el = document.getElementsByClassName('v-card__text');
				if (el && el.length > 0)
					el[0].scrollTop = 0;
			}, 25);
			this.resetControl(correlationId, value);
		},
		// eslint-disable-next-line
		resetControl(correlationId, value) {
		},
		setErrors(errors) {
			this.$refs.obs.setErrors(errors);
		},
		async submit() {
			this.serverErrors = [];

			const correlationId = this.correlationId();

			const result = await this.$refs.obs.validate(correlationId);
			this.logger.debug('FormControl', 'submit', 'result', result, correlationId);
			if (!result)
				return;

			if (this.preCompleteOk) {
				const response = await this.preCompleteOk(correlationId);
				this.logger.debug('FormControl', 'submit', 'response', response, correlationId);
				if (!response || !response.success) {
					VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
					return;
				}
			}

			this.logger.debug('FormControl', 'submit', 'ok', null, correlationId);
			this.$emit('ok');
			this.clear(correlationId);
		}
	}
};
</script>

<style scoped>
</style>
