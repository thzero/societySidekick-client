<template>
	<div>
		<h1>Welcome, {{ name }}</h1>
		<div>
			<img
				v-if="hasPicture"
				:src="picture"
				class="responsive"
			>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export default {
	name: 'Profile',
	setup(props, context) {
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
			successResponse
		} = useBaseComponent(props, context);

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		const user = computed(() => {
			return serviceStore.user;
		});
		const hasPicture = computed(() => {
			return (user.value != null && user.value.external != null && !String.isNullOrEmpty(user.value.external.picture));
		});
		const name = computed(() => {
			return (user.value != null && user.value.external != null && user.value.external.name != null ? user.value.external.name : '');
		});
		const picture = computed(() => {
			return (user.value != null && user.value.external != null && user.value.external.picture != null ? user.value.external.picture : null);
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
			successResponse,
			hasPicture,
			name,
			picture,
			serviceStore,
			user
		};
	}
};
</script>

<style scoped>
</style>
