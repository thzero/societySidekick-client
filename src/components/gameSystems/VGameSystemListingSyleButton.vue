<template>
	<v-btn
		variant="flat"
		size="large"
		style="min-width: 0px"
		@click="click()"
	>
		<v-icon v-if="isGrid">
			mdi-view-grid
		</v-icon>
		<v-icon v-if="isList">
			mdi-format-list-bulleted
		</v-icon>
	</v-btn>
</template>

<script>
import { computed } from 'vue';

import SharedConstants from '@/common/constants';

import { useBaseControlEditComponent } from '@thzero/library_client_vue3/components/baseControlEdit';

import { useBaseControlEditProps } from '@thzero/library_client_vue3/components/baseControlEditProps';

export default {
	name: 'GameSystemListingSyleButton',
	props: {
		...useBaseControlEditProps
	},
	emits: ['update:modelValue'],
	setup(props, context) {
		const base = useBaseControlEditComponent(props, context);

		const isGrid = computed(() => {
			return base.innerValue.value === SharedConstants.ListingTypes.Grid;
		});
		const isList = computed(() => {
			return base.innerValue.value === SharedConstants.ListingTypes.List;
		});

		const click = () => {
			base.innerValue.value = base.innerValue.value === SharedConstants.ListingTypes.Grid
				? SharedConstants.ListingTypes.List
				: SharedConstants.ListingTypes.Grid;
		};

		return {
			...base,
			isGrid,
			isList,
			click
		};
	}
};
</script>

<style scoped>
</style>
