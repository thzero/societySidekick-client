<script>
import { computed, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseMainLayout } from '@thzero/library_client_vue3/layouts/baseMainLayout';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export function useAppMainLayout(props, context, options) {
	const serviceFeatures = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_FEATURES);

	const {
		correlationId,
		error,
		hasFailed,
		hasSucceeded,
		initialize,
		logger,
		noBreakingSpaces,
		notImplementedError,
		success,
		features,
		closeOnContentClick,
		clickAbout,
		clickOpenSource,
		clickPrivcy,
		clickSignIn,
		clickSignOut,
		clickSupport,
		dialogSignOut,
		dialogSignOutOk,
		displayDrawer,
		displayFooter,
		isAuthCompleted,
		isLoggedIn,
		serviceAuth,
		serviceStore,
		toggleDrawer
	} = useBaseMainLayout(props, context, {
		displayFooter: !serviceFeatures.features().MobileOnly
	});

	const serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	const dialogDisplayMarkupSignal = ref(new DialogSupport());
	const displayMarkupValue = ref(null);

	const displaySignIn = computed(() => {
		return !isLoggedIn.value && serviceFeatures.features().Auth;
	});

	const clickCards = () => {
		window.open('/#/cards', '_blank');
	};
	const clickFavorites = () => {
		LibraryClientUtility.$navRouter.push('/favorites');
	};
	const dialogDisplayMarkupCancel = async () => {
		dialogDisplayMarkupSignal.value.cancel();
	};
	const dialogDisplayMarkupOk = async () => {
		dialogDisplayMarkupSignal.value.ok();
	};
	const markup = (correlationId, value) => {
		displayMarkupValue.value = value ? serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, value)) : null;
	};

	LibraryClientUtility.$EventBus.on('display-markup', (value) => {
		markup(correlationId(), value);
		dialogDisplayMarkupSignal.value.open();
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
		features,
		closeOnContentClick,
		clickAbout,
		clickOpenSource,
		clickPrivcy,
		clickSignIn,
		clickSignOut,
		clickSupport,
		dialogSignOut,
		dialogSignOutOk,
		displayDrawer,
		displayFooter,
		isAuthCompleted,
		isLoggedIn,
		serviceAuth,
		serviceStore,
		toggleDrawer,
		displaySignIn,
		clickCards,
		clickFavorites,
		dialogDisplayMarkupCancel,
		dialogDisplayMarkupOk,
		dialogDisplayMarkupSignal,
		displayMarkupValue,
		markup
	};
};
</script>
