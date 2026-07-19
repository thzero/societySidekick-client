<template>
	<tr>
		<td
			class="text-bottom body-2"
		>
			{{ value.item }}
		</td>
		<td class="text-bottom body-2">
			{{ value.quantity }}
		</td>
		<td class="text-bottom body-2">
			{{ value.value }}
		</td>
		<td
			class="text-bottom body-2"
		>
			<v-tooltip location="bottom">
				<template #activator="{ props }">
					<span v-bind="props">{{ scenarioOrder(value.soldScenarioId) }}</span>
				</template>
				<span>{{ scenarioName(value.soldScenarioId) }}</span>
			</v-tooltip>
		</td>
		<td class="text-bottom body-2">
			{{ value.used }}
		</td>
		<td>
			<v-btn
				variant="flat"
				size="small"
				style="min-width: 0px"
				@click="dialogEditOpen()"
			>
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
		</td>
	</tr>
</template>

<script>
import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useGameSystemBaseInventoryComponent } from '@/components/gameSystems/baseInventory';

export default {
	name: 'Pathfinder2eInventory',
	props: {
		value: {
			type: Object,
			default: () => {}
		},
		character: {
			type: Object,
			default: null
		}
	},
	setup(props, context) {
		const serviceGameSystem = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);

		const base = useGameSystemBaseInventoryComponent(props, context, { serviceGameSystem });

		return {
			...base
		};
	}
};
</script>

<style scoped>
</style>
