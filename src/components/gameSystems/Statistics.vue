<template>
	<v-row>
		<v-col
			cols="12"
			class="mb-2"
		>
			<v-card
				tile
			>
				<v-card-text>
					Statistics go here...
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import { useBaseComponent } from '@/components/base';

export default {
	name: 'Statistics',
	props: {
		user: {
			type: Object,
			default: null
		}
	},
	setup(props, context) {
		const base = useBaseComponent(props, context);

		return {
			...base
		};
	}
};
</script>

<style scoped>
</style>
