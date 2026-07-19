<template>
	<VtFormDialog
		:label="$t('characters.boons.namePlural')"
		:signal="signal"
		:validation="validation"
		:button-clear="false"
		:button-ok="false"
		max-width="700px"
		@close="cancel"
	>
		<v-row>
			<v-col
				cols="12"
				md="4"
				:class="{ 'pr-4': $vuetify.display.mdAndUp }"
			>
				<VtTextFieldWithValidation
					ref="boonNameRef"
					v-model="boonNameFilter"
					vid="boonName"
					:validation="validation"
					:label="$t('characters.boons.name') + ' ' + $t('forms.name')"
				/>
			</v-col>
			<v-col cols="12">
				<v-card
					v-for="item in boons"
					:key="item.id"
					class="mb-3"
				>
					<v-card-title class="pb-2">
						{{ boonName(item) }}
					</v-card-title>
					<v-card-text class="pb-2">
						{{ item.description }}
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn
							color="primary"
							variant="text"
							@click="ok(item.id)"
						>
							{{ $t('buttons.select') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</VtFormDialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';

import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseBoonLookupDialogComponent } from '@/components/gameSystems/baseBoonLookupDialog';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

export default {
	name: 'Pathfinder2eBoonLookupDialog',
	components: {
		VtFormDialog,
		VtTextFieldWithValidation
	},
	props: {
		signal: {
			type: Boolean,
			default: false
		},
		characterId: {
			type: String,
			default: null
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useBaseBoonLookupDialogComponent(props, context, { serviceGameSystem });

		return {
			...base,
			validation: useVuelidate({ $scope: 'Pathfinder2eBoonLookupDialog' })
		};
	}
};
</script>

<style scoped>
</style>
