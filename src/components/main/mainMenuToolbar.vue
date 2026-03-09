<template>
	<!-- <v-menu
		v-if="$vuetify.display.mdAndUp && info && info.length > 0"
	>
		<template v-slot:activator="{ props }">
			<v-btn append-icon="mdi-menu-down"
				v-bind="props"
			>{{ $t('menu.content.info.title') }}</v-btn>
		</template>
		<v-list density="compact">
			<v-list-item
				v-for="item in info"
				:key="item.name"
				:to="contentLink(item)"
			>
				<v-list-item-title>{{ contentTitle(item) }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>  -->
</template>

<script>
import { useBaseMenuComponent } from '@/components/main/baseMenu';
import { baseBaseMenuProps } from '@/components/main/baseBaseMenuProps';

export default {
	name: 'ManuMenu',
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
			isLoggedIn,
			clickSignIn,
			clickSignOut,
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
			isLoggedIn,
			clickSignIn,
			clickSignOut,
			contentLink,
			contentTitle
		};
	}
};
</script>

<style scoped>
</style>
