<template>
	<v-card
		variant="outlined"
		min-width="300px"
		height="100%"
	>
		<v-card-title>
			<span class="title text-capitalize">
				{{ scenarioName(value.scenario) }}
			</span>
		</v-card-title>
		<v-card-text class="body-1">
			<table style="width: 100%;">
				<tr>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('characters.scenarios.season') }}
					</th>
					<td class="body-2">
						{{ value.scenario.season ? value.scenario.season : '' }}
					</td>
					<td style="text-align: right;">
						<v-chip
							v-if="isParticipantGamemaster(value.scenarioParticipant)"
							color="secondary"
							variant="outlined"
							label
						>
							{{ $t('characters.gameSystems.' + gameSystemil8n + '.scenarios.participants.gamemasterAbbr') }}
						</v-chip>
						<v-chip
							v-if="value.repeated"
							color="red"
							variant="outlined"
							label
							class="ml-2"
						>
							<span style="width: 86px;text-align: center;">{{ $t('characters.gameSystems.' + gameSystemil8n + '.scenarios.statuses.repeated') }}</span>
						</v-chip>
					</td>
				</tr>
				<tr>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.scenarios.adventure') }}
					</th>
					<td class="body-2">
						{{ scenarioLookupAdventureName(value.scenario.type) }}
					</td>
					<td style="text-align: right;">
						<v-chip
							v-if="value.scenario.repeatable"
							color="purple"
							variant="outlined"
							label
							class="ml-2"
						>
							<span style="width: 86px;text-align: center;">{{ $t('characters.scenarios.repeatable') }}</span>
						</v-chip>
					</td>
				</tr>
				<tr
					v-if="value.character"
				>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('characters.name') + ' ' + $t('forms.name') }}
					</th>
					<td
						class="body-2"
						colspan="2"
					>
						<table style="width: 100%;">
							<tr>
								<td>
									<div
										v-if="!isExternalList"
										@click="clickCharacter(value.character.id)"
									>
										<v-chip
											color="primary"
											variant="outlined"
											label
										>
											<CharacterNameSnippet
												:value="value.character"
												:include-character-number="false"
												:has-secondary="false"
												font-name="text-capitalize displayLink"
												font-secondary=""
											/>
										</v-chip>
									</div>
									<div
										v-if="isExternalList"
									>
										<CharacterNameSnippet
											:value="value.character"
											:include-character-number="false"
											:has-secondary="false"
											font-name="text-capitalize"
											font-secondary=""
										/>
									</div>
								</td>
								<td>
									<div
										v-if="!isExternalList"
										style="float: right"
										@click="clickCharacter(value.character.id)"
									>
										<CharacterNameSnippet
											:value="value.character"
											:user="user"
											:include-character-number="true"
											:has-name="false"
											font-name=""
											font-secondary="text-capitalize displayLink"
											prefix=""
											suffix=""
										/>
									</div>
									<div
										v-if="isExternalList"
										style="float: right"
									>
										<CharacterNameSnippet
											:value="value.character"
											:user="user"
											:include-character-number="true"
											:has-name="false"
											font-name=""
											font-secondary=""
											prefix=""
											suffix=""
										/>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr
					v-if="value.timestamp"
				>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('characters.playedOn') }}
					</th>
					<td
						class="body-2"
						colspan="2"
					>
						{{ getDateHuman(value.timestamp) }}
						{{ locationName(value.locationId) }}
					</td>
				</tr>
				<tr
					v-if="isExternalListFavorites"
				>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('players.name') + ' ' + $t('forms.name') }}
					</th>
					<td class="body-2">
						{{ gamerTag }}
					</td>
				</tr>
			</table>
		</v-card-text>
	</v-card>
</template>

<script>
import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useScenarioGameSystemSnippetComponent } from '@/components/gameSystems/ScenarioGameSystemSnippet';

import gameSystemBaseSnippetProps from '@/components/gameSystems/gameSystemBaseSnippetProps';

import CharacterNameSnippet from '@/components/gameSystems/pathfinder2e/CharacterNameSnippet';

export default {
	name: 'Pathfinder2eScenarioSnippet',
	components: {
		CharacterNameSnippet
	},
	props: {
		...gameSystemBaseSnippetProps
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useScenarioGameSystemSnippetComponent(props, context, { serviceGameSystem });

		const scenarioLookupAdventureName = (value) => {
			return serviceGameSystem.scenarioLookupAdventureName(base.correlationId(), value, base.lookups.value);
		};

		return {
			...base,
			scenarioLookupAdventureName
		};
	}
};
</script>

<style scoped>
</style>
