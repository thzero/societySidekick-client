<script>
import LibraryUtility from '@thzero/library_common/utility';

import baseDashboard from '@/components/baseDashboard';

import DialogSupport from '@/library_vue/components/support/dialog';

export default {
	name: 'BaseBoonDashboard',
	extends: baseDashboard,
	data: () => ({
		dialogBoon: new DialogSupport(),
		dialogBoonItem: null
	}),
	computed: {
		boons() {
			const correlationId = this.correlationId();
			const results = this.value && this.value.boons ? this.value.boons : [];
			const scenarios = this.value && this.value.scenarios ? this.value.scenarios : [];
			for (const scenario of scenarios)
				this.boonsScenario(correlationId, results, scenario);
			for (const result of results)
				result.name = this.boonName(correlationId, result.boonId);
			return LibraryUtility.sortByName(results, true);
		}
	},
	methods: {
		boonName(id) {
			return this.serviceGameSystem.boonNameById(this.correlationId(), id, this.$store);
		},
		async dialogBoonEdit(value) {
			if (!value)
				return;
			await this.$refs.boonDialog.reset(this.correlationId(), this.clone(value));
			this.dialogBoon.open();
		},
		async dialogBoonNew() {
			let item = this.initializeCharacterBoon(this.correlationId());
			delete item.id;
			await this.$refs.boonDialog.reset(this.correlationId(), item);
			this.dialogBoon.open();
		},
		initializeCharacterBoon(correlationId) {
			return this.serviceGameSystem.initializeCharacterBoon(correlationId, this.value);
		},
		initializeCharacterBoon2(correlationId, boonId, scenario) {
			const results = this.initializeCharacterBoon(correlationId);
			results.boonId = boonId;
			results.locationId = scenario.locationId;
			results.scenario = scenario;
			results.timestamp = scenario.timestamp;
			return results;
		},
		sortByName(values, ascending) {
			if (!values || !Array.isArray(values))
				return values;

			if (ascending)
				return values.sort((a, b) => LibraryUtility.sortByString(a, b, (v) => { return v && v.scenario ? v.scenario.name : null; }));

			return values.sort((a, b) => LibraryUtility.sortByString(b, a, (v) => { return v && v.scenario ? v.scenario.name : null; }));
		}
	}
};
</script>

<style scoped>
</style>

