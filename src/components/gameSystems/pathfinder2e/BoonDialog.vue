<template>
	<VtFormDialog
		:label="$t('characters.boons.name')"
		:signal="signal"
		:validation="validation"
		:pre-complete-delete="preCompleteResponseDelete"
		:pre-complete-ok="preComplete"
		:button-delete="!isNew"
		max-width="700px"
		@close="cancel"
		@ok="ok"
	>
		<v-card>
			<v-card-text class="gameSystemScenarioCard">
				<VtTextFieldWithValidation
					ref="boonNameRef"
					v-model="boonName"
					vid="boonName"
					:validation="validation"
					:label="$t('forms.name')"
					:readonly="true"
				/>
				<div style="text-align: right">
					<v-btn
						color="primary"
						@click="dialogBoonsOpen()"
					>
						{{ $t('buttons.select') }}
					</v-btn>
				</div>
				<table
					v-if="innerValue"
					border="0"
					cellpadding="0"
					cellspacing="0"
					style="width: 100%;"
				><tbody>
					<tr>
						<td class="text-top">
							<div class="pr-4">
								<VtDateTimePickerFieldWithValidationTemp
									ref="timestampRef"
									v-model="innerValue.timestamp"
									vid="timestamp"
									:validation="validation"
									:output-type="outputType"
									:date-format="dateFormat"
									:time-format="timeFormat"
									:label="$t('characters.boons.date')"
								/>
							</div>
						</td>
						<td class="text-top">
							<VtSelectWithValidation
								ref="scenarioLocationRef"
								v-model="innerValue.locationId"
								vid="scenarioLocation"
								:validation="validation"
								:items="locations"
								:label="$t('locations.name')"
							/>
						</td>
					</tr>
				</tbody></table>
			</v-card-text>
		</v-card>
		<BoonLookupDialog
			ref="boonLookupRef"
			:label="$t('characters.name')"
			:signal="dialogBoons.signal"
			:character-id="character ? character.id : null"
			@cancel="dialogBoons.cancel()"
			@ok="dialogBoonsOk"
		/>
	</VtFormDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import CharacterBoon from '@/common/gameSystems/pathfinder2e/data/characterBoon';

import { useBaseBoonDialogComponent } from '@/components/gameSystems/baseBoonDialog';

import BoonLookupDialog from '@/components/gameSystems/pathfinder2e/BoonLookupDialog';
import VtDateTimePickerFieldWithValidationTemp from '@thzero/library_client_vue3_vuetify3/components/form/VtDateTimePickerFieldWithValidationTemp';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Pathfinder2eBoonDialog',
	components: {
		BoonLookupDialog,
		VtDateTimePickerFieldWithValidationTemp,
		VtFormDialog,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		},
		character: {
			type: Object,
			default: null
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const rulesGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useBaseBoonDialogComponent(props, context, {
			serviceGameSystem,
			rulesGameSystem,
			gameSystemId: () => SharedConstants.GameSystems.Pathfinder2e.id,
			initBoon: () => new CharacterBoon(),
			initResponseDetails: (correlationId, details) => details
		});

		return {
			...base,
			validation: useVuelidate({ $scope: 'Pathfinder2eBoonDialog' })
		};
	},
	validations() {
		return {
			boonName: {
				required,
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
.gameSystemScenarioCard {
	padding-top: 2px;
}
</style>
