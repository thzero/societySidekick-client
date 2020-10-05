<template>
	<vue-fragment>
		<v-expansion-panels
			v-model="panel"
		>
			<v-expansion-panel
				class="mb-2"
			>
				<v-expansion-panel-header>
					<div class="mt-2">
						<span class="title pr-2">{{ $t('characters.class') }}/{{ $t('characters.level') }}</span>
						<span class="title font-weight-regular">{{ classNamesAndLevels(value) }} / {{ value.level }}</span>
					</div>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-layout
						v-if="$vuetify.breakpoint.mdAndUp"
						wrap
						pt-0
						pl-4
						pr-4
					>
						<v-flex
							xs3
						>
							<table
								border="0"
								cellpadding="0"
							>
								<tr>
									<th
										colspan="2"
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
									</th>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
										{{ $t('characters.gained') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(value.currencyGained) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
										{{ $t('characters.starting') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(15) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
										{{ $t('characters.earned') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(value.currencyEarned) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.earned') }}
										{{ $t('characters.gameSystems.pathfinder2e.currencyIncome') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(value.currencyIncomeEarned) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
										{{ $t('characters.gameSystems.pathfinder2e.bought') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(value.currencyBought) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
										{{ $t('characters.spent') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(value.currencySpent) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
										{{ $t('characters.inventories.sold') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(value.currencySold) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
										{{ $t('characters.total') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ formatCurrency(value.currencyTotal) }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs6
						>
							<table
								border="0"
								cellpadding="0"
								style="margin-left: auto; margin-right: auto;"
							>
								<tr>
									<th
										colspan="2"
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.slots') }}
									</th>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.generic') }}
									</th>
									<td
										colspan="2"
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonGeneric1Id))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonGeneric1Id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonGeneric1Id) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.generic') }}
									</th>
									<td
										colspan="2"
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonGeneric2Id))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonGeneric2Id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonGeneric2Id) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.generic') }}
									</th>
									<td
										colspan="2"
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonGeneric3Id))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonGeneric3Id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonGeneric3Id) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.faction') }}
									</th>
									<td
										colspan="2"
										class="pathfinder2eBoons2"
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
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.advanced') }}
									</th>
									<td
										colspan="2"
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonAdvancedId))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonAdvancedId))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonAdvancedId) }}</span>
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
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.experiencePointsAbbr') }} /
										{{ $t('characters.gameSystems.pathfinder2e.experiencePoints2GoAbbr') }}
									</th>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.faction') }}
									</th>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.status.name') }}
									</th>
								</tr>
								<tr>
									<td
										class="pathfinder2eExperiencePoints2"
									>
										<span class="body-2">{{ value.experiencePoints }}</span> /
										<ExperienceColorizeValue
											:value="value.experiencePointsToNextLevel"
											:service-game-system="serviceGameSystem"
										/>
									</td>
									<td
										class="pathfinder2eExperiencePoints2"
									>
										<!-- <span class="body-2">{{ factionName(value.factionId) }}</span> -->
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(factionDescription(value.factionId))"
											@mouseenter="handleDisplayHover(factionDescription(value.factionId))"
											@mouseout="handleDisplayHoverClear()"
										>{{ factionName(value.factionId) }}</span>
									</td>
									<td
										class="pathfinder2eExperiencePoints2"
									>
										<span class="body-2">{{ statusName(value.status) }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs3
						>
							<table
								border="0"
								cellpadding="0"
								style="margin-left: auto; margin-right: 0px;"
							>
								<tr>
									<th
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.fame.name') }}
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
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eFame"
									>
										<!-- {{ factionName(item.id) }} -->
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
											{{ $t('characters.gameSystems.pathfinder2e.fame.total') }}
										</span>
									</th>
									<!-- <td
										class="pathfinder2eFame2"
									>
										<span class="body-2">{{ item.earned }}</span> / <span class="body-2">{{ item.spent }}</span> / <span class="body-2">{{ item.remaining }}</span>
									</td> -->
									<td
										class="pathfinder2eFame2"
									>
										<span class="body-2">{{ item.earned }}</span>
									</td>
									<td
										class="pathfinder2eFame2"
									>
										<span class="body-2">{{ item.spent }}</span>
									</td>
									<td
										class="pathfinder2eFame2"
									>
										<span class="body-2">{{ item.remaining }}</span>
									</td>
								</tr>
							</table>
							<table
								border="0"
								cellpadding="0"
								style="margin-left: auto; margin-right: 0px;"
							>
								<tr>
									<th
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.reputation') }}
									</th>
									<th
										class="text-left subtitle-2"
										style="padding-left: 0px;"
									>
										{{ $t('characters.earned') }}
									</th>
								</tr>
								<tr
									v-for="(item, index) of value.reputation"
									:key="index"
								>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eReputation"
									>
										<!-- {{ factionName(item.id) }} -->
										<span
											class="displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(factionDescription(item.id))"
											@mouseenter="handleDisplayHover(factionDescription(item.id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ factionName(item.id) }}</span>
									</th>
									<td
										class="pathfinder2eReputation2"
									>
										<span class="body-2">{{ item.earned }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
					</v-layout>
					<v-layout
						v-if="$vuetify.breakpoint.smAndDown"
						wrap
						pt-0
						pl-2
						pr-2
					>
						<v-flex
							xs4
						>
							<table
								border="0"
								cellpadding="0"
							>
								<tr>
									<th
										colspan="2"
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.currency') }}
									</th>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gained') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ value.currencyGained }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.starting') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">15.00</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.earned') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ value.currencyEarned }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.earned') }}
										{{ $t('characters.gameSystems.pathfinder2e.currencyIncome') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ value.currencyIncomeEarned }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							v-if="$vuetify.breakpoint.smAndUp"
							xs4
						>
							<table
								border="0"
								cellpadding="0"
								class="pt-2"
								style="margin-left: auto; margin-right: auto;"
							>
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
										colspan="2"
										class="text-left pt-2 subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.faction') }}
									</th>
								</tr>
								<tr>
									<td
										colspan="2"
										class="pathfinder2eExperiencePoints2"
									>
										<!-- <span class="body-2">{{ factionName(value.factionId) }}</span> -->
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
										class="text-left pt-2 subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.experiencePointsAbbr') }} /
										{{ $t('characters.gameSystems.pathfinder2e.experiencePoints2GoAbbr') }}
									</th>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.status.name') }}
									</th>
								</tr>
								<tr>
									<td
										class="pathfinder2eExperiencePoints2"
									>
										<span class="body-2">{{ value.experiencePoints }}</span> /
										<ExperienceColorizeValue
											:value="value.experiencePointsToNextLevel"
											:service-game-system="serviceGameSystem"
										/>
									</td>
									<td
										class="pathfinder2eExperiencePoints2"
									>
										<span class="body-2">{{ statusName(value.status) }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							v-if="$vuetify.breakpoint.xs"
							xs4
						>
							<table
								border="0"
								cellpadding="0"
								class="pt-2"
								style="margin-left: auto; margin-right: auto;"
							>
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
										class="text-left pt-2 subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.experiencePointsAbbr') }} /
										{{ $t('characters.gameSystems.pathfinder2e.experiencePoints2GoAbbr') }}
									</th>
								</tr>
								<tr>
									<td
										class="pathfinder2eExperiencePoints2"
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
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eExperiencePoints"
									>
										{{ $t('characters.gameSystems.pathfinder2e.status.name') }}
									</th>
								</tr>
								<tr>
									<td
										class="pathfinder2eExperiencePoints2"
									>
										<span class="body-2">{{ statusName(value.status) }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs4
						>
							<table
								border="0"
								cellpadding="0"
								style="margin-left: auto; margin-right: 0px;"
							>
								<tr>
									<td
										colspan="2"
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ noBreakingSpaces() }}
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.gameSystems.pathfinder2e.bought') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ value.currencyBought }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.spent') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ value.currencySpent }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.inventories.sold') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ value.currencySold }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eCurrency"
									>
										{{ $t('characters.total') }}
									</th>
									<td
										class="pathfinder2eCurrency2"
									>
										<span class="body-2">{{ value.currencyTotal }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs6
						>
							<table
								border="0"
								cellpadding="0"
								style="margin-left: 0px; margin-right: auto;"
							>
								<tr>
									<th
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.fame.name') }}
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
										:class="'text-left subtitle-2 gameSystemHeaderSpacer ' + (item.id == value.factionId ? 'pathfinder2eExperiencePoints' : 'pathfinder2eFame')"
									>
										<!-- {{ factionName(item.id) }} -->
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
											{{ $t('characters.gameSystems.pathfinder2e.fame.total') }}
										</span>
									</th>
									<td
										class="pathfinder2eFame2"
									>
										<span class="body-2">{{ item.earned }}</span>
									</td>
									<td
										class="pathfinder2eFame2"
									>
										<span class="body-2">{{ item.spent }}</span>
									</td>
									<td
										class="pathfinder2eFame2"
									>
										<span class="body-2">{{ item.remaining }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs6
						>
							<table
								border="0"
								cellpadding="0"
								style="margin-left: auto; margin-right: 0px;"
							>
								<tr>
									<th
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.reputation') }}
									</th>
									<th
										class="text-left subtitle-2"
										style="padding-left: 0px;"
									>
										{{ $t('characters.earned') }}
									</th>
								</tr>
								<tr
									v-for="(item, index) of value.reputation"
									:key="'rep'+index"
								>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eReputation"
									>
										<!-- {{ factionName(item.id) }} -->
										<span
											class="displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(factionDescription(item.id))"
											@mouseenter="handleDisplayHover(factionDescription(item.id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ factionName(item.id) }}</span>
									</th>
									<td
										class="pathfinder2eReputation2"
									>
										<span class="body-2">{{ item.earned }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
						<v-flex
							xs12
						>
							<table
								border="0"
								cellpadding="0"
								style="margin-left: auto; margin-right: auto;"
							>
								<tr>
									<th
										colspan="2"
										class="text-left subtitle-1"
										style="padding-left: 0px;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.slots') }}
									</th>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.generic') }}
									</th>
									<td
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonGeneric1Id))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonGeneric1Id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonGeneric1Id) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.generic') }}
									</th>
									<td
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonGeneric2Id))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonGeneric2Id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonGeneric2Id) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.generic') }}
									</th>
									<td
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonGeneric3Id))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonGeneric3Id))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonGeneric3Id) }}</span>
									</td>
								</tr>
								<tr>
									<th
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.faction') }}
									</th>
									<td
										class="pathfinder2eBoons2"
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
										class="text-left subtitle-2 gameSystemHeaderSpacer pathfinder2eBoons"
										style="vertical-align: top;"
									>
										{{ $t('characters.gameSystems.pathfinder2e.boons.types.advanced') }}
									</th>
									<td
										class="pathfinder2eBoons2"
									>
										<span
											class="body-2 displayLink"
											style="vertical-align: top;"
											@click="handleDisplay(boonDescription(value.boonAdvancedId))"
											@mouseenter="handleDisplayHover(boonDescription(value.boonAdvancedId))"
											@mouseout="handleDisplayHoverClear()"
										>{{ boonName(value.boonAdvancedId) }}</span>
									</td>
								</tr>
							</table>
						</v-flex>
					</v-layout>
					<!-- <v-fab-transition
						v-if="editable"
					>
						<v-btn
							absolute
							fab
							right
							small
							top
							style="margin-right: 40px;"
							@click="dialogDetailsOpen()"
						>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</v-fab-transition> -->
					<v-speed-dial
						v-if="editable"
						v-model="fab"
						absolute
						right
						top
						small
						direction="bottom"
						style="margin-right: 40px; top: -20px;"
					>
						<template
							v-slot:activator
						>
							<v-btn
								v-model="fab"
								fab
								small
							>
								<v-icon v-if="fab">
									mdi-close
								</v-icon>
								<v-icon v-else>
									mdi-settings
								</v-icon>
							</v-btn>
						</template>
						<v-btn
							fab
							small
							dark
							color="primary"
							@click="dialogDetailsOpen()"
						>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
						<v-btn
							fab
							small
							dark
							color="red"
							@click="dialogDetailsDeleteOpen()"
						>
							<v-icon>mdi-delete</v-icon>
						</v-btn>
					</v-speed-dial>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
		<CharacterDetailsDialog
			ref="detailsDialog"
			:label="$t('characters.name')"
			:signal="dialogDetailsSignal.signal"
			@cancel="dialogDetailsSignal.cancel()"
			@ok="dialogDetailsSignal.ok()"
		/>
		<!-- using the completeOk property instead of the @ok event, as the delete of the
		character in the store causes the components to no longer be available therefore
		the event fails to fire -->
		<VConfirmationDialog
			ref="deleteConfirmDialog"
			:complete-ok="dialogConfirmDeleteOk"
			:non-recoverable="true"
			:pre-complete-ok="dialogPreCompleteOkDelete"
			:signal="dialogConfirmDeleteSignal.signal"
			@cancel="dialogConfirmDeleteSignal.cancel()"
		/>
	</vue-fragment>
</template>

<script>
import Constants from '@/constants';

import baseCharacterDetails from '@/components/gameSystems/baseCharacterDetails';
import CharacterDetailsDialog from '@/components/gameSystems/pathfinder2e/CharacterDetailsDialog';

import ExperienceColorizeValue from '@/components/gameSystems/ExperienceColorizeValue';

export default {
	name: 'Pathfinder2eCharacterDetails',
	components: {
		CharacterDetailsDialog,
		ExperienceColorizeValue
	},
	extends: baseCharacterDetails,
	computed: {
		fameR() {
			const results = {};
			for (const fame of this.value.fame)
				results[fame.id] = { id: fame.id, fame: fame.earned, reputation: 0 };
			for (const reputation of this.value.reputation) {
				if (!results[reputation.id])
					results[reputation.id] = { id: reputation.id, fame: 0, reputation: 0 };
				results[reputation.id].reputation = reputation.earned;
			}
			return results;
		}
	},
	methods: {
		classNamesAndLevels(value) {
			return this.serviceGameSystem.classNamesAndLevels(this.correlationId(), value, this.$store);
		},
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
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
