<template>
	<VFormDialog
		:label="label"
		:signal="signal"
		:pre-complete-ok="preComplete"
		:fullscreen="fullscreenInternal"
		max-width="500px"
		@close="close"
		@cancel="cancel"
		@ok="ok"
		@open="open"
	>
		<v-stepper
			v-model="steps"
		>
			<v-stepper-header>
				<template>
					<v-stepper-step
						complete
						editable
						edit-icon="mdi-cicle-slice-8"
						step="1"
					>
						{{ $t('characters.basic') }}
					</v-stepper-step>
					<v-divider />
					<v-stepper-step
						complete
						editable
						edit-icon="mdi-cicle-slice-8"
						step="2"
					>
						{{ $t('characters.details') }}
					</v-stepper-step>
					<v-divider
						v-if="hasScenarios"
					/>
					<v-stepper-step
						v-if="hasScenarios"
						complete
						editable
						edit-icon="mdi-cicle-slice-8"
						step="3"
					>
						{{ $t('characters.gameSystems.pathfinder2e.boons.name') }}
					</v-stepper-step>
				</template>
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
						<v-card-text
							class="gameSystemScenarioCard"
						>
							<VTextFieldWithValidation
								ref="name"
								v-model="innerValue.name"
								rules="required|min:3|max:30|"
								vid="name"
								:label="$t('forms.name')"
								:counter="30"
							/>
							<VTextFieldWithValidation
								ref="tagLine"
								v-model="innerValue.tagLine"
								rules="tagLine|min:3|max:30"
								vid="tagLine"
								:label="$t('forms.tagLine')"
								:counter="30"
							/>
							<VNumberFieldWithValidation
								ref="number"
								v-model="innerValue.number"
								rules="required|numeric|min_value:1|max_value:99|"
								vid="number"
								:label="$t('characters.gameSystems.pathfinder2e.number')"
								step="1"
							/>
							<VSelectWithValidation
								ref="status"
								v-model="innerValue.status"
								rules="required"
								vid="status"
								:items="status"
								:label="$t('characters.gameSystems.pathfinder2e.status.name')"
								class="pb-2"
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
						<v-card-text
							class="gameSystemScenarioCard"
						>
							<VSelectWithValidation
								ref="class"
								v-model="innerValue.classId"
								rules="required"
								vid="class"
								:items="classes"
								:label="$t('characters.gameSystems.pathfinder2e.classes.name')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="archetype"
								v-model="innerValue.archetypeId"
								vid="archetype"
								:items="archetypes"
								:label="$t('characters.gameSystems.pathfinder2e.archetype')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="faction"
								v-model="innerValue.factionId"
								rules="required"
								vid="faction"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.faction')"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
				<v-stepper-content
					v-if="hasScenarios"
					step="3"
					pa-0
					class="pa-0"
				>
					<v-card
						tile
						outlined
					>
						<v-card-text
							class="gameSystemScenarioCard"
						>
							<VSelectWithValidation
								ref="boonGeneric1Id"
								v-model="innerValue.boonGeneric1Id"
								vid="boonGeneric1Id"
								:items="boonsGeneral"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.generic')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonGeneric2Id"
								v-model="innerValue.boonGeneric2Id"
								vid="boonGeneric2Id"
								:items="boonsGeneral"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.generic')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonGeneric3Id"
								v-model="innerValue.boonGeneric3Id"
								vid="boonGeneric3Id"
								:items="boonsGeneral"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.generic')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonFactionId"
								v-model="innerValue.boonFactionId"
								vid="boonFactionId"
								:items="boonsFaction"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.faction')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonAdvancedId"
								v-model="innerValue.boonAdvancedId"
								vid="boonAdvancedId"
								:items="boonsAdvanced"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.advanced')"
								class="pb-2"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</VFormDialog>
</template>

<script>
import Constants from '@/constants';
import PatfinderSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import VueUtility from '@/library_vue/utility';

import baseCharacterDetailsDialog from '@/components/gameSystems/baseCharacterDetailsDialog';

export default {
	name: 'Pathfinder2eCharacterDetailsDialog',
	extends: baseCharacterDetailsDialog,
	computed: {
		archetypes() {
			return this.serviceGameSystem.archetypes(this.$store, true);
		},
		boonsAdvanced() {
			const boons = this.boons.filter(l => l.type == PatfinderSharedConstants.BoonTypes.ADVANCED);
			return VueUtility.selectBlank(boons);
		},
		boonsFaction() {
			const boons = this.boons.filter(l => l.type == PatfinderSharedConstants.BoonTypes.FACTION);
			return VueUtility.selectBlank(boons);
		},
		boonsGeneral() {
			const boons = this.boons.filter(l => l.type != PatfinderSharedConstants.BoonTypes.ADVANCED || l.type != PatfinderSharedConstants.BoonTypes.FACTION);
			return VueUtility.selectBlank(boons);
		},
		classes() {
			return this.serviceGameSystem.classes(this.$store, true);
		}
	},
	methods: {
		initResponseDetails(details) {
			details.archetypeId = this.innerValue.archetypeId;
			details.boonAdvancedId = this.innerValue.boonAdvancedId;
			details.boonFactionId = this.innerValue.boonFactionId;
			details.boonGeneric1Id = this.innerValue.boonGeneric1Id;
			details.boonGeneric2Id = this.innerValue.boonGeneric2Id;
			details.boonGeneric3Id = this.innerValue.boonGeneric3Id;
			details.classId = this.innerValue.classId;
			return details;
		},
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
