<template>
	<v-row>
		<v-col cols="12">
			<table style="width: 100;">
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
						width="54px"
					>
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.faction') }}
					</th>
					<td class="body-2">
						<span
							class="body-2 displayLink"
							style="vertical-align: top;"
							@click="handleDisplay(value.factionDescription)"
							@mouseenter="handleDisplayHover(value.factionDescription)"
							@mouseout="handleDisplayHoverClear()"
						>{{ value.factionName }}</span>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="6">
			<table>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
						width="54px"
					>
						{{ $t('characters.class') }}
					</th>
					<td class="body-2">
						{{ className }}
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="6">
			<table style="margin-left: auto; margin-right: 0px;">
				<tr>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.status.name') }}
					</th>
					<td
						class="body-2"
						:style="statusColor"
					>
						<StatusColorizeValue
							:value="value.status"
							:display-value="statusName"
						/>
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="6">
			<table>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
						width="54px"
					>
						{{ $t('characters.level') }}
					</th>
					<td class="body-2">
						{{ value.level }}
					</td>
				</tr>
			</table>
		</v-col>
		<v-col cols="6">
			<table style="margin-left: auto; margin-right: 0px;">
				<tr>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.experiencePointsAbbr') }} /
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.experiencePoints2GoAbbr') }}
					</th>
					<td class="body-2">
						{{ value.experiencePoints }} /
						<ExperienceColorizeValue
							:value="value.experiencePointsToNextLevel"
							:service-game-system="serviceGameSystem"
						/>
					</td>
				</tr>
			</table>
		</v-col>
	</v-row>
</template>

<script>
import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useCharacterGameSystemSnippetComponent } from '@/components/gameSystems/CharacterGameSystemSnippet';

import gameSystemBaseSnippetProps from '@/components/gameSystems/gameSystemBaseSnippetProps';

// TODO(migration): child colorize components (ExperienceColorizeValue / StatusColorizeValue) are
// NOT yet migrated to Vue3 — this component won't fully render until that (small) chain is migrated.
import ExperienceColorizeValue from '@/components/gameSystems/ExperienceColorizeValue';
import StatusColorizeValue from '@/components/gameSystems/StatusColorizeValue';

export default {
	name: 'Starfinder1eCharacterSnippet',
	components: {
		ExperienceColorizeValue,
		StatusColorizeValue
	},
	props: {
		...gameSystemBaseSnippetProps
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);

		const base = useCharacterGameSystemSnippetComponent(props, context, { serviceGameSystem });

		return {
			...base
		};
	}
};
</script>

<style scoped>
</style>
