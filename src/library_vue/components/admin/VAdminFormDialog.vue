<script>
import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

import VFormDialog from '../form/VFormDialog';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEFAULT_TIME_FORMAT = 'HH:mm';

export default {
	name: 'VAdminFormDialog',
	components: {
		VFormDialog
	},
	extends: VFormDialog,
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		dateFormat: DEFAULT_DATE_FORMAT,
		dateTimeFormat: DEFAULT_DATE_FORMAT + ' ' + DEFAULT_TIME_FORMAT,
		editorOptions: {
			hideModeSwitch: true
		},
		randomKey: -1,
		innerValue: {},
		timeFormat: DEFAULT_TIME_FORMAT
	}),
	computed: {
		outputType() {
			return 'timestamp';
		}
	},
	created() {
		this.initializeServices();
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		cleanup(value, isCreate) {
			delete value.timestamp;
			if (isCreate)
				delete value.updatedTimestamp;

			if (value.description) {
				value.description = value.description.replace(/’/g, '\'');
				value.description = value.description.replace(/“/g, '"');
				value.description = value.description.replace(/”/g, '"');
				value.description = value.description.replace(/–/g, '-');
			}
			if (value.name) {
				value.name = value.name.replace(/’/g, '\'');
				value.name = value.name.replace(/“/g, '"');
				value.name = value.name.replace(/”/g, '"');
				value.name = value.name.replace(/–/g, '-');
			}
		},
		initializeServices() {
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		async preComplete() {
			const value = this.innerValue;
			delete value._id;
			value.gameSystemId = this.gameSystemId;
			this.preCompleteI(value);
			const isUpdate = this.innerValue.id ? true : false;
			this.cleanup(value, !isUpdate);
			const response = isUpdate ?
				await this.preCompleteSubmitUpdate(this.$store.dispatcher, value) :
				await this.preCompleteSubmitCreate(this.$store.dispatcher, value);
			this.logger.debug('VAdminFormDialog', 'preComplete', 'response', response);
			return response;
		},
		// eslint-disable-next-line
		preCompleteI(value) {
		},
		// eslint-disable-next-line
		async preCompleteSubmitCreate(dispatcher, value) {
			throw new NotImplementedError();
		},
		// eslint-disable-next-line
		async preCompleteSubmitUpdate(dispatcher, value) {
			throw new NotImplementedError();
		},
		async resetDialog(value) {
			// forces random key gen so that the editor gets reset for each new item
			this.randomKey = VueUtility.randomKeyGen();
			if (value) {
				const temp = this.clone(value);
				temp.timestamp = temp.timestamp ? Utility.convertTimestampToLocal(temp.timestamp).valueOf() : Utility.getTimestampLocal().valueOf();
				temp.updatedTimestamp = temp.updatedTimestamp ? temp.updatedTimestamp : Utility.getTimestamp();
				this.gameSystemId = temp.gameSystemId;
				await this.resetDialogI(temp);
				this.innerValue = temp;
				return;
			}

			this.innerValue = null;
		},
		// eslint-disable-next-line
		async resetDialogI(value) {
		}
	}
};
</script>
