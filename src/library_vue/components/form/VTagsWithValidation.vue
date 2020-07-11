<template>
	<ValidationProvider
		:vid="vid"
		:name="$attrs.label"
		:rules="rules"
		:bail="rulesBail"
		:immediate="true"
	>
		<v-combobox
			v-model="select"
			slot-scope="{ errors, valid }"
			:error-messages="errors"
			:success="valid"
			:label="$attrs.label"
			:hint="hint"
			class="tag-input"
			multiple
			chips
			deletable-chips
			@change="updateTags"
			@paste="paste"
		/>
	</ValidationProvider>
</template>

<script>
import base from '../base';

export default {
	name: 'TagsWithValidation',
	extends: base,
	props: {
		rules: {
			type: [Object, String],
			default: ''
		},
		rulesBail: {
			type: Boolean,
			default: false
		},
		rulesImmediate: {
			type: Boolean,
			default: false
		},
		max: {
			type: [Number],
			default: 5
		},
		// must be included in props
		value: {
			type: [Array],
			default: () => []
		},
		vid: {
			type: String,
			default: ''
		}
	},
	data: () => ({
			select: [],
			items: [],
			search: '' //sync search
	}),
	computed: {
		hint() {
			return this.$trans.t('errors.tagLine.max', { max: this.max });
		}
	},
	watch: {
		select(val) {
			if (val.length <= this.max)
				return;
			// TODO: Check last entry to see if fits the rules...
			this.$nextTick(() => this.select.pop());
		}
	},
	created() {
		this.select = this.value ? this.value : [];
	},
	methods: {
		paste() {
			this.$nextTick(() => {
				if (String.isNullOrEmpty(this.search))
					return;
				this.select.push(...this.search.split(','));
				this.$nextTick(() => {
					// this.$emit('input', this.search)
					this.search = '';
				});
			});
		},
		updateTags() {
			this.$nextTick(() => {
				this.$emit('input', this.select);
			});
		}
	}
};
</script>

<style scoped>
.tag-input span.chip {
	background-color: #1976d2;
	color: #fff;
	font-size: 1em;
}

.tag-input span.v-chip {
	background-color: #1976d2;
	color: #fff;
	font-size:1em;
	padding-left:7px;
}

.tag-input span.v-chip::before {
		content: "label";
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 20px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
}
</style>
