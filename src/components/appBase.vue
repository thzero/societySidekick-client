<script>
import { useTheme } from 'vuetify';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseAppComponent } from '@thzero/library_client_vue3/components/baseApp';

export function useAppComponent(props, context, options) {
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
	} = useBaseAppComponent(
		props,
		context,
		{
			initializeI: async () => {
				return [
					serviceStore.dispatcher.initialize(correlationId())
				];
			}
		}
	);

	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	// const initialize = async () => {
	// 	return [
	// 		serviceStore.dispatcher.initialize(correlationId())
	// 	];
	// };

	const theme = useTheme();
	const userTheme = () => {
		return !String.isNullOrEmpty(serviceStore.userTheme) ? serviceStore.userTheme : 'defaultTheme';
	};

	theme.global.name.value = userTheme;
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		theme.global.name.value = userTheme() + 'Dark';
	}
	// theme.global.current.dark = darkMode;

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		const themeRequested = userTheme() + (event.matches ? 'Dark' : '');
		theme.global.name.value = themeRequested;
	});

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
		serviceStore
	};
};
</script>

<style>
	.flex-form-wrapper {
		display: flex; flex-direction: column;
	}
	.flex-form {
		display: block; height: calc(100vh - 200px); overflow-y: auto; overflow-x: hidden;
	}

	.v-card-text {
		padding-bottom: 2px !important;
	}
</style>
