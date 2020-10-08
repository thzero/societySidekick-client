<script>
import AppUtility from '@/utility/app';
import VueUtility from '@/library_vue/utility';

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
			return AppUtility.settings().getSettingsUserGameSystem(this.correlationId(), this.$store.state.user.user, this.gameSystemId, (settings) => settings.gearSets);
		},
		gearSetsBlank() {
			return VueUtility.selectBlank(AppUtility.settings().getSettingsUserGameSystem(this.correlationId(), this.$store.state.user.user, this.gameSystemId, (settings) => settings.gearSets));
		}
	},
	methods: {
		// eslint-disable-next-line
		async cancel() {
			this.$emit('cancel');
		},
		// eslint-disable-next-line
		async close() {
		},
		// eslint-disable-next-line
		async ok() {
			this.$emit('ok');
			return true;
		},
		// eslint-disable-next-line
		async resetDialog(correlationId) {
			this.name = null;
			this.gearSetId = null;
		}
	}
};
</script>
