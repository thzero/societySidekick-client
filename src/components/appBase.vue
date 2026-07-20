<script>
import { useTheme } from 'vuetify';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseAppComponent } from '@thzero/library_client_vue3/components/baseApp';

export function useAppComponent(props, context, options) {
	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

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
					serviceStore.dispatcher.initialize(correlationId()),
					serviceStore.dispatcher.characters.initializeCharacters(correlationId())
				];
			}
		}
	);

	const theme = useTheme();
	const userTheme = () => {
		return !String.isNullOrEmpty(serviceStore.userTheme) ? serviceStore.userTheme : 'defaultTheme';
	};

	theme.global.name.value = userTheme();
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
		theme.global.name.value = userTheme() + 'Dark';

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		theme.global.name.value = userTheme() + (event.matches ? 'Dark' : '');
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
