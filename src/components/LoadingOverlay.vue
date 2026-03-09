<template>
	<v-overlay
		opacity="1.0"
		z-index="5"
		contained
		:value="signal"
	>
		<v-progress-circular
			:size="70"
			:width="7"
			:color="progressColor"
			indeterminate
		></v-progress-circular>
	</v-overlay>
</template>

<script>
export default {
	name: 'LoadingOverlay',
	props: {
		progress: {
			type: Boolean,
			default: false
		},
		progressColor: {
			type: String,
			default: 'primary'
		},
		signal: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		return {};
	}
};
</script>

<style scoped>
</style>
