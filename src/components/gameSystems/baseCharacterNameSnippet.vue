
<script>
import base from '@/library_vue/components/base';

import GameSystemsUtility from '@/utility/gameSystems';

export default {
	name: 'BaseCharacterNameSnippet',
	extends: base,
	props: {
		value: {
			type: Object,
			default: () => {}
		},
		fontName: {
			type: String,
			default: () => 'headline'
		},
		fontSecondary: {
			type: String,
			default: () => 'subtitle-1'
		},
		hasName: {
			type: Boolean,
			default: true
		},
		hasSecondary: {
			type: Boolean,
			default: true
		},
		includeCharacterNumber: {
			type: Boolean,
			default: true
		},
		prefix: {
			type: String,
			default: '('
		},
		suffix: {
			type: String,
			default: ')'
		}
	},
	computed: {
		secondary() {
			let userNumber = GameSystemsUtility.gameSystemNumber(this.correlationId(), this.user, this.gameSystemId());
			userNumber = '#' + (userNumber ? userNumber : '******');
			const number = (this.value.number ? this.value.number : '*') + '';
			if (this.includeCharacterNumber)
				return `${this.prefix}${userNumber}-${this.secondaryFormat(number)}${this.suffix}`;
			return `${this.prefix}#${this.secondaryFormat(number)}${this.suffix}`;
		}
	},
	methods: {
		gameSystemId() {
			this.notImplementedError();
		},
		secondaryFormat(number) {
			return number;
		}
	}
};
</script>
