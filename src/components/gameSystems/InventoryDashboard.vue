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
								{{ $t('characters.inventories.name') }}
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
							<v-speed-dial
								v-if="editable && hasScenarios"
								v-model="fab"
								absolute
								right
								top
								small
								direction="top"
								transition="slide-y-transition"
								style="top: -24px;"
							>
								<template
									#activator
								>
									<v-btn
										v-model="fab"
										fab
										small
									>
										<v-icon v-if="fab">
											mdi-close
										</v-icon>
										<v-icon v-else>
											mdi-settings
										</v-icon>
									</v-btn>
								</template>
								<v-tooltip
									v-if="hasScenarios"
									left
								>
									<template #activator="{ on }">
										<v-btn
											fab
											dark
											small
											color="green"
											v-on="on"
											@click="dialogInventoryNew()"
										>
											<v-icon>mdi-plus</v-icon>
										</v-btn>
									</template>
									<span>{{ $t('strings.add') }} {{ $t('characters.gear') }}</span>
								</v-tooltip>
								<v-tooltip
									v-if="hasInventory"
									left
								>
									<template #activator="{ on }">
										<v-btn
											v-if="hasInventory"
											fab
											dark
											small
											color="blue"
											v-on="on"
											@click="dialogInventoryGearSetSave()"
										>
											<v-icon>mdi-content-save</v-icon>
										</v-btn>
									</template>
									<span>{{ $t('strings.save') }} {{ $t('characters.inventories.gearSets.name') }} </span>
								</v-tooltip>
								<v-tooltip
									v-if="hasScenarios"
									left
								>
									<template #activator="{ on }">
										<v-btn
											fab
											dark
											small
											v-on="on"
											@click="dialogInventoryGearSetLoad()"
										>
											<v-icon>mdi-folder-open-outline</v-icon>
										</v-btn>
									</template>
									<span>{{ $t('strings.load') }} {{ $t('characters.inventories.gearSets.name') }} </span>
								</v-tooltip>
								<v-tooltip
									v-if="hasGearSets"
									left
								>
									<template #activator="{ on }">
										<v-btn
											v-if="hasGearSets"
											left
											fab
											dark
											small
											color="red"
											v-on="on"
											@click="dialogInventoryGearSetDelete()"
										>
											<v-icon>mdi-delete</v-icon>
										</v-btn>
									</template>
									<span>{{ $t('strings.delete') }} {{ $t('characters.inventories.gearSets.name') }} </span>
								</v-tooltip>
							</v-speed-dial>
							<!-- <v-fab-transition
								v-if="editable"
							>
								<v-btn
									absolute
									fab
									right
									small
									top
									@click="dialogInventoryNew()"
								>
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-fab-transition> -->
						</v-flex>
						<v-flex
							v-for="(uber, undex) of groupedLines"
							:key="undex"
							xs12
						>
							<v-layout
								wrap
							>
								<v-flex
									xs12
								>
									<v-layout wrap>
										<v-flex xs9>
											<span class="subtitle-1">{{ uber.name }}</span>
										</v-flex>
										<v-flex
											xs3
											class="text-right"
										>
											<span class="subtitle-1 text-right">{{ $t('characters.scenarios.order') }}: {{ uber.order }}</span>
										</v-flex>
									</v-layout>
								</v-flex>
								<v-flex
									v-for="(item, index) of uber.inventory"
									:key="index"
									xs12
									md6
									:pr-4="$vuetify.breakpoint.mdAndUp && index == 0"
								>
									<table
										style="width: 100%;"
									>
										<thead>
											<tr>
												<!-- <th
													class="text-left subtitle-2 pr-2"
													width="5%"
												>
													{{ $t('characters.inventories.bought') }}
												</th> -->
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
											<template
												v-for="(line, jndex) of item"
											>
												<!-- <tr
													:key="'a'+jndex"
													class="text-left body-2"
												>
													<td colspan="5">
														{{ line.item }}
													</td>
												</tr> -->
												<Inventory
													:key="'b'+jndex"
													:value="line"
													:character="value"
													:editable="editable"
													:collapse="collapseInner"
													@dialog-edit="dialogInventoryEdit"
												/>
											</template>
										</tbody>
									</table>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		<InventoryDialog
			ref="inventoryDialog"
			v-model="dialogInventoryItem"
			:character="value"
			:signal="dialogInventory.signal"
			@cancel="dialogInventory.cancel()"
			@ok="dialogInventorOk()"
		/>
		<InventoryGearSetDeleteDialog
			ref="inventoryGearSetDeleteDialog"
			:game-system-id="value ? value.gameSystemId : null"
			:signal="dialogInventoryGearSetDeleteSupport.signal"
			@cancel="dialogInventoryGearSetDeleteSupport.cancel()"
			@ok="dialogInventoryGearSetDeleteOk()"
		/>
		<InventoryGearSetLoadDialog
			ref="inventoryGearSetLoadDialog"
			:game-system-id="value ? value.gameSystemId : null"
			:character-id="value ? value.id : null"
			:signal="dialogInventoryGearSetLoadSupport.signal"
			@cancel="dialogInventoryGearSetLoadSupport.cancel()"
			@ok="dialogInventoryGearSetLoadOk()"
		/>
		<InventoryGearSetSaveDialog
			ref="inventoryGearSetSaveDialog"
			:game-system-id="value ? value.gameSystemId : null"
			:inventory="value ? value.inventory : null"
			:signal="dialogInventoryGearSetSaveSupport.signal"
			@cancel="dialogInventoryGearSetSaveSupport.cancel()"
			@ok="dialogInventoryGearSetSaveOk()"
		/>
		<v-snackbar
			ref="snackbar"
			v-model="snackbar"
			top
			:timeout="2000"
		>
			{{ snackbarText }}
		</v-snackbar>
	</vue-fragment>
</template>

<script>
import baseInventoryDashboard from '@/components/gameSystems/baseInventoryDashboard';

export default {
	name: 'InventoryDashboard',
	extends: baseInventoryDashboard
};
</script>

<style scoped>
</style>
