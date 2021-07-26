<script>
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

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
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription(id) {
			const correlationId = this.correlationId();
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, this.serviceGameSystem.boonDescriptionById(correlationId, id, GlobalUtility.$store)));
		},
		boonName(id) {
			return this.serviceGameSystem.boonNameById(this.correlationId(), id, GlobalUtility.$store);
		},
		boonUses(id) {
			return this.serviceGameSystem.boonUsesById(this.correlationId(), id, GlobalUtility.$store);
		},
		dialogBoonOpen() {
			this.$emit('dialog-edit', this.value);
		},
		getGameSystemName(id) {
			const results = GlobalUtility.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initializeLookups(correlationId) {
			if (!this.serviceGameSystem)
				return [];
			return this.serviceGameSystem.initializeLookups(correlationId, GlobalUtility.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		locationName(id, at) {
			const location = AppUtility.settings().getSettingsUserLocation(this.correlationId(), GlobalUtility.$store.state.user.user, id);
			return location ? (at ? '@ ' : '') + location.name : '';
		},
		scenarioName(value) {
			return this.serviceGameSystem.determineScenarioName(this.correlationId(), value, GlobalUtility.$store);
		}
	}
};
</script>

<style scoped>
</style>

<style>
</style>
