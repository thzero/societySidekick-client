<script>
import LibraryConstants from '@thzero/library_client/constants';

import Response from '@thzero/library_common/response';

import VConfirmationDialog from './VConfirmationDialog';
import VFormControl from './form/VFormControl';
import VTextFieldWithValidation from './form/VTextFieldWithValidation';

export default {
	name: 'BaseSettings',
	components: {
		VConfirmationDialog,
		VFormControl,
		VTextFieldWithValidation
	},
	extends: VFormControl,
	data: () => ({
		fab: false,
		requestReset: 0,
		serviceUsers: null,
		snackbar: false,
		timeout: 2000
	}),
	computed: {
		hasPicture() {
			return (this.user != null && this.user.external.picture != null && this.user.external.picture !== '');
		},
		name() {
			return (this.user != null && this.user.external.name != null ? this.user.external.name : '');
		},
		picture() {
			return (this.user != null && this.user.external.picture != null ? this.user.external.picture : null);
		},
		user() {
			return this.$store.state.user.user;
		}
	},
	async created() {
		await this.reset();
		this.serviceUsers = this.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
	},
	async mount() {
		await this.reset();
	},
	methods: {
		async cancel() {
			await this.reset();
		},
		async close() {
		},
		async ok() {
			this.snackbar = true;
			return true;
		},
		async open() {
			this.fieldType = null;
			this.name = '';
		},
		async preCompleteI() {
		},
		async preComplete() {
			const responses = [];

			await this.preCompleteI(responses);

			const response = Response.success();
			for (let item of responses)
				response.success &= item.success;
			return response;
		},
		reset() {
			let self = this;
			setTimeout(() => {
				self.resetI();
			},
			150);
		},
		resetI() {
		}
	}
};
</script>
