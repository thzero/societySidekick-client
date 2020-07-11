<script>
import baseDashboard from '@/components/baseDashboard';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BaseScenarioDashboard',
	extends: baseDashboard,
	data: () => ({
		dialogScenario: new DialogSupport(),
		dialogScenarioItem: null
	}),
	methods: {
		boonName(id) {
			return this.serviceGameSystem.boonNameById(id, this.$store);
		},
		async dialogScenarioEdit(value) {
			if (!value)
				return;
			await this.$refs.scenarioDialog.reset(this.clone(value));
			this.dialogScenario.open();
		},
		async dialogScenarioNew() {
			let item = this.initializeCharacterScenario();
			delete item.id;
			item.fameFactionId = this.value.factionId;
			await this.$refs.scenarioDialog.reset(item);
			this.dialogScenario.open();
		},
		initializeCharacterScenario() {
			return this.serviceGameSystem.initializeCharacterScenario(this.value);
		}
	}
};
</script>

<style scoped>
</style>

