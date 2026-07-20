<template>
	<VtFormDialog
		:label="label"
		:signal="signal"
		:validation="validation"
		:pre-complete-ok="preComplete"
		max-width="1200px"
		width="1200px"
		@close="cancel"
		@ok="ok"
	>
		<v-stepper
			v-model="steps"
		>
			<v-stepper-header>
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="1"
				>
					{{ $t('forms.scenarios.name') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="2"
				>
					{{ $t('forms.scenarios.results') }}
				</v-stepper-item>
				<v-divider />
			</v-stepper-header>
			<v-stepper-window>
				<v-stepper-window-item
					:value="1"
					class="pa-0"
				>
					<v-card
						tile
						variant="outlined"
					>
						<v-card-text>
							<VtTextFieldWithValidation
								ref="nameRef"
								v-model="innerValue.name"
								vid="name"
								:validation="validation"
								:label="$t('forms.name')"
								:counter="75"
							/>

							<table width="100%"><tbody>
								<tr>
									<td class="pr-2">
										<VtSelectWithValidation
											ref="gameSystemRef"
											v-model="gameSystemId"
											vid="gameSystem"
											:validation="validation"
											:items="gameSystems"
											:label="$t('forms.scenarios.gameSystem')"
										/>
									</td>
									<td>
										<VtSelectWithValidation
											ref="typeRef"
											v-model="innerValue.type"
											vid="type"
											:validation="validation"
											:items="types"
											:label="$t('forms.scenarios.type')"
										/>
									</td>
								</tr>
							</tbody></table>

							<table width="100%"><tbody>
								<tr>
									<td class="pr-2">
										<VtNumberFieldWithValidation
											ref="seasonRef"
											v-model="innerValue.season"
											vid="season"
											:validation="validation"
											:label="$t('forms.scenarios.season')"
											step="1"
										/>
									</td>
									<td class="pr-2">
										<VtTextFieldWithValidation
											ref="scenarioRef"
											v-model="innerValue.scenario"
											vid="scenario"
											:validation="validation"
											:label="$t('forms.scenarios.identifier')"
										/>
									</td>
									<td>
										<VtCheckboxWithValidation
											ref="repeatableRef"
											v-model="innerValue.repeatable"
											vid="repeatable"
											:validation="validation"
											:label="$t('forms.scenarios.repeatable')"
										/>
									</td>
								</tr>
							</tbody></table>
							<VtMarkdownEditor
								:key="randomKey"
								ref="descriptionRef"
								v-model="innerValue.description"
								vid="description"
								:validation="validation"
								:options="editorOptions"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
				<v-stepper-window-item
					:value="2"
					class="pa-0"
				>
					<v-card
						tile
						variant="outlined"
					>
						<v-card-text>
							<!-- // scenarioResults -->
							<VtTextFieldWithValidation
								ref="results1DescriptionRef"
								v-model="results1Description"
								vid="results1Description"
								:validation="validation"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VtTextFieldWithValidation
								ref="results2DescriptionRef"
								v-model="results2Description"
								vid="results2Description"
								:validation="validation"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VtTextFieldWithValidation
								ref="results3DescriptionRef"
								v-model="results3Description"
								vid="results3Description"
								:validation="validation"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VtTextFieldWithValidation
								ref="results4DescriptionRef"
								v-model="results4Description"
								vid="results4Description"
								:validation="validation"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VtTextFieldWithValidation
								ref="results5DescriptionRef"
								v-model="results5Description"
								vid="results5Description"
								:validation="validation"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VtTextFieldWithValidation
								ref="results6DescriptionRef"
								v-model="results6Description"
								vid="results6Description"
								:validation="validation"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VtTextFieldWithValidation
								ref="successResultsSeparatorRef"
								v-model="innerValue.successResultsSeparator"
								vid="successResultsSeparator"
								:validation="validation"
								:label="$t('forms.scenarios.resultsSeparator')"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
			</v-stepper-window>
		</v-stepper>
	</VtFormDialog>
</template>

<script>
import { computed, ref } from 'vue';

import useVuelidate from '@vuelidate/core';
import { maxLength, maxValue, minLength, minValue, numeric, required } from '@vuelidate/validators';

import LibraryCommonUtility from '@thzero/library_common/utility';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useAdminFormDialogComponent } from '@/components/admin/VAdminFormDialog';

import VtCheckboxWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtCheckboxWithValidation';
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdownEditor';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'AdminScenariosEditDialog',
	components: {
		VtCheckboxWithValidation,
		VtFormDialog,
		VtMarkdownEditor,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		// scenarioResults
		const results1Description = ref(null);
		const results2Description = ref(null);
		const results3Description = ref(null);
		const results4Description = ref(null);
		const results5Description = ref(null);
		const results6Description = ref(null);
		const steps = ref(1);

		const successResult = (correlationId, value, i, description) => {
			if (!value.successResults)
				value.successResults = [];

			LibraryCommonUtility.deleteArrayById(value.successResults, i);
			if (!String.isNullOrEmpty(description))
				value.successResults.push({ id: i, description: description });
		};

		const base = useAdminFormDialogComponent(props, context, {
			// eslint-disable-next-line
			async preCompleteI(correlationId, value) {
				value.repeatable = value.repeatable ? value.repeatable : false;

				// scenarioResults
				successResult(correlationId, value, 1, results1Description.value);
				successResult(correlationId, value, 2, results2Description.value);
				successResult(correlationId, value, 3, results3Description.value);
				successResult(correlationId, value, 4, results4Description.value);
				successResult(correlationId, value, 5, results5Description.value);
				successResult(correlationId, value, 6, results6Description.value);
			},
			async preCompleteSubmitCreate(correlationId, dispatcher, value) {
				delete value.timestamp;
				delete value.updatedTimestamp;
				const results = await dispatcher.adminScenarios.createAdminScenario(correlationId, value);
				steps.value = 1;
				return results;
			},
			async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
				delete value.timestamp;
				value.season = value.season ? value.season : null;
				const results = await dispatcher.adminScenarios.updateAdminScenario(correlationId, value);
				steps.value = 1;
				return results;
			},
			// eslint-disable-next-line
			resetDialogI(correlationId, value) {
				steps.value = 1;

				value.updatedTimestamp = value.updatedTimestamp ? value.updatedTimestamp : LibraryMomentUtility.getTimestamp();

				// scenarioResults
				results1Description.value = null;
				results2Description.value = null;
				results3Description.value = null;
				results4Description.value = null;
				results5Description.value = null;
				results6Description.value = null;

				if (value.successResults) {
					let item;
					for (let i = 1; i < 7; i++) {
						item = value.successResults.find(l => l.id === i);
						if (!item)
							continue;

						if (i === 1)
							results1Description.value = item.description;
						else if (i === 2)
							results2Description.value = item.description;
						else if (i === 3)
							results3Description.value = item.description;
						else if (i === 4)
							results4Description.value = item.description;
						else if (i === 5)
							results5Description.value = item.description;
						else if (i === 6)
							results6Description.value = item.description;
					}
				}
			}
		});

		const types = computed(() => {
			const lookups = base.initLookupsByGameSystemId(base.correlationId(), base.gameSystemId.value);
			return lookups ? lookups.scenarioAdventures : [];
		});

		return {
			...base,
			reset: base.resetDialog,
			validation: useVuelidate({ $scope: 'AdminScenariosEditDialog' }),
			results1Description,
			results2Description,
			results3Description,
			results4Description,
			results5Description,
			results6Description,
			steps,
			types
		};
	},
	validations() {
		return {
			innerValue: {
				name: {
					required,
					minLength: minLength(3),
					maxLength: maxLength(75),
					$autoDirty: true
				},
				type: {
					$autoDirty: true
				},
				season: {
					minValue: minValue(0),
					maxValue: maxValue(99),
					numeric,
					$autoDirty: true
				},
				scenario: {
					maxLength: maxLength(10),
					$autoDirty: true
				},
				repeatable: {
					$autoDirty: true
				},
				description: {
					$autoDirty: true
				},
				successResultsSeparator: {
					$autoDirty: true
				}
			},
			gameSystemId: {
				$autoDirty: true
			},
			results1Description: {
				$autoDirty: true
			},
			results2Description: {
				$autoDirty: true
			},
			results3Description: {
				$autoDirty: true
			},
			results4Description: {
				$autoDirty: true
			},
			results5Description: {
				$autoDirty: true
			},
			results6Description: {
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
