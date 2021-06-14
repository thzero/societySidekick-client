<template>
	<v-btn
		depressed
		large
		style="min-width: 0px"
		@click="click()"
	>
		<v-icon
			v-if="isGrid"
		>
			mdi-view-grid
		</v-icon>
		<v-icon
			v-if="isList"
		>
			mdi-format-list-bulleted
		</v-icon>
	</v-btn>
</template>

<script>
import SharedConstants from '@/common/constants';

import LibraryUtility from '@thzero/library_common/utility';

import baseControlEdit from '@/library_vue/components/baseControlEdit';

export default {
	name: 'GameSystemListingSyleButton',
	extends: baseControlEdit,
	props: {
		// must be included in props
		value: {
			type: null,
			default: null
		}
	},
	data: () => ({
		innerValue: SharedConstants.ListingTypes.Grid
	}),
	computed: {
		isGrid() {
			return this.innerValue === SharedConstants.ListingTypes.Grid;
		},
		isList() {
			return this.innerValue === SharedConstants.ListingTypes.List;
		}
	},
	watch: {
		// Handles external model changes.
		value(newVal) {
			this.initValue(newVal);
		}
	},
	mounted() {
		this.initValue(this.value);
	},
	methods: {
		click() {
			let value = this.innerValue === SharedConstants.ListingTypes.Grid ? SharedConstants.ListingTypes.List : SharedConstants.ListingTypes.Grid;
			this.update(this, value);
		},
		update: LibraryUtility.debounce(async function(self, value) {
			self.innerValue = value;
		}, 500)
	}
};
</script>

<style scoped>
</style>
