<script>
import { onMounted } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility/index';

export function useMessageUrlComponent(props, context, options) {
	const serviceConfig = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_CONFIG);

	const messageUrlPost = (async () => {
		// let domain = '*';
		// if (!LibraryCommonUtility.isDev) {
		// 	const temp = serviceConfig.getBackend('domain');
		// 	domain = temp & String.isNullOrEmpty(temp.domain) ? temp.domain : domain;
		// }
		// const host = window.location.hash;
		// parent.postMessage(
		// 	host,
		// 	domain);
	});

	return {
		messageUrlPost
	};
};
</script>
