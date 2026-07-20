<template>
	<VtFormDialog
		:label="$t('characters.scenarios.name')"
		:signal="signal"
		:validation="validation"
		:pre-complete-delete="preCompleteResponseDelete"
		:pre-complete-ok="preComplete"
		:button-delete="!isNew"
		max-width="700px"
		@close="cancel"
		@ok="ok"
	>
		<v-stepper
			v-model="steps"
		>
			<v-stepper-header>
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="1"
				>
					{{ $t('characters.scenarios.name') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="2"
				>
					{{ $t('characters.gameSystems.pathfinder2e.experience') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="3"
				>
					{{ $t('characters.gameSystems.pathfinder2e.currency') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="4"
				>
					{{ $t('characters.gameSystems.pathfinder2e.fame.name') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="5"
				>
					{{ $t('characters.gameSystems.pathfinder2e.boons.name') }}
				</v-stepper-item>
			</v-stepper-header>
			<v-stepper-window>
				<v-stepper-window-item
					:value="1"
					class="pa-0"
				>
					<v-card
						tile
						variant="flat"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eScenario2"
						>
							<VtNumberFieldWithValidation
								ref="orderRef"
								v-model="innerValue.order"
								vid="order"
								:validation="validation"
								:label="$t('characters.scenarios.order')"
								step="1"
							/>
							<VtTextFieldWithValidation
								ref="scenarioNameRef"
								v-model="scenarioName"
								vid="scenarioName"
								:validation="validation"
								:label="$t('forms.name')"
								:readonly="true"
							/>
							<div style="text-align: right">
								<v-btn
									color="primary"
									@click="dialogScenariosOpen()"
								>
									{{ $t('buttons.select') }}
								</v-btn>
							</div>
							<table
								border="0"
								cellpadding="0"
								cellspacing="0"
								style="width: 100%;"
							><tbody>
								<tr>
									<td class="text-top">
										<div class="pr-4">
											<VtDateTimePickerFieldWithValidationTemp
												ref="timestampRef"
												v-model="innerValue.timestamp"
												vid="timestamp"
												:validation="validation"
												:output-type="outputType"
												:date-format="dateFormat"
												:time-format="timeFormat"
												:label="$t('characters.scenarios.date')"
											/>
											<VtSelectWithValidation
												ref="scenarioAdvancementSpeedRef"
												v-model="innerValue.scenarioAdvancementSpeed"
												vid="scenarioAdvancementSpeed"
												:validation="validation"
												:items="lookups.scenarioAdvancementSpeeds"
												:label="$t('characters.gameSystems.pathfinder2e.scenarios.advancementSpeed')"
											/>
											<VtTextFieldWithValidation
												ref="scenarioAdventureRef"
												v-model="scenarioAdventureName"
												vid="scenarioAdventure"
												:validation="validation"
												:label="$t('characters.gameSystems.pathfinder2e.scenarios.adventure')"
												:readonly="true"
											/>
											<VtSelectWithValidation
												ref="statusRef"
												v-model="innerValue.status"
												vid="status"
												:validation="validation"
												:items="status"
												:label="$t('characters.gameSystems.pathfinder2e.status.name')"
												class="pb-2"
											/>
										</div>
									</td>
									<td class="text-top">
										<VtSelectWithValidation
											ref="scenarioLocationRef"
											v-model="innerValue.locationId"
											vid="scenarioLocation"
											:validation="validation"
											:items="locations"
											:label="$t('locations.name')"
										/>
										<VtSelectWithValidation
											ref="scenarioEventRef"
											v-model="innerValue.scenarioEvent"
											vid="scenarioEvent"
											:validation="validation"
											:items="lookups.scenarioEvents"
											:label="$t('characters.gameSystems.pathfinder2e.event')"
										/>
										<VtSelectWithValidation
											ref="scenarioStatusRef"
											v-model="innerValue.scenarioStatus"
											vid="scenarioStatus"
											:validation="validation"
											:items="lookups.scenarioStatus"
											:label="$t('characters.status.name')"
										/>
										<VtSelectWithValidation
											ref="scenarioParticipantRef"
											v-model="innerValue.scenarioParticipant"
											vid="scenarioParticipant"
											:validation="validation"
											:items="lookups.scenarioParticipants"
											:label="$t('characters.gameSystems.pathfinder2e.scenarios.participant')"
										/>
									</td>
								</tr>
							</tbody></table>
							<span
								v-if="hasResults"
								class="title"
							>
								{{ $t('characters.scenarios.results') }}
							</span>
							<table
								v-if="hasResults"
								border="0"
								cellpadding="0"
								cellspacing="0"
								style="width: 100%;"
							><tbody>
								<tr>
									<td class="text-top">
										<div class="pr-4">
											<VtCheckboxWithValidation
												v-if="results1Description"
												ref="results1CheckedRef"
												v-model="results1Checked"
												vid="results1Checked"
												:validation="validation"
												:label="results1Description"
											/>
											<VtCheckboxWithValidation
												v-if="results3Description"
												ref="results3CheckedRef"
												v-model="results3Checked"
												vid="results3Checked"
												:validation="validation"
												:label="results3Description"
											/>
											<VtCheckboxWithValidation
												v-if="results5Description"
												ref="results5CheckedRef"
												v-model="results5Checked"
												vid="results5Checked"
												:validation="validation"
												:label="results5Description"
											/>
										</div>
									</td>
									<td class="text-top">
										<VtCheckboxWithValidation
											v-if="results2Description"
											ref="results2CheckedRef"
											v-model="results2Checked"
											vid="results2Checked"
											:validation="validation"
											:label="results2Description"
										/>
										<VtCheckboxWithValidation
											v-if="results4Description"
											ref="results4CheckedRef"
											v-model="results4Checked"
											vid="results4Checked"
											:validation="validation"
											:label="results4Description"
										/>
										<VtCheckboxWithValidation
											v-if="results6Description"
											ref="results6CheckedRef"
											v-model="results6Checked"
											vid="results6Checked"
											:validation="validation"
											:label="results6Description"
										/>
									</td>
								</tr>
							</tbody></table>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
				<v-stepper-window-item
					:value="2"
					class="pa-0"
				>
					<v-card
						tile
						variant="flat"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eExperiencePoints2"
						>
							<VtNumberFieldWithValidation
								ref="experiencePointsEarnedRef"
								v-model="innerValue.experiencePointsEarned"
								vid="experiencePointsEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.experiencePoints') + ' ' + $t('characters.earned')"
							/>
						</v-card-text>
					</v-card>
					<v-card
						tile
						variant="flat"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eAchievementPoints2"
						>
							<VtNumberFieldWithValidation
								ref="achievementPointsEarnedRef"
								v-model="achievementPointsEarned"
								vid="achievementPointsEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.achievementPoints') + ' ' + $t('characters.earned')"
								:readonly="isAchievementPointsEarnedReadOnly"
							/>
							<VtNumberFieldWithValidation
								ref="achievementPointsSpentRef"
								v-model="innerValue.achievementPointsSpent"
								vid="achievementPointsSpent"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.achievementPoints') + ' ' + $t('characters.spent')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
					<v-card
						tile
						variant="flat"
						class="mt-2"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eDowntime2"
						>
							<VtNumberFieldWithValidation
								ref="downtimePointsEarnedRef"
								v-model="downtimePointsEarned"
								vid="downtimePointsEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.downtime') + ' ' + $t('characters.earned')"
								:readonly="isDowntimePointsReadOnly"
							/>
							<VtNumberFieldWithValidation
								ref="downtimePointsSpentRef"
								v-model="innerValue.downtimePointsSpent"
								vid="downtimePointsSpent"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.downtime') + ' ' + $t('characters.spent')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
				<v-stepper-window-item
					:value="3"
					class="pa-0"
				>
					<v-card
						tile
						variant="flat"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eCurrency2"
						>
							<VtNumberFieldWithValidation
								ref="currencyEarnedRef"
								v-model="innerValue.currencyEarned"
								vid="currencyEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.currency') + ' ' + $t('characters.gameSystems.pathfinder2e.currencyIncome')"
								step=".01"
							/>
							<VtNumberFieldWithValidation
								ref="currencyIncomeEarnedRef"
								v-model="innerValue.currencyIncomeEarned"
								vid="currencyIncomeEarned"
								:validation="validation"
								:label="$t('characters.earned') + ' ' + $t('characters.gameSystems.pathfinder2e.currencyIncome')"
								step=".01"
							/>
							<VtNumberFieldWithValidation
								ref="currencySpentRef"
								v-model="innerValue.currencySpent"
								vid="currencySpent"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.currency') + ' ' + $t('characters.spent')"
								step=".01"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
				<v-stepper-window-item
					:value="4"
					class="pa-0"
				>
					<v-card
						tile
						variant="flat"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eFame2"
						>
							<VtSelectWithValidation
								ref="fameFactionRef"
								v-model="innerValue.fameFactionId"
								vid="fameFaction"
								:validation="validation"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.fame.name') + ' ' + $t('characters.gameSystems.pathfinder2e.faction')"
							/>
							<VtNumberFieldWithValidation
								ref="fameEarnedRef"
								v-model="fameEarned"
								vid="fameEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.fame.name')"
							/>
							<VtNumberFieldWithValidation
								ref="fameSpentRef"
								v-model="innerValue.fameSpent"
								vid="fameSpent"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.fame.name') + ' ' + $t('characters.spent')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
					<v-card
						tile
						variant="flat"
						class="mt-2"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eReputation2"
						>
							<VtSelectWithValidation
								ref="reputationFactionRef"
								v-model="innerValue.reputationFactionId"
								vid="reputationFaction"
								:validation="validation"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.reputation') + ' ' + $t('characters.gameSystems.pathfinder2e.faction')"
							/>
							<VtSelectWithValidation
								v-if="isAdventureScenario"
								ref="reputationAdditionalFactionRef"
								v-model="innerValue.reputationAdditionalFactionId"
								vid="reputationAdditionalFaction"
								:validation="validation"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.reputation') + ' ' + $t('characters.gameSystems.pathfinder2e.additional') + ' ' + $t('characters.gameSystems.pathfinder2e.faction')"
							/>
							<VtNumberFieldWithValidation
								v-if="isAdventureScenario"
								ref="reputationAdditionalEarnedRef"
								v-model="innerValue.reputationAdditionalEarned"
								vid="reputationAdditionalEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.reputation') + ' ' + $t('characters.gameSystems.pathfinder2e.additional') + ' ' + $t('characters.earned')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
				<v-stepper-window-item
					:value="5"
					class="pa-0"
				>
					<v-card
						tile
						variant="flat"
						class="mt-2"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eReputation2"
						>
							<VtSelectWithValidation
								ref="boon1Ref"
								v-model="innerValue.boon1Id"
								vid="boon1"
								:validation="validation"
								:items="boons"
								:label="$t('characters.gameSystems.pathfinder2e.boons.name')"
							/>
							<VtSelectWithValidation
								ref="boon2Ref"
								v-model="innerValue.boon2Id"
								vid="boon2"
								:validation="validation"
								:items="boons"
								:label="$t('characters.gameSystems.pathfinder2e.boons.name')"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
			</v-stepper-window>
		</v-stepper>
		<ScenarioLookupDialog
			ref="scenarioLookupRef"
			:label="$t('characters.name')"
			:signal="dialogScenarios.signal"
			:character-id="character ? character.id : null"
			@cancel="dialogScenarios.cancel()"
			@ok="dialogScenariosOk"
		/>
	</VtFormDialog>
</template>

<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import CharacterScenario from '@/common/gameSystems/pathfinder2e/data/characterScenario';

import { useBaseScenarioDialogComponent } from '@/components/gameSystems/baseScenarioDialog';

import ScenarioLookupDialog from '@/components/gameSystems/pathfinder2e/ScenarioLookupDialog';
import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtDateTimePickerFieldWithValidationTemp from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldWithValidationTemp';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Pathfinder2eScenarioDialog',
	components: {
		ScenarioLookupDialog,
		VtCheckboxWithValidation,
		VtDateTimePickerFieldWithValidationTemp,
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		},
		character: {
			type: Object,
			default: null
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const rulesGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		// Leaf-local reactive state (was Vue2 data()).
		const achievementPointsEarned = ref(0);
		const downtimePointsEarned = ref(0);
		const fameEarned = ref(0);
		const results1Checked = ref(false);
		const results2Checked = ref(false);
		const results3Checked = ref(false);
		const results4Checked = ref(false);
		const results5Checked = ref(false);
		const results6Checked = ref(false);
		const results1Description = ref(null);
		const results2Description = ref(null);
		const results3Description = ref(null);
		const results4Description = ref(null);
		const results5Description = ref(null);
		const results6Description = ref(null);
		const scenarioAdventureName = ref(null);

		const successResult = (correlationId, value, i, checked) => {
			if (!value.scenarioSuccessResults)
				value.scenarioSuccessResults = [];
			LibraryCommonUtility.deleteArrayById(value.scenarioSuccessResults, i);
			value.scenarioSuccessResults.push({ id: i, checked: checked });
		};
		const successResultChecked = (correlationId, value, id) => {
			if (!value || !value.scenarioSuccessResults || String.isNullOrEmpty(id))
				return false;
			const item = value.scenarioSuccessResults.find(l => l.id === id);
			if (!item)
				return false;
			return item.checked;
		};

		const base = useBaseScenarioDialogComponent(props, context, {
			serviceGameSystem,
			rulesGameSystem,
			gameSystemId: () => SharedConstants.GameSystems.Pathfinder2e.id,
			initScenario: () => new CharacterScenario(),
			dialogScenariosOkI: (correlationId, id) => {
				base.innerValue.value.scenario = LibraryClientUtility.$store.getters.getScenario(correlationId, base.innerValue.value.scenarioId);
				achievementPointsEarned.value = rulesGameSystem.calculateScenarioAchievementPointsEarned(correlationId, base.innerValue.value);
				downtimePointsEarned.value = rulesGameSystem.calculateScenarioDowntimePointsEarned(correlationId, base.innerValue.value);
				fameEarned.value = rulesGameSystem.calculateScenarioFameEarned(correlationId, base.innerValue.value);

				if (base.innerValue.value.status != SharedConstants.CharactersStatus.ACTIVE) {
					achievementPointsEarned.value = 0;
					downtimePointsEarned.value = 0;
					fameEarned.value = 0;
					base.innerValue.value.currencyIncomeEarned = 0;
					base.innerValue.value.currencyEarned = 0;
				}
			},
			onChangeI: (correlationId, newValue, recalculateScenario) => {
				if (base.previousValue.value) {
					recalculateScenario |= (base.previousValue.value.scenarioEvent != newValue.scenarioEvent);
					recalculateScenario |= (base.previousValue.value.scenarioStatus != newValue.scenarioStatus);
					recalculateScenario |= (base.previousValue.value.scenarioParticipant != newValue.scenarioParticipant);
				}
				achievementPointsEarned.value = newValue && newValue.achievementPointsEarned ? newValue.achievementPointsEarned : 0;
				downtimePointsEarned.value = newValue && newValue.downtimePointsEarned ? newValue.downtimePointsEarned : 0;
				fameEarned.value = newValue && newValue.fameEarned ? newValue.fameEarned : 0;
				scenarioAdventureName.value = serviceGameSystem.scenarioLookupAdventureName(correlationId, newValue.scenario ? newValue.scenario.type : null, base.lookups.value);
				return recalculateScenario;
			},
			initResponseDetails: (correlationId, details) => {
				details.achievementPointsEarned = rulesGameSystem.cleanDecimal(rulesGameSystem.clean(achievementPointsEarned.value));
				details.achievementPointsSpent = rulesGameSystem.cleanDecimal(rulesGameSystem.clean(base.innerValue.value.achievementPointsSpent));
				details.boon1Id = base.innerValue.value.boon1Id;
				details.boon2Id = base.innerValue.value.boon2Id;
				details.downtimePointsEarned = rulesGameSystem.clean(downtimePointsEarned.value);
				details.downtimePointsSpent = rulesGameSystem.clean(base.innerValue.value.downtimePointsSpent);
				details.fameFactionId = base.innerValue.value.fameFactionId;
				details.fameEarned = rulesGameSystem.cleanDecimal(rulesGameSystem.clean(fameEarned.value));
				details.fameSpent = rulesGameSystem.cleanDecimal(rulesGameSystem.clean(base.innerValue.value.fameSpent));
				details.reputationFactionId = base.innerValue.value.fameFactionId;
				details.reputationEarned = details.fameEarned;
				details.reputationAdditionalFactionId = base.innerValue.value.reputationAdditionalFactionId;
				details.reputationAdditionalEarned = rulesGameSystem.cleanDecimal(rulesGameSystem.clean(base.innerValue.value.reputationAdditionalEarned));
				details.scenarioAdvancementSpeed = base.innerValue.value.scenarioAdvancementSpeed;
				details.scenarioEvent = base.innerValue.value.scenarioEvent;

				successResult(correlationId, details, 1, results1Checked.value);
				successResult(correlationId, details, 2, results2Checked.value);
				successResult(correlationId, details, 3, results3Checked.value);
				successResult(correlationId, details, 4, results4Checked.value);
				successResult(correlationId, details, 5, results5Checked.value);
				successResult(correlationId, details, 6, results6Checked.value);

				return details;
			},
			resetDialogI: async (correlationId, value) => {
				await LibraryClientUtility.$store.dispatcher.scenarios.getScenarioListingPlayed(correlationId, props.character ? props.character.id : null);
				achievementPointsEarned.value = value && value.achievementPointsEarned ? value.achievementPointsEarned : 0;
				downtimePointsEarned.value = value && value.downtimePointsEarned ? value.downtimePointsEarned : 0;
				fameEarned.value = value && value.fameEarned ? value.fameEarned : 0;
				value.fameFactionId = value && value.fameFactionId ? value.fameFactionId : props.character.factionId;
				value.reputationFactionId = value && value.reputationFactionId ? value.reputationFactionId : props.character.factionId;

				if (value.scenario && value.scenario.successResults) {
					const descriptions = [results1Description, results2Description, results3Description, results4Description, results5Description, results6Description];
					const checkeds = [results1Checked, results2Checked, results3Checked, results4Checked, results5Checked, results6Checked];
					for (let i = 1; i < 7; i++) {
						const item = value.scenario.successResults.find(l => l.id === i);
						if (!item)
							continue;
						descriptions[i - 1].value = item.description;
						checkeds[i - 1].value = successResultChecked(correlationId, value, item.id);
					}
				}
			}
		});

		const hasResults = computed(() => {
			return results1Description.value || results2Description.value || results3Description.value || results4Description.value || results5Description.value || results6Description.value;
		});
		const isAchievementPointsEarnedReadOnly = computed(() => {
			return rulesGameSystem.isAchievementPointsEarnedReadOnly(base.correlationId(), base.innerValue.value);
		});
		const isAdventureScenario = computed(() => {
			return rulesGameSystem.isAdventureScenario(base.correlationId(), base.innerValue.value);
		});
		const isDowntimePointsReadOnly = computed(() => {
			return rulesGameSystem.isAchievementPointsEarnedReadOnly(base.correlationId(), base.innerValue.value);
		});

		return {
			...base,
			achievementPointsEarned,
			downtimePointsEarned,
			fameEarned,
			results1Checked,
			results2Checked,
			results3Checked,
			results4Checked,
			results5Checked,
			results6Checked,
			results1Description,
			results2Description,
			results3Description,
			results4Description,
			results5Description,
			results6Description,
			scenarioAdventureName,
			hasResults,
			isAchievementPointsEarnedReadOnly,
			isAdventureScenario,
			isDowntimePointsReadOnly,
			validation: useVuelidate({ $scope: 'Pathfinder2eScenarioDialog' })
		};
	},
	validations() {
		return {
			scenarioName: {
				required,
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
