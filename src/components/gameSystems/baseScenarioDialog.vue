<script>
import Utility from '@thzero/library_common/utility';
import AppUtility from '@/utility/app';
import VueUtility from '@/library_vue/utility';

import VDateTimeFieldWithValidation from '@/library_vue/components/form/VDateTimeFieldWithValidation';
import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

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
		innerValue: null,
		isNew: false,
		lookups: {},
		rulesGameSystem: null,
		scenarioName: null,
		scenarios: [],
		serviceGameSystem: null,
		steps: 1,
		timeFormat: DEFAULT_TIME_FORMAT
	}),
	computed: {
		boons: {
			get: function () {
				const results = this.serviceGameSystem.boons(this.$store, true);
				const scenarioId = this.innerValue ? this.innerValue.scenarioId : null;
				const results2 = results ? results.filter(l => l.scenarioId == scenarioId) : [];
				return VueUtility.selectBlank(results2);
			},
			cache: false
		},
		factions() {
			return this.serviceGameSystem.factions(this.$store, true);
		},
		locations() {
			return VueUtility.selectBlank(Utility.sortByName(AppUtility.settings().getSettingsUserLocations(this.$store.state.user.user), true));
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
		this.initializeServices();
		this.innerValue = this.initScenario();
		this.lookups = await this.initializeLookups();
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		async close() {
		},
		dialogScenariosOk(id) {
			this.$set(this.innerValue, 'scenarioId', id);
			this.scenarioName = this.serviceGameSystem.determineScenarioNameById(id, this.$store);
			this.dialogScenariosOkI(id);
			this.experiencePointsEarned = this.rulesGameSystem.calculateScenarioExperiencePointsEarned(this.innerValue);
			this.dialogScenarios.ok();
		},
		// eslint-disable-next-line
		dialogScenariosOkI(id) {
		},
		async dialogScenariosOpen() {
			await this.$refs.scenarioLookup.reset();
			this.dialogScenarios.open();
		},
		gameSystemId() {
			this.notImplementedError();
		},
		initializeLookups() {
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initResponse() {
			const details = {
				experiencePointsEarned: this.rulesGameSystem.clean(this.innerValue.experiencePointsEarned),
				currencyEarned: this.rulesGameSystem.cleanDecimal(this.innerValue.currencyEarned),
				currencyIncomeEarned: this.rulesGameSystem.cleanDecimal(this.innerValue.currencyIncomeEarned),
				currencySpent: this.rulesGameSystem.cleanDecimal(this.innerValue.currencySpent),
				locationId: this.innerValue.locationId,
				scenarioParticipant: this.innerValue.scenarioParticipant,
				scenarioStatus: this.innerValue.scenarioStatus
			};
			return this.initResponseDetails(details);
		},
		initResponseDetails(details) {
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
			this.rulesGameSystem.calculateScenario(newValue);
		},
		async preComplete() {
			const scenario = this.initResponse();
			scenario.id = this.innerValue.id;
			scenario.gameSystemId = this.gameSystemId();
			scenario.order = this.innerValue.order;
			scenario.scenarioId = this.innerValue.scenarioId;
			scenario.status = this.innerValue.status;
			scenario.timestamp = this.innerValue.timestamp;
			scenario.updatedTimestamp = this.character.updatedTimestamp;
			const response = await this.$store.dispatcher.characters.updateCharacterScenario(this.character.id, scenario);
			this.logger.debug(response);
			return response;
		},
		async preCompleteResponseDelete() {
			return await this.$store.dispatcher.characters.deleteCharacterScenario(this.character.id, this.innerValue.id);
		},
		async resetDialog(value) {
			this.steps = 1;
			value.timestamp = value.timestamp ? Utility.convertTimestampToLocal(value.timestamp).valueOf() : Utility.getTimestampLocal().valueOf();
			this.experiencePointsEarned = value ? value.experiencePointsEarned : 0;
			this.scenarioName = this.serviceGameSystem.determineScenarioName(value, this.$store);
			await this.resetDialogI(value);
			this.isNew = value && !value.id;
			this.innerValue = value;
		},
		// eslint-disable-next-line
		async resetDialogI(value) {
		}
	}
};
</script>
