<script>
import Constants from '@/constants';

import base from '../components/base';

export default {
	name: 'BaseLayout',
	extends: base,
	computed: {
		features() {
			return Constants.Features;
		}
	}
};
</script>

<style scoped>
</style>
