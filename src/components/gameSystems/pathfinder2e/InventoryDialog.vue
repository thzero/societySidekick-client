<template>
	<VtFormDialog
		:label="(innerValue.item ? $t('strings.edit') : $t('strings.add')) + ' ' + $t('characters.gear')"
		:signal="signal"
		:validation="validation"
		:pre-complete-delete="preCompleteResponseDelete"
		:pre-complete-ok="preCompleteResponseOk"
		:button-delete="!isNew"
		max-width="700px"
		@close="cancel"
		@ok="ok"
	>
		<v-card
			tile
			variant="outlined"
		>
			<v-card-text
				class="scenarioCard"
			>
				<v-row>
					<v-col cols="12">
						{{ transCurrency() }}
					</v-col>
					<v-col
						cols="6"
						class="pr-3"
					>
						<VtNumberField
							:model-value="characterCurrencyTotal"
							:label="$t('characters.name') + ' ' + $t('characters.total')"
							:readonly="true"
						/>
					</v-col>
					<v-col cols="6">
						<VtNumberField
							v-model="characterScenarioCurrencyTotal"
							:negative-color="true"
							:label="$t('characters.scenarios.name') + ' ' + $t('characters.total')"
							:readonly="true"
						/>
					</v-col>
					<v-col
						cols="6"
						class="pr-3"
					>
						<VtNumberFieldWithValidation
							v-model="characterCurrencyCurrent"
							vid="characterCurrencyCurrent"
							:validation="validation"
							:negative-color="true"
							:label="$t('characters.name') + ' ' + $t('characters.current')"
							:readonly="true"
						/>
					</v-col>
					<v-col cols="6">
						<VtNumberFieldWithValidation
							v-model="characterScenarioCurrencyCurrent"
							vid="characterScenarioCurrencyCurrent"
							:validation="validation"
							:negative-color="true"
							:label="$t('characters.scenarios.name') + ' ' + $t('characters.current')"
							:readonly="true"
						/>
					</v-col>
				</v-row>
				<VtSelectWithValidation
					ref="boughtScenarioIdRef"
					v-model="innerValue.boughtScenarioId"
					vid="boughtScenarioId"
					:validation="validation"
					:items="characterScenarios"
					:label="$t('characters.inventories.bought')"
				/>
				<VtAutoCompleteWithValidation
					v-if="isItemOrItemId === 0 || isItemOrItemId === 1"
					ref="itemIdRef"
					v-model="itemId"
					vid="itemId"
					:validation="validation"
					:label="$t('characters.inventories.item')"
					:query-selection="querySelection"
				/>
				<VtTextFieldWithValidation
					v-if="isItemOrItemId === 0 || isItemOrItemId === 2"
					ref="itemRef"
					v-model="innerValue.item"
					vid="item"
					:validation="validation"
					:label="$t('characters.inventories.item')"
				/>
				<v-row>
					<v-col
						:cols="item && item.quantity > 0 ? 2 : 4"
						class="pr-3"
					>
						<VtNumberFieldWithValidation
							ref="quantityRef"
							v-model="innerValue.quantity"
							vid="quantity"
							:validation="validation"
							:label="$t('characters.inventories.quantity')"
							step="1"
						/>
					</v-col>
					<v-col
						v-if="item ? item.quantity > 0 : false"
						cols="2"
						class="pr-3"
					>
						<VtNumberFieldWithValidation
							ref="quantityCalcRef"
							v-model="quantity"
							vid="quantityCalc"
							:validation="validation"
							:label="$t('characters.inventories.quantity')"
							:readonly="true"
						/>
					</v-col>
					<v-col
						cols="4"
						class="pr-3"
					>
						<VtNumberFieldWithValidation
							ref="valueRef"
							v-model="innerValue.value"
							vid="value"
							:validation="validation"
							:label="$t('characters.inventories.value')"
							step="0.01"
						/>
					</v-col>
					<v-col cols="4">
						<VtNumberField
							:model-value="total"
							:label="$t('characters.total')"
							:readonly="true"
						/>
					</v-col>
				</v-row>
				<VtSelectWithValidation
					ref="soldScenarioIdRef"
					v-model="innerValue.soldScenarioId"
					vid="soldScenarioId"
					:validation="validation"
					:items="characterScenariosBlank"
					:label="$t('characters.inventories.sold')"
				/>
				<VtNumberFieldWithValidation
					ref="usedRef"
					v-model="innerValue.used"
					vid="used"
					:validation="validation"
					:label="$t('characters.inventories.used')"
					step="1"
				/>
			</v-card-text>
		</v-card>
	</VtFormDialog>
</template>

<script>
import { computed } from 'vue';

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseInventoryDialogComponent } from '@/components/gameSystems/baseInventoryDialog';

import VtAutoCompleteWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtAutoCompleteWithValidation';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberField from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberField';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Pathfinder2eInventoryDialog',
	components: {
		VtAutoCompleteWithValidation,
		VtFormDialog,
		VtNumberField,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const rulesGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_RULES_PATHFINDER_2E);
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useBaseInventoryDialogComponent(props, context, {
			serviceGameSystem,
			rulesGameSystem,
			gameSystemId: () => SharedConstants.GameSystems.Pathfinder2e.id,
			transCurrency: () => LibraryClientUtility.$trans.t('characters.gameSystems.pathfinder2e.currency')
		});

		const characterCurrencyTotal = computed(() => {
			return base.character.value ? base.character.value.currencyTotal : 0;
		});
		const characterScenarioCurrencyTotal = computed({
			get: () => {
				if (!base.character.value || !base.character.value.scenarios || !base.innerValue.value)
					return 0;
				const scenario = base.character.value.scenarios.find(l => l.id === base.innerValue.value.boughtScenarioId);
				if (!scenario)
					return 0;
				return scenario.currencySpendable;
			},
			set: () => {}
		});

		return {
			...base,
			characterCurrencyTotal,
			characterScenarioCurrencyTotal,
			validation: useVuelidate({ $scope: 'Pathfinder2eInventoryDialog' })
		};
	},
	validations() {
		return {
			innerValue: {
				boughtScenarioId: {
					required,
					$autoDirty: true
				}
			}
		};
	}
};
</script>

<style scoped>
.scenarioCard {
	padding-top: 2px;
}
</style>
