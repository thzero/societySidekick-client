<script>
import LibraryConstants from '@thzero/library/constants';

import Utility from '@thzero/library_common/utility';

import Response from '@thzero/library_common/response';

import NotImplementedError from '@thzero/library_common/errors/notImplemented';

export default {
	data: () => ({
		logger: null,
		utility: null,
		serverErrors: []
	}),
	async created() {
		this.utility = Utility;
		this.logger = this.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_LOGGER);
	},
	methods: {
		clone(value) {
			return Utility.cloneDeep(value);
		},
		error() {
			return Response.error();
		},
		getDateHuman(date) {
			return this.utility.getDateHuman(date);
		},
		noBreakingSpaces() {
			return '\xa0';
		},
		notImplementedError() {
			throw new NotImplementedError();
		},
		observerIsNull(value){
			return !value || Object.keys(value).length === 0;
		},
		success() {
			return Response.success();
		}
	}
};
</script>
