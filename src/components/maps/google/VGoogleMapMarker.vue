<template>
	<div />
</template>

<script>
import base from '@/library_vue_components/components/base';

export default {
	name: 'GoogeMapMaker',
	extends: base,
	props: {
		google: {
			type: Object,
			required: true
		},
		map: {
			type: Object,
			required: true
		},
		position: {
			type: Object,
			default: null
		},
		draggable: Boolean
	},
	data: () => ({
		marker: null
	}),
	mounted() {
		const position = this.position;
		this.marker = new this.google.maps.Marker({
			position: position,
			map: this.map,
			draggable: this.draggable
		});
		const self = this;
		this.google.maps.event.addListener(this.marker, 'dragend', function (evt) {
			self.$emit('location', { lat: evt.latLng.lat(), lng: evt.latLng.lng() });
		});
	}
};
</script>

<style scoped>
</style>
