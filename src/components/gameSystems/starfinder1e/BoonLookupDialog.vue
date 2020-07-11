<script>
import Constants from '@/constants';

import BoonLookupDialog from '@/components/gameSystems/BoonLookupDialog';

export default {
	name: 'Starfinder1eBoonLookupDialog',
	extends: BoonLookupDialog,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_STARFINDER_1E);
		}
	}
};
</script>

<style scoped>
</style>
