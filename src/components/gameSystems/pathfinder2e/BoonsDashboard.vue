<template>
	<v-row class="pt-2">
		<v-col
			cols="12"
			class="pt-8"
		>
			<CharacterDetails
				:value="value"
				:editable="editable"
			/>
		</v-col>
		<v-col
			cols="12"
			class="pt-8"
		>
			<v-card class="mb-2" style="position: relative;">
				<v-card-title class="pb-2">
					<v-row>
						<v-col cols="5">
							{{ $t('characters.boons.namePlural') }}
						</v-col>
						<v-col
							cols="7"
							style="text-align: right; padding-right: 45px;"
						/>
					</v-row>
				</v-card-title>
				<v-fab-transition v-if="editable">
					<v-btn
						icon="mdi-plus"
						size="small"
						color="green"
						style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%);"
						@click="dialogBoonNew()"
					/>
				</v-fab-transition>
			</v-card>
		</v-col>
		<v-col
			v-for="item of boons"
			:key="item.id"
			cols="12"
			lg="6"
		>
			<Boon
				:value="item"
				:character="value"
				:editable="editable"
				:collapse="collapseInner"
				@dialog-edit="dialogBoonEdit"
			/>
		</v-col>
		<BoonDialog
			ref="boonDialogRef"
			:character="value"
			:label="$t('boons.name')"
			:signal="dialogBoon.signal"
			@cancel="dialogBoon.cancel()"
			@ok="dialogBoon.ok()"
		/>
	</v-row>
</template>

<script>
import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseBoonDashboardComponent } from '@/components/gameSystems/baseBoonDashboard';

import Boon from '@/components/gameSystems/pathfinder2e/Boon';
import BoonDialog from '@/components/gameSystems/pathfinder2e/BoonDialog';
import CharacterDetails from '@/components/gameSystems/pathfinder2e/CharacterDetails';

export default {
	name: 'Pathfinder2eBoonDashboard',
	components: {
		Boon,
		BoonDialog,
		CharacterDetails
	},
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useBaseBoonDashboardComponent(props, context, {
			serviceGameSystem,
			boonsScenario: (correlationId, results, scenario, initializeCharacterBoon2) => {
				if (scenario.boon1Id)
					results.push(initializeCharacterBoon2(correlationId, scenario.boon1Id, scenario));
				if (scenario.boon2Id)
					results.push(initializeCharacterBoon2(correlationId, scenario.boon2Id, scenario));
			}
		});

		return {
			...base
		};
	}
};
</script>

<style scoped>
</style>
