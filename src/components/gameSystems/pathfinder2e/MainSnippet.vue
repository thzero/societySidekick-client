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
// import GameSystemsUtility from '@/utility/gameSystems';

import baseMainSnippet from '@/components/gameSystems/baseMainSnippet';

export default {
	name: 'Pathfinder2eMainSnippet',
	extends: baseMainSnippet,
	computed: {
		gameSystemNumber() {
			const doh = AppUtility.settings().getSettingsUserGameSystem(this.$store.state.user.user, SharedConstants.GameSystems.Pathfinder2e.id, (settings) => { return settings.achievementPoints; });
			return doh;
			// return GameSystemsUtility.gameSystemNumber(this.$store.state.user.user, SharedConstants.GameSystems.Pathfinder2e.id);
		}
	},
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
