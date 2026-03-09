<template>
	<v-list density="compact">
		<v-list-item
			to="/"
		>
			<v-list-item-title>{{ $t('titles.home') }}</v-list-item-title>
		</v-list-item>
	</v-list>
</template>

<script>
import { useBaseMenuComponent } from '@/components/main/baseMenu';
import { baseBaseMenuProps } from '@/components/main/baseBaseMenuProps';

export default {
	name: 'MainMenuDrawer',
	props: {
		...baseBaseMenuProps
	},
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
			features,
			info,
			tools,
			isLoggedIn,
			contentLink,
			contentTitle
		} = useBaseMenuComponent(props, context);

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
			tools,
			isLoggedIn,
			contentLink,
			contentTitle
		};
	}
};
</script>

<style scoped>
</style>
