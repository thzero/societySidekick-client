<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library/constants';

import AppUtility from '@/utility/app';

import baseEdit from '@/components/baseEdit';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BaseCharacterBoon',
	extends: baseEdit,
	props: {
		value: {
			type: Object,
			default: () => {}
		},
		editable: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		dialogScenario: new DialogSupport(),
		lookups: [],
		rulesGameSystem: null,
		serviceGameSystem: null
	}),
	computed: {
		boonUsesArray() {
			let uses = this.boonUses(this.value.boonId);
			if (!uses)
				return [];

			uses = Number(uses);

			const output = [ ...Array(uses).keys() ].map( i => i+1);
			return output;
		},
		hasScenario() {
			return this.value ? this.value.scenario : null;
		},
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups();
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription(id) {
			return this._serviceMarkup.trimResults(this._serviceMarkup.render(this.serviceGameSystem.boonDescriptionById(id, this.$store)));
		},
		boonName(id) {
			return this.serviceGameSystem.boonNameById(id, this.$store);
		},
		boonUses(id) {
			return this.serviceGameSystem.boonUsesById(id, this.$store);
		},
		dialogBoonOpen() {
			this.$emit('dialogEdit', this.value);
		},
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initializeLookups() {
			if (!this.serviceGameSystem)
				return [];
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		locationName(id, at) {
			const location = AppUtility.settings().getSettingsUserLocation(this.$store.state.user.user, id);
			return location ? (at ? '@ ' : '') + location.name : '';
		},
		scenarioName(value) {
			return this.serviceGameSystem.determineScenarioName(value, this.$store);
		}
	}
};
</script>

<style scoped>
</style>

<style>
</style>
