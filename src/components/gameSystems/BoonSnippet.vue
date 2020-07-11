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
import Vue from 'vue';

import LibraryConstants from '@thzero/library/constants';

import AppUtility from '@/utility/app';

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
			let uses = this.boonUses(this.value.boonId);
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
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription(id) {
			return this._serviceMarkup.trimResults(this._serviceMarkup.render(this.serviceGameSystem.boonDescriptionById(id, this.$store)));
		},
		boonName(id) {
			return this.serviceGameSystem.boonNameById(id, this.$store);
		},
		boonUses(id) {
			return this.serviceGameSystem.boonUsesById(id, this.$store);
		},
		dialogBoonOpen() {
			this.$emit('dialogEdit', this.value);
		},
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		locationName(id, at) {
			const location = AppUtility.settings().getSettingsUserLocation(this.$store.state.user.user, id);
			return location ? (at ? '@ ' : '') + location.name : '';
		},
		scenarioName(value) {
			return this.serviceGameSystem.determineScenarioName(value, this.$store);
		}
	}
};
</script>
