<template>
	<VtFormDialog
		:label="label"
		:signal="signal"
		:validation="validation"
		:pre-complete-ok="preComplete"
		max-width="500px"
		@close="cancel"
		@ok="ok"
		@open="open"
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
					{{ $t('characters.basic') }}
				</v-stepper-item>
				<v-divider />
				<v-stepper-item
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="2"
				>
					{{ $t('characters.details') }}
				</v-stepper-item>
				<v-divider
					v-if="hasScenarios"
				/>
				<v-stepper-item
					v-if="hasScenarios"
					complete
					editable
					edit-icon="mdi-cicle-slice-8"
					:value="3"
				>
					{{ $t('characters.gameSystems.pathfinder2e.boons.name') }}
				</v-stepper-item>
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
						<v-card-text
							class="gameSystemScenarioCard"
						>
							<VtTextFieldWithValidation
								ref="nameRef"
								v-model="innerValue.name"
								vid="name"
								:validation="validation"
								:label="$t('forms.name')"
								:counter="30"
							/>
							<VtTextFieldWithValidation
								ref="tagLineRef"
								v-model="innerValue.tagLine"
								vid="tagLine"
								:validation="validation"
								:label="$t('forms.tagLine')"
								:counter="30"
							/>
							<VtNumberFieldWithValidation
								ref="numberRef"
								v-model="innerValue.number"
								vid="number"
								:validation="validation"
								:label="$t('characters.gameSystems.pathfinder2e.number')"
								step="1"
								:min="1"
								:max="99"
							/>
							<VtSelectWithValidation
								ref="statusRef"
								v-model="innerValue.status"
								vid="status"
								:validation="validation"
								:items="status"
								:label="$t('characters.gameSystems.pathfinder2e.status.name')"
								class="pb-2"
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
						<v-card-text
							class="gameSystemScenarioCard"
						>
							<VtSelectWithValidation
								ref="classRef"
								v-model="innerValue.classId"
								vid="class"
								:validation="validation"
								:items="classes"
								:label="$t('characters.gameSystems.pathfinder2e.classes.name')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="archetype1Ref"
								v-model="archetypeId1"
								vid="archetype1"
								:validation="validation"
								:items="archetypes"
								:label="$t('characters.gameSystems.pathfinder2e.archetype')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="archetype2Ref"
								v-model="archetypeId2"
								vid="archetype2"
								:validation="validation"
								:items="archetypes"
								:label="$t('characters.gameSystems.pathfinder2e.archetype')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="archetype3Ref"
								v-model="archetypeId3"
								vid="archetype3"
								:validation="validation"
								:items="archetypes"
								:label="$t('characters.gameSystems.pathfinder2e.archetype')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="factionRef"
								v-model="innerValue.factionId"
								vid="faction"
								:validation="validation"
								:items="factions"
								:label="$t('characters.gameSystems.pathfinder2e.faction')"
							/>
						</v-card-text>
					</v-card>
				</v-stepper-window-item>
				<v-stepper-window-item
					v-if="hasScenarios"
					:value="3"
					class="pa-0"
				>
					<v-card
						tile
						variant="outlined"
					>
						<v-card-text
							class="gameSystemScenarioCard"
						>
							<VtSelectWithValidation
								ref="boonGeneric1IdRef"
								v-model="innerValue.boonGeneric1Id"
								vid="boonGeneric1Id"
								:validation="validation"
								:items="boonsGeneral"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.generic')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="boonGeneric2IdRef"
								v-model="innerValue.boonGeneric2Id"
								vid="boonGeneric2Id"
								:validation="validation"
								:items="boonsGeneral"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.generic')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="boonGeneric3IdRef"
								v-model="innerValue.boonGeneric3Id"
								vid="boonGeneric3Id"
								:validation="validation"
								:items="boonsGeneral"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.generic')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="boonFactionIdRef"
								v-model="innerValue.boonFactionId"
								vid="boonFactionId"
								:validation="validation"
								:items="boonsFaction"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.faction')"
								class="pb-2"
							/>
							<VtSelectWithValidation
								ref="boonAdvancedIdRef"
								v-model="innerValue.boonAdvancedId"
								vid="boonAdvancedId"
								:validation="validation"
								:items="boonsAdvanced"
								:label="$t('characters.gameSystems.pathfinder2e.boons.types.advanced')"
								class="pb-2"
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

import Constants from '@/constants';
import PatfinderSharedConstants from '@/common/gameSystems/pathfinder2e/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseCharacterDetailsDialogComponent } from '@/components/gameSystems/baseCharacterDetailsDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtNumberFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtNumberFieldWithValidation';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Pathfinder2eCharacterDetailsDialog',
	components: {
		VtFormDialog,
		VtNumberFieldWithValidation,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		},
		label: {
			type: String,
			default: ''
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const archetypeId1 = ref(null);
		const archetypeId2 = ref(null);
		const archetypeId3 = ref(null);

		const base = useBaseCharacterDetailsDialogComponent(props, context, {
			serviceGameSystem,
			initResponseDetails: (correlationId, details) => {
				details.archetypeIds = [];
				if (!String.isNullOrEmpty(archetypeId1.value))
					details.archetypeIds.push(archetypeId1.value);
				if (!String.isNullOrEmpty(archetypeId2.value))
					details.archetypeIds.push(archetypeId2.value);
				if (!String.isNullOrEmpty(archetypeId3.value))
					details.archetypeIds.push(archetypeId3.value);
				details.boonAdvancedId = base.innerValue.value.boonAdvancedId;
				details.boonFactionId = base.innerValue.value.boonFactionId;
				details.boonGeneric1Id = base.innerValue.value.boonGeneric1Id;
				details.boonGeneric2Id = base.innerValue.value.boonGeneric2Id;
				details.boonGeneric3Id = base.innerValue.value.boonGeneric3Id;
				details.classId = base.innerValue.value.classId;
				return details;
			},
			resetDialogI: async (correlationId) => {
				if (base.innerValue.value.archetypeIds) {
					base.innerValue.value.archetypeIds.forEach((item, index) => {
						if (index === 0)
							archetypeId1.value = item;
						else if (index === 1)
							archetypeId2.value = item;
						else if (index === 2)
							archetypeId3.value = item;
					});
				}
			}
		});

		const archetypes = computed(() => {
			return serviceGameSystem.archetypes(base.correlationId(), LibraryClientUtility.$store, true);
		});
		const boonsAdvanced = computed(() => {
			return LibraryCommonUtility.selectBlank(base.boons.value.filter(l => l.type == PatfinderSharedConstants.BoonTypes.ADVANCED));
		});
		const boonsFaction = computed(() => {
			return LibraryCommonUtility.selectBlank(base.boons.value.filter(l => l.type == PatfinderSharedConstants.BoonTypes.FACTION));
		});
		const boonsGeneral = computed(() => {
			return LibraryCommonUtility.selectBlank(base.boons.value.filter(l => l.type != PatfinderSharedConstants.BoonTypes.ADVANCED || l.type != PatfinderSharedConstants.BoonTypes.FACTION));
		});
		const classes = computed(() => {
			return serviceGameSystem.classes(base.correlationId(), LibraryClientUtility.$store, true);
		});

		return {
			...base,
			archetypeId1,
			archetypeId2,
			archetypeId3,
			archetypes,
			boonsAdvanced,
			boonsFaction,
			boonsGeneral,
			classes,
			validation: useVuelidate({ $scope: 'Pathfinder2eCharacterDetailsDialog' })
		};
	},
	validations() {
		return {
			innerValue: {
				name: {
					required,
					minLength: minLength(3),
					maxLength: maxLength(30),
					$autoDirty: true
				},
				number: {
					required,
					numeric,
					minValue: minValue(1),
					maxValue: maxValue(99),
					$autoDirty: true
				},
				status: {
					required,
					$autoDirty: true
				},
				classId: {
					required,
					$autoDirty: true
				},
				factionId: {
					required,
					$autoDirty: true
				}
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
