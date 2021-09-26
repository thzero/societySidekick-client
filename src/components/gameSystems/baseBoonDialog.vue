<script>
import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import VDateTimeFieldWithValidation from '@/library_vue_vuetify/components/form/VDateTimeFieldWithValidation';
import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

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
			return LibraryUtility.selectBlank(LibraryUtility.sortByName(AppUtility.settings().getSettingsUserLocations(this.correlationId(), GlobalUtility.$store.state.user.user), true));
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
		const correlationId = this.correlationId();
		this.initializeServices();
		this.innerValue = this.initBoon(correlationId);
		this.lookups = await this.initializeLookups(correlationId);
	},
	methods: {
		// eslint-disable-next-line
		async cancel() {
			this.$emit('cancel');
		},
		// eslint-disable-next-line
		async close() {
		},
		// eslint-disable-next-line
		dialogBoonsOk(id) {
			const correlationId = this.correlationId();
			this.$set(this.innerValue, 'boonId', id);
			this.boonName = this.serviceGameSystem.boonNameById(correlationId, id, GlobalUtility.$store);
			this.dialogBoonsOkI(correlationId, id);
			this.dialogBoons.ok(correlationId);
		},
		// eslint-disable-next-line
		dialogBoonsOkI(correlationId, id) {
		},
		async dialogBoonsOpen() {
			await this.$refs.boonLookup.reset(this.correlationId(), null);
			this.dialogBoons.open();
		},
		gameSystemId() {
			this.notImplementedError();
		},
		// eslint-disable-next-line
		initBoon(correlationId) {
			this.notImplementedError();
		},
		initializeLookups(correlationId) {
			return this.serviceGameSystem.initializeLookups(correlationId, GlobalUtility.$injector);
		},
		initResponse() {
			const details = {
				boonId: this.innerValue.boonId,
				locationId: this.innerValue.locationId
			};
			return this.initResponseDetails(this.correlationId(), details);
		},
		initResponseDetails(correlationId, details) {
			return details;
		},
		initializeServices() {
			this.notImplementedError();
		},
		// eslint-disable-next-line
		async ok() {
			this.$emit('ok', this.innerValue);
			return true;
		},
		// eslint-disable-next-line
		onChange(newValue) {
		},
		async preComplete(correlationId) {
			const boon = this.initResponse(correlationId);
			boon.id = this.innerValue.id;
			boon.gameSystemId = this.gameSystemId();
			boon.boonId = this.innerValue.boonId;
			boon.timestamp = this.innerValue.timestamp;
			boon.updatedTimestamp = this.character.updatedTimestamp;
			const response = await GlobalUtility.$store.dispatcher.characters.updateCharacterBoon(correlationId, this.character.id, boon);
			this.logger.debug('BaseBoonDialog', 'preComplete', 'response', response, correlationId);
			return response;
		},
		async preCompleteResponseDelete(correlationId) {
			return await GlobalUtility.$store.dispatcher.characters.deleteCharacterBoon(correlationId, this.character.id, this.innerValue.id);
		},
		async resetDialog(correlationId, value) {
			this.steps = 1;
			value.timestamp = value.timestamp ? LibraryUtility.convertTimestampToLocal(value.timestamp).valueOf() : LibraryUtility.getTimestampLocal().valueOf();
			await this.resetDialogI(correlationId, value);
			this.isNew = value && !value.id;
			this.innerValue = value;
		},
		// eslint-disable-next-line
		async resetDialogI(correlationId, value) {
		}
	}
};
</script>
