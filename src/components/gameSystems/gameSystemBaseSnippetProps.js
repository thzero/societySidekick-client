// Shared props for gameSystem snippet components. In the Composition API the old
// Options-API `extends` no longer carries props down the chain, so each snippet component
// spreads these into its own `props` (mirrors the library's baseXProps.js convention).
export default {
	externalListType: {
		type: String,
		default: null
	},
	user: {
		type: Object,
		default: null
	},
	value: {
		type: [Object, String],
		default: null
	}
};
