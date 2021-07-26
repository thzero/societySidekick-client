<template>
	<vue-fragment>
		<v-card
			:class="'pl-2 pr-2 mb-2 ' + ($vuetify.breakpoint.lgAndUp ? 'ml-1 mr-1' : '')"
		>
			<v-card-title
				class="pt-0"
			>
				{{ boonName(value.boonId) }}
			</v-card-title>
			<v-card-subtitle
				class="pb-2"
			>
				<div
					class="text-right"
				>
					{{ $t('locations.name') }}:
					{{ locationName(value.locationId) }}
				</div>
			</v-card-subtitle>
			<v-card-text>
				<v-banner
					v-if="boonDescription(value.boonId)"
					elevation="2"
					class="mb-3 ml-2 mr-2 mt-0"
				>
					<!-- eslint-disable vue/no-v-html -->
					<div v-html="boonDescription(value.boonId)" />
					<!--eslint-enable-->
					<div
						v-if="boonUses(value.boonId)"
					>
						<table>
							<tr>
								<td>
									<span class="subtitle-2">{{ $t('characters.gameSystems.pathfinder2e.boons.uses') }}:</span>
								</td>
								<td
									v-for="(item, index) in boonUsesArray"
									:key="index"
									style="vertical-align: middle"
								>
									<v-checkbox
										dense
									/>
								</td>
							</tr>
						</table>
					</div>
				</v-banner>
				<table
					v-if="hasScenario"
					class="scenario"
				>
					<thead>
						<tr>
							<th class="scenario text-left subtitle-2 gameSystemHeaderSpacer">
								{{ $t('characters.scenarios.name') }}
							</th>
							<th class="scenario text-left subtitle-2 gameSystemHeaderSpacer">
								{{ $t('characters.playedOn') }}
							</th>
						</tr>
						<tr>
							<td class="scenario text-top body-2 gameSystemHeaderSpacer">
								{{ scenarioName(value.scenario) }}
							</td>
							<td class="scenario text-top body-2 gameSystemHeaderSpacer">
								{{ getDateHuman(value.scenario.timestamp) }}
								{{ locationName(value.scenario.locationId, true) }}
							</td>
						</tr>
					</thead>
				</table>
			</v-card-text>
			<v-card-actions
				v-if="!hasScenario"
			>
				<v-spacer />
				<v-btn
					color="primary lighten-1"
					text
					@click="dialogBoonOpen()"
				>
					{{ $t('buttons.edit') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</vue-fragment>
</template>

<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseBoon from '@/components/gameSystems/baseBoon';

export default {
	name: 'Starfinder1eCharacterBoon',
	components: {
	},
	extends: baseBoon,
	props: {
		character: {
			type: Object,
			default: null
		}
	},
	methods: {
		initializeServices() {
			this.rulesGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_STARFINDER_1E);
			this.serviceGameSystem = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
