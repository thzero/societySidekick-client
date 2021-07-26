<template>
	<v-expansion-panels>
		<v-expansion-panel
			class="mb-2"
		>
			<v-expansion-panel-header>
				<v-layout
					wrap
				>
					<v-flex
						xs12
					>
						<span class="title">{{ value.order }}) {{ scenarioName(value) }}</span><br>
					</v-flex>
					<v-flex
						sm6
					>
						<span
							class="subtitle-2"
							style="padding-right: 8px;"
						>
							{{ factionName(value.factionId) }}
						</span>
					</v-flex>
					<v-flex
						v-if="!isInitial"
						sm6
						style="text-align: right"
					>
						<span
							class="subtitle-2"
						>
							{{ $t('characters.playedOn') }}
						</span>
						<span
							class="body-2"
							style="padding-right: 8px;"
						>
							{{ getDateHuman(value.timestamp) }}
							{{ locationName(value.locationId) }}
						</span>
					</v-flex>
				</v-layout>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-card
					tile
					outlined
					class="pl-2 pr-2"
					style="border: none"
				>
					<!-- <v-card-title
						class="pt-0"
					>
						{{ scenarioName }}
					</v-card-title>
					<v-card-subtitle
						class="pb-2"
					>
						{{ $t('characters.playedOn') }} {{ getDateHuman(value.timestamp) }}
					</v-card-subtitle> -->
					<v-card-text
						pa-0
						ma-0
						style="padding-left: 0px; padding-right: 0px;"
					>
						<v-layout
							wrap
						>
							<v-flex
								v-if="!isInitial"
								xs12
							>
								<v-banner
									elevation="2"
									class="mb-3 ml-2 mr-2 mt-0"
								>
									<!-- eslint-disable vue/no-v-html -->
									<div v-html="scenarioDescription(value)" />
									<!--eslint-enable-->
								</v-banner>
							</v-flex>
							<v-flex
								v-if="!isInitial"
								xs12
								md6
								lg6
								xl6
							>
								<table class="scenario">
									<thead>
										<tr>
											<th class="scenario text-left subtitle-2 pathfinder2eScenario gameSystemHeaderSpacer">
												{{ $vuetify.breakpoint.mdAndUp ? $t('characters.gameSystems.pathfinder2e.scenarios.advancementSpeed') : $t('characters.gameSystems.pathfinder2e.scenarios.advancementSpeedAbbr') }}
											</th>
											<th class="scenario text-left subtitle-2 pathfinder2eScenario gameSystemHeaderSpacer">
												{{ $t('characters.gameSystems.pathfinder2e.scenarios.adventure') }}
											</th>
											<th class="scenario text-left subtitle-2 pathfinder2eScenario gameSystemHeaderSpacer">
												{{ $t('characters.gameSystems.pathfinder2e.scenarios.participant') }}
											</th>
											<th class="scenario text-left subtitle-2 pathfinder2eScenario gameSystemHeaderSpacer">
												{{ $t('characters.gameSystems.pathfinder2e.event') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario text-top body-2 pathfinder2eScenario2 gameSystemHeaderSpacer">
												{{ scenarioAdvancementSpeedName(value.scenarioAdvancementSpeed) }}
											</td>
											<td class="scenario text-top body-2 pathfinder2eScenario2 gameSystemHeaderSpacer">
												{{ scenarioAdventureName(value.scenario ? value.scenario.type : null) }}
											</td>
											<td class="scenario text-top body-2 pathfinder2eScenario2 gameSystemHeaderSpacer">
												{{ scenarioParticipantName(value.scenarioParticipant) }}
											</td>
											<td class="scenario text-top body-2 pathfinder2eScenario2 gameSystemHeaderSpacer">
												{{ scenarioEventName(value.scenarioEvent) }}
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
							<v-flex
								v-if="!isInitial"
								xs12
								md6
								lg6
								xl6
							>
								<table class="scenario">
									<thead>
										<tr>
											<th
												class="scenario text-left subtitle-2 pathfinder2eScenario gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.scenarios.order') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eExperiencePoints gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.gameSystems.starfinder1e.experiencePointsAbbr') }} {{ $t('characters.earned') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eExperiencePoints gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.level') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eExperiencePoints gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.status.name') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario text-top body-2 pathfinder2eScenario2 gameSystemHeaderSpacer">
												{{ value.order }}
											</td>
											<td class="scenario text-top body-2 pathfinder2eExperiencePoints2 gameSystemHeaderSpacer">
												{{ value.experiencePointsEarned }}
											</td>
											<td class="scenario text-top body-2 pathfinder2eExperiencePoints2 gameSystemHeaderSpacer">
												{{ scenarioLevel }}
											</td>
											<td
												class="scenario text-top body-2 pathfinder2eExperiencePoints2 gameSystemHeaderSpacer"
											>
												<StatusColorizeValue
													:value="value.status"
													:display-value="statusName(value.status)"
												/>
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
							<v-flex
								v-if="!isInitial"
								xs12
								md6
							>
								<table class="scenario">
									<thead>
										<tr>
											<th
												colspan="2"
												class="scenario subtitle-2 pathfinder2eAchievementPoints gameSystemHeaderSpacer"
											>
												{{ $t('characters.gameSystems.pathfinder2e.achievementPoints') }}
											</th>
											<th
												colspan="2"
												class="scenario subtitle-2 pathfinder2eDowntime gameSystemHeaderSpacer"
											>
												{{ $t('characters.gameSystems.pathfinder2e.downtime') }}
											</th>
										</tr>
										<tr>
											<th
												class="scenario text-left subtitle-2 pathfinder2eAchievementPoints gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.earned') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eAchievementPoints gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.spent') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eDowntime gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.earned') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eDowntime gameSystemHeaderSpacer"
												style="width: 25%"
											>
												{{ $t('characters.spent') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario body-2 pathfinder2eAchievementPoints2 gameSystemHeaderSpacer">
												{{ value.achievementPointsEarned ? value.achievementPointsEarned : 0 }}
											</td>
											<td class="scenario body-2 pathfinder2eAchievementPoints2 gameSystemHeaderSpacer">
												{{ value.achievementPointsSpent ? value.achievementPointsSpent : 0 }}
											</td>
											<td class="scenario body-2 pathfinder2eDowntime2 gameSystemHeaderSpacer">
												{{ value.downtimePointsEarned ? value.downtimePointsEarned : 0 }}
											</td>
											<td class="scenario body-2 pathfinder2eDowntime2 gameSystemHeaderSpacer">
												{{ value.downtimePointsSpent ? value.downtimePointsSpent : 0 }}
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
							<v-flex
								v-if="!isInitial"
								xs12
								md6
							>
								<table class="scenario">
									<thead>
										<tr>
											<th
												colspan="3"
												class="scenario subtitle-2 pathfinder2eFame gameSystemHeaderSpacer"
											>
												{{ $t('characters.gameSystems.pathfinder2e.fame.name') }}
											</th>
											<th
												colspan="2"
												class="scenario subtitle-2 pathfinder2eReputation gameSystemHeaderSpacer"
											>
												{{ $t('characters.gameSystems.pathfinder2e.reputation') }}
											</th>
										</tr>
										<tr>
											<th
												class="scenario text-left subtitle-2 pathfinder2eFame gameSystemHeaderSpacer"
												style="width: 30%"
											>
												{{ $t('characters.gameSystems.pathfinder2e.faction') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eFame gameSystemHeaderSpacer"
												style="width: 13%"
											>
												{{ $t('characters.earned') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eFame gameSystemHeaderSpacer"
												style="width: 13%"
											>
												{{ $t('characters.spent') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eReputation gameSystemHeaderSpacer"
												style="width: 30%"
											>
												{{ $t('characters.gameSystems.pathfinder2e.faction') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eReputation gameSystemHeaderSpacer"
												style="width: 14%"
											>
												{{ $t('characters.earned') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario body-2 pathfinder2eReputation2 gameSystemHeaderSpacer">
												{{ factionName(value.fameFactionId) }}
											</td>
											<td class="scenario body-2 pathfinder2eFame2 gameSystemHeaderSpacer">
												{{ value.fameEarned }}
											</td>
											<td class="scenario body-2 pathfinder2eFame2 gameSystemHeaderSpacer">
												{{ value.fameSpent }}
											</td>
											<td class="scenario body-2 pathfinder2eReputation2 gameSystemHeaderSpacer">
												{{ factionName(value.reputationFactionId) }}
											</td>
											<td class="scenario body-2 pathfinder2eReputation2 gameSystemHeaderSpacer">
												{{ value.reputationEarned }}
											</td>
										</tr>
										<tr
											v-if="value.reputationAdditionalFactionId && value.reputationAdditionalEarned"
										>
											<td class="scenario" />
											<td class="scenario" />
											<td class="scenario" />
											<td class="scenario body-2 pathfinder2eReputation2 gameSystemHeaderSpacer">
												{{ factionName(value.reputationAdditionalFactionId) }}
											</td>
											<td class="scenario body-2 pathfinder2eReputation2 gameSystemHeaderSpacer">
												{{ value.reputationAdditionalEarned }}
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
							<v-flex
								xs12
							>
								<div
									class="subtitle-2 pathfinder2eCurrency gameSystemHeaderSpacer"
									style="text-align: center; margin-left: 2px; margin-right: 2px; padding-top: 2px;; padding-bottom: 2px;"
								>
									{{ $t('characters.gameSystems.pathfinder2e.currency') }}
								</div>
							</v-flex>
							<v-flex
								xs12
								md6
							>
								<table class="scenario">
									<thead>
										<tr>
											<th
												class="scenario text-left subtitle-2 pathfinder2eCurrency gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.earned') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eCurrency gameSystemHeaderSpacer"
												style="width: 15%"
											>
												{{ $t('characters.earned') }}
												{{ $t('characters.gameSystems.pathfinder2e.currencyIncome') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eCurrency gameSystemHeaderSpacer"
												style="width: 15%"
											>
												{{ $t('characters.spent') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario body-2 pathfinder2eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencyEarned) }}
											</td>
											<td class="scenario body-2 pathfinder2eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencyIncomeEarned) }}
											</td>
											<td class="scenario body-2 pathfinder2eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencySpent) }}
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
							<v-flex
								xs12
								md6
							>
								<table class="scenario">
									<thead>
										<tr>
											<th
												class="scenario text-left subtitle-2 pathfinder2eCurrency gameSystemHeaderSpacer"
												style="width: 15%"
											>
												{{ $t('characters.gameSystems.pathfinder2e.bought') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eCurrency gameSystemHeaderSpacer"
												style="width: 10%"
											>
												{{ $t('characters.inventories.sold') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eCurrency gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.total') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario body-2 pathfinder2eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencyBought) }}
											</td>
											<td class="scenario body-2 pathfinder2eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencySold) }}
											</td>
											<td class="scenario body-2 pathfinder2eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencyTotal) }}
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
							<v-flex
								v-if="hasBoons"
								xs12
							>
								<v-banner>
									{{ $t('characters.gameSystems.pathfinder2e.boons.name') }}
								</v-banner>
								<table class="scenario">
									<thead>
										<tr>
											<th
												class="scenario text-left subtitle-2 pathfinder2eBoons gameSystemHeaderSpacer"
												style="width: 40%"
											>
												{{ $t('forms.name') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eBoons gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.inventories.inUse') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eBoons gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.inventories.used') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eBoons gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.inventories.maxUses') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-if="value.boon1Id"
											class="pathfinder2eBoons3"
										>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												{{ boonName(value.boon1Id ) }}
											</td>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												&nbsp;
											</td>
										</tr>
										<tr
											v-if="value.boon2Id"
											class="pathfinder2eBoons3"
										>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												{{ boonName(value.boon2Id ) }}
											</td>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 gameSystemHeaderSpacer">
												&nbsp;
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
						</v-layout>
					</v-card-text>
					<v-card-actions
						v-if="!isInitial"
					>
						<v-spacer />
						<v-btn
							color="primary lighten-1"
							text
							@click="dialogScenarioOpen()"
						>
							{{ $t('buttons.edit') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseScenario from '@/components/gameSystems/baseScenario';

import StatusColorizeValue from '@/components/gameSystems/StatusColorizeValue';

export default {
	name: 'Pathfinder2eCharacterScenario',
	components: {
		StatusColorizeValue
		// ScenarioDialog
	},
	extends: baseScenario,
	props: {
		character: {
			type: Object,
			default: null
		},
		collapse: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		initializeServices() {
			this.rulesGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		},
		scenarioAdvancementSpeedName(id) {
			return this.serviceGameSystem.scenarioLookupAdvancementSpeedName(this.correlationId(), id, this.lookups);
		},
		scenarioAdventureName(id) {
			return this.serviceGameSystem.scenarioLookupAdventureName(this.correlationId(), id, this.lookups);
		},
		scenarioEventName(id) {
			return this.serviceGameSystem.scenarioLookupEventName(this.correlationId(), id, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>

