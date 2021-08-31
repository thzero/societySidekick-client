<template>
	<div>
		<div
			:id="mapName"
			:style="style"
		/>
		<template v-if="Boolean(google) && Boolean(map)">
			<slot
				:google="google"
				:map="map"
			/>
		</template>
	</div>
</template>

<script>
import base from '@/library_vue/components/base';

export default {
	name: 'GoogleMap',
	extends: base,
	props: {
		name: {
			type: String,
			default: ''
		},
		mapConfig: {
			type: Object,
			default: null
		},
		location: {
			type: Object,
			default: null
		},
		apiKey: {
			type: String,
			default: ''
		},
		maxHeight: {
			type: String,
			default: ''
		},
		minHeight: {
			type: String,
			default: ''
		},
		maxWidth: {
			type: String,
			default: ''
		},
		minWidth: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		google: null,
		map: null
	}),
	computed: {
		mapName() {
			return this.name + '-map';
		},
		style() {
			return `clear: both; max-width: ${this.maxWidth}; width: 100%; min-height: ${this.minHeight}; height: 100%;`;
		}
	},
	watch: {
		// Handles external model changes.
		location(location) {
			if (!location)
				return;
			this.initializeMap(location);
		}
	},
	mounted() {
		// eslint-disable-next-line
		this.google = google;
	},
	methods: {
		initializeMap(location) {
			const element = document.getElementById(this.mapName);
			const defaultOptions = {
				zoom: 14,
				center: new this.google.maps.LatLng(location.lat, location.lng)
			};
			const options = { ...defaultOptions, ...this.mapConfig };
			this.map = new this.google.maps.Map(element, options);
		}
	}
};
</script>

<style scoped>
.google-map {
	width: 800px;
	height: 600px;
}
</style>
