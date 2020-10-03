<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';
import VueUtility from '@/library_vue/utility';

import VFormDialog from '@/library_vue/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'BaseScenarioLookupDialog',
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
		},
		scenarioOverride: {
			type: Array,
			default: null
		},
		serviceGameSystemOverride: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		lookups: [],
		played: [],
		scenarioAdventureFilter: null,
		scenarioNameFilter: null,
		scenarioSeasonFilter: null,
		serviceGameSystem: null
	}),
	computed: {
		scenarios() {
			let results = this.scenarioOverride ? this.scenarioOverride : this.getServiceGameSystem().scenarios(this.$store);
			results = this.scenarioListFilter(results);
			if (this.scenarioNameFilter)
				results = results.filter(l => l.name ? l.name.toLowerCase().indexOf(this.scenarioNameFilter.toLowerCase()) > -1 : false);
			return results;
		},
		scenariosSeasons() {
			let results = this.scenarioOverride ? this.scenarioOverride : this.getServiceGameSystem().scenarios(this.$store).filter(l => l.season && !String.isNullOrEmpty(l.season));
			results = [...new Set(results.map(item => item.season))].map(item => { return { id: item, name: item }; });
			return VueUtility.selectBlank(results);
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups();
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		async close() {
		},
		async cancel() {
			this.$emit('cancel');
		},
		getServiceGameSystem() {
			return this.serviceGameSystemOverride ? this.serviceGameSystemOverride : this.serviceGameSystem;
		},
		initializeLookups() {
			return this.getServiceGameSystem().initializeLookups(this.$injector);
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
		markup(value) {
			if (!value)
				return null;
			return this._serviceMarkup.trimResults(this._serviceMarkup.render(value));
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
			this.scenarioAdventureFilter = null;
			this.scenarioNameFilter = null;
			this.scenarioSeasonFilter = null;
			await this.resetDialogI();
		},
		async resetDialogI() {
		},
		scenarioDescription(item) {
			const value = this.getServiceGameSystem().scenarioDescription(item);
			return this.markup(value);
		},
		scenarioListFilter(results) {
			results = results ? results.filter(l => l.id !== this.scenarioListFilterInitial()) : [];
			if (this.scenarioAdventureFilter)
				results = results.filter(l => l.type === this.scenarioAdventureFilter);
			if (this.scenarioSeasonFilter)
				results = results.filter(l => l.season === this.scenarioSeasonFilter);
			return results;
		},
		scenarioListFilterInitial() {
			this.notImplementedError();
		},
		scenarioName(item) {
			return this.getServiceGameSystem().scenarioName(item);
		},
		scenarioParticipant(id) {
			const participant = this.lookups.scenarioParticipants.find(l => l.id === id);
			return participant ? participant.name : null;
		},
		// eslint-disable-next-line
		scenariosSeasonsList() {
			return [];
		}
	}
};
</script>

<style scoped>
</style>
