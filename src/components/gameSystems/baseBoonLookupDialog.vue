<script>
import GlobalUtility from '@thzero/library_client/utility/global';
import LibraryUtility from '@thzero/library_common/utility';

import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

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
			let results = this.serviceGameSystem.boons(this.correlationId, GlobalUtility.$store);
			results = results.filter(l => l.scenarioId == null);
			if (this.boonNameFilter)
				results = results.filter(l => l.name ? l.name.toLowerCase().indexOf(this.boonNameFilter.toLowerCase()) > -1 : false);
			return results;
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups(this.correlationId());
	},
	methods: {
		boonName(item) {
			return this.serviceGameSystem.boonName(this.correlationId(), item, GlobalUtility.$store);
		},
		async close() {
		},
		async cancel() {
			this.$emit('cancel');
		},
		initializeLookups(correlationId) {
			return this.serviceGameSystem.initializeLookups(correlationId, GlobalUtility.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		getPlayed(id) {
			const results = [];
			for (const played of this.played) {
				if (played.scenarioId === id) {
					played.character = GlobalUtility.$store.getters.getCharacter(played.characterId);
					results.push(played);
				}
			}
			return results;
		},
		hasPlayed(id) {
			for (const played of this.played) {
				if (played.scenarioId === id) {
					played.character = GlobalUtility.$store.getters.getCharacter(played.characterId);
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
			const character = GlobalUtility.$store.getters.getCharacter(item.characterId);
			if (!character)
				return null;

			return character ? character.name : null;
		},
		playedCharacterNumber(item) {
			if (!item)
				return null;
			const character = GlobalUtility.$store.getters.getCharacter(item.characterId);
			if (!character)
				return null;

			return character ? character.number : null;
		},
		playedTimestamp(item) {
			return LibraryUtility.getDateHuman(item ? item.timestamp : 0);
		},
		async resetDialog(correlationId) {
			this.played = GlobalUtility.$store.getters.getScenarioPlayed(this.characterId);
			this.boonNameFilter = null;
			await this.resetDialogI(correlationId);
		},
		// eslint-disable-next-line
		async resetDialogI(correlationId) {
		}
	}
};
</script>

<style scoped>
</style>
