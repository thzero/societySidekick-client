<script>
import AppUtility from '@/utility/app';

import baseEdit from '@/components/baseEdit';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BaseCharacterScenario',
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
		hasBoons() {
			return this.value.boon1Id || this.value.boon2Id;
		},
		isInitial() {
			return this.rulesGameSystem.calculateCharacterScenarioInitial(this.correlationId(), this.value);
		},
		scenarioLevel() {
			return this.value.level;
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups(this.correlationId());
	},
	methods: {
		boonName(id) {
			return this.serviceGameSystem.boonNameById(this.correlationId(), id, this.$store);
		},
		factionName(id) {
			return this.serviceGameSystem.factionNameById(this.correlationId(), id, this.$store);
		},
		dialogScenarioOpen() {
			this.$emit('dialog-edit', this.value);
		},
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initializeLookups(correlationId) {
			return this.serviceGameSystem.initializeLookups(correlationId, this.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		locationName(id) {
			const location = AppUtility.settings().getSettingsUserLocation(this.correlationId(), this.$store.state.user.user, id);
			return location ? '@ ' + location.name : '';
		},
		scenarioParticipantName(id) {
			return this.serviceGameSystem.scenarioLookupParticipantName(this.correlationId(), id, this.lookups);
		},
		scenarioStatusName(id) {
			return this.serviceGameSystem.scenarioLookupStatusName(this.correlationId(), id, this.lookups);
		},
		scenarioName(value) {
			return this.serviceGameSystem.determineScenarioName(this.correlationId(), value, this.$store);
		},
		scenarioDescription(value) {
			return this.serviceGameSystem.determineScenarioDescription(this.correlationId(), value, this.$store);
		},
		statusName(value) {
			return this.serviceGameSystem.characterLookupStatusName(this.correlationId(), value, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>

<style>
	.text-top {
		vertical-align: top;
	}
	.v-expansion-panel-content__wrap {
		padding-left: 0px;
		padding-right: 0px;
	}
	table.scenario {
		width: 100%;
	}
	td.scenario {
		padding-left: 4px;
		padding-bottom: 4px;
		padding-top: 4px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		vertical-align: middle;
	}
	th.scenario {
		padding-left: 4px;
		padding-bottom: 4px;
		padding-top: 4px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		vertical-align: middle;
	}
</style>
