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
			<v-card
				class="mb-2"
			>
				<v-card-title
					class="pb-2"
				>
					<v-row>
						<v-col cols="5">
							{{ $t('characters.inventories.name') }}
						</v-col>
						<v-col
							cols="7"
							style="text-align: right; padding-right: 45px;"
						/>
					</v-row>
				</v-card-title>
				<v-card-text>
					<div style="position: relative;">
						<v-speed-dial
							v-if="editable && hasScenarios"
							v-model="fab"
							location="top center"
							transition="slide-y-transition"
							class="inventorySpeedDial"
						>
							<template
								#activator="{ props: activatorProps }"
							>
								<v-btn
									v-bind="activatorProps"
									icon
									size="small"
								>
									<v-icon v-if="fab">
										mdi-close
									</v-icon>
									<v-icon v-else>
										mdi-cog
									</v-icon>
								</v-btn>
							</template>
							<v-tooltip
								v-if="hasScenarios"
								location="left"
							>
								<template #activator="{ props }">
									<v-btn
										v-bind="props"
										icon
										size="small"
										color="green"
										@click="dialogInventoryNew()"
									>
										<v-icon>mdi-plus</v-icon>
									</v-btn>
								</template>
								<span>{{ $t('strings.add') }} {{ $t('characters.gear') }}</span>
							</v-tooltip>
							<v-tooltip
								v-if="hasInventory"
								location="left"
							>
								<template #activator="{ props }">
									<v-btn
										v-bind="props"
										icon
										size="small"
										color="blue"
										@click="dialogInventoryGearSetSave()"
									>
										<v-icon>mdi-content-save</v-icon>
									</v-btn>
								</template>
								<span>{{ $t('strings.save') }} {{ $t('characters.inventories.gearSets.name') }} </span>
							</v-tooltip>
							<v-tooltip
								v-if="hasScenarios"
								location="left"
							>
								<template #activator="{ props }">
									<v-btn
										v-bind="props"
										icon
										size="small"
										@click="dialogInventoryGearSetLoad()"
									>
										<v-icon>mdi-folder-open-outline</v-icon>
									</v-btn>
								</template>
								<span>{{ $t('strings.load') }} {{ $t('characters.inventories.gearSets.name') }} </span>
							</v-tooltip>
							<v-tooltip
								v-if="hasGearSets"
								location="left"
							>
								<template #activator="{ props }">
									<v-btn
										v-bind="props"
										icon
										size="small"
										color="red"
										@click="dialogInventoryGearSetDelete()"
									>
										<v-icon>mdi-delete</v-icon>
									</v-btn>
								</template>
								<span>{{ $t('strings.delete') }} {{ $t('characters.inventories.gearSets.name') }} </span>
							</v-tooltip>
						</v-speed-dial>
					</div>
					<v-col
						v-for="(uber, undex) of groupedLines"
						:key="undex"
						cols="12"
					>
						<v-row>
							<v-col
								cols="12"
							>
								<v-row>
									<v-col cols="9">
										<span class="subtitle-1">{{ uber.name }}</span>
									</v-col>
									<v-col
										cols="3"
										class="text-right"
									>
										<span class="subtitle-1 text-right">{{ $t('characters.scenarios.order') }}: {{ uber.order }}</span>
									</v-col>
								</v-row>
							</v-col>
							<v-col
								v-for="(item, index) of uber.inventory"
								:key="index"
								cols="12"
								md="6"
								:class="{ 'pr-4': $vuetify.display.mdAndUp && index == 0 }"
							>
								<table
									style="width: 100%;"
								>
									<thead>
										<tr>
											<th
												class="text-left subtitle-2 pr-2"
											>
												{{ $t('characters.inventories.item') }}
											</th>
											<th
												class="text-left subtitle-2 pr-2"
												width="5%"
											>
												{{ $t('characters.inventories.quantity') }}
											</th>
											<th
												class="text-left subtitle-2 pr-2"
												width="5%"
											>
												{{ $t('characters.inventories.value') }}
											</th>
											<th
												class="text-left subtitle-2 pr-2"
												width="10%"
											>
												{{ $t('characters.inventories.sold') }}
											</th>
											<th
												class="text-left subtitle-2 pr-2"
												width="5%"
											>
												{{ $t('characters.inventories.used') }}
											</th>
											<th style="width: 24px;">
												&nbsp;
											</th>
										</tr>
									</thead>
									<tbody>
										<Inventory
											v-for="(line, jndex) of item"
											:key="'b'+jndex"
											:value="line"
											:character="value"
											:editable="editable"
											:collapse="collapseInner"
											@dialog-edit="dialogInventoryEdit"
										/>
									</tbody>
								</table>
							</v-col>
						</v-row>
					</v-col>
				</v-card-text>
			</v-card>
		</v-col>
		<InventoryDialog
			ref="inventoryDialogRef"
			:character="value"
			:signal="dialogInventory.signal"
			@cancel="dialogInventory.cancel()"
			@ok="dialogInventorOk()"
		/>
		<InventoryGearSetDeleteDialog
			ref="inventoryGearSetDeleteDialogRef"
			:game-system-id="value ? value.gameSystemId : null"
			:signal="dialogInventoryGearSetDeleteSupport.signal"
			@cancel="dialogInventoryGearSetDeleteSupport.cancel()"
			@ok="dialogInventoryGearSetDeleteOk()"
		/>
		<InventoryGearSetLoadDialog
			ref="inventoryGearSetLoadDialogRef"
			:game-system-id="value ? value.gameSystemId : null"
			:character-id="value ? value.id : null"
			:signal="dialogInventoryGearSetLoadSupport.signal"
			@cancel="dialogInventoryGearSetLoadSupport.cancel()"
			@ok="dialogInventoryGearSetLoadOk()"
		/>
		<InventoryGearSetSaveDialog
			ref="inventoryGearSetSaveDialogRef"
			:game-system-id="value ? value.gameSystemId : null"
			:inventory="value ? value.inventory : null"
			:signal="dialogInventoryGearSetSaveSupport.signal"
			@cancel="dialogInventoryGearSetSaveSupport.cancel()"
			@ok="dialogInventoryGearSetSaveOk()"
		/>
		<v-snackbar
			v-model="snackbar"
			location="top"
			:timeout="2000"
		>
			{{ snackbarText }}
		</v-snackbar>
	</v-row>
</template>

<script>
import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseInventoryDashboardComponent } from '@/components/gameSystems/baseInventoryDashboard';

import CharacterDetails from '@/components/gameSystems/pathfinder2e/CharacterDetails';
import Inventory from '@/components/gameSystems/pathfinder2e/Inventory';
import InventoryDialog from '@/components/gameSystems/pathfinder2e/InventoryDialog';
import InventoryGearSetDeleteDialog from '@/components/gameSystems/InventoryGearSetDeleteDialog';
import InventoryGearSetLoadDialog from '@/components/gameSystems/InventoryGearSetLoadDialog';
import InventoryGearSetSaveDialog from '@/components/gameSystems/InventoryGearSetSaveDialog';

import InventoryItem from '@/common/gameSystems/pathfinder2e/data/characterInventory';

export default {
	name: 'Pathfinder2eInventoryDashboard',
	components: {
		CharacterDetails,
		Inventory,
		InventoryDialog,
		InventoryGearSetDeleteDialog,
		InventoryGearSetLoadDialog,
		InventoryGearSetSaveDialog
	},
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useBaseInventoryDashboardComponent(props, context, {
			serviceGameSystem,
			initInventory: () => new InventoryItem()
		});

		return {
			...base
		};
	}
};
</script>

<style scoped>
	.inventorySpeedDial {
		position: absolute;
		right: 16px;
		top: -24px;
	}
</style>
