<script>
import Utility from '@thzero/library/utility';
import AppUtility from '@/utility/app';

import VFormDialog from '@/library_vue/components/form/VFormDialog';

export default {
	name: 'BaseInventoryGearSetDialog',
	extends: VFormDialog,
	props: {
		gameSystemId: {
			type: String,
			default: null
		}
	},
	data: () => ({
		gearSetId: null,
		name: null
	}),
	computed: {
		gearSets() {
			return AppUtility.settings().getSettingsUserGameSystem(this.$store.state.user.user, this.gameSystemId, (settings) => settings.gearSets);
		},
		gearSetsBlank() {
			return Utility.selectBlank(AppUtility.settings().getSettingsUserGameSystem(this.$store.state.user.user, this.gameSystemId, (settings) => settings.gearSets));
		}
	},
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		async close() {
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		async resetDialog() {
			this.name = null;
			this.gearSetId = null;
		}
	}
};
</script>
