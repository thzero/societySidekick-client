// Shared props for characterNameSnippet components (dispatcher + per-game-system leaves).
export default {
	value: {
		type: Object,
		default: null
	},
	user: {
		type: Object,
		default: null
	},
	fontName: {
		type: String,
		default: 'headline'
	},
	fontSecondary: {
		type: String,
		default: 'subtitle-1'
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
};
