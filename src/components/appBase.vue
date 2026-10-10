<script>
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseAppComponent } from '@thzero/library_client_vue3/components/baseApp';
import { useThemeComponent } from '@thzero/library_client_vue3_vuetify3/components/theme';

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

	useThemeComponent(props, context);

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
