// Shared props for gameSystem list components (CharacterList / ScenarioList).
export default {
	gameSystemFilterOverride: {
		type: String,
		default: null
	},
	externalListType: {
		type: String,
		default: null
	},
	user: {
		type: Object,
		default: null
	},
	value: {
		type: Array,
		default: null
	}
};
