<template>
	<VFormDialog
		:label="$t('characters.boons.name')"
		:signal="signal"
		:pre-complete-delete="preCompleteResponseDelete"
		:pre-complete-ok="preComplete"
		:fullscreen="fullscreenInternal"
		:button-delete="!isNew"
		max-width="700px"
		@close="close"
		@cancel="cancel"
		@ok="ok"
	>
		<v-card>
			<v-card-text
				class="gameSystemScenarioCard"
			>
				<VTextFieldWithValidation
					ref="boonName"
					v-model="boonName"
					rules="required|"
					vid="boonName"
					:label="$t('forms.name')"
					:readonly="true"
				/>
				<div style="text-align: right">
					<v-btn
						color="primary lighten-1"
						@click="dialogBoonsOpen()"
					>
						{{ $t('buttons.select') }}
					</v-btn>
				</div>
				<table
					border="0"
					cellpadding="0"
					cellspacing="0"
					style="width: 100%;"
				>
					<tr>
						<td class="text-top">
							<div class="pr-4">
								<VDateTimeFieldWithValidation
									ref="timestamp"
									v-model="innerValue.timestamp"
									vid="timestamp"
									rules="required|"
									:output-type="outputType"
									:date-format="dateFormat"
									:time-format="timeFormat"
									:label="$t('characters.boons.date')"
								/>
							</div>
						</td>
						<td class="text-top">
							<VSelectWithValidation
								ref="scenarioLocation"
								v-model="innerValue.locationId"
								vid="scenarioLocation"
								:items="locations"
								:label="$t('locations.name')"
							/>
						</td>
					</tr>
				</table>
			</v-card-text>
		</v-card>
		<BoonLookupDialog
			ref="boonLookup"
			:label="$t('characters.name')"
			:signal="dialogBoons.signal"
			:fullscreen="fullscreenInternal"
			:character-id="character ? character.id : null"
			@cancel="dialogBoons.cancel()"
			@ok="dialogBoonsOk"
		/>
	</VFormDialog>
</template>

<script>
import Utility from '@thzero/library/utility';

import baseBoonDialog from '@/components/gameSystems/baseBoonDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BoonDialog',
	extends: baseBoonDialog,
	data: () => ({
		dialogBoons: new DialogSupport()
	}),
	methods: {
		async resetDialogI(value) {
			value.timestamp = value.timestamp ? Utility.convertTimestampToLocal(value.timestamp).valueOf() : Utility.getTimestampLocal().valueOf();
			this.boonName = this.serviceGameSystem.boonNameById(value.boonId, this.$store);
		}
	}
};
</script>

<style scoped>
.gameSystemScenarioCard {
	padding-top: 2px;
}
</style>
