<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useBaseMenuComponent(props, context, options) {
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

	const serviceFeatures = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_FEATURES);
	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	let featuresTemp = (serviceFeatures ? serviceFeatures.features() : null);
	featuresTemp = (featuresTemp ? featuresTemp : (options ? options.features : null));
	featuresTemp = (featuresTemp ? featuresTemp : {});

	const features = ref(featuresTemp);

	const info = computed(() => {
		let info = serviceStore.getters.getContentInfo();
		return info.sort((a, b) => a.order >= b.order);
	});
	const isLoggedIn = computed(() => {
		return serviceStore.user != null ? serviceStore.userAuthIsLoggedIn : false;
	});

	const clickSignIn = (item,) => {
		context.emit('clickSignIn');
	};
	const clickSignOut = (item,) => {
		context.emit('clickSignOut');
	};
	const contentLink = (item,) => {
		if (item.markup)
			return `/content/info/${item.id}`;

		return item.link;
	};
	const contentTitle = (item,) => {
		return (item.markup ? item.title : LibraryClientUtility.$trans.t(item.title));
	};

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
		info,
		isLoggedIn,
		clickSignIn,
		clickSignOut,
		contentLink,
		contentTitle
	};
};
</script>
