<script>
import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@thzero/library_client_vue/utility';

import VDateTimeFieldWithValidation from '@/library_vue_vuetify/components/form/VDateTimeFieldWithValidation';
import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

import DialogSupport from '@/library_vue/components/support/dialog';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

export default {
	name: 'BaseScenarioDialog',
	components: {
		VDateTimeFieldWithValidation,
		VFormDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	props: {
		character: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		dateFormat: DEFAULT_DATE_FORMAT,
		dateTimeFormat: DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT,
		dialogScenarios: new DialogSupport(),
		initialized: false,
		innerValue: null,
		isNew: false,
		lookups: {},
		previousValue: null,
		rulesGameSystem: null,
		scenarionType: null,
		scenarioName: null,
		scenarios: [],
		serviceGameSystem: null,
		steps: 1,
		timeFormat: DEFAULT_TIME_FORMAT
	}),
	computed: {
		boons: {
			get: function () {
				const results = this.serviceGameSystem.boons(this.correlationId(), GlobalUtility.$store, true);
				const scenarioId = this.innerValue ? this.innerValue.scenarioId : null;
				const results2 = results ? results.filter(l => l.scenarioId == scenarioId) : [];
				return VueUtility.selectBlank(results2);
			},
			cache: false
		},
		factions() {
			return this.serviceGameSystem.factions(this.correlationId(), GlobalUtility.$store, true);
		},
		locations() {
			return VueUtility.selectBlank(LibraryUtility.sortByName(AppUtility.settings().getSettingsUserLocations(this.correlationId(), GlobalUtility.$store.state.user.user), true));
		},
		outputType() {
			return 'timestamp';
		},
		status() {
			return this.lookups.characterStatus;
		}
	},
	watch: {
		innerValue: {
			handler(newValue) {
				this.onChange(newValue);
			},
			deep: true
		}
	},
	async created() {
		this.initialized = false;
		this.initializeServices();
		this.innerValue = this.initScenario();
		this.lookups = await this.initializeLookups(this.correlationId());
		this.initialized = true;
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		async close() {
		},
		dialogScenariosOk(id) {
			const correlationId = this.correlationId();
			this.$set(this.innerValue, 'scenarioId', id);
			this.$set(this.innerValue, 'scenario', GlobalUtility.$store.getters.getScenario(id));

			this.rulesGameSystem.calculateScenario(correlationId, this.innerValue);
			this.scenarioName = this.serviceGameSystem.determineScenarioName(correlationId, this.innerValue, GlobalUtility.$store);

			this.dialogScenariosOkI(this.correlationId(), id);

			this.dialogScenarios.ok();
		},
		// eslint-disable-next-line
		dialogScenariosOkI(correlationId, id) {
		},
		async dialogScenariosOpen() {
			await this.$refs.scenarioLookup.reset(this.correlationId(), null);
			this.dialogScenarios.open();
		},
		gameSystemId() {
			this.notImplementedError();
		},
		initializeLookups(correlationId) {
			return this.serviceGameSystem.initializeLookups(correlationId, GlobalUtility.$injector);
		},
		initResponse() {
			const details = {
				experiencePointsEarned: this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.innerValue.experiencePointsEarned)),
				currencyEarned: this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.innerValue.currencyEarned)),
				currencyIncomeEarned: this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.innerValue.currencyIncomeEarned)),
				currencySpent: this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.innerValue.currencySpent)),
				locationId: this.innerValue.locationId,
				scenarioParticipant: this.innerValue.scenarioParticipant,
				scenarioStatus: this.innerValue.scenarioStatus
			};
			return this.initResponseDetails(this.correlationId(), details);
		},
		initResponseDetails(correlationId, details) {
			return details;
		},
		initializeServices() {
			this.notImplementedError();
		},
		async ok() {
			this.$emit('ok', this.innerValue);
			return true;
		},
		onChange(newValue) {
			if (!this.initialized)
				return;

			let recalculateScenario = (this.previousValue == null);
			if (this.previousValue)
				recalculateScenario = (this.previousValue.scenarioId != newValue.scenarioId);

			const correlationId = this.correlationId();
			// this.experiencePointsEarned = newValue ? newValue.experiencePointsEarned : 0;
			recalculateScenario = this.onChangeI(correlationId, newValue, recalculateScenario);

			if (recalculateScenario)
				this.rulesGameSystem.calculateScenario(correlationId, newValue);

			this.previousValue = this.clone(newValue);
		},
		// eslint-disable-next-line
		onChangeI(correlationId, newValue, recalculateScenario) {
			return recalculateScenario;
		},
		async preComplete(correlationId) {
			const scenario = this.initResponse();
			scenario.id = this.innerValue.id;
			scenario.gameSystemId = this.gameSystemId();
			scenario.order = this.innerValue.order;
			scenario.scenarioId = this.innerValue.scenarioId;
			scenario.status = this.innerValue.status;
			scenario.timestamp = this.innerValue.timestamp;
			scenario.updatedTimestamp = this.character.updatedTimestamp;
			const response = await GlobalUtility.$store.dispatcher.characters.updateCharacterScenario(correlationId, this.character.id, scenario);
			this.logger.debug('BaseScenarioDialog', 'preComplete', 'response', response, correlationId);
			return response;
		},
		async preCompleteResponseDelete(correlationId) {
			return await GlobalUtility.$store.dispatcher.characters.deleteCharacterScenario(correlationId, this.character.id, this.innerValue.id);
		},
		async resetDialog(correlationId, value) {
			this.steps = 1;
			value.timestamp = value.timestamp ? LibraryUtility.convertTimestampToLocal(value.timestamp).valueOf() : LibraryUtility.getTimestampLocal().valueOf();
			this.scenarioName = this.serviceGameSystem.determineScenarioName(correlationId, value, GlobalUtility.$store);

			// let scenarios = GlobalUtility.$store.state.scenarios.listing;
			// value.scenario = scenarios.find(l => l.id === value.scenarioId);
			value.scenario = GlobalUtility.$store.getters.getScenario(value.scenarioId);
			// this.rulesGameSystem.calculateScenario(correlationId, value);

			await this.resetDialogI(correlationId, value);
			this.isNew = value && !value.id;
			this.previousValue = this.clone(value);
			this.innerValue = value;
		},
		// eslint-disable-next-line
		async resetDialogI(correlationId, value) {
		}
	}
};
</script>
