<template>
	<div>
		<!-- eslint-disable vue/no-v-html -->
		<div
			class="markdown-body"
			v-html="display"
		/>
		<!--eslint-enable-->
	</div>
</template>

<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import base from '../base';

export default {
	name: 'Markdown',
	extends: base,
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	computed: {
		display() {
			const correlationId = this.correlationId();
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, this.value));
		}
	},
	created() {
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	}
};
</script>

<style scoped>
</style>
