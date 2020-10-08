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
			return this.serviceGameSystem.boonNameById(this.correlationId(), id, this.$store);
		},
		async dialogScenarioEdit(value) {
			if (!value)
				return;
			await this.$refs.scenarioDialog.reset(this.correlationId(), this.clone(value));
			this.dialogScenario.open();
		},
		async dialogScenarioNew() {
			const correlationId = this.correlationId();
			let item = this.initializeCharacterScenario(correlationId);
			delete item.id;
			item.fameFactionId = this.value.factionId;
			await this.$refs.scenarioDialog.reset(correlationId, item);
			this.dialogScenario.open();
		},
		initializeCharacterScenario(correlationId) {
			return this.serviceGameSystem.initializeCharacterScenario(correlationId, this.value);
		}
	}
};
</script>

<style scoped>
</style>

