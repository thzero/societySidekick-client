<template>
	<v-card
		variant="outlined"
		style="background-color: rgb(var(--v-theme-surface));"
		min-width="300px"
		height="100%"
	>
		<v-card-title>
			<span
				class="title text-capitalize"
			>
				{{ value.boon.name }}
			</span>
		</v-card-title>
		<v-card-subtitle>
			<span
				class="title text-capitalize"
			>
				<span
					class="displayLink"
					@click="handleDisplay(scenarioDescription(value.scenario))"
					@mouseenter="handleDisplayHover(scenarioDescription(value.scenario))"
					@mouseout="handleDisplayHoverClear()"
				>
					{{ scenarioName(value.scenario) }}
				</span>
			</span>
		</v-card-subtitle>
		<v-card-text class="body-1">
			<v-banner
				elevation="2"
				class="mb-3 ml-2 mr-2 mt-0 body-2"
			>
				<!-- eslint-disable vue/no-v-html -->
				<div v-html="boonDescription()" />
				<!--eslint-enable-->
			</v-banner>
			<div
				v-for="scenario of value.scenarios"
				:key="scenario.id"
			>
				<v-divider
					class="mt-2 mb-1"
				/>
				<table style="width: 100%;"><tbody>
					<tr>
						<td>
							<div
								@click="clickCharacter(scenario.character.id)"
							>
								<v-chip
									color="primary"
									variant="outlined"
									label
								>
									<CharacterNameSnippet
										:value="scenario.character"
										:include-character-number="false"
										:has-secondary="false"
										font-name="text-capitalize displayLink"
									/>
								</v-chip>
							</div>
						</td>
						<td>
							<div
								style="float: right"
								@click="clickCharacter(scenario.character.id)"
							>
								<CharacterNameSnippet
									:value="scenario.character"
									:user="user"
									:include-character-number="true"
									:has-name="false"
									font-name=""
									font-secondary="text-capitalize displayLink"
									prefix=""
									suffix=""
								/>
							</div>
						</td>
					</tr>
				</tbody></table>
				<div>
					<span class="subtitle-2">{{ $t('characters.playedOn') }}</span>&nbsp;
					<span class="body-2">{{ playedTimestamp(scenario) }}</span>
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBoonGameSystemSnippetComponent } from '@/components/gameSystems/BoonGameSystemSnippet';

import gameSystemBaseSnippetProps from '@/components/gameSystems/gameSystemBaseSnippetProps';

// TODO(migration): child <CharacterNameSnippet> (@/components/gameSystems/pathfinder2e/CharacterNameSnippet)
// is NOT yet migrated to Vue3 — this component won't fully render until that chain is migrated.
// Also: v-banner structure changed in Vuetify 3; confirm appearance.
import CharacterNameSnippet from '@/components/gameSystems/pathfinder2e/CharacterNameSnippet';

export default {
	name: 'Pathfinder2eBoonSnippet',
	components: {
		CharacterNameSnippet
	},
	props: {
		...gameSystemBaseSnippetProps
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const boon = useBoonGameSystemSnippetComponent(props, context, { serviceGameSystem });

		const scenarioLookupAdventureName = (value) => {
			return serviceGameSystem.scenarioLookupAdventureName(boon.correlationId(), value, boon.lookups.value);
		};

		return {
			...boon,
			scenarioLookupAdventureName
		};
	}
};
</script>

<style scoped>
</style>
