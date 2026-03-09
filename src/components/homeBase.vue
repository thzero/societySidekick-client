<script>
import { computed, onMounted, ref } from 'vue';

import AppSharedConstants from '@/utility/constants';
import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export function useHomeBaseComponent(props, context, options) {
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

	const initializeCompleted = ref(false);

	const appTitle = LibraryClientUtility.$trans.t('titles.application');
	const websiteUrl = `<a href="" target="_blank">${appTitle}</a>`;

	const hasContent = computed(() => {
		const content = serviceStore.getters.getContent();
		return content && content.length > 0;
	});
	const hasContentInfo = computed(() => {
		const content = serviceStore.getters.getContentInfo();
		return content && content.length > 0;
	});
	const info = computed(() => {
		let info = serviceStore.getters.getContentInfo();
		return info.sort((a, b) => a.order >= b.order);
	});
	const isLoggedIn = computed(() => {
		return serviceStore.user && serviceStore.userAuthIsLoggedIn;
	});
	const newsCount = computed(() => {
		if (!serviceStore.news.latest)
			return 0;

		const news = serviceStore.news.latest.slice(0);
		return news.length;
	});
	const user = computed(() => {
		return serviceStore.user;
	});
	const userDisplayName = computed(() => {
		return LibraryClientUtility.userDisplayName(correlationId(), serviceStore.user);
	});
	
	const clickUrl = async (url) => {
		if (!url)
			return;
		LibraryClientUtility.$navRouter.push(url);
	};
	const contentDescription = (item,) => {
		return (item.markup ? item.description : LibraryClientUtility.$trans.t(item.description));
	};
	const contentLink = (item,) => {
		if (item.markup)
			return `/content/info/${item.id}`;

		return item.link;
	};
	const contentTitle = (item,) => {
		return (item.markup ? item.title : LibraryClientUtility.$trans.t(item.title));
	};
	const webSiteInject = (value) => {
		return value ? value.replace('[url]', websiteUrl) : '';
	};

	LibraryClientUtility.$EventBus.on('initialize-completed', (value) => {
		initializeCompleted.value = value;
	});

	let timeout = null;

	onMounted(async () => {
		initializeCompleted.value = false;
		try {
			const correlationIdI = correlationId();

			timeout = setTimeout(function () {
				initializeCompleted.value = true;
				clearTimeout(timeout);
			}, AppSharedConstants.Overlay.Timeout);

			await Promise.all([
				LibraryClientUtility.$store.dispatcher.news.getLatest(correlationIdI),
				serviceStore.dispatcher.requestContent(correlationIdI)
			]);
		}
		finally {
			initializeCompleted.value = true;
			clearTimeout(timeout);
		}
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
		serviceStore,
		features,
		initializeCompleted,
		clickUrl,
		contentDescription,
		contentLink,
		contentTitle,
		hasContent,
		hasContentInfo,
		info,
		isLoggedIn,
		newsCount,
		user,
		userDisplayName,
		webSiteInject
	};
};
</script>
