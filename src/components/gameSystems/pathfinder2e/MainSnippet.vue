<template>
	<v-chip
		color="success"
		variant="outlined"
		label
	>
		{{ $t('characters.gameSystems.pathfinder2e.achievementPoints') }}: {{ gameSystemNumber }}
	</v-chip>
</template>

<script>
import { computed } from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useGameSystemBaseMainSnippetComponent } from '@/components/gameSystems/baseMainSnippet';

export default {
	name: 'Pathfinder2eMainSnippet',
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useGameSystemBaseMainSnippetComponent(props, context, { serviceGameSystem });

		const gameSystemNumber = computed(() => {
			return AppUtility.settings().getSettingsUserGameSystem(base.correlationId(), LibraryClientUtility.$store.user.user, SharedConstants.GameSystems.Pathfinder2e.id, (settings) => { return settings.achievementPoints; });
		});

		return {
			...base,
			gameSystemNumber
		};
	}
};
</script>

<style scoped>
</style>
