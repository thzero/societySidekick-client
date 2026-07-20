<template>
	<v-expansion-panels
		v-model="panel"
	>
		<v-expansion-panel
			class="mb-2"
		>
			<v-expansion-panel-title>
				<div class="mt-2">
					<span class="title pr-2">{{ $t('characters.class') }}/{{ $t('characters.level') }}</span>
					<span class="title font-weight-regular">{{ classNamesAndLevels(value) }}</span>
				</div>
			</v-expansion-panel-title>
			<v-expansion-panel-text>
				<v-row
					v-if="$vuetify.display.mdAndUp"
					no-gutters
					class="pt-0 pl-4 pr-4"
				>
					<v-col
						cols="3"
					>
						<table
							border="0"
							cellpadding="0"
						><tbody>
							<tr>
								<th
									colspan="2"
									class="text-left subtitle-1"
									style="padding-left: 0px;"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
								</th>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
									{{ $t('characters.gained') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencyGained) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
									{{ $t('characters.starting') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(1000) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
									{{ $t('characters.earned') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencyEarned) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.earned') }}
									{{ $t('characters.gameSystems.starfinder1e.currencyIncome') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencyIncomeEarned) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
									{{ $t('characters.gameSystems.starfinder1e.bought') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencyBought) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
									{{ $t('characters.spent') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencySpent) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
									{{ $t('characters.inventories.sold') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencySold) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
									{{ $t('characters.total') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencyTotal) }}</span>
								</td>
							</tr>
						</tbody></table>
					</v-col>
					<v-col
						cols="6"
					>
						<table
							v-if="hasBoonSlots"
							border="0"
							cellpadding="0"
							style="margin-left: auto; margin-right: auto;"
						><tbody>
							<tr>
								<th
									colspan="2"
									class="text-left subtitle-1"
									style="padding-left: 0px;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.slots') }}
								</th>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.ally') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonAllyId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonAllyId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonAllyId) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.faction') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonFactionId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonFactionId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonFactionId) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.personal') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonPersonalId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonPersonalId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonPersonalId) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.promo') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonPromoId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonPromoId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonPromoId) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.social') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonSocialId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonSocialId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonSocialId) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.starship') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonStarshipId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonStarshipId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonStarshipId) }}</span>
								</td>
							</tr>
						</tbody></table>
					</v-col>
					<v-col
						cols="3"
					>
						<table
							border="0"
							cellpadding="0"
							style="margin-left: auto; margin-right: 0px;"
						><tbody>
							<tr>
								<th
									class="text-left subtitle-1"
									style="padding-left: 0px;"
								>
									{{ $t('characters.gameSystems.starfinder1e.fame.name') }}
								</th>
								<th
									class="text-left subtitle-2"
									style="padding-left: 0px;"
								>
									{{ $t('characters.earned') }}
								</th>
								<th
									class="text-left subtitle-2"
									style="padding-left: 0px;"
								>
									{{ $t('characters.spent') }}
								</th>
								<th
									class="text-left subtitle-2"
									style="padding-left: 0px;"
								>
									{{ $t('characters.remain') }}
								</th>
							</tr>
							<tr
								v-for="(item, index) of value.fame"
								:key="'fame'+index"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eFame"
								>
									<span
										v-if="item.id"
										class="displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(factionDescription(item.id))"
										@mouseenter="handleDisplayHover(factionDescription(item.id))"
										@mouseout="handleDisplayHoverClear()"
									>{{ factionName(item.id) }}</span>
									<span
										v-if="!item.id"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.starfinder1e.fame.total') }}
									</span>
								</th>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ item.earned }}</span>
								</td>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ item.spent }}</span>
								</td>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ item.remaining }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eFame"
								>
									{{ $t('characters.gameSystems.starfinder1e.reputation') }}
								</th>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ value.reputationEarned }}</span>
								</td>
							</tr>
							<tr>
								<td
									colspan="2"
									class="body-2"
								>
									{{ noBreakingSpaces() }}
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eExperiencePoints pb-1"
								>
									{{ $t('characters.gameSystems.starfinder1e.faction') }}
								</th>
								<td
									class="pb-1 starfinder1eExperiencePoints2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(factionDescription(value.factionId))"
										@mouseenter="handleDisplayHover(factionDescription(value.factionId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ factionName(value.factionId) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eExperiencePoints pb-1"
								>
									{{ $t($vuetify.display.lgAndUp ? 'characters.gameSystems.starfinder1e.experiencePoints' : 'characters.gameSystems.starfinder1e.experiencePointsAbbr') }} /
									{{ $t('characters.gameSystems.starfinder1e.experiencePoints2GoAbbr') }}
								</th>
								<td
									class="pb-1 starfinder1eExperiencePoints2"
								>
									<span class="body-2">{{ value.experiencePoints }}</span> /
									<ExperienceColorizeValue
										:value="value.experiencePointsToNextLevel"
										:service-game-system="serviceGameSystem"
									/>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eExperiencePoints pb-1"
								>
									{{ $t('characters.level') }}
								</th>
								<td
									class="pb-1 starfinder1eExperiencePoints2"
								>
									<span class="body-2">{{ value.level }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
								>
									{{ $t('characters.gameSystems.pathfinder2e.status.name') }}
								</th>
								<td
									class="pathfinder2eExperiencePoints2"
								>
									<span class="body-2">{{ statusName(value.status) }}</span>
								</td>
							</tr>
						</tbody></table>
					</v-col>
				</v-row>
				<v-row
					v-if="$vuetify.display.smAndDown"
					no-gutters
					class="pt-0 pl-2 pr-2"
				>
					<v-col
						cols="6"
					>
						<table
							border="0"
							cellpadding="0"
						><tbody>
							<tr>
								<th
									colspan="2"
									class="text-left subtitle-1"
									style="padding-left: 0px;"
								>
									{{ $t('characters.gameSystems.starfinder1e.currency') }}
								</th>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gained') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ formatCurrency(value.currencyGained) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.starting') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">15.00</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.earned') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ value.currencyEarned }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.earned') }}
									{{ $t('characters.gameSystems.starfinder1e.currencyIncome') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ value.currencyIncomeEarned }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.gameSystems.starfinder1e.bought') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ value.currencyBought }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.spent') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ value.currencySpent }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.inventories.sold') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ value.currencySold }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eCurrency"
								>
									{{ $t('characters.total') }}
								</th>
								<td
									class="starfinder1eCurrency2"
								>
									<span class="body-2">{{ value.currencyTotal }}</span>
								</td>
							</tr>
						</tbody></table>
					</v-col>
					<v-col
						cols="6"
					>
						<table
							border="0"
							cellpadding="0"
							style="margin-left: auto; margin-right: 0px;"
						><tbody>
							<tr>
								<th
									class="text-left subtitle-1"
									style="padding-left: 0px;"
								>
									{{ $t('characters.gameSystems.starfinder1e.fame.name') }}
								</th>
								<th
									class="text-left subtitle-2"
									style="padding-left: 0px;"
								>
									{{ $t('characters.earned') }}
								</th>
								<th
									class="text-left subtitle-2"
									style="padding-left: 0px;"
								>
									{{ $t('characters.spent') }}
								</th>
								<th
									class="text-left subtitle-2"
									style="padding-left: 0px;"
								>
									{{ $t('characters.remain') }}
								</th>
							</tr>
							<tr
								v-for="(item, index) of value.fame"
								:key="index"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eFame"
								>
									<span
										v-if="item.id"
										class="displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(factionDescription(item.id))"
										@mouseenter="handleDisplayHover(factionDescription(item.id))"
										@mouseout="handleDisplayHoverClear()"
									>{{ factionName(item.id) }}</span>
									<span
										v-if="!item.id"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.starfinder1e.fame.total') }}
									</span>
								</th>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ item.earned }}</span>
								</td>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ item.spent }}</span>
								</td>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ item.remaining }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eFame"
								>
									{{ $t('characters.gameSystems.starfinder1e.reputation') }}
								</th>
								<td
									class="starfinder1eFame2"
								>
									<span class="body-2">{{ value.reputationEarned }}</span>
								</td>
							</tr>
						</tbody></table>
						<table
							border="0"
							cellpadding="0"
							class="pt-2"
							style="margin-left: auto; margin-right: 0px;"
						><tbody>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eExperiencePoints pb-1"
								>
									{{ $t('characters.gameSystems.starfinder1e.faction') }}
								</th>
								<td
									class="pb-1 starfinder1eExperiencePoints2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(factionDescription(value.factionId))"
										@mouseenter="handleDisplayHover(factionDescription(value.factionId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ factionName(value.factionId) }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eExperiencePoints pb-1"
								>
									{{ $t('characters.gameSystems.starfinder1e.experiencePointsAbbr') }} /
									{{ $t('characters.gameSystems.starfinder1e.experiencePoints2GoAbbr') }}
								</th>
								<td
									class="pb-1 starfinder1eExperiencePoints2"
								>
									<span class="body-2">{{ value.experiencePoints }}</span> /
									<ExperienceColorizeValue
										:value="value.experiencePointsToNextLevel"
										:service-game-system="serviceGameSystem"
									/>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eExperiencePoints pb-1"
								>
									{{ $t('characters.level') }}
								</th>
								<td
									class="pb-1 starfinder1eExperiencePoints2"
								>
									<span class="body-2">{{ value.level }}</span>
								</td>
							</tr>
							<tr>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eExperiencePoints pb-1"
								>
									{{ $t('characters.gameSystems.starfinder1e.status.name') }}
								</th>
								<td
									class="pb-1 starfinder1eExperiencePoints2"
								>
									<span class="body-2">{{ statusName(value.status) }}</span>
								</td>
							</tr>
						</tbody></table>
					</v-col>
					<v-col
						v-if="hasBoonSlots"
						cols="6"
					>
						<table
							border="0"
							cellpadding="0"
							style="margin-left: 0px; margin-right: auto;"
						><tbody>
							<tr>
								<th
									colspan="2"
									class="text-left subtitle-1"
									style="padding-left: 0px;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.slots') }}
								</th>
							</tr>
							<tr
								v-if="value.boonAllyId"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.ally') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonAllyId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonAllyId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonAllyId) }}</span>
								</td>
							</tr>
							<tr
								v-if="value.boonFactionId"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.faction') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonFactionId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonFactionId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonFactionId) }}</span>
								</td>
							</tr>
							<tr
								v-if="value.boonPersonalId"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.personal') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonPersonalId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonPersonalId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonPersonalId) }}</span>
								</td>
							</tr>
							<tr
								v-if="value.boonPromoId"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.promo') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonPromoId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonPromoId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonPromoId) }}</span>
								</td>
							</tr>
							<tr
								v-if="value.boonSocialId"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.social') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonSocialId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonSocialId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonSocialId) }}</span>
								</td>
							</tr>
							<tr
								v-if="value.boonStarshipId"
							>
								<th
									class="text-left subtitle-2 gameSystemHeaderSpacer starfinder1eBoons"
									style="vertical-align: top;"
								>
									{{ $t('characters.gameSystems.starfinder1e.boons.types.starship') }}
								</th>
								<td
									class="starfinder1eBoons2"
								>
									<span
										class="body-2 displayLink"
										style="vertical-align: top;"
										@click="handleDisplay(boonDescription(value.boonStarshipId))"
										@mouseenter="handleDisplayHover(boonDescription(value.boonStarshipId))"
										@mouseout="handleDisplayHoverClear()"
									>{{ boonName(value.boonStarshipId) }}</span>
								</td>
							</tr>
						</tbody></table>
					</v-col>
				</v-row>
				<div
					v-if="editable"
					class="characterDetailsSpeedDial"
				>
				<v-speed-dial
					v-model="fab"
					location="bottom center"
					transition="fade-transition"
				>
					<template
						#activator="{ props: activatorProps }"
					>
						<v-btn
							v-bind="activatorProps"
							icon
							size="small"
						>
							<v-icon v-if="fab">
								mdi-close
							</v-icon>
							<v-icon v-else>
								mdi-cog
							</v-icon>
						</v-btn>
					</template>
					<v-btn
						key="edit"
						icon
						size="small"
						color="primary"
						@click="dialogDetailsOpen()"
					>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
					<v-btn
						key="delete"
						icon
						size="small"
						color="red"
						@click="dialogDetailsDeleteOpen()"
					>
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</v-speed-dial>
				</div>
			</v-expansion-panel-text>
		</v-expansion-panel>
	</v-expansion-panels>
	<CharacterDetailsDialog
		ref="detailsDialogRef"
		:label="$t('characters.name')"
		:signal="dialogDetailsSignal.signal"
		@cancel="dialogDetailsSignal.cancel()"
		@ok="dialogDetailsSignal.ok()"
	/>
	<!-- using the completeOk property instead of the @ok event, as the delete of the
	character in the store causes the components to no longer be available therefore
	the event fails to fire -->
	<VtConfirmationDialog
		ref="deleteConfirmDialogRef"
		:complete-ok="dialogConfirmDeleteOk"
		:non-recoverable="true"
		:pre-complete-ok="dialogPreCompleteOkDelete"
		:signal="dialogConfirmDeleteSignal.signal"
		@cancel="dialogConfirmDeleteSignal.cancel()"
	/>
</template>

<script>
import { computed } from 'vue';

import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useGameSystemBaseCharacterDetailsComponent } from '@/components/gameSystems/baseCharacterDetails';

import CharacterDetailsDialog from '@/components/gameSystems/starfinder1e/CharacterDetailsDialog';
import ExperienceColorizeValue from '@/components/gameSystems/ExperienceColorizeValue';
import VtConfirmationDialog from '@thzero/library_client_vue3_vuetify3/components/VtConfirmationDialog';

export default {
	name: 'Starfinder1eCharacterDetails',
	components: {
		CharacterDetailsDialog,
		ExperienceColorizeValue,
		VtConfirmationDialog
	},
	props: {
		value: {
			type: Object,
			default: null
		},
		editable: {
			type: Boolean,
			default: false
		}
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);

		const base = useGameSystemBaseCharacterDetailsComponent(props, context, { serviceGameSystem });

		const hasBoonSlots = computed(() => {
			return (
				props.value.boonAllyId ||
				props.value.boonFactionId ||
				props.value.boonPersonalId ||
				props.value.boonPromoId ||
				props.value.boonSocialId ||
				props.value.booStarshipId);
		});

		const classNamesAndLevels = (value) => {
			return serviceGameSystem.classNamesAndLevels(base.correlationId(), value, LibraryClientUtility.$store);
		};

		return {
			...base,
			hasBoonSlots,
			classNamesAndLevels
		};
	}
};
</script>

<style scoped>
	.characterDetailsSpeedDial {
		position: absolute;
		right: 40px;
		top: -20px;
	}
	td {
		padding-left: 8px;
		padding-bottom: 1px;
		padding-right: 8px;
		padding-top: 4px;
		text-align: middle;
		border-spacing: 4px 0px 0px 0px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	th {
		padding-left: 8px;
		padding-bottom: 1px;
		padding-right: 8px;
		padding-top: 4px;
		text-align: middle;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
</style>
