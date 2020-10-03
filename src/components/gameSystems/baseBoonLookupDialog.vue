<script>
import LibraryUtility from '@thzero/library_common/utility';

import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'BaseBoonLookupDialog',
	components: {
		VFormDialog,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VFormDialog,
	props: {
		characterId: {
			type: String,
			default: null
		}
	},
	data: () => ({
		lookups: [],
		played: [],
		boonNameFilter: null,
		serviceGameSystem: null
	}),
	computed: {
		boons() {
			let results = this.serviceGameSystem.boons(this.$store);
			results = results.filter(l => l.scenarioId == null);
			if (this.boonNameFilter)
				results = results.filter(l => l.name ? l.name.toLowerCase().indexOf(this.boonNameFilter.toLowerCase()) > -1 : false);
			return results;
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups();
	},
	methods: {
		boonName(item) {
			return this.serviceGameSystem.boonName(item, this.$store);
		},
		async close() {
		},
		async cancel() {
			this.$emit('cancel');
		},
		initializeLookups() {
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		getPlayed(id) {
			const results = [];
			for (const played of this.played) {
				if (played.scenarioId === id) {
					played.character = this.$store.getters.getCharacter(played.characterId);
					results.push(played);
				}
			}
			return results;
		},
		hasPlayed(id) {
			for (const played of this.played) {
				if (played.scenarioId === id) {
					played.character = this.$store.getters.getCharacter(played.characterId);
					return true;
				}
			}
			return false;
		},
		async ok(id) {
			this.$emit('ok', id);
			return true;
		},
		playedCharacterName(item) {
			if (!item)
				return null;
			const character = this.$store.getters.getCharacter(item.characterId);
			if (!character)
				return null;

			return character ? character.name : null;
		},
		playedCharacterNumber(item) {
			if (!item)
				return null;
			const character = this.$store.getters.getCharacter(item.characterId);
			if (!character)
				return null;

			return character ? character.number : null;
		},
		playedTimestamp(item) {
			return LibraryUtility.getDateHuman(item ? item.timestamp : 0);
		},
		async resetDialog() {
			this.played = this.$store.getters.getScenarioPlayed(this.characterId);
			this.boonNameFilter = null;
			await this.resetDialogI();
		},
		async resetDialogI() {
		}
	}
};
</script>

<style scoped>
</style>
