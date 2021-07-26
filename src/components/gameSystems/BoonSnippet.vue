<template>
	<vue-fragment>
		<!-- // GameSystems Update -->
		<BoonSnippetPathfinder2e
			v-if="isGameSystemPathfinder2e"
			:value="value"
			:user="user"
		/>
		<!-- <BoonSnippetStarfinder1e
			v-if="isGameSystemStarfinder1e"
			:value="value"
			:user="user"
		/> -->
	</vue-fragment>
</template>

<script>
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import baseSnippet from '@/components/gameSystems/baseSnippet';

// GameSystems Update
import BoonSnippetPathfinder2e from '@/components/gameSystems/pathfinder2e/BoonSnippet';
// import BoonSnippetStarfinder1e from '@/components/gameSystems/starfinder1e/BoonSnippet'

export default {
	name: 'BoonSnippet',
	components: {
		// GameSystems Update
		BoonSnippetPathfinder2e,
		// BoonSnippetStarfinder1e
	},
	extends: baseSnippet,
	data: () => ({
		lookups: [],
		rulesGameSystem: null,
		serviceGameSystem: null
	}),
	computed: {
		boonUsesArray() {
			let uses = this.boonUses(this.correlationId(), this.value.boonId);
			if (!uses)
				return [];

			uses = Number(uses);

			const output = [ ...Array(uses).keys() ].map( i => i+1);
			return output;
		},
		hasScenario() {
			return this.value ? this.value.scenario : null;
		},
	},
	created() {
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription(id) {
			const correlationId = this.correlationId();
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, this.serviceGameSystem.boonDescriptionById(correlationId, id, GlobalUtility.$store)));
		},
		boonName(id) {
			return this.serviceGameSystem.boonNameById(this.correlationId(), id, GlobalUtility.$store);
		},
		boonUses(id) {
			return this.serviceGameSystem.boonUsesById(this.correlationId(), id, GlobalUtility.$store);
		},
		dialogBoonOpen() {
			this.$emit('dialog-edit', this.value);
		},
		getGameSystemName(id) {
			const results = GlobalUtility.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		locationName(id, at) {
			const location = AppUtility.settings().getSettingsUserLocation(this.correlationId(), GlobalUtility.$store.state.user.user, id);
			return location ? (at ? '@ ' : '') + location.name : '';
		},
		scenarioName(value) {
			return this.serviceGameSystem.determineScenarioName(this.correlationId(), value, GlobalUtility.$store);
		}
	}
};
</script>
