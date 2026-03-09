export const baseBaseMenuProps = {
	clickAbout: {
		type: Function,
		default: null
	},
	clickOpenSource: {
		type: Function,
		default: null
	},
	clickPrivcy: {
		type: Function,
		default: null
	},
	clickSignOut: {
		type: Function,
		default: null
	},
	clickSupport: {
		type: Function,
		default: null
	},
	displaySignIn: {
		type: Boolean,
		default: false
	},
	features: {
		type: Object,
		default: {}
	},
	info: {
		type: Array,
		default: []
	},
	isLoggedIn: {
		type: Boolean,
		default: false
	},
	tools: {
		type: Array,
		default: []
	}
};
