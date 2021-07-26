<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import baseApp from '@/library_vue/components/baseApp';

export default {
	name: 'App',
	extends: baseApp,
	methods: {
		initialize(correlationId) {
			return [
				GlobalUtility.$store.dispatcher.root.initialize(correlationId),
				GlobalUtility.$store.dispatcher.characters.initializeCharacters(correlationId)
			];
		}
	}
};
</script>

<style scoped>
</style>

<style>
	/* .bg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background-color: black;
			background: url( '/images/background.png') no-repeat center center;
			background-attachment: fixed;
	} */

	.gameSystemHeaderSpacer {
		padding-right: 4px;
	}

	.pathfinder2eAchievementPoints {
		background-color: #FABF8F;
	}
	.pathfinder2eAchievementPoints2 {
		background-color: rgba(250, 191, 143, 0.3);
	}
	.pathfinder2eBoons {
		background-color: rgb(196, 215, 155);
	}
	.pathfinder2eBoons2 {
		background-color: rgba(196, 215, 155, 0.6);
	}
	.pathfinder2eBoons3:nth-child(even) {
		background-color: rgba(196, 215, 155, 0.6);
	}
	.pathfinder2eBoons3:nth-child(odd) {
		background-color: rgba(196, 215, 155, 0.3);
	}
	.pathfinder2eCurrency {
		background-color: rgba(196, 189, 151, 1.0)
	}
	.pathfinder2eCurrency2 {
		background-color: rgba(196, 189, 151, 0.3)
	}
	.pathfinder2eDowntime {
		background-color: #E26B0A;
	}
	.pathfinder2eDowntime2 {
		background-color: rgba(226, 107, 10, 0.3);
	}
	.pathfinder2eExperiencePoints {
		background-color: rgb(252, 213, 180);
		padding-right: 4px;
	}
	.pathfinder2eExperiencePoints2 {
		background-color: rgba(252, 213, 180, 0.3);
	}
	.pathfinder2eFame {
		background-color: #B1A0C7;
	}
	.pathfinder2eFame2 {
		background-color: rgba(177, 160, 199, 0.3);
	}
	.pathfinder2eReputation {
		background-color: #CCC0DA;
	}
	.pathfinder2eReputation2 {
		background-color: rgba(204, 192, 218, 0.3)
	}
	.pathfinder2eScenario {
		background-color: #B7DEE8;
	}
	.pathfinder2eScenario2 {
		background-color: rgba(183, 222, 232, 0.3);
	}

	.starfinder1eBoons {
		background-color: rgb(196, 215, 155);
	}
	.starfinder1eBoons2 {
		background-color: rgba(196, 215, 155, 0.6);
	}
	.starfinder1eBoons3:nth-child(even) {
		background-color: rgba(196, 215, 155, 0.6);
	}
	.starfinder1eCurrency {
		background-color: rgba(196, 189, 151, 1.0)
	}
	.starfinder1eCurrency2 {
		background-color: rgba(196, 189, 151, 0.3)
	}
	.starfinder1eBoons3:nth-child(odd) {
		background-color: rgba(196, 215, 155, 0.3);
	}
	.starfinder1eExperiencePoints {
		background-color: rgb(252, 213, 180);
		padding-right: 4px;
	}
	.starfinder1eExperiencePoints2 {
		background-color: rgba(252, 213, 180, 0.3);
	}
	.starfinder1eFame {
		background-color: #B1A0C7;
	}
	.starfinder1eFame2 {
		background-color: rgba(177, 160, 199, 0.3);
	}
	.starfinder1eReputation {
		background-color: #CCC0DA;
	}
	.starfinder1eReputation2 {
		background-color: rgba(204, 192, 218, 0.3)
	}
	.starfinder1eScenario {
		background-color: #B7DEE8;
	}
	.starfinder1eScenario2 {
		background-color: rgba(183, 222, 232, 0.3);
	}
</style>
