<template>
	<v-row class="pt-2">
		<v-col
			cols="12"
			class="pt-8"
		>
			<CharacterDetails
				:value="value"
				:editable="editable"
			/>
		</v-col>
		<v-col
			cols="12"
			class="pt-8"
		>
			<v-card
				class="mb-2"
				style="position: relative; overflow: visible;"
			>
				<v-card-title
					class="pb-2"
				>
					<v-row>
						<v-col cols="5">
							{{ $t('characters.scenarios.namePlural') }}
						</v-col>
						<v-col
							cols="7"
							style="text-align: right; padding-right: 45px;"
						/>
					</v-row>
				</v-card-title>
				<v-fab-transition
					v-if="editable"
				>
					<v-btn
						icon="mdi-plus"
						size="small"
						color="green"
						style="position: absolute; right: 16px; top: 0; transform: translateY(-50%);"
						@click="dialogScenarioNew()"
					/>
				</v-fab-transition>
			</v-card>
		</v-col>
		<v-col
			v-for="item of scenarios"
			:key="item.id"
			cols="12"
		>
			<Scenario
				:value="item"
				:character="value"
				:editable="editable"
				:collapse="collapseInner"
				@dialog-edit="dialogScenarioEdit"
			/>
		</v-col>
		<ScenarioDialog
			ref="scenarioDialogRef"
			:character="value"
			:label="$t('scenarios.name')"
			:signal="dialogScenario.signal"
			@cancel="dialogScenario.cancel()"
			@ok="dialogScenario.ok()"
		/>
	</v-row>
</template>

<script>
import { computed } from 'vue';

import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseScenarioDashboardComponent } from '@/components/gameSystems/baseScenarioDashboard';

import CharacterDetails from '@/components/gameSystems/starfinder1e/CharacterDetails';
import Scenario from '@/components/gameSystems/starfinder1e/Scenario';
import ScenarioDialog from '@/components/gameSystems/starfinder1e/ScenarioDialog';

export default {
	name: 'Starfinder1eScenarioDashboard',
	components: {
		CharacterDetails,
		Scenario,
		ScenarioDialog
	},
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);

		const base = useBaseScenarioDashboardComponent(props, context, { serviceGameSystem });

		const scenarios = computed(() => {
			const results = props.value && props.value.scenarios ? props.value.scenarios : [];
			return LibraryCommonUtility.sortByOrder(results, true);
		});

		return {
			...base,
			scenarios
		};
	}
};
</script>

<style scoped>
</style>
