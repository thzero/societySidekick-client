<template>
	<vue-fragment>
		<VSelect2
			ref="scenarioAdventures"
			v-model="scenarioAdventureFilter"
			:items="scenarioAdventures"
			:flat="true"
			:hide-details="true"
			:solo-inverted="true"
			:label="$t('characters.gameSystems.pathfinder2e.scenarios.adventure')"
		/>
	</vue-fragment>
</template>

<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';
import Pathfinder2eSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import baseFilter from '@/components/baseFilter';

import VSelect2 from '@/library_vue_vuetify/components/form/VSelect';

export default {
	name: 'Pathfinder2eScenarioListFiltering',
	components: {
		VSelect2
	},
	extends: baseFilter,
	props: {
		value: {
			type: Number,
			default: 0
		}
	},
	data: () => ({
		scenarioAdventureFilterOverride: null
	}),
	computed: {
		scenarioAdventureFilter: {
			get: function () {
				if (this.externalList)
					return this.scenarioAdventureFilterOverride;

				return AppUtility.settings().getSettingsUserScenariosGameSystem(this.correlationId(), GlobalUtility.$store.state.user.user, SharedConstants.GameSystems.Pathfinder2e.id, (settings) => settings.scenarioAdventureFilter);
			},
			set: function (newVal) {
				if (this.externalList) {
					this.scenarioAdventureFilterOverride = newVal;
					this.$emit('input', this.value + 1);
					return;
				}

				AppUtility.settings().updateSettingsUserScenariosGameSystem(this.correlationId(), GlobalUtility.$store, GlobalUtility.$store.state.user.user, SharedConstants.GameSystems.Pathfinder2e.id, newVal, (settings) => { return settings.scenarioAdventureFilter = newVal; });
			}
		},
		scenarioAdventures() {
			const adventures = this.lookups.scenarioAdventures.filter(l => l.id !== Pathfinder2eSharedConstants.ScenarioAdventures.INITIAL);
			return LibraryUtility.selectBlank(adventures, GlobalUtility.$trans.t('characters.gameSystems.pathfinder2e.scenarios.adventure'));
		}
	},
	methods: {
		filterAdditional(scenario) {
			if (!scenario)
				return false;

			let valid = true;
			if (this.scenarioAdventureFilter && (scenario.type != this.scenarioAdventureFilter))
				valid &= false;

			return valid;
		},
		filterScenarioName(scenario, filter) {
			if (!scenario)
				return false;
			if (!filter)
				return true;

			const scenarioName = this.serviceGameSystem.scenarioName(this.correlationId(), scenario);
			return scenarioName.toLowerCase().indexOf(filter.toLowerCase()) === -1;
		},
		initializeServices() {
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
