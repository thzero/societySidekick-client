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
				<template>
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
				</template>
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
								v-model="experiencePointsEarned"
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
								rules="required|decimal:1|min_value:0|max_value:12|"
								vid="achievementPointsEarned"
								:label="$t('characters.gameSystems.pathfinder2e.achievementPoints') + ' ' + $t('characters.earned')"
								:readonly="true"
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
								:label="$t('characters.gameSystems.pathfinder2e.downtime') + ' ' + $t('characters.spent')"
								:readonly="true"
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
import Pathfinder2eSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import baseScenarioDialog from '@/components/gameSystems/baseScenarioDialog';

import ScenarioLookupDialog from '@/components/gameSystems/pathfinder2e/ScenarioLookupDialog';

import CharacterScenario from '@/common/gameSystems/pathfinder2e/data/characterScenario';

export default {
	name: 'Pathfinder2eScenarioDialog',
	components: {
		ScenarioLookupDialog
	},
	extends: baseScenarioDialog,
	data: () => ({
		achievementPointsEarned: 0,
		downtimePointsEarned: 0,
		experiencePointsEarned: 0,
		fameEarned: 0,
		scenarioAdventureName: null
	}),
	computed: {
		isAdventureScenario() {
			return this.innerValue.scenarioAdventure === Pathfinder2eSharedConstants.ScenarioAdventures.SCENARIO;
		}
	},
	methods: {
		dialogScenariosOkI(id) {
			this.$set(this.innerValue, 'scenarioAdventure', this.getScenarioAdventure(id));
			this.achievementPointsEarned = this.rulesGameSystem.calculateScenarioAchievementPointsEarned(this.innerValue);
			this.downtimePointsEarned = this.rulesGameSystem.calculateScenarioDowntimePointsEarned(this.innerValue);
			this.fameEarned = this.rulesGameSystem.calculateScenarioFameEarned(this.innerValue);
			this.scenarioAdventureName = this.serviceGameSystem.scenarioLookupAdventureName(this.innerValue.scenarioAdventure, this.lookups);

			if (this.innerValue.status != SharedConstants.CharactersStatus.ACTIVE) {
				this.achievementPointsEarned = 0;
				this.downtimePointsEarned = 0;
				this.fameEarned = 0;
				this.scenarioAdventureName = 0;
				this.innerValue.currencyIncomeEarned = 0;
				this.innerValue.currencyEarned = 0;
			}
		},
		getScenarioAdventure(id) {
			if (!id)
				return null;
			const results = this.$store.getters.getScenario(this.innerValue.scenarioId);
			return results ? results.type : null;
		},
		gameSystemId() {
			return SharedConstants.GameSystems.Pathfinder2e.id;
		},
		initResponseDetails(details) {
			details.achievementPointsEarned = this.rulesGameSystem.clean(this.achievementPointsEarned);
			details.achievementPointsSpent = this.rulesGameSystem.clean(this.innerValue.achievementPointsSpent);
			details.boon1Id = this.innerValue.boon1Id;
			details.boon2Id = this.innerValue.boon2Id;
			details.downtimePointsEarned = this.rulesGameSystem.clean(this.downtimePointsEarned);
			details.downtimePointsSpent = this.rulesGameSystem.clean(this.innerValue.downtimePointsSpent);
			details.fameFactionId = this.innerValue.fameFactionId;
			details.fameEarned = this.rulesGameSystem.clean(this.fameEarned);
			details.fameSpent = this.rulesGameSystem.clean(this.innerValue.fameSpent);
			details.reputationFactionId = this.innerValue.fameFactionId;
			details.reputationEarned = this.rulesGameSystem.calculateScenarioReputationEarned(this.innerValue);
			details.reputationAdditionalFactionId = this.innerValue.reputationAdditionalFactionId;
			details.reputationAdditionalEarned = this.rulesGameSystem.clean(this.innerValue.reputationAdditionalEarned);
			details.scenarioAdvancementSpeed = this.innerValue.scenarioAdvancementSpeed;
			details.scenarioAdventure = this.innerValue.scenarioAdventure;
			details.scenarioEvent = this.innerValue.scenarioEvent;
			return details;
		},
		initScenario() {
			return new CharacterScenario();
		},
		initializeServices() {
			this.rulesGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		},
		async resetDialogI(value) {
			await this.$store.dispatcher.scenarios.getScenarioListingPlayed(this.character ? this.character.id : null);
			this.achievementPointsEarned = value && value.experiencePointsEarned ? value.experiencePointsEarned : 0;
			this.downtimePointsEarned = value && value.downtimePointsEarned ? value.downtimePointsEarned : 0;
			this.fameEarned = value && value.fameEarned ? value.fameEarned : 0;
			value.fameFactionId = value && value.fameFactionId ? value.fameFactionId : this.character.factionId;
			value.reputationFactionId = value && value.reputationFactionId ? value.reputationFactionId	: this.character.factionId;
			this.scenarioAdventureName = this.serviceGameSystem.scenarioLookupAdventureName(value.scenarioAdventure, this.lookups);
		}
	}
};
</script>

<style scoped>
.gameSystemScenarioCard {
	padding-top: 2px;
}
</style>
