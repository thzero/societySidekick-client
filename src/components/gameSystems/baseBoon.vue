<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

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
			let uses = this.boonUses(this.correlationId(), this.value.boonId);
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
		this.lookups = this.initializeLookups(this.correlationId());
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription(id) {
			const correlationId = this.correlationId();
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, this.serviceGameSystem.boonDescriptionById(correlationId, id, this.$store)));
		},
		boonName(id) {
			return this.serviceGameSystem.boonNameById(this.correlationId(), id, this.$store);
		},
		boonUses(id) {
			return this.serviceGameSystem.boonUsesById(this.correlationId(), id, this.$store);
		},
		dialogBoonOpen() {
			this.$emit('dialog-edit', this.value);
		},
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initializeLookups(correlationId) {
			if (!this.serviceGameSystem)
				return [];
			return this.serviceGameSystem.initializeLookups(correlationId, this.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		locationName(id, at) {
			const location = AppUtility.settings().getSettingsUserLocation(this.correlationId(), this.$store.state.user.user, id);
			return location ? (at ? '@ ' : '') + location.name : '';
		},
		scenarioName(value) {
			return this.serviceGameSystem.determineScenarioName(this.correlationId(), value, this.$store);
		}
	}
};
</script>

<style scoped>
</style>

<style>
</style>
