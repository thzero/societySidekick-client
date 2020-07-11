<script>
import Constants from '@/constants';

import BoonLookupDialog from '@/components/gameSystems/BoonLookupDialog';

export default {
	name: 'Pathfinder2eBoonLookupDialog',
	extends: BoonLookupDialog,
	methods: {
		initializeServices() {
			this.serviceGameSystem = this.$injector.getService(Constants.InjectorKeys.SERVICE_GAMESYSTEMS_PATHFINDER_2E);
		}
	}
};
</script>

<style scoped>
</style>
