<template>
	<div>
		<span v-if="innerVersion !== null">{{ $t('version.label') }} {{ $t('version.majorMinorDate', innerVersion.client) }}&nbsp;-&nbsp;{{ $t('version.majorMinorDate', innerVersion.server) }}</span>
	</div>
</template>

<script>
import base from './base';

export default {
	name: 'Version',
	extends: base,
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	data () {
		return {};
	},
	computed: {
		innerVersion() {
			const version = this.value;
			this.logger.debug('computed.version', version);
			return version;
		}
	}
};
</script>

<style scoped>
</style>
