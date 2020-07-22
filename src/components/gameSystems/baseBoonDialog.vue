<script>
import Utility from '@thzero/library/utility';
import AppUtility from '@/utility/app';
import VueUtility from '@/library_vue/utility';

import VDateTimeFieldWithValidation from '@/library_vue/components/form/VDateTimeFieldWithValidation';
import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

import DialogSupport from '@/library_vue/components/support/dialog';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

export default {
	name: 'BaseBoonDialog',
	components: {
		VDateTimeFieldWithValidation,
		VFormDialog,
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
		boonName: null,
		dateFormat: DEFAULT_DATE_FORMAT,
		dateTimeFormat: DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT,
		dialogBoons: new DialogSupport(),
		innerValue: null,
		isNew: false,
		lookups: {},
		rulesGameSystem: null,
		serviceGameSystem: null,
		steps: 1,
		timeFormat: DEFAULT_TIME_FORMAT
	}),
	computed: {
		locations() {
			return VueUtility.selectBlank(Utility.sortByName(AppUtility.settings().getSettingsUserLocations(this.$store.state.user.user), true));
		},
		outputType() {
			return 'timestamp';
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
		this.innerValue = this.initBoon();
		this.lookups = await this.initializeLookups();
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		async close() {
		},
		dialogBoonsOk(id) {
			this.$set(this.innerValue, 'boonId', id);
			this.boonName = this.serviceGameSystem.boonNameById(id, this.$store);
			this.dialogBoonsOkI(id);
			this.dialogBoons.ok();
		},
		// eslint-disable-next-line
		dialogBoonsOkI(id) {
		},
		async dialogBoonsOpen() {
			await this.$refs.boonLookup.reset();
			this.dialogBoons.open();
		},
		gameSystemId() {
			this.notImplementedError();
		},
		initBoon() {
			this.notImplementedError();
		},
		initializeLookups() {
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initResponse() {
			const details = {
				boonId: this.innerValue.boonId,
				locationId: this.innerValue.locationId
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
		// eslint-disable-next-line
		onChange(newValue) {
		},
		async preComplete() {
			const boon = this.initResponse();
			boon.id = this.innerValue.id;
			boon.gameSystemId = this.gameSystemId();
			boon.boonId = this.innerValue.boonId;
			boon.timestamp = this.innerValue.timestamp;
			boon.updatedTimestamp = this.character.updatedTimestamp;
			const response = await this.$store.dispatcher.characters.updateCharacterBoon(this.character.id, boon);
			this.logger.debug(response);
			return response;
		},
		async preCompleteResponseDelete() {
			return await this.$store.dispatcher.characters.deleteCharacterBoon(this.character.id, this.innerValue.id);
		},
		async resetDialog(value) {
			this.steps = 1;
			value.timestamp = value.timestamp ? Utility.convertTimestampToLocal(value.timestamp).valueOf() : Utility.getTimestampLocal().valueOf();
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
