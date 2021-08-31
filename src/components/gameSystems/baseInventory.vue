<template>
	<tr>
		<td
			class="text-bottom body-2"
		>
			<v-tooltip bottom>
				<template #activator="{ on }">
					<span v-on="on">{{ scenarioOrder(value.boughtScenarioId) }}</span>
				</template>
				<span>{{ scenarioName(value.boughtScenarioId) }}</span>
			</v-tooltip>
		</td>
		<td
			v-if="$vuetify.breakpoint.mdAndUp"
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
				<template #activator="{ on }">
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
import GlobalUtility from '@thzero/library_client/utility/global';

import baseEdit from '@/library_vue_components/baseEdit';

import DialogSupport from '@/library_vue_components/support/dialog';

export default {
	name: 'BaseInventory',
	extends: baseEdit,
	props: {
		value: {
			type: Object,
			default: () => {}
		},
		editable: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		dialogEdit: new DialogSupport(),
		service: null
	}),
	created() {
		this.initService();
	},
	methods: {
		dialogEditOpen() {
			this.$emit('dialog-edit', this.value);
		},
		getGameSystemName(id) {
			const results = GlobalUtility.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initService() {
			this.notImplementedError();
		},
		scenarioById(id) {
			return this.character.scenarios.find(l => l.id === id);
		},
		scenarioName(id) {
			if (!this.character || !this.character.inventory)
				return '';

			const scenario = this.scenarioById(id);
			if (!scenario)
				return '';

			return this.scenarioNameById(scenario.scenarioId, GlobalUtility.$store);
		},
		scenarioNameById(id) {
			return id ? this.serviceGameSystem.determineScenarioNameById(this.correlationId(), id, GlobalUtility.$store) : '';
		},
		scenarioOrder(id) {
			if (!this.character || !this.character.inventory)
				return '';

			const scenario = this.scenarioById(id);
			if (!scenario)
				return '';

			return scenario.order;
		}
	}
};
</script>
