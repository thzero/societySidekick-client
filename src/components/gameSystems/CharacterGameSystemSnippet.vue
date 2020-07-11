<template>
	<v-layout
		wrap
	>
		<v-flex
			xs12
		>
			<table
				style="width: 100;"
			>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
						width="54px"
					>
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.faction') }}
					</th>
					<td
						class="body-2"
					>
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
		</v-flex>
		<v-flex
			xs6
		>
			<table>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
						width="54px"
					>
						{{ $t('characters.class') }}
					</th>
					<td
						class="body-2"
					>
						{{ className }}
					</td>
				</tr>
			</table>
		</v-flex>
		<v-flex
			xs6
		>
			<table
				style="margin-left: auto; margin-right: 0px;"
			>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
					>
						{{ $t('characters.gameSystems.pathfinder2e.status.name') }}
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
		</v-flex>
		<v-flex
			xs6
		>
			<table>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
						width="54px"
					>
						{{ $t('characters.level') }}
					</th>
					<td
						class="body-2"
					>
						{{ value.level }}
					</td>
				</tr>
			</table>
		</v-flex>
		<v-flex
			xs6
		>
			<table
				style="margin-left: auto; margin-right: 0px;"
			>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
					>
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.experiencePointsAbbr') }} /
						{{ $t('characters.gameSystems.' + gameSystemil8n + '.experiencePoints2GoAbbr') }}
					</th>
					<td
						class="body-2"
					>
						{{ value.experiencePoints }} /
						<ExperienceColorizeValue
							:value="value.experiencePointsToNextLevel"
							:service-game-system="serviceGameSystem"
						/>
					</td>
				</tr>
			</table>
		</v-flex>
	</v-layout>
</template>

<script>
import baseGameSystemSnippet from '@/components/gameSystems/baseGameSystemSnippet';

import ExperienceColorizeValue from '@/components/gameSystems/ExperienceColorizeValue';
import StatusColorizeValue from '@/components/gameSystems/StatusColorizeValue';

export default {
	name: 'CharacterGameSystemSnippet',
	components: {
		ExperienceColorizeValue,
		StatusColorizeValue
	},
	extends: baseGameSystemSnippet,
	computed: {
		className() {
			return (this.serviceGameSystem ? this.serviceGameSystem.classNamesAndLevels(this.value, this.$store) : '');
		},
		statusColor() {
			return 'color: ' + (this.value.status === 'dead' ? 'red' : 'green');
		},
		statusName() {
			return this.serviceGameSystem.characterLookupStatusName(this.value.status, this.lookups);
		}
	}
};
</script>
