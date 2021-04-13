<template>
	<VFormDialog
		:label="$t('characters.scenarios.name')"
		:signal="signal"
		:pre-complete-delete="preCompleteResponseDelete"
		:pre-complete-ok="preComplete"
		:fullscreen="fullscreenInternal"
		:button-delete="!isNew"
		max-width="700px"
		@close="close"
		@cancel="cancel"
		@ok="ok"
	>
		<v-stepper
			v-model="steps"
		>
			<v-stepper-header>
				<v-stepper-step
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					step="1"
				>
					{{ $t('characters.scenarios.name') }}
				</v-stepper-step>
				<v-divider />
				<v-stepper-step
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					step="2"
				>
					{{ $t('characters.gameSystems.pathfinder2e.experience') }}
				</v-stepper-step>
				<v-divider />
				<v-stepper-step
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					step="3"
				>
					{{ $t('characters.gameSystems.pathfinder2e.currency') }}
				</v-stepper-step>
				<v-divider />
				<v-stepper-step
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					step="4"
				>
					{{ $t('characters.gameSystems.pathfinder2e.fame.name') }}
				</v-stepper-step>
				<v-divider />
				<v-stepper-step
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					step="5"
				>
					{{ $t('characters.gameSystems.pathfinder2e.boons.name') }}
				</v-stepper-step>
			</v-stepper-header>
			<v-stepper-items>
				<v-stepper-content
					step="1"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eScenario2"
						>
							<VNumberFieldWithValidation
								ref="order"
								v-model="innerValue.order"
								rules="required|min_value:0|max_value:99|"
								vid="order"
								:label="$t('characters.scenarios.order')"
								step="1"
							/>
							<VTextFieldWithValidation
								ref="scenarioName"
								v-model="scenarioName"
								rules="required|"
								vid="scenarioName"
								:label="$t('forms.name')"
								:readonly="true"
							/>
							<div style="text-align: right">
								<v-btn
									color="primary lighten-1"
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
							>
								<tr>
									<td class="text-top">
										<div class="pr-4">
											<VDateTimeFieldWithValidation
												ref="timestamp"
												v-model="innerValue.timestamp"
												vid="timestamp"
												rules="required|"
												:output-type="outputType"
												:date-format="dateFormat"
												:time-format="timeFormat"
												:label="$t('characters.scenarios.date')"
											/>
											<!-- <VNumberFieldWithValidation
												ref="order"
												v-model="innerValue.order"
												:rules="rulesOrder|"
												vid="order"
												:label="$t('characters.order')"
											/> -->
											<VSelectWithValidation
												ref="scenarioAdvancementSpeed"
												v-model="innerValue.scenarioAdvancementSpeed"
												rules="required|"
												vid="scenarioAdvancementSpeed"
												:items="lookups.scenarioAdvancementSpeeds"
												:label="$t('characters.gameSystems.pathfinder2e.scenarios.advancementSpeed')"
											/>
											<!-- <VSelectWithValidation
												ref="scenarioAdventure"
												v-model="innerValue.scenarioAdventure"
												rules="required|"
												vid="scenarioAdventure"
												:items="lookups.scenarioAdventures"
												:label="$t('characters.gameSystems.pathfinder2e.scenarios.adventure')"
											/> -->
											<VTextFieldWithValidation
												ref="scenarioAdventure"
												v-model="scenarioAdventureName"
												vid="scenarioAdventure"
												:label="$t('characters.gameSystems.pathfinder2e.scenarios.adventure')"
												:readonly="true"
											/>
											<VSelectWithValidation
												ref="status"
												v-model="innerValue.status"
												rules="required"
												vid="status"
												:items="status"
												:label="$t('characters.gameSystems.pathfinder2e.status.name')"
												class="pb-2"
											/>
										</div>
									</td>
									<td class="text-top">
										<VSelectWithValidation
											ref="scenarioLocation"
											v-model="innerValue.locationId"
											vid="scenarioLocation"
											:items="locations"
											:label="$t('locations.name')"
										/>
										<VSelectWithValidation
											ref="scenarioEvent"
											v-model="innerValue.scenarioEvent"
											rules="required|"
											vid="scenarioEvent"
											:items="lookups.scenarioEvents"
											:label="$t('characters.gameSystems.pathfinder2e.event')"
										/>
										<VSelectWithValidation
											ref="scenarioStatus"
											v-model="innerValue.scenarioStatus"
											rules="required|"
											vid="scenarioStatus"
											:items="lookups.scenarioStatus"
											:label="$t('characters.status.name')"
										/>
										<VSelectWithValidation
											ref="scenarioParticipant"
											v-model="innerValue.scenarioParticipant"
											rules="required|"
											vid="scenarioParticipant"
											:items="lookups.scenarioParticipants"
											:label="$t('characters.gameSystems.pathfinder2e.scenarios.participant')"
										/>
									</td>
								</tr>
							</table>
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
							>
								<tr>
									<td class="text-top">
										<div class="pr-4">
											<VCheckboxWithValidation
												v-if="results1Description"
												ref="results1Checked"
												v-model="results1Checked"
												vid="results1Checked"
												:label="results1Description"
											/>
											<VCheckboxWithValidation
												v-if="results3Description"
												ref="results3Checked"
												v-model="results3Checked"
												vid="results3Checked"
												:label="results3Description"
											/>
										</div>
									</td>
									<td class="text-top">
										<VCheckboxWithValidation
											v-if="results2Description"
											ref="results2Checked"
											v-model="results2Checked"
											vid="results2Checked"
											:label="results2Description"
										/>
										<VCheckboxWithValidation
											v-if="results4Description"
											ref="results4Checked"
											v-model="results4Checked"
											vid="results4Checked"
											:label="results4Description"
										/>
									</td>
								</tr>
							</table>
						</v-card-text>
					</v-card>
				</v-stepper-content>
				<v-stepper-content
					step="2"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eExperiencePoints2"
						>
							<VNumberFieldWithValidation
								ref="experiencePointsEarned"
								v-model="innerValue.experiencePointsEarned"
								rules="required|decimal:1|min_value:0|max_value:12|"
								vid="experiencePointsEarned"
								:label="$t('characters.gameSystems.pathfinder2e.experiencePoints') + ' ' + $t('characters.earned')"
							/>
						</v-card-text>
					</v-card>
					<v-card
						tile
						outlined
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eAchievementPoints2"
						>
							<VNumberFieldWithValidation
								ref="achievementPointsEarned"
								v-model="achievementPointsEarned"
								rules="required|decimal:1|min_value:0|max_value:36|"
								vid="achievementPointsEarned"
								:label="$t('characters.gameSystems.pathfinder2e.achievementPoints') + ' ' + $t('characters.earned')"
								:readonly="isAchievementPointsEarnedReadOnly"
							/>
							<VNumberFieldWithValidation
								ref="achievementPointsSpent"
								v-model="innerValue.achievementPointsSpent"
								rules="decimal:1|min_value:0|max_value:99|"
								vid="achievementPointsSpent"
								:label="$t('characters.gameSystems.pathfinder2e.achievementPoints') + ' ' + $t('characters.spent')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
					<v-card
						tile
						outlined
						class="mt-2"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eDowntime2"
						>
							<VNumberFieldWithValidation
								ref="downtimePointsEarned"
								v-model="downtimePointsEarned"
								rules="required|decimal:1|min_value:0|max_value:24|"
								vid="downtimePointsEarned"
								:label="$t('characters.gameSystems.pathfinder2e.downtime') + ' ' + $t('characters.earned')"
								:readonly="isDowntimePointsReadOnly"
							/>
							<VNumberFieldWithValidation
								ref="downtimePointsSpent"
								v-model="innerValue.downtimePointsSpent"
								rules="decimal:1|min_value:0|max_value:8|"
								vid="downtimePointsSpent"
								:label="$t('characters.gameSystems.pathfinder2e.downtime') + ' ' + $t('characters.spent')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
				<v-stepper-content
					step="3"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eCurrency2"
						>
							<VNumberFieldWithValidation
								ref="currencyEarned"
								v-model="innerValue.currencyEarned"
								rules="required|decimal:2|min_value:0|max_value:100000|"
								vid="currencyEarned"
								:label="$t('characters.gameSystems.pathfinder2e.currency') + ' ' + $t('characters.gameSystems.pathfinder2e.currencyIncome')"
								step=".01"
							/>
							<VNumberFieldWithValidation
								ref="currencyIncomeEarned"
								v-model="innerValue.currencyIncomeEarned"
								rules="decimal:2|min_value:0|max_value:1000|"
								vid="currencyIncomeEarned"
								:label="$t('characters.earned') + ' ' + $t('characters.gameSystems.pathfinder2e.currencyIncome')"
								step=".01"
							/>
							<VNumberFieldWithValidation
								ref="currencySpent"
								v-model="innerValue.currencySpent"
								rules="decimal:2|min_value:0|max_value:100000|"
								vid="currencySpent"
								:label="$t('characters.gameSystems.pathfinder2e.currency') + ' ' + $t('characters.spent')"
								step=".01"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
				<v-stepper-content
					step="4"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eFame2"
						>
							<VSelectWithValidation
								ref="fameFaction"
								v-model="innerValue.fameFactionId"
								rules="required|"
								vid="fameFaction"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.fame.name') + ' ' + $t('characters.gameSystems.pathfinder2e.faction')"
							/>
							<VNumberFieldWithValidation
								ref="fameEarned"
								v-model="fameEarned"
								rules="required|decimal:1|min_value:0|max_value:12|"
								vid="fameEarned"
								:label="$t('characters.gameSystems.pathfinder2e.fame.name')"
							/>
							<VNumberFieldWithValidation
								ref="fameSpent"
								v-model="innerValue.fameSpent"
								rules="decimal:1|min_value:0|max_value:99|"
								vid="fameSpent"
								:label="$t('characters.gameSystems.pathfinder2e.fame.name') + ' ' + $t('characters.spent')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
					<v-card
						tile
						outlined
						class="mt-2"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eReputation2"
						>
							<VSelectWithValidation
								ref="reputationFaction"
								v-model="innerValue.reputationFactionId"
								vid="reputationFaction"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.reputation') + ' ' + $t('characters.gameSystems.pathfinder2e.faction')"
							/>
							<!-- <VNumberFieldWithValidation
								ref="reputationEarned"
								v-model="innerValue.reputationEarned"
								rules="decimal:1|min_value:0|max_value:12|"
								vid="reputationEarned"
								:label="$t('characters.gameSystems.pathfinder2e.reputation') + ' ' + $t('characters.earned')"
								step=".1"
							/> -->
							<VSelectWithValidation
								v-if="isAdventureScenario"
								ref="reputationAdditionalFaction"
								v-model="innerValue.reputationAdditionalFactionId"
								vid="reputationAdditionalFaction"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.reputation') + ' ' + $t('characters.gameSystems.pathfinder2e.additional') + ' ' + $t('characters.gameSystems.pathfinder2e.faction')"
							/>
							<VNumberFieldWithValidation
								v-if="isAdventureScenario"
								ref="reputationAdditionalEarned"
								v-model="innerValue.reputationAdditionalEarned"
								rules="decimal:1|min_value:0|max_value:12|"
								vid="reputationAdditionalEarned"
								:label="$t('characters.gameSystems.pathfinder2e.reputation') + ' ' + $t('characters.gameSystems.pathfinder2e.additional') + ' ' + $t('characters.earned')"
								step=".1"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
				<v-stepper-content
					step="5"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
						class="mt-2"
					>
						<v-card-text
							class="gameSystemScenarioCard pathfinder2eReputation2"
						>
							<VSelectWithValidation
								ref="boon1"
								v-model="innerValue.boon1Id"
								vid="boon1"
								:items="boons"
								:label="$t('characters.gameSystems.pathfinder2e.boons.name')"
							/>
							<VSelectWithValidation
								ref="boon2"
								v-model="innerValue.boon2Id"
								vid="boon2"
								:items="boons"
								:label="$t('characters.gameSystems.pathfinder2e.boons.name')"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
		<ScenarioLookupDialog
			ref="scenarioLookup"
			:label="$t('characters.name')"
			:signal="dialogScenarios.signal"
			:fullscreen="fullscreenInternal"
			:character-id="character ? character.id : null"
			@cancel="dialogScenarios.cancel()"
			@ok="dialogScenariosOk"
		/>
	</VFormDialog>
</template>

<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryUtility from '@thzero/library_common/utility';

import baseScenarioDialog from '@/components/gameSystems/baseScenarioDialog';

import ScenarioLookupDialog from '@/components/gameSystems/pathfinder2e/ScenarioLookupDialog';

import CharacterScenario from '@/common/gameSystems/pathfinder2e/data/characterScenario';

import VCheckboxWithValidation from '@/library_vue/components/form/VCheckboxWithValidation';

export default {
	name: 'Pathfinder2eScenarioDialog',
	components: {
		ScenarioLookupDialog,
		VCheckboxWithValidation
	},
	extends: baseScenarioDialog,
	data: () => ({
		achievementPointsEarned: 0,
		downtimePointsEarned: 0,
		// experiencePointsEarned: 0,
		fameEarned: 0,
		results1Checked: false,
		results2Checked: false,
		results3Checked: false,
		results4Checked: false,
		results1Description: null,
		results2Description: null,
		results3Description: null,
		results4Description: null,
		scenarioAdventureName: null
	}),
	computed: {
		hasResults() {
			return this.results1Description && this.results2Description && this.results3Description && this.results4Description;
		},
		isAchievementPointsEarnedReadOnly() {
			return this.rulesGameSystem.isAchievementPointsEarnedReadOnly(this.correlationId(), this.innerValue);
		},
		isAdventureScenario() {
			return this.rulesGameSystem.isAdventureScenario(this.correlationId(), this.innerValue);
		},
		isDowntimePointsReadOnly() {
			return this.rulesGameSystem.isAchievementPointsEarnedReadOnly(this.correlationId(), this.innerValue);
		}
	},
	methods: {
		dialogScenariosOkI(correlationId, id) {
			this.$set(this.innerValue, 'scenario', this.$store.getters.getScenario(this.innerValue.scenarioId));
			this.achievementPointsEarned = this.rulesGameSystem.calculateScenarioAchievementPointsEarned(correlationId, this.innerValue);
			this.downtimePointsEarned = this.rulesGameSystem.calculateScenarioDowntimePointsEarned(correlationId, this.innerValue);
			this.fameEarned = this.rulesGameSystem.calculateScenarioFameEarned(correlationId, this.innerValue);

			if (this.innerValue.status != SharedConstants.CharactersStatus.ACTIVE) {
				this.achievementPointsEarned = 0;
				this.downtimePointsEarned = 0;
				this.fameEarned = 0;
				this.innerValue.currencyIncomeEarned = 0;
				this.innerValue.currencyEarned = 0;
			}
		},
		gameSystemId() {
			return SharedConstants.GameSystems.Pathfinder2e.id;
		},
		initResponseDetails(correlationId, details) {
			// details.achievementPointsEarned = this.rulesGameSystem.clean(this.achievementPointsEarned);
			details.achievementPointsEarned = this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.achievementPointsEarned));

			// details.achievementPointsSpent = this.rulesGameSystem.clean(this.innerValue.achievementPointsSpent);
			details.achievementPointsSpent = this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.innerValue.achievementPointsSpent));

			details.boon1Id = this.innerValue.boon1Id;
			details.boon2Id = this.innerValue.boon2Id;
			details.downtimePointsEarned = this.rulesGameSystem.clean(this.downtimePointsEarned);
			details.downtimePointsSpent = this.rulesGameSystem.clean(this.innerValue.downtimePointsSpent);
			details.fameFactionId = this.innerValue.fameFactionId;

			// details.fameEarned = this.rulesGameSystem.clean(this.fameEarned);
			details.fameEarned = this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.fameEarned));

			// details.fameSpent = this.rulesGameSystem.clean(this.innerValue.fameSpent);
			details.fameSpent = this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.innerValue.fameSpent));

			details.reputationFactionId = this.innerValue.fameFactionId;

			// details.reputationEarned = this.rulesGameSystem.calculateScenarioReputationEarned(correlationId, this.innerValue);
			details.reputationEarned = details.fameEarned;

			details.reputationAdditionalFactionId = this.innerValue.reputationAdditionalFactionId;
			// details.reputationAdditionalEarned = this.rulesGameSystem.clean(this.innerValue.reputationAdditionalEarned);
			details.reputationAdditionalEarned = this.rulesGameSystem.cleanDecimal(this.rulesGameSystem.clean(this.innerValue.reputationAdditionalEarned));

			details.scenarioAdvancementSpeed = this.innerValue.scenarioAdvancementSpeed;
			details.scenarioEvent = this.innerValue.scenarioEvent;

			this.successResult(correlationId, details, 1, this.results1Checked);
			this.successResult(correlationId, details, 2, this.results2Checked);
			this.successResult(correlationId, details, 3, this.results3Checked);
			this.successResult(correlationId, details, 4, this.results4Checked);

			return details;
		},
		initScenario() {
			return new CharacterScenario();
		},
		initializeServices() {
			this.rulesGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		},
		// eslint-disable-next-line
		onChangeI(correlationId, newValue, recalculateScenario) {
			if (this.previousValue) {
				recalculateScenario |= (this.previousValue.scenarioEvent != newValue.scenarioEvent);
				recalculateScenario |= (this.previousValue.scenarioStatus != newValue.scenarioStatus);
				recalculateScenario |= (this.previousValue.scenarioParticipant != newValue.scenarioParticipant);
			}
			this.achievementPointsEarned = newValue && newValue.achievementPointsEarned ? newValue.achievementPointsEarned : 0;
			this.downtimePointsEarned = newValue && newValue.downtimePointsEarned ? newValue.downtimePointsEarned : 0;
			this.fameEarned = newValue && newValue.fameEarned ? newValue.fameEarned : 0;
			// value.fameFactionId = newValue && newValue.fameFactionId ? newValue.fameFactionId : this.character.factionId;
			// value.reputationFactionId = newValue && newValue.reputationFactionId ? newValue.reputationFactionId : this.character.factionId;
			this.scenarioAdventureName = this.serviceGameSystem.scenarioLookupAdventureName(correlationId, newValue.scenario ? newValue.scenario.type : null, this.lookups);

			return recalculateScenario;
		},
		async resetDialogI(correlationId, value) {
			await this.$store.dispatcher.scenarios.getScenarioListingPlayed(correlationId, this.character ? this.character.id : null);
			// this.$set(value, 'scenario', this.$store.getters.getScenario(value.scenarioId));
			this.achievementPointsEarned = value && value.achievementPointsEarned ? value.achievementPointsEarned : 0;
			this.downtimePointsEarned = value && value.downtimePointsEarned ? value.downtimePointsEarned : 0;
			this.fameEarned = value && value.fameEarned ? value.fameEarned : 0;
			value.fameFactionId = value && value.fameFactionId ? value.fameFactionId : this.character.factionId;
			value.reputationFactionId = value && value.reputationFactionId ? value.reputationFactionId	: this.character.factionId;
			// this.scenarioAdventureName = this.serviceGameSystem.scenarioLookupAdventureName(correlationId, value.scenario ? value.scenario.type : null, this.lookups);

			if (value.scenario.successResults) {
				let item;
				for (let i = 1; i < 5; i++) {
					item = value.scenario.successResults.find(l => l.id === i);
					if (!item)
						continue;

					if (i === 1) {
						this.results1Description = item.description;
						this.results1Checked = this.successResultChecked(correlationId, value, item.id);
					}
					else if (i === 2) {
						this.results2Description = item.description;
						this.results2Checked = this.successResultChecked(correlationId, value, item.id);
					}
					else if (i === 3) {
						this.results3Description = item.description;
						this.results3Checked = this.successResultChecked(correlationId, value, item.id);
					}
					else if (i === 4) {
						this.results4Description = item.description;
						this.results4Checked = this.successResultChecked(correlationId, value, item.id);
					}
				}
			}
		},
		successResult(correlationId, value, i, checked) {
			if (!value.scenarioSuccessResults)
				value.scenarioSuccessResults = [];

			LibraryUtility.deleteArrayById(value.scenarioSuccessResults, i);
			value.scenarioSuccessResults.push({ id: i, checked: checked });
		},
		successResultChecked(correlationId, value, id) {
			if (!value || !value.scenarioSuccessResults || String.isNullOrEmpty(id))
				return false;

			let item = value.scenarioSuccessResults.find(l => l.id === id);
			if (!item)
				return false;

			return item.checked;
		}
	}
};
</script>

<style scoped>
.gameSystemScenarioCard {
	padding-top: 2px;
}
</style>
