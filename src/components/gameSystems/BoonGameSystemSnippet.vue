<template>
	<v-card
		outlined
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
			</v-banner>
			<!--eslint-enable-->
			<div
				v-for="scenario of value.scenarios"
				:key="scenario.id"
			>
				<v-divider
					class="mt-2 mb-1"
				/>
				<table style="width: 100%;">
					<tr>
						<td>
							<div
								@click="clickCharacter(scenario.character.id)"
							>
								<v-chip
									color="primary"
									outlined
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
				</table>
				<div>
					<span class="subtitle-2">{{ $t('characters.playedOn') }}</span>&nbsp;
					<span class="body-2">{{ playedTimestamp(scenario) }}</span>
				</div>
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';

import baseGameSystemSnippet from '@/components/gameSystems/baseGameSystemSnippet';

export default {
	name: 'BoonGameSystemSnippet',
	extends: baseGameSystemSnippet,
	computed: {
		gamerTag() {
			return this.user && this.user.settings ? this.user.settings.gamerTag : '';
		}
	},
	created() {
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription() {
			if (!this.value.boon.description)
				return '';
			return this._serviceMarkup.trimResults(this._serviceMarkup.render(this.value.boon.description));
		},
		playedTimestamp(item) {
			return LibraryUtility.getDateHuman(item ? item.timestamp : 0);
		},
		scenarioDescription(scenario) {
			return scenario ? scenario.description : '';
		},
		scenarioName(scenario) {
			return scenario ? this.serviceGameSystem.scenarioName(scenario) : '';
		}
	}
};
</script>
