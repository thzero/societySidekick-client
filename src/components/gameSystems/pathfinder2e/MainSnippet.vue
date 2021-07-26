<template>
	<v-chip
		color="success"
		outlined
		label
	>
		{{ $t('characters.gameSystems.pathfinder2e.achievementPoints') }}: {{ gameSystemNumber }}
	</v-chip>
</template>

<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
// import GameSystemsUtility from '@/utility/gameSystems';

import baseMainSnippet from '@/components/gameSystems/baseMainSnippet';

export default {
	name: 'Pathfinder2eMainSnippet',
	extends: baseMainSnippet,
	computed: {
		gameSystemNumber() {
			const number = AppUtility.settings().getSettingsUserGameSystem(this.correlationId(), GlobalUtility.$store.state.user.user, SharedConstants.GameSystems.Pathfinder2e.id, (settings) => { return settings.achievementPoints; });
			return number;
			// return GameSystemsUtility.gameSystemNumber(this.correlationId(), GlobalUtility.$store.state.user.user, SharedConstants.GameSystems.Pathfinder2e.id);
		}
	},
	methods: {
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
