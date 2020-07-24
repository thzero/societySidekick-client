<template>
	<VAdminFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		max-width="750px"
		@cancel="cancel"
		@ok="ok"
	>
		<VTextFieldWithValidation
			ref="name"
			v-model="innerValue.name"
			vid="name"
			rules="required|min:3|max:50|"
			:label="$t('forms.name')"
			:counter="50"
		/>

		<table width="100%">
			<tr>
				<td class="pr-2">
					<VSelectWithValidation
						ref="gameSystem"
						v-model="gameSystemId"
						vid="gameSystem"
						:items="gameSystems"
						:label="$t('forms.boons.gameSystem')"
					/>
				</td>
				<td>
					<VSelectWithValidation
						ref="type"
						v-model="innerValue.type"
						vid="type"
						:items="types"
						:label="$t('forms.boons.type')"
					/>
				</td>
				<td>
					<VNumberFieldWithValidation
						ref="uses"
						v-model="innerValue.uses"
						rules="min_value:0|max_value:99|"
						vid="uses"
						:label="$t('forms.boons.uses')"
						step="1"
					/>
				</td>
			</tr>
		</table>

		<!-- Scenario Lookup -->
		<VTextFieldWithValidation
			ref="scenarioName"
			v-model="scenarioName"
			rules=""
			vid="scenarioName"
			:label="$t('forms.name')"
			:readonly="true"
		/>
		<div style="text-align: right">
			<v-btn
				color="primary lighten-1"
				@click="dialogScenariosOpen()"
			>
				{{ $t('buttons.select') }}
			</v-btn>
		</div>

		<VSelectWithValidation
			ref="faction"
			v-model="innerValue.factionId"
			vid="faction"
			:items="factions"
			:label="$t('characters.gameSystems.pathfinder2e.faction')"
		/>

		<VMarkdownEditor
			:key="randomKey"
			ref="description"
			v-model="innerValue.description"
			vid="description"
			:options="editorOptions"
		/>
		<!-- GameSystems Update -->
		<Pathfinder2eScenarioLookupDialog
			v-if="isGameSystemPathfinder2e"
			ref="scenarioLookup"
			:signal="dialogScenarios.signal"
			:fullscreen="fullscreenInternal"
			:scenario-override="scenarios"
			@cancel="dialogScenarios.cancel()"
			@ok="dialogScenariosOk"
		/>
		<Starfinder1eScenarioLookupDialog
			v-if="isGameSystemStarfinder1e"
			ref="scenarioLookup"
			:signal="dialogScenarios.signal"
			:fullscreen="fullscreenInternal"
			:scenario-override="scenarios"
			:service-game-system-override="serviceGameSystem"
			@cancel="dialogScenarios.cancel()"
			@ok="dialogScenariosOk"
		/>
	</VAdminFormDialog>
</template>

<script>
import Utility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility';

import VAdminFormDialog from '@/components/admin/VAdminFormDialog';
import VMarkdownEditor from '@/library_vue/components/markup/VMarkdownEditor';
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

// GameSystems Update
import Pathfinder2eScenarioLookupDialog from '@/components/gameSystems/pathfinder2e/ScenarioLookupDialog';
import Starfinder1eScenarioLookupDialog from '@/components/gameSystems/starfinder1e/ScenarioLookupDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'AdminBoonsEditDialog',
	components: {
		VAdminFormDialog,
		VMarkdownEditor,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation,
		Pathfinder2eScenarioLookupDialog,
		Starfinder1eScenarioLookupDialog
	},
	extends: VAdminFormDialog,
	data: () => ({
		dialogScenarios: new DialogSupport(),
		gameSystemId: null,
		scenarioName: null
	}),
	computed: {
		factions() {
			if (!this.$store.state.adminFactions.factions)
				return null;
			let factions = this.$store.state.adminFactions.factions.filter(l => l.gameSystemId === this.gameSystemId);
			factions = factions ? factions.slice(0) : [];
			return VueUtility.selectBlank(factions.sort((a, b) => Utility.sortByString(a, b, (v) => { return v && v.name; })));
		},
		scenarios() {
			if (!this.$store.state.adminScenarios.scenarios)
				return [];
			const scenarios = this.$store.state.adminScenarios.scenarios.filter(l => l.gameSystemId === this.gameSystemId);
			return scenarios ? scenarios.slice(0) : [];
		},
		types: {
			get() {
				const lookups = this.initLookupsByGameSystemId(this.gameSystemId);
				return lookups ? lookups.boonTypes : [];
			},
			cache: false
		}
	},
	watch: {
		// eslint-disable-next-line
		async gameSystemId(newVal) {
			await this.$store.dispatcher.adminScenarios.searchAdminScenarios({ gameSystemId: this.gameSystemId });
		}
	},
	methods: {
		dialogScenariosOk(id) {
			this.$set(this.innerValue, 'scenarioId', id);
			this.scenarioName = this.getScenarioNameById(id);
			this.dialogScenariosOkI(id);
			this.dialogScenarios.ok();
		},
		// eslint-disable-next-line
		dialogScenariosOkI(id) {
		},
		async dialogScenariosOpen() {
			await this.$refs.scenarioLookup.reset();
			this.dialogScenarios.open();
		},
		getScenarioNameById(id) {
			const service = this.serviceGameSystem;
			const results = this.$store.getters.getAdminScenario(id);
			return service ? results ? service.scenarioName(results) : null : null;
		},
		// eslint-disable-next-line
		preCompleteI(value) {
		},
		async preCompleteSubmitCreate(dispatcher, value) {
			return await dispatcher.adminBoons.createAdminBoon(value);
		},
		async preCompleteSubmitUpdate(dispatcher, value) {
			value.uses = value.uses ? value.uses : null;
			return await dispatcher.adminBoons.updateAdminBoon(value);
		},
		// eslint-disable-next-line
		async resetDialogI(value) {
			this.innerValue = value;
			await this.$store.dispatcher.adminScenarios.searchAdminScenarios({ gameSystemId: value.gameSystemId });
			this.scenarioName = this.getScenarioNameById(value.scenarioId);
		}
	}
};
</script>

<style scoped>
</style>
