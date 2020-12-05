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
					{{ $t('characters.gameSystems.starfinder1e.boons.name') }}
				</v-stepper-step>
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
								:label="$t('characters.gameSystems.starfinder1e.number')"
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
							<!-- <VSelectWithValidation
								ref="class"
								v-model="innerValue.classId"
								rules="required"
								vid="class"
								:items="classes"
								:label="$t('characters.gameSystems.starfinder1e.classes.name')"
								class="pb-2"
							/> -->
							<VSelectWithValidation
								ref="theme"
								v-model="innerValue.themeId"
								vid="theme"
								:items="themes"
								:label="$t('characters.gameSystems.starfinder1e.theme')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="faction"
								v-model="innerValue.factionId"
								rules="required"
								vid="faction"
								:items="factions"
								:label="$t('characters.gameSystems.starfinder1e.faction')"
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
								ref="boonAllyId"
								v-model="innerValue.boonAllyId"
								vid="boonAllyId"
								:items="boonsAlly"
								:label="$t('characters.gameSystems.starfinder1e.boons.types.ally')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonFactionId"
								v-model="innerValue.boonFactionId"
								vid="boonFactionId"
								:items="boonsFaction"
								:label="$t('characters.gameSystems.starfinder1e.boons.types.faction')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonPersonalId"
								v-model="innerValue.boonPersonalId"
								vid="boonPersonalId"
								:items="boonsPersonal"
								:label="$t('characters.gameSystems.starfinder1e.boons.types.personal')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonPromoId"
								v-model="innerValue.boonPromoId"
								vid="boonPromoId"
								:items="boonsPromo"
								:label="$t('characters.gameSystems.starfinder1e.boons.types.promo')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonSocialId"
								v-model="innerValue.boonSocialId"
								vid="boonSocialId"
								:items="boonsSocial"
								:label="$t('characters.gameSystems.starfinder1e.boons.types.social')"
								class="pb-2"
							/>
							<VSelectWithValidation
								ref="boonStarshipId"
								v-model="innerValue.boonStarshipId"
								vid="boonStarshipId"
								:items="boonsStarship"
								:label="$t('characters.gameSystems.starfinder1e.boons.types.starship')"
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
import Starfinder1eSharedConstants from '@/common/gameSystems/starfinder1e/constants';

import VueUtility from '@/library_vue/utility';

import baseCharacterDetailsDialog from '@/components/gameSystems/baseCharacterDetailsDialog';

export default {
	name: 'Starfinder1eCharacterDetailsDialog',
	extends: baseCharacterDetailsDialog,
	computed: {
		boonsAlly() {
			const boons = this.boons.filter(l => l.type == Starfinder1eSharedConstants.BoonTypes.ALLY);
			return VueUtility.selectBlank(boons);
		},
		boonsFaction() {
			const boons = this.boons.filter(l => l.type == Starfinder1eSharedConstants.BoonTypes.FACTION);
			return VueUtility.selectBlank(boons);
		},
		boonsPersonal() {
			const boons = this.boons.filter(l => l.type != Starfinder1eSharedConstants.BoonTypes.PERSONAL);
			return VueUtility.selectBlank(boons);
		},
		boonsPromo() {
			const boons = this.boons.filter(l => l.type != Starfinder1eSharedConstants.BoonTypes.PROMO);
			return VueUtility.selectBlank(boons);
		},
		boonsSocial() {
			const boons = this.boons.filter(l => l.type != Starfinder1eSharedConstants.BoonTypes.SOCIAL);
			return VueUtility.selectBlank(boons);
		},
		boonsStarship() {
			const boons = this.boons.filter(l => l.type != Starfinder1eSharedConstants.BoonTypes.STARSHIP);
			return VueUtility.selectBlank(boons);
		},
		classes() {
			return this.serviceGameSystem.classes(this.correlationId(), this.$store, true);
		},
		themes() {
			return this.serviceGameSystem.themes(this.correlationId(), this.$store, true);
		}
	},
	methods: {
		initResponseDetails(correlationId, details) {
			details.boonAllyId = this.innerValue.boonAllyId;
			details.boonFactionId = this.innerValue.boonFactionId;
			details.boonPersonalId = this.innerValue.boonPersonalId;
			details.boonPromoId = this.innerValue.boonPromoId;
			details.boonSocialId = this.innerValue.boonSocialId;
			details.boonStarshipId = this.innerValue.boonStarshipId;
			// details.classId = this.innerValue.classId;
			details.factionId = this.innerValue.factionId;
			details.themeId = this.innerValue.themeId;
			return details;
		},
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
