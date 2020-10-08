<template>
	<v-dialog
		v-model="dialogSignal"
		persistent
		max-width="300px"
		@keydown.esc="dialogCancel()"
	>
		<ValidationObserver
			ref="obs"
			v-slot="{ invalid }"
		>
			<v-card>
				<v-card-title class="headline">
					{{ $attrs.label }}
				</v-card-title>
				<v-card-text>
					{{ message ? message : nonRecoverable ? $t('questions.areYouSureNonRecoverable') : $t('questions.areYouSure') }}
					<div
						v-for="(item, index) in serverErrors"
						:key="index"
						class="red--text text--lighten-1 v-messages"
					>
						{{ item }}
					</div>
				</v-card-text>
				<v-card-actions>
					<v-btn
						color="primary"
						text
						@click.stop="dialogCancel()"
					>
						{{ $t('buttons.cancel') }}
					</v-btn>
					<v-btn
						color="primary"
						text
						:disabled="invalid"
						@click.stop="dialogOk()"
					>
						{{ $t('buttons.ok') }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</ValidationObserver>
	</v-dialog>
</template>

<script>
import VueUtility from '@/library_vue/utility/index';

import base from './base';

export default {
	name: 'ConfirmationDialog',
	extends: base,
	props: {
		completeOk: {
			type: Function,
			default: null
		},
		message: {
			type: String,
			default: null
		},
		nonRecoverable: {
			type: Boolean,
			default: false
		},
		preCompleteOk: {
			type: Function,
			default: null
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		dialogSignal: false,
		internalItem: null
	}),
	watch: {
		// Handles external model changes.
		signal(value) {
			this.dialogSignal = value;
		}
	},
	methods: {
		dialogCancel() {
			this.dialogSignal = false;
			this.$emit('cancel');
		},
		async dialogOk() {
			const correlationId = this.correlationId();
			if (this.preCompleteOk) {
				const response = await this.preCompleteOk(correlationId);
				this.logger.debug('ConfirmationDialog', 'dialogOk', 'response', response, correlationId);
				if (!response || !response.success) {
					VueUtility.handleError(this.$refs.obs, this.serverErrors, response, correlationId);
					return;
				}
			}

			this.dialogSignal = false;
			this.$emit('ok');
			if (this.completeOk)
				this.completeOk();
		}
	}
};
</script>
