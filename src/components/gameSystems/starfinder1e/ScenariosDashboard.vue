<template>
	<vue-fragment>
		<v-layout
			wrap
			pt-2
		>
			<v-flex
				xs12
				sm12
				md12
				lg12
				xl12
				pt-8
			>
				<CharacterDetails
					v-model="value"
					:editable="editable"
				/>
			</v-flex>
			<v-flex
				xs12
				sm12
				md12
				lg12
				xl12
				pt-8
			>
				<v-card
					class="mb-2"
				>
					<v-card-title
						class="pb-2"
					>
						<v-layout>
							<v-flex
								xs5
							>
								{{ $t('characters.scenarios.namePlural') }}
							</v-flex>
							<v-flex
								xs7
								style="text-align: right; padding-right: 45px;"
							>
								<!-- <VCollapseButton
									:value="false"
									:label="$t('buttons.collapseAll')"
								/>
								<VCollapseButton
									:value="true"
									:label="$t('buttons.expandAll')"
								/> -->
							</v-flex>
						</v-layout>
					</v-card-title>
					<v-card-text>
						<v-flex
							xs12
						>
							<v-fab-transition
								v-if="editable"
							>
								<v-btn
									absolute
									fab
									right
									top
									small
									dark
									color="green"
									@click="dialogScenarioNew()"
								>
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-fab-transition>
						</v-flex>
					</v-card-text>
				</v-card>
				<div
					v-for="item of scenarios"
					:key="item.id"
				>
					<Scenario
						:value="item"
						:character="value"
						:editable="editable"
						:collapse="collapseInner"
						@dialogEdit="dialogScenarioEdit"
					/>
				</div>
			</v-flex>
		</v-layout>
		<ScenarioDialog
			ref="scenarioDialog"
			v-model="dialogScenarioItem"
			:character="value"
			:label="$t('scenarios.name')"
			:signal="dialogScenario.signal"
			@cancel="dialogScenario.cancel()"
			@ok="dialogScenario.ok()"
		/>
	</vue-fragment>
</template>

<script>
import Constants from '@/constants';

import LibraryUtility from '@thzero/library_common/utility';

import baseScenarioDashboard from '@/components/gameSystems/baseScenarioDashboard';
import CharacterDetails from '@/components/gameSystems/starfinder1e/CharacterDetails';
import Scenario from '@/components/gameSystems/starfinder1e/Scenario';
import ScenarioDialog from '@/components/gameSystems/starfinder1e/ScenarioDialog';

export default {
	name: 'Starfinder1eScenarioDashboard',
	components: {
		CharacterDetails,
		Scenario,
		ScenarioDialog,
		// VCollapseButton
	},
	extends: baseScenarioDashboard,
	computed: {
		scenarios() {
			const results = this.value && this.value.scenarios ? this.value.scenarios : [];
			return LibraryUtility.sortByOrder(results, true);
		}
	},
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
