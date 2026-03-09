<script>
import { ref } from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useAppOpenSourceComponent(props, context, options) {
	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success
	} = useBaseComponent(props, context, options);

	const openSource = ref([
		{
			category: 'client',
			name: 'aircast-4g/mavlink',
			url: 'https://github.com/pavliha/aircast-mavlink',
			licenseName: 'MIT',
			licenseUrl: 'https://github.com/pavliha/aircast-mavlink/blob/master/LICENSE'
		},
		{
			category: 'client',
			name: 'async-mutex',
			url: 'https://github.com/DirtyHairy/async-mutex',
			licenseName: 'MIT',
			licenseUrl: 'https://github.com/DirtyHairy/async-mutex/blob/master/LICENSE'
		},
		{
			category: 'client',
			name: 'thenBy.js',
			url: 'https://github.com/Teun/thenBy.js',
			licenseName: 'Apache License 2.0',
			licenseUrl: 'https://github.com/Teun/thenBy.js/blob/master/LICENSE.TXT'
		}
	]);

	return {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		openSource
	};
};
</script>
