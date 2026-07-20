<script>
import { ref } from 'vue';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

// App-specific open-source dependencies. The @thzero/* libraries are loaded automatically
// by VtOpenSource via the generated 'open-source-config' (see vite.config.js), so only
// skick's own direct dependencies are listed here.
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
			name: 'async-mutex',
			url: 'https://github.com/DirtyHairy/async-mutex',
			licenseName: 'MIT',
			licenseUrl: 'https://github.com/DirtyHairy/async-mutex/blob/master/LICENSE'
		},
		{
			category: 'client',
			name: 'decimal.js-light',
			url: 'https://github.com/MikeMcl/decimal.js-light',
			licenseName: 'MIT',
			licenseUrl: 'https://github.com/MikeMcl/decimal.js-light/blob/master/LICENCE.md'
		},
		{
			category: 'client',
			name: 'thenBy.js',
			url: 'https://github.com/Teun/thenBy.js',
			licenseName: 'Apache License 2.0',
			licenseUrl: 'https://github.com/Teun/thenBy.js/blob/master/LICENSE.TXT'
		},
		{
			category: 'client',
			name: 'vuetify',
			url: 'https://github.com/vuetifyjs/vuetify',
			licenseName: 'MIT',
			licenseUrl: 'https://github.com/vuetifyjs/vuetify/blob/master/LICENSE.md'
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
