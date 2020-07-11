<template>
	<vue-fragment>
		<span
			class="displayLink"
			@click="handleDisplay(scenarioDescription)"
			@mouseenter="handleDisplayHover(scenarioDescription)"
			@mouseout="handleDisplayHoverClear()"
		>
			{{ scenarioName }}
		</span>
	</vue-fragment>
</template>

<script>
import baseSnippet from '@/components/gameSystems/baseSnippet';

export default {
	name: 'BaseScenarioNameSnippet',
	extends: baseSnippet,
	computed: {
		scenarioDescription() {
			return this.serviceGameSystem.scenarioDescription(this.value);
		},
		scenarioName() {
			return this.serviceGameSystem.scenarioName(this.value);
		}
	}
};
</script>

<style scoped>
</style>
