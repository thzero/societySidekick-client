<template>
	<tr>
		<!-- <td
			class="text-bottom body-2"
		>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<span v-on="on">{{ scenarioOrder(value.boughtScenarioId) }}</span>
				</template>
				<span>{{ scenarioName(value.boughtScenarioId) }}</span>
			</v-tooltip>
		</td> -->
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
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<span v-on="on">{{ scenarioOrder(value.soldScenarioId) }}</span>
				</template>
				<span>{{ scenarioName(value.soldScenarioId) }}</span>
			</v-tooltip>
		</td>
		<td class="text-bottom body-2">
			{{ value.used }}
		</td>
		<td>
			<v-btn
				depressed
				small
				style="min-width: 0px"
				@click="dialogEditOpen()"
			>
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
		</td>
	</tr>
</template>

<script>
import baseInventory from '@/components/gameSystems/baseInventory';

export default {
	name: 'Inventory',
	extends: baseInventory,
	methods: {
		scenarioNameById(id) {
			return id ? this.serviceGameSystem.determineScenarioNameById(id, this.$store) : '';
		}
	}
};
</script>
