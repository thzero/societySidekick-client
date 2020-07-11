<template>
	<v-dialog
		v-model="dialogSignal"
		persistent
		:scrollable="scrollableI"
		:max-width="maxWidth"
		@keydown.esc="dialogCancel()"
	>
		<v-card>
			<v-card-title class="headline">
				{{ label }}
			</v-card-title>
			<v-card-text
				:style="scrollableHeightI"
			>
				<slot />

				<!-- eslint-disable vue/no-v-html -->
				<div
					class="markdown-body"
					style="vertical-align: top;"
					v-html="description"
				/>
				<!--eslint-enable-->
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="primary"
					text
					@click.stop="dialogCancel()"
				>
					{{ $t('buttons.cancel') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import Vue from 'vue';

import VueUtility from '@/library_vue/utility/index';

import LibraryConstants from '@thzero/library/constants';

import base from './base';

export default {
	name: 'DisplayDialog',
	extends: base,
	props: {
		// must be included in props
		value: {
			type: null,
			default: null
		},
		label: {
			type: String,
			default: ''
		},
		maxWidth: {
			type: String,
			default: '600px'
		},
		scrollable: {
			type: Boolean,
			default: true
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
		dialogSignal: false,
		internalItem: null
	}),
	computed: {
		description() {
			return this.markup(this.value);
		},
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
			this.dialogSignal = value;
		}
	},
	created() {
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		dialogCancel() {
			this.dialogSignal = false;
			this.$emit('cancel');
		},
		async dialogOk() {
			this.dialogSignal = false;
			this.$emit('ok');
		},
		markup(value) {
			if (!value)
				return null;
			return this._serviceMarkup.trimResults(this._serviceMarkup.render(value));
		}
	}
};
</script>
