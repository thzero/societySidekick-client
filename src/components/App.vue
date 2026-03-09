<template>
	<router-view />
</template>

<script>
import { useAppComponent } from '@/components/appBase';

export default {
	name: 'App',
	setup(props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			serviceStore
		} = useAppComponent();

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			serviceStore
		};
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

	.text-contrast {
		color: rgb(var(--v-theme-contrast))
	}

	.displayLink {
		cursor: pointer;
		text-decoration: underline;
	}

	.measurementUnitExtraLong {
		width: 140px;
	}
	.measurementUnitExtraExtraLong {
		width: 160px;
	}
	.measurementUnitLong {
		width: 125px;
	}
	.measurementUnitMedium {
		width: 115px;
	}
	.measurementUnitsMedium {
		width: 125px;
	}
	.v-expansion-panel-text__wrapper {
		padding-bottom: 0px !important;
		padding-left: 12px !important;
		padding-right: 0px !important;
	}
	.v-expansion-panel--active > .v-expansion-panel-title {
		min-height: 0px !important;
	}

	.icons-grid-container { display: grid; }
	#icons-grid-container-backdrop, #icons-grid-container-curtain { grid-area: 1/1; }
	#icons-grid-container-curtain { z-index: 99 }
	
	.icons-attribution {
		padding: 4px;
	}
	.icons-gaming-download {
		width: 75px;
		height: 75px;
		padding: 4px;
		border-radius: 20%;
		background-color: purple;
	}

	.attribution-lower-end {
		position: absolute; 
		bottom: 25px; 
		left: 0px; 
		z-index: 500;
	}

	.button-buy-lower-end {
		position: absolute; 
		bottom: 25px; 
		right: 25px; 
		z-index: 500;
	}

	.breadcrumb-title {
		color: white;
	}

	.router-link-title {
	}

	.toolbar-button {
	}

	.toolbar-title {
		text-decoration: none;
	}

	.v-breadcrumbs--density-compact {
		margin: 0px
	}
</style>
