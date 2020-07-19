<template>
	<vue-fragment>
		<v-layout
			wrap
			pt-2
		>
			<v-flex
				xs12
				sm12
				md12
				lg12
				xl12
				pt-8
			>
				<CharacterDetails
					v-model="value"
					:editable="editable"
				/>
			</v-flex>
			<v-flex
				xs12
				sm12
				md12
				lg12
				xl12
				pt-8
			>
				<v-card
					class="mb-2"
				>
					<v-card-title
						class="pb-2"
					>
						<v-layout>
							<v-flex
								xs5
							>
								{{ $t('characters.boons.namePlural') }}
							</v-flex>
							<v-flex
								xs7
								style="text-align: right; padding-right: 45px;"
							>
								<!-- <VCollapseButton
									:value="false"
									:label="$t('buttons.collapseAll')"
								/>
								<VCollapseButton
									:value="true"
									:label="$t('buttons.expandAll')"
								/> -->
							</v-flex>
						</v-layout>
					</v-card-title>
					<v-card-text>
						<v-flex
							xs12
						>
							<v-fab-transition
								v-if="editable"
							>
								<v-btn
									absolute
									fab
									right
									top
									small
									dark
									color="green"
									@click="dialogBoonNew()"
								>
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-fab-transition>
						</v-flex>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex
				v-for="item of boons"
				:key="item.id"
				xs12
				lg6
			>
				<Boon
					:value="item"
					:character="value"
					:editable="editable"
					:collapse="collapseInner"
					@dialogEdit="dialogBoonEdit"
				/>
			</v-flex>
		</v-layout>
		<BoonDialog
			ref="boonDialog"
			v-model="dialogBoonItem"
			:character="value"
			:label="$t('boons.name')"
			:signal="dialogBoon.signal"
			@cancel="dialogBoon.cancel()"
			@ok="dialogBoon.ok()"
		/>
	</vue-fragment>
</template>

<script>
import Constants from '@/constants';

import baseBoonDashboard from '@/components/gameSystems/baseBoonDashboard';
import CharacterDetails from '@/components/gameSystems/pathfinder2e/CharacterDetails';
import Boon from '@/components/gameSystems/pathfinder2e/Boon';
import BoonDialog from '@/components/gameSystems/pathfinder2e/BoonDialog';

export default {
	name: 'Pathfinder2eBoonDashboard',
	components: {
		CharacterDetails,
		Boon,
		BoonDialog,
		// VCollapseButton
	},
	extends: baseBoonDashboard,
	methods: {
		boonsScenario(results, scenario) {
			if (scenario.boon1Id)
				results.push(this.initializeCharacterBoon2(scenario.boon1Id, scenario));
			if (scenario.boon2Id)
				results.push(this.initializeCharacterBoon2(scenario.boon2Id, scenario));
		},
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
