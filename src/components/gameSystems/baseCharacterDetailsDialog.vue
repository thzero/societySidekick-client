<script>
import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VNumberFieldWithValidation from '@/library_vue/components/form/VNumberFieldWithValidation';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'Pathfinder2eCharacterDetailsDialog',
	components: {
		VFormDialog,
		VNumberFieldWithValidation,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	props: {
		label: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		innerValue: {},
		lookups: [],
		serviceGameSystem: null,
		steps: 1,
		watch: null
	}),
	computed: {
		boons() {
			const results = this.serviceGameSystem.boons(this.$store, false);

			const boons = [];
			// for (const item of this.innerValue.scenarios) {
			//	 if (item.boon1Id)
			//		 this.assignBoon(item.boon1Id, results, boons)
			//	 if (item.boon2Id)
			//		 this.assignBoon(item.boon2Id, results, boons)
			// }
			this.fetchBoonsFromScenarios(boons, results, this.innerValue.scenarios);

			if (this.initResponse && this.innerValue.boons) {
				for (const item of this.innerValue.boons) {
					if (item.boonId)
						this.assignBoon(item.boonId, results, boons);
				}
			}

			return boons;
		},
		factions() {
			return this.serviceGameSystem.factions(this.$store, true);
		},
		hasScenarios() {
			return this.innerValue.scenarios ? true : false;
		},
		status() {
			return this.lookups.characterStatus;
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups();
	},
	methods: {
		assignBoon(boonId, boons, output) {
			const boon = boons.find(l => l.id == boonId);
			if (boon)
				output.push(boon);
		},
		async cancel() {
			this.$emit('cancel');
		},
		async close() {
		},
		fetchBoonsFromScenarios(boons, results, scenarios) {
			for (const item of scenarios) {
				if (item.boon1Id)
					this.assignBoon(item.boon1Id, results, boons);
				if (item.boon2Id)
					this.assignBoon(item.boon2Id, results, boons);
			}
		},
		initializeLookups() {
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initResponse() {
			const details = {
				factionId: this.innerValue.factionId,
				status: this.innerValue.status
			};
			return this.initResponseDetails(details);
		},
		initResponseDetails(details) {
			return details;
		},
		initializeServices() {
			this.notImplementedError();
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		async open() {
		},
		async preComplete() {
			const details = this.initResponse();
			details.id = this.innerValue.id;
			details.gameSystemId = this.innerValue.gameSystemId;
			details.name = String.trim(this.innerValue.name);
			details.number = String.trim(this.innerValue.number);
			details.tagLine = String.trim(this.innerValue.tagLine);
			details.updatedTimestamp = this.innerValue.updatedTimestamp;
			const response = await this.$store.dispatcher.characters.updateCharacterDetails(details);
			this.logger.debug('Pathfinder2eCharacterDetailsDialog', 'preComplete', response);
			return response;
		},
		async resetDialog(value) {
			this.steps = 1;
			this.innerValue = value ? this.clone(value) : {};
		}
	}
};
</script>

<style scoped>
</style>
