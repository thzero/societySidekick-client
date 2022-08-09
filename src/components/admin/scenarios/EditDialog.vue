<template>
	<VAdminFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		max-width="750px"
		@cancel="cancel"
		@ok="ok"
	>
		<v-stepper
			v-model="steps"
		>
			<v-stepper-header>
				<v-stepper-step
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					step="1"
				>
					{{ $t('forms.scenarios.name') }}
				</v-stepper-step>
				<v-divider />
				<v-stepper-step
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					step="2"
				>
					{{ $t('forms.scenarios.results') }}
				</v-stepper-step>
				<v-divider />
			</v-stepper-header>
			<v-stepper-items>
				<v-stepper-content
					step="1"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
					>
						<v-card-text>
							<VTextFieldWithValidation
								ref="name"
								v-model="innerValue.name"
								vid="name"
								rules="required|min:3|max:75|"
								:label="$t('forms.name')"
								:counter="75"
							/>

							<table width="100%">
								<tr>
									<td class="pr-2">
										<VSelectWithValidation
											ref="gameSystem"
											v-model="gameSystemId"
											vid="gameSystem"
											:items="gameSystems"
											:label="$t('forms.scenarios.gameSystem')"
										/>
									</td>
									<td>
										<VSelectWithValidation
											ref="type"
											v-model="innerValue.type"
											vid="type"
											:items="types"
											:label="$t('forms.scenarios.type')"
										/>
									</td>
								</tr>
							</table>

							<table width="100%">
								<tr>
									<td class="pr-2">
										<VNumberFieldWithValidation
											ref="season"
											v-model="innerValue.season"
											rules="min_value:0|max_value:99|"
											vid="season"
											:label="$t('forms.scenarios.season')"
											step="1"
										/>
									</td>
									<td class="pr-2">
										<VTextFieldWithValidation
											ref="scenario"
											v-model="innerValue.scenario"
											rules="max:10|"
											vid="scenario"
											:label="$t('forms.scenarios.identifier')"
										/>
									</td>
									<td>
										<VCheckboxWithValidation
											ref="repeatable"
											v-model="innerValue.repeatable"
											vid="repeatable"
											:label="$t('forms.scenarios.repeatable')"
										/>
									</td>
								</tr>
							</table>
							<VMarkdownEditor
								:key="randomKey"
								ref="description"
								v-model="innerValue.description"
								vid="description"
								:options="editorOptions"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
				<v-stepper-content
					step="2"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
					>
						<v-card-text>
							<!-- // scenarioResults -->
							<VTextFieldWithValidation
								ref="results1Description"
								v-model="results1Description"
								vid="results1Description"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VTextFieldWithValidation
								ref="results2Description"
								v-model="results2Description"
								vid="results2Description"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VTextFieldWithValidation
								ref="results3Description"
								v-model="results3Description"
								vid="results3Description"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VTextFieldWithValidation
								ref="results4Description"
								v-model="results4Description"
								vid="results4Description"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VTextFieldWithValidation
								ref="results5Description"
								v-model="results5Description"
								vid="results5Description"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VTextFieldWithValidation
								ref="results6Description"
								v-model="results6Description"
								vid="results6Description"
								:label="$t('forms.scenarios.resultsDescription')"
							/>
							<VTextFieldWithValidation
								ref="successResultsSeparator"
								v-model="innerValue.successResultsSeparator"
								vid="successResultsSeparator"
								:label="$t('forms.scenarios.resultsSeparator')"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</VAdminFormDialog>
</template>

<script>
import LibraryUtility from '@thzero/library_common/utility';

import VAdminFormDialog from '@/components/admin/VAdminFormDialog';
import VCheckboxWithValidation from '@/library_vue_vuetify/components/form/VCheckboxWithValidation';
import VMarkdownEditor from '@/library_vue_vuetify/components/markup/VMarkdownEditor';
import VNumberFieldWithValidation from '@/library_vue_vuetify/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

export default {
	name: 'AdminScenariosEditDialog',
	components: {
		VAdminFormDialog,
		VCheckboxWithValidation,
		VMarkdownEditor,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VAdminFormDialog,
	data: () => ({
		results1Description: null, // scenarioResults
		results2Description: null,
		results3Description: null,
		results4Description: null,
		results5Description: null,
		results6Description: null,
		steps: 1
	}),
	computed: {
		types: {
			get() {
				const lookups = this.initLookupsByGameSystemId(this.correlationId(), this.gameSystemId);
				return lookups ? lookups.scenarioAdventures : [];
			},
			cache: false
		}
	},
	methods: {
		// eslint-disable-next-line
		async preCompleteI(correlationId, value) {
			value.repeatable = value.repeatable ? value.repeatable : false;

 			// scenarioResults
			this.successResult(correlationId, value, 1, this.results1Description);
			this.successResult(correlationId, value, 2, this.results2Description);
			this.successResult(correlationId, value, 3, this.results3Description);
			this.successResult(correlationId, value, 4, this.results4Description);
			this.successResult(correlationId, value, 5, this.results5Description);
			this.successResult(correlationId, value, 6, this.results6Description);
		},
		async preCompleteSubmitCreate(correlationId, dispatcher, value) {
			delete value.timestamp;
			delete value.updatedTimestamp;
			const results = await dispatcher.adminScenarios.createAdminScenario(correlationId, value);
			this.steps = 1;
			return results;

		},
		async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
			delete value.timestamp;
			value.season = value.season ? value.season : null;
			const results = await dispatcher.adminScenarios.updateAdminScenario(correlationId, value);
			this.steps = 1;
			return results;

		},
		// eslint-disable-next-line
		resetDialogI(correlationId, value) {
			this.steps = 1;

			value.updatedTimestamp = value.updatedTimestamp ? value.updatedTimestamp : LibraryUtility.getTimestamp();

 			// scenarioResults
			this.results1Description = null;
			this.results2Description = null;
			this.results3Description = null;
			this.results4Description = null;
			this.results5Description = null;
			this.results6Description = null;

			if (value.successResults) {
				let item;
				for (let i = 1; i < 7; i++) {
					item = value.successResults.find(l => l.id === i);
					if (!item)
						continue;

					if (i === 1)
						this.results1Description = item.description;
					else if (i === 2)
						this.results2Description = item.description;
					else if (i === 3)
						this.results3Description = item.description;
					else if (i === 4)
						this.results4Description = item.description;
					else if (i === 5)
						this.results5Description = item.description;
					else if (i === 6)
						this.results6Description = item.description;
				}
			}
		},
		successResult(correlationId, value, i, description) {
			if (!value.successResults)
				value.successResults = [];

			LibraryUtility.deleteArrayById(value.successResults, i);
			if (!String.isNullOrEmpty(description))
				value.successResults.push({ id: i, description: description });
		}
	}
};
</script>

<style scoped>
</style>
