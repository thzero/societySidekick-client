<template>
	<VtFormDialog
		:label="$t('characters.scenarios.namePlural')"
		:signal="signal"
		:validation="validation"
		:button-clear="false"
		:button-ok="false"
		max-width="700px"
		@close="cancel"
	>
		<v-row
			class="pa-0"
		>
			<v-col
				cols="12"
				md="4"
				:class="{ 'pr-4': $vuetify.display.mdAndUp }"
			>
				<VtTextFieldWithValidation
					ref="scenarioNameRef"
					v-model="scenarioNameFilter"
					vid="scenarioName"
					:validation="validation"
					:label="$t('characters.scenarios.name') + ' ' + $t('forms.name')"
				/>
			</v-col>
			<v-col
				cols="12"
				sm="6"
				md="4"
				:class="{ 'pr-4': $vuetify.display.mdAndUp }"
			>
				<VtSelectWithValidation
					ref="scenarioSeasonRef"
					v-model="scenarioSeasonFilter"
					vid="scenarioSeason"
					:validation="validation"
					:items="scenariosSeasons"
					:label="$t('characters.scenarios.name') + ' ' + $t('characters.scenarios.season')"
				/>
			</v-col>
			<v-col
				cols="12"
				sm="6"
				md="4"
			>
				<VtSelectWithValidation
					ref="scenarioAdventureRef"
					v-model="scenarioAdventureFilter"
					vid="scenarioAdventure"
					:validation="validation"
					:items="scenarioAdventures"
					:label="$t('characters.scenarios.name') + ' ' + $t('characters.scenarios.type')"
				/>
			</v-col>
			<v-col
				cols="12"
			>
				<v-card
					v-for="item in scenarios"
					:key="item.id"
					class="mb-3"
				>
					<v-card-title
						class="pb-2"
					>
						{{ scenarioName(item) }}{{ noBreakingSpaces() }}
						<span
							v-if="item.repeatable"
							class="subtitle-1"
							style="margin-top: auto; margin-bottom: 0px;"
						>
							({{ $t('characters.scenarios.repeatable') }})
						</span>
					</v-card-title>
					<v-card-text
						class="pb-2"
					>
						<!-- eslint-disable vue/no-v-html -->
						<div
							class="markdown-body"
							style="vertical-align: top;"
							v-html="scenarioDescription(item)"
						/>
						<!--eslint-enable-->
						<div
							v-for="played of getPlayed(item.id)"
							:key="played.index"
						>
							<v-divider
								class="mt-2 mb-1"
							/>
							<div>
								{{ playedCharacterName(played) }} #{{ playedCharacterNumber(played) }} ({{ scenarioParticipant(played.scenarioParticipant) }})
							</div>
							<div>
								{{ $t('characters.playedOn') }} {{ playedTimestamp(played) }}
							</div>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn
							color="primary"
							variant="text"
							@click="ok(item.id)"
						>
							{{ $t('buttons.select') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import { computed } from 'vue';

import useVuelidate from '@vuelidate/core';

import Constants from '@/constants';
import Starfinder1eSharedConstants from '@/common/gameSystems/starfinder1e/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseScenarioLookupDialogComponent } from '@/components/gameSystems/baseScenarioLookupDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Starfinder1eScenarioLookupDialog',
	components: {
		VtFormDialog,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		},
		characterId: {
			type: String,
			default: null
		},
		scenarioOverride: {
			type: Array,
			default: null
		},
		serviceGameSystemOverride: {
			type: Object,
			default: null
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);

		const base = useBaseScenarioLookupDialogComponent(props, context, {
			serviceGameSystem,
			scenarioListFilterInitial: () => Starfinder1eSharedConstants.ScenarioAdventures.INITIAL
		});

		const scenarioAdventures = computed(() => {
			return LibraryCommonUtility.selectBlank(base.lookups.value ? base.lookups.value.scenarioAdventures : []);
		});

		return {
			...base,
			scenarioAdventures,
			validation: useVuelidate({ $scope: 'Starfinder1eScenarioLookupDialog' })
		};
	}
};
</script>

<style scoped>
</style>
