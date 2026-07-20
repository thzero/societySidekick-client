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
		<VtTextFieldWithValidation
			ref="nameRef"
			v-model="innerValue.name"
			vid="name"
			:validation="validation"
			:label="$t('forms.name')"
			:counter="50"
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
						:label="$t('forms.boons.gameSystem')"
					/>
				</td>
				<td>
					<VtSelectWithValidation
						ref="typeRef"
						v-model="innerValue.type"
						vid="type"
						:validation="validation"
						:items="types"
						:label="$t('forms.boons.type')"
					/>
				</td>
				<td>
					<VtNumberFieldWithValidation
						ref="usesRef"
						v-model="innerValue.uses"
						vid="uses"
						:validation="validation"
						:label="$t('forms.boons.uses')"
						step="1"
					/>
				</td>
			</tr>
		</tbody></table>

		<!-- Scenario Lookup -->
		<VtTextFieldWithValidation
			ref="scenarioNameRef"
			v-model="scenarioName"
			vid="scenarioName"
			:validation="validation"
			:label="$t('forms.name')"
			:readonly="true"
		/>
		<div style="text-align: right">
			<v-btn
				color="primary"
				@click="dialogScenariosOpen()"
			>
				{{ $t('buttons.select') }}
			</v-btn>
		</div>

		<VtSelectWithValidation
			ref="factionRef"
			v-model="innerValue.factionId"
			vid="faction"
			:validation="validation"
			:items="factions"
			:label="$t('characters.gameSystems.pathfinder2e.faction')"
		/>

		<VtMarkdownEditor
			:key="randomKey"
			ref="descriptionRef"
			v-model="innerValue.description"
			vid="description"
			:validation="validation"
			:options="editorOptions"
		/>
		<!-- GameSystems Update -->
		<Pathfinder2eScenarioLookupDialog
			v-if="isGameSystemPathfinder2e"
			ref="scenarioLookupRef"
			:signal="dialogScenarios.signal"
			:fullscreen="false"
			:scenario-override="scenarios"
			@cancel="dialogScenarios.cancel()"
			@ok="dialogScenariosOk"
		/>
		<Starfinder1eScenarioLookupDialog
			v-if="isGameSystemStarfinder1e"
			ref="scenarioLookupRef"
			:signal="dialogScenarios.signal"
			:fullscreen="false"
			:scenario-override="scenarios"
			:service-game-system-override="serviceGameSystem"
			@cancel="dialogScenarios.cancel()"
			@ok="dialogScenariosOk"
		/>
	</VtFormDialog>
</template>

<script>
import { computed, ref, watch } from 'vue';

import useVuelidate from '@vuelidate/core';
import { maxLength, maxValue, minLength, minValue, numeric, required } from '@vuelidate/validators';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useAdminFormDialogComponent } from '@/components/admin/VAdminFormDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtMarkdownEditor from '@thzero/library_client_vue3_vuetify3/components/markup/VtMarkdownEditor';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

// GameSystems Update
import Pathfinder2eScenarioLookupDialog from '@/components/gameSystems/pathfinder2e/ScenarioLookupDialog';
import Starfinder1eScenarioLookupDialog from '@/components/gameSystems/starfinder1e/ScenarioLookupDialog';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

export default {
	name: 'AdminBoonsEditDialog',
	components: {
		VtFormDialog,
		VtMarkdownEditor,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation,
		Pathfinder2eScenarioLookupDialog,
		Starfinder1eScenarioLookupDialog
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
		const dialogScenarios = ref(new DialogSupport());
		const scenarioName = ref(null);
		const scenarioLookupRef = ref(null);

		const getScenarioNameById = (id) => {
			const service = base.serviceGameSystem.value;
			const results = LibraryClientUtility.$store.getters.getAdminScenario(base.correlationId(), id);
			return service ? results ? service.scenarioName(base.correlationId(), results) : null : null;
		};

		const base = useAdminFormDialogComponent(props, context, {
			async preCompleteSubmitCreate(correlationId, dispatcher, value) {
				return await dispatcher.adminBoons.createAdminBoon(correlationId, value);
			},
			async preCompleteSubmitUpdate(correlationId, dispatcher, value) {
				value.uses = value.uses ? value.uses : null;
				return await dispatcher.adminBoons.updateAdminBoon(correlationId, value);
			},
			async resetDialogI(correlationId, value) {
				await LibraryClientUtility.$store.dispatcher.adminScenarios.searchAdminScenarios(correlationId, { gameSystemId: value.gameSystemId });
				scenarioName.value = getScenarioNameById(value.scenarioId);
			}
		});

		const factions = computed(() => {
			if (!LibraryClientUtility.$store.adminFactions.factions)
				return null;
			let factions = LibraryClientUtility.$store.adminFactions.factions.filter(l => l.gameSystemId === base.gameSystemId.value);
			factions = factions ? factions.slice(0) : [];
			return LibraryCommonUtility.selectBlank(factions.sort((a, b) => LibraryCommonUtility.sortByString(a, b, (v) => { return v && v.name; })));
		});
		const scenarios = computed(() => {
			if (!LibraryClientUtility.$store.adminScenarios.scenarios)
				return [];
			const scenarios = LibraryClientUtility.$store.adminScenarios.scenarios.filter(l => l.gameSystemId === base.gameSystemId.value);
			return scenarios ? scenarios.slice(0) : [];
		});
		const types = computed(() => {
			const lookups = base.initLookupsByGameSystemId(base.correlationId(), base.gameSystemId.value);
			return lookups ? lookups.boonTypes : [];
		});

		const dialogScenariosOk = (id) => {
			base.innerValue.value.scenarioId = id;
			scenarioName.value = getScenarioNameById(id);
			dialogScenarios.value.ok();
		};
		const dialogScenariosOpen = async () => {
			await scenarioLookupRef.value.reset(base.correlationId(), null);
			dialogScenarios.value.open();
		};

		watch(() => base.gameSystemId.value, async () => {
			await LibraryClientUtility.$store.dispatcher.adminScenarios.searchAdminScenarios(base.correlationId(), { gameSystemId: base.gameSystemId.value });
		});

		return {
			...base,
			dialogScenarios,
			scenarioName,
			scenarioLookupRef,
			factions,
			scenarios,
			types,
			dialogScenariosOk,
			dialogScenariosOpen,
			getScenarioNameById,
			reset: base.resetDialog,
			validation: useVuelidate({ $scope: 'AdminBoonsEditDialog' })
		};
	},
	validations() {
		return {
			innerValue: {
				name: {
					required,
					minLength: minLength(3),
					maxLength: maxLength(50),
					$autoDirty: true
				},
				uses: {
					minValue: minValue(0),
					maxValue: maxValue(99),
					numeric,
					$autoDirty: true
				},
				type: {
					$autoDirty: true
				},
				factionId: {
					$autoDirty: true
				},
				description: {
					$autoDirty: true
				}
			},
			gameSystemId: {
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
