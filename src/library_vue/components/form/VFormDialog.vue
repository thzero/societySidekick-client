<template>
	<vue-fragment>
		<ValidationObserver
			ref="obs"
			v-slot="{ invalid }"
		>
			<v-dialog
				v-model="dialogSignal"
				v-resize="onResize"
				persistent
				:scrollable="scrollableI"
				:max-width="maxWidth"
				:fullscreen="fullscreen"
				@keydown.esc="handleCancel"
			>
				<v-card>
					<v-card-title class="headline">
						{{ label }}
					</v-card-title>
					<v-card-text
						:style="scrollableHeightI"
					>
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
							v-if="buttonDelete"
							color="error lighten-1"
							text
							@click="handleDelete"
						>
							{{ $t('buttons.delete') }}
						</v-btn>
						<v-btn
							v-if="buttonClear"
							color="primary lighten-1"
							text
							@click="handleClear"
						>
							{{ $t('buttons.clear') }}
						</v-btn>
						<v-btn
							v-if="buttonCancel"
							color="primary lighten-1"
							text
							@click="handleCancel"
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
			</v-dialog>
		</ValidationObserver>
		<VConfirmationDialog
			v-if="buttonDelete"
			:non-recoverable="true"
			:signal="dialogDeleteConfirmSignal.signal"
			@cancel="dialogDeleteConfirmSignal.cancelI()"
			@ok="handleDeleteConfirmOk"
		/>
	</vue-fragment>
</template>

<script>
import VueUtility from '@/library_vue/utility/index';

import baseEdit from '../baseEdit';
import VConfirmationDialog from '../VConfirmationDialog';

import DialogSupport from '../support/dialog';

export default {
	name: 'FormDialog',
	components: {
		VConfirmationDialog
	},
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
		buttonDelete: {
			type: Boolean,
			default: false
		},
		buttonOk: {
			type: Boolean,
			default: true
		},
		fullscreen: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		},
		maxWidth: {
			type: String,
			default: '300px'
		},
		preCompleteDelete: {
			type: Function,
			default: null
		},
		preCompleteOk: {
			type: Function,
			default: null
		},
		scrollable: {
			type: Boolean,
			default: false
		},
		scrollableAutoResize: {
			type: Boolean,
			default: false
		},
		scrollableAutoResizeFactor: {
			type: Number,
			default: 0.5
		},
		scrollableHeight: {
			type: String,
			default: null
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		dialogHeightI: 300,
		dialogDeleteConfirmSignal: new DialogSupport(),
		dialogSignal: false,
		disabled: false
	}),
	computed: {
		fullscreenInternal() {
			return VueUtility.fullscreen(this.$vuetify);
		},
		scrollableI() {
			return this.scrollable ? 'scrollable' : '';
		},
		scrollableHeightI() {
			return this.scrollableAutoResize ? 'height: ' + (!String.isNullOrEmpty(this.scrollableHeight) ? this.scrollableHeight : this.dialogHeightI) + 'px;' : '';
		}
	},
	watch: {
		// Handles external model changes.
		signal(value) {
			this.$emit(value ? 'open' : 'close');
			this.logger.debug('signal', value);
			this.dialogSignal = value;
			this.logger.debug('signal.dialogSignal', this.dialogSignal);
		}
	},
	mounted() {
		this.onResize();
	},
	methods: {
		clear() {
			this.serverErrors = [];
			this.logger.debug('clear');
			this.$nextTick(() => {
				this.$refs.obs.reset();
			});
			this.disabled = false;
		},
		handleCancel() {
			this.serverErrors = [];
			this.dialogSignal = false;
			this.clear();
			this.logger.debug('cancel', 'cancel');
			this.$emit('cancel');
		},
		handleClear() {
			this.clear();
		},
		async handleDelete() {
			this.serverErrors = [];
			this.dialogDeleteConfirmSignal.open();
		},
		async handleDeleteConfirmOk() {
			this.serverErrors = [];

			this.dialogDeleteConfirmSignal.ok();

			if (this.preCompleteDelete) {
				const response = await this.preCompleteDelete();
				this.logger.debug('delete.response', response);
				if (!response || !response.success) {
					VueUtility.handleError(this.$refs.obs, this.serverErrors, response);
					return;
				}
			}

			this.dialogSignal = false;
			this.logger.debug('delete');
			this.$emit('ok');
			this.clear();
		},
		observer() {
			this.$refs.obs;
		},
		onResize() {
			const temp = window.innerHeight - 200;
			this.dialogHeightI = Math.ceil(temp * this.scrollableAutoResizeFactor);
		},
		async reset(value) {
			const timer = setInterval(async () => {
				clearInterval(timer);
				const el = document.getElementsByClassName('v-card__text');
				if (el && el.length > 0)
					el[0].scrollTop = 0;
			}, 25);
			await this.resetDialog(value);
		},
		// eslint-disable-next-line
		async resetDialog(value) {
		},
		setErrors(errors) {
			this.$refs.obs.setErrors(errors);
		},
		async submit() {
			this.serverErrors = [];

			const result = await this.$refs.obs.validate();
			this.logger.debug('submit.result', result);
			if (!result)
				return;

			if (this.preCompleteOk) {
				const response = await this.preCompleteOk();
				this.logger.debug('submit.response', response);
				if (!response || !response.success) {
					VueUtility.handleError(this.$refs.obs, this.serverErrors, response);
					return;
				}
			}

			this.dialogSignal = false;
			this.logger.debug('submit', 'ok');
			this.$emit('ok');
			this.clear();
		}
	}
};
</script>

<style scoped>
</style>
