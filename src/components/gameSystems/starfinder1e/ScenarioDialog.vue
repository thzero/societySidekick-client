<template>
	<VtFormDialog
		:label="$t('characters.scenarios.name')"
		:signal="signal"
		:validation="validation"
		:pre-complete-delete="preCompleteResponseDelete"
		:pre-complete-ok="preComplete"
		:button-delete="true"
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
					{{ $t('characters.gameSystems.starfinder1e.experience') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="3"
				>
					{{ $t('characters.gameSystems.starfinder1e.currency') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="4"
				>
					{{ $t('characters.gameSystems.starfinder1e.fame.name') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="5"
				>
					{{ $t('characters.gameSystems.starfinder1e.boons.name') }}
				</v-stepper-item>
			</v-stepper-header>
			<v-stepper-window>
				<v-stepper-window-item
					:value="1"
					class="pa-0"
				>
					<v-card
						tile
						variant="outlined"
					>
						<v-card-text
							class="gameSystemScenarioCard starfinder1eScenario2"
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
									<td>
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
												:label="$t('characters.gameSystems.starfinder1e.scenarios.advancementSpeed')"
											/>
											<VtTextFieldWithValidation
												ref="scenarioAdventureRef"
												v-model="scenarioAdventureName"
												vid="scenarioAdventure"
												:validation="validation"
												:label="$t('characters.gameSystems.starfinder1e.scenarios.adventure')"
												:readonly="true"
											/>
											<VtSelectWithValidation
												ref="statusRef"
												v-model="innerValue.status"
												vid="status"
												:validation="validation"
												:items="status"
												:label="$t('characters.gameSystems.starfinder1e.status.name')"
												class="pb-2"
											/>
										</div>
									</td>
									<td style="vertical-align: top;">
										<VtSelectWithValidation
											ref="scenarioLocationRef"
											v-model="innerValue.locationId"
											vid="scenarioLocation"
											:validation="validation"
											:items="locations"
											:label="$t('locations.name')"
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
											:label="$t('characters.gameSystems.starfinder1e.scenarios.participant')"
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
						variant="outlined"
					>
						<v-card-text
							class="gameSystemScenarioCard starfinder1eExperiencePoints2"
						>
							<VtNumberFieldWithValidation
								ref="experiencePointsEarnedRef"
								v-model="innerValue.experiencePointsEarned"
								vid="experiencePointsEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.starfinder1e.experiencePoints') + ' ' + $t('characters.earned')"
								step=".1"
							/>
							<VtSelectWithValidation
								v-if="canSelectClass"
								ref="classRef"
								v-model="innerValue.classId"
								vid="class"
								:validation="validation"
								:items="classes"
								:label="$t('characters.gameSystems.starfinder1e.classes.name')"
								class="pb-2"
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
						variant="outlined"
					>
						<v-card-text
							class="gameSystemScenarioCard starfinder1eCurrency2"
						>
							<VtNumberFieldWithValidation
								ref="currencyEarnedRef"
								v-model="innerValue.currencyEarned"
								vid="currencyEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.starfinder1e.currency') + ' ' + $t('characters.gameSystems.starfinder1e.currencyGarnered')"
								step=".01"
							/>
							<VtNumberFieldWithValidation
								ref="currencyIncomeEarnedRef"
								v-model="innerValue.currencyIncomeEarned"
								vid="currencyIncomeEarned"
								:validation="validation"
								:label="$t('characters.earned') + ' ' + $t('characters.gameSystems.starfinder1e.currencyIncome')"
								step=".01"
							/>
							<VtNumberFieldWithValidation
								ref="currencySpentRef"
								v-model="innerValue.currencySpent"
								vid="currencySpent"
								:validation="validation"
								:label="$t('characters.gameSystems.starfinder1e.currency') + ' ' + $t('characters.spent')"
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
						variant="outlined"
					>
						<v-card-text
							class="gameSystemScenarioCard starfinder1eFame2"
						>
							<VtSelectWithValidation
								ref="fameFactionRef"
								v-model="innerValue.fameFactionId"
								vid="fameFaction"
								:validation="validation"
								:items="factions"
								:label="$t('characters.gameSystems.starfinder1e.fame.name') + ' ' + $t('characters.gameSystems.starfinder1e.faction')"
							/>
							<VtNumberFieldWithValidation
								ref="fameEarnedRef"
								v-model="innerValue.fameEarned"
								vid="fameEarned"
								:validation="validation"
								:label="$t('characters.gameSystems.starfinder1e.fame.name')"
								step=".1"
							/>
							<VtNumberFieldWithValidation
								ref="fameSpentRef"
								v-model="innerValue.fameSpent"
								vid="fameSpent"
								:validation="validation"
								:label="$t('characters.gameSystems.starfinder1e.fame.name') + ' ' + $t('characters.spent')"
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
						variant="outlined"
						class="mt-2"
					>
						<v-card-text
							class="gameSystemScenarioCard starfinder1eReputation2"
						>
							<VtSelectWithValidation
								ref="boon1Ref"
								v-model="innerValue.boon1Id"
								vid="boon1"
								:validation="validation"
								:items="boons"
								:label="$t('characters.gameSystems.starfinder1e.boons.name')"
							/>
							<VtSelectWithValidation
								ref="boon2Ref"
								v-model="innerValue.boon2Id"
								vid="boon2"
								:validation="validation"
								:items="boons"
								:label="$t('characters.gameSystems.starfinder1e.boons.name')"
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

import CharacterScenario from '@/common/gameSystems/starfinder1e/data/characterScenario';

import { useBaseScenarioDialogComponent } from '@/components/gameSystems/baseScenarioDialog';

import ScenarioLookupDialog from '@/components/gameSystems/starfinder1e/ScenarioLookupDialog';
import VtDateTimePickerFieldWithValidationTemp from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldWithValidationTemp';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Starfinder1eScenarioDialog',
	components: {
		ScenarioLookupDialog,
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
		const rulesGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E);
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);

		const scenarioAdventureName = ref(null);

		const getScenarioAdventure = (id) => {
			if (!id)
				return null;
			const results = LibraryClientUtility.$store.getters.getScenario(base.correlationId(), base.innerValue.value.scenarioId);
			return results ? results.type : null;
		};

		const base = useBaseScenarioDialogComponent(props, context, {
			serviceGameSystem,
			rulesGameSystem,
			gameSystemId: () => SharedConstants.GameSystems.Starfinder1e.id,
			initScenario: () => new CharacterScenario(),
			dialogScenariosOkI: (correlationId, id) => {
				base.innerValue.value.scenarioAdventure = getScenarioAdventure(id);
				scenarioAdventureName.value = serviceGameSystem.scenarioLookupAdventureName(correlationId, base.innerValue.value.scenarioAdventure, base.lookups.value);
			},
			initResponseDetails: (correlationId, details) => {
				details.boon1Id = base.innerValue.value.boon1Id;
				details.boon2Id = base.innerValue.value.boon2Id;
				details.classId = base.innerValue.value.classId;
				details.fameFactionId = base.innerValue.value.fameFactionId;
				details.fameEarned = rulesGameSystem.cleanDecimal(rulesGameSystem.clean(base.innerValue.value.fameEarned));
				details.fameSpent = rulesGameSystem.cleanDecimal(rulesGameSystem.clean(base.innerValue.value.fameSpent));
				details.reputationEarned = rulesGameSystem.calculateScenarioReputationEarned(correlationId, base.innerValue.value);
				details.scenarioAdvancementSpeed = base.innerValue.value.scenarioAdvancementSpeed;
				return details;
			},
			onChangeI: (correlationId, newValue, recalculateScenario) => {
				newValue.fameFactionId = newValue && newValue.fameFactionId ? newValue.fameFactionId : props.character.factionId;
				scenarioAdventureName.value = serviceGameSystem.scenarioLookupAdventureName(correlationId, newValue.scenario ? newValue.scenario.type : null, base.lookups.value);
				return recalculateScenario;
			},
			resetDialogI: async (correlationId, value) => {
				value.fameFactionId = value && value.fameFactionId ? value.fameFactionId : props.character.factionId;
				await LibraryClientUtility.$store.dispatcher.scenarios.getScenarioListingPlayed(correlationId, props.character ? props.character.id : null);
				scenarioAdventureName.value = serviceGameSystem.scenarioLookupAdventureName(correlationId, value.scenario ? value.scenario.type : null, base.lookups.value);
			}
		});

		const canSelectClass = computed(() => {
			return rulesGameSystem.calculateCharacterScenarioCanSelectClass(base.correlationId(), props.character, base.innerValue.value, base.innerValue.value.experiencePointsEarned);
		});
		const classes = computed(() => {
			return serviceGameSystem.classes(LibraryClientUtility.$store, true);
		});

		return {
			...base,
			canSelectClass,
			classes,
			validation: useVuelidate({ $scope: 'Starfinder1eScenarioDialog' })
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
.gameSystemScenarioCard {
	padding-top: 2px;
}
</style>
