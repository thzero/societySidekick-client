<template>
	<v-layout
		wrap
	>
		<v-flex
			xs12
			mb-2
		>
			<v-card
				tile
			>
				<v-card-text>
					Statistics go here...
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import base from '@/components/base';

export default {
	name: 'BaseStatistics',
	extends: base,
	props: {
		user: {
			type: Object,
			default: null
		}
	}
};
</script>

<style scoped>
</style>
