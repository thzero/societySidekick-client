<template>
	<VtSelect
		ref="scenarioAdventuresRef"
		v-model="scenarioAdventureFilter"
		:items="scenarioAdventures"
		:flat="true"
		:hide-details="true"
		:solo-inverted="true"
		:label="$t('characters.gameSystems.pathfinder2e.scenarios.adventure')"
	/>
</template>

<script>
import { computed, ref } from 'vue';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';
import Pathfinder2eSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseFilterComponent } from '@/components/baseFilter';

import baseFilterProps from '@/components/baseFilterProps';

import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';

export default {
	name: 'Pathfinder2eScenarioListFiltering',
	components: {
		VtSelect
	},
	props: {
		...baseFilterProps,
		modelValue: {
			type: Number,
			default: 0
		}
	},
	emits: ['update:modelValue'],
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useBaseFilterComponent(props, context, { serviceGameSystem });

		const scenarioAdventureFilterOverride = ref(null);

		const scenarioAdventureFilter = computed({
			get() {
				if (props.externalList)
					return scenarioAdventureFilterOverride.value;
				return AppUtility.settings().getSettingsUserScenariosGameSystem(base.correlationId(), LibraryClientUtility.$store.user.user, SharedConstants.GameSystems.Pathfinder2e.id, (settings) => settings.scenarioAdventureFilter);
			},
			set(newVal) {
				if (props.externalList) {
					scenarioAdventureFilterOverride.value = newVal;
					context.emit('update:modelValue', props.modelValue + 1);
					return;
				}
				AppUtility.settings().updateSettingsUserScenariosGameSystem(base.correlationId(), LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, SharedConstants.GameSystems.Pathfinder2e.id, newVal, (settings) => { return settings.scenarioAdventureFilter = newVal; });
			}
		});
		const scenarioAdventures = computed(() => {
			const adventures = base.lookups.value.scenarioAdventures.filter(l => l.id !== Pathfinder2eSharedConstants.ScenarioAdventures.INITIAL);
			return LibraryCommonUtility.selectBlank(adventures, LibraryClientUtility.$trans.t('characters.gameSystems.pathfinder2e.scenarios.adventure'));
		});

		const filterAdditional = (scenario) => {
			if (!scenario)
				return false;

			let valid = true;
			if (scenarioAdventureFilter.value && (scenario.type != scenarioAdventureFilter.value))
				valid &= false;

			return valid;
		};
		const filterScenarioName = (scenario, filter) => {
			if (!scenario)
				return false;
			if (!filter)
				return true;

			const scenarioName = serviceGameSystem.scenarioName(base.correlationId(), scenario);
			return scenarioName.toLowerCase().indexOf(filter.toLowerCase()) === -1;
		};

		return {
			...base,
			scenarioAdventureFilterOverride,
			scenarioAdventureFilter,
			scenarioAdventures,
			filterAdditional,
			filterScenarioName
		};
	}
};
</script>

<style scoped>
</style>
