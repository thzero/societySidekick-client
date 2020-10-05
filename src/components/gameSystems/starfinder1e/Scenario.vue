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
								md6
								lg6
								xl6
							>
								<table class="scenario">
									<thead>
										<tr>
											<th class="scenario text-left subtitle-2 starfinder1eScenario gameSystemHeaderSpacer">
												{{ $vuetify.breakpoint.mdAndUp ? $t('characters.gameSystems.starfinder1e.scenarios.advancementSpeed') : $t('characters.gameSystems.starfinder1e.scenarios.advancementSpeedAbbr') }}
											</th>
											<th class="scenario text-left subtitle-2 starfinder1eScenario gameSystemHeaderSpacer">
												{{ $t('characters.gameSystems.starfinder1e.scenarios.adventure') }}
											</th>
											<th class="scenario text-left subtitle-2 starfinder1eScenario gameSystemHeaderSpacer">
												{{ $t('characters.gameSystems.starfinder1e.scenarios.participant') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eScenario gameSystemHeaderSpacer"
												style="width: 10%"
											>
												{{ $t('characters.scenarios.order') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario text-top body-2 starfinder1eScenario2 gameSystemHeaderSpacer">
												{{ scenarioAdvancementSpeedName(value.scenarioAdvancementSpeed) }}
											</td>
											<td class="scenario text-top body-2 starfinder1eScenario2 gameSystemHeaderSpacer">
												{{ scenarioAdventureName(value.scenarioAdventure) }}
											</td>
											<td class="scenario text-top body-2 starfinder1eScenario2 gameSystemHeaderSpacer">
												{{ scenarioParticipantName(value.scenarioParticipant) }}
											</td>
											<td class="scenario text-top body-2 starfinder1eScenario2 gameSystemHeaderSpacer">
												{{ value.order }}
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
												class="scenario text-left subtitle-2 starfinder1eExperiencePoints gameSystemHeaderSpacer"
												style="width: 50%"
											>
												{{ $t('characters.gameSystems.starfinder1e.classes.name') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eExperiencePoints gameSystemHeaderSpacer"
												style="width: 10%"
											>
												{{ $t('characters.gameSystems.starfinder1e.experiencePointsAbbr') }} {{ $t('characters.earned') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eExperiencePoints gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.level') }}
											</th>
											<th
												class="scenario text-left subtitle-2 pathfinder2eExperiencePoints gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.status.name') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario text-top body-2 starfinder1eExperiencePoints2 gameSystemHeaderSpacer">
												{{ className(value.classId) }}
											</td>
											<td class="scenario text-top body-2 starfinder1eExperiencePoints2 gameSystemHeaderSpacer">
												{{ value.experiencePointsEarned }}
											</td>
											<td class="scenario text-top body-2 starfinder1eExperiencePoints2 gameSystemHeaderSpacer">
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
							>
								<table class="scenario">
									<thead>
										<tr>
											<th
												colspan="3"
												class="scenario subtitle-2 starfinder1eFame gameSystemHeaderSpacer"
											>
												{{ $t('characters.gameSystems.starfinder1e.fame.name') }}
											</th>
											<th
												colspan="2"
												class="scenario subtitle-2 starfinder1eReputation gameSystemHeaderSpacer"
											>
												{{ $t('characters.gameSystems.starfinder1e.reputation') }}
											</th>
										</tr>
										<tr>
											<th
												class="scenario text-left subtitle-2 starfinder1eFame gameSystemHeaderSpacer"
												style="width: 30%"
											>
												{{ $t('characters.gameSystems.starfinder1e.faction') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eFame gameSystemHeaderSpacer"
												style="width: 13%"
											>
												{{ $t('characters.earned') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eFame gameSystemHeaderSpacer"
												style="width: 13%"
											>
												{{ $t('characters.spent') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eReputation gameSystemHeaderSpacer"
												style="width: 30%"
											>
												{{ $t('characters.gameSystems.starfinder1e.faction') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eReputation gameSystemHeaderSpacer"
												style="width: 14%"
											>
												{{ $t('characters.earned') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario body-2 starfinder1eReputation2 gameSystemHeaderSpacer">
												{{ factionName(value.fameFactionId) }}
											</td>
											<td class="scenario body-2 starfinder1eFame2 gameSystemHeaderSpacer">
												{{ value.fameEarned }}
											</td>
											<td class="scenario body-2 starfinder1eFame2 gameSystemHeaderSpacer">
												{{ value.fameSpent }}
											</td>
											<td class="scenario body-2 starfinder1eReputation2 gameSystemHeaderSpacer">
												{{ factionName(value.reputationFactionId) }}
											</td>
											<td class="scenario body-2 starfinder1eReputation2 gameSystemHeaderSpacer">
												{{ value.reputationEarned }}
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
							<v-flex
								xs12
							>
								<div
									class="subtitle-2 starfinder1eCurrency gameSystemHeaderSpacer"
									style="text-align: center; margin-left: 2px; margin-right: 2px; padding-top: 2px;; padding-bottom: 2px;"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
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
												class="scenario text-left subtitle-2 starfinder1eCurrency gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.gameSystems.starfinder1e.currencyGarnered') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eCurrency gameSystemHeaderSpacer"
												style="width: 15%"
											>
												{{ $t('characters.gameSystems.starfinder1e.currencyIncome') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eCurrency gameSystemHeaderSpacer"
												style="width: 15%"
											>
												{{ $t('characters.spent') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario body-2 starfinder1eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencyEarned) }}
											</td>
											<td class="scenario body-2 starfinder1eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencyIncomeEarned) }}
											</td>
											<td class="scenario body-2 starfinder1eCurrency2 gameSystemHeaderSpacer">
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
												class="scenario text-left subtitle-2 starfinder1eCurrency gameSystemHeaderSpacer"
												style="width: 15%"
											>
												{{ $t('characters.gameSystems.starfinder1e.bought') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eCurrency gameSystemHeaderSpacer"
												style="width: 10%"
											>
												{{ $t('characters.inventories.sold') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eCurrency gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.total') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="scenario body-2 starfinder1eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencyBought) }}
											</td>
											<td class="scenario body-2 starfinder1eCurrency2 gameSystemHeaderSpacer">
												{{ formatCurrency(value.currencySold) }}
											</td>
											<td class="scenario body-2 starfinder1eCurrency2 gameSystemHeaderSpacer">
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
									{{ $t('characters.gameSystems.starfinder1e.boons.name') }}
								</v-banner>
								<table class="scenario">
									<thead>
										<tr>
											<th
												class="scenario text-left subtitle-2 starfinder1eBoons gameSystemHeaderSpacer"
												style="width: 40%"
											>
												{{ $t('forms.name') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eBoons gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.inventories.inUse') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eBoons gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.inventories.used') }}
											</th>
											<th
												class="scenario text-left subtitle-2 starfinder1eBoons gameSystemHeaderSpacer"
												style="width: 20%"
											>
												{{ $t('characters.inventories.maxUses') }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-if="value.boon1Id"
										>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
												{{ boonName(value.boon1Id ) }}
											</td>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
												&nbsp;
											</td>
										</tr>
										<tr
											v-if="value.boon2Id"
										>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
												{{ boonName(value.boon2Id ) }}
											</td>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
												&nbsp;
											</td>
											<td class="scenario body-2 starfinder1eBoons3 gameSystemHeaderSpacer">
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

import baseScenario from '@/components/gameSystems/baseScenario';

import StatusColorizeValue from '@/components/gameSystems/StatusColorizeValue';

export default {
	name: 'Starfinder1eCharacterScenario',
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
		className(id) {
			return this.serviceGameSystem.classNameById(this.correlationId(), id, this.$store);
		},
		initializeServices() {
			this.rulesGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E);
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		},
		scenarioAdvancementSpeedName(id) {
			return this.serviceGameSystem.scenarioLookupAdvancementSpeedName(this.correlationId(), id, this.lookups);
		},
		scenarioAdventureName(id) {
			return this.serviceGameSystem.scenarioLookupAdventureName(this.correlationId(), id, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>
