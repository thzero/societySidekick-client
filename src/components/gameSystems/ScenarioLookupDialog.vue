<template>
	<VFormDialog
		:label="$t('characters.scenarios.namePlural')"
		:signal="signal"
		:button-clear="false"
		:button-ok="false"
		:fullscreen="fullscreenInternal"
		max-width="700px"
		@close="close"
		@cancel="cancel"
	>
		<v-layout
			wrap
			pa-0
		>
			<v-flex
				xs12
				sm12
				md4
				:pr-4="$vuetify.breakpoint.mdAndUp"
			>
				<VTextFieldWithValidation
					ref="scenarioName"
					v-model="scenarioNameFilter"
					vid="scenarioName"
					:label="$t('characters.scenarios.name') + ' ' + $t('forms.name')"
				/>
			</v-flex>
			<v-flex
				xs12
				sm6
				md4
				:pr-4="$vuetify.breakpoint.mdAndUp"
			>
				<VSelectWithValidation
					ref="scenarioSeason"
					v-model="scenarioSeasonFilter"
					vid="scenarioSeason"
					:items="scenariosSeasons"
					:label="$t('characters.scenarios.name') + ' ' + $t('characters.scenarios.season')"
				/>
			</v-flex>
			<v-flex
				xs12
				sm6
				md4
			>
				<VSelectWithValidation
					ref="scenarioAdventure"
					v-model="scenarioAdventureFilter"
					vid="scenarioAdventure"
					:items="scenarioAdventures"
					:label="$t('characters.scenarios.name') + ' ' + $t('characters.scenarios.type')"
				/>
			</v-flex>
			<v-flex
				xs12
			>
				<v-card
					v-for="item in scenarios"
					:key="item.id"
					class="mb-3"
				>
					<v-card-title
						class="pb-2"
					>
						{{ scenarioName(item) }}{{ noBreakingSpaces() }}
						<span
							v-if="item.repeatable"
							class="subtitle-1"
							style="margin-top: auto; margin-bottom: 0px;"
						>
							({{ $t('characters.scenarios.repeatable') }})
						</span>
					</v-card-title>
					<v-card-text
						class="pb-2"
					>
						<!-- eslint-disable vue/no-v-html -->
						<div
							class="markdown-body"
							style="vertical-align: top;"
							v-html="scenarioDescription(item)"
						/>
						<!--eslint-enable-->
						<div
							v-for="played of getPlayed(item.id)"
							:key="played.index"
						>
							<v-divider
								class="mt-2 mb-1"
							/>
							<div>
								{{ playedCharacterName(played) }} #{{ playedCharacterNumber(played) }} ({{ scenarioParticipant(played.scenarioParticipant) }})
							</div>
							<div>
								{{ $t('characters.playedOn') }} {{ playedTimestamp(played) }}
							</div>
						</div>
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn
							color="primary lighten-1"
							text
							@click="ok(item.id)"
						>
							{{ $t('buttons.select') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</VFormDialog>
</template>

<script>
import baseScenarioLookupDialog from '@/components/gameSystems/baseScenarioLookupDialog';

export default {
	name: 'ScenarioLookupDialog',
	extends: baseScenarioLookupDialog
};
</script>

<style scoped>
</style>
