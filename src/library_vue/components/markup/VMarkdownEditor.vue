<template>
	<v-container pa-0>
		<v-row>
			<v-col
				cols="6"
				class="pa-0"
			>
				<VTextAreaWithValidation
					ref="markdown"
					v-model="innerValue"
					:vid="vid"
				/>
			</v-col>
			<v-col
				cols="6"
				class="pa-0"
			>
				<!-- eslint-disable vue/no-v-html -->
				<div
					class="markdown-body mt-3 ml-2"
					v-html="preview"
				/>
				<!--eslint-enable-->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import base from '../base';
import VTextAreaWithValidation from '../form/VTextAreaWithValidation';

export default {
	name: 'MarkdownEditor',
	components: {
		VTextAreaWithValidation
	},
	extends: base,
	props: {
		value: {
			type: String,
			default: ''
		},
		vid: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		innerValue: '',
		watch: null
	}),
	computed: {
		preview() {
			const correlationId = this.correlationId();
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, this.innerValue ? this.innerValue : ''));
		}
	},
	watch: {
		// eslint-disable-next-line
		value(newValue, preValue) {
			this.initValue(newValue);
		}
	},
	created() {
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	mounted() {
			this.initValue(this.value);
	},
	methods: {
		initValue(value) {
			this.innerValue = value;
			if (this.watch)
				return;

			this.watch = this.$watch('innerValue', async (newVal) => {
				this.$emit('input', newVal);
			});
		}
	}
};
</script>

<style scoped>
</style>
