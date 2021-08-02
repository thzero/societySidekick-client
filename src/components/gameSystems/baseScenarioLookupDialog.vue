<script>
import LibraryConstants from '@thzero/library_client/constants';

import LibraryUtility from '@thzero/library_common/utility';
import GlobalUtility from '@thzero/library_client/utility/global';
import VueUtility from '@/library_vue/utility';

import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VSelectWithValidation from '@/library_vue_vuetify/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue_vuetify/components/form/VTextFieldWithValidation';

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
			let results = this.scenarioOverride ? this.scenarioOverride : this.getServiceGameSystem().scenarios(this.correlationId(), GlobalUtility.$store);
			results = this.scenarioListFilter(results);
			if (this.scenarioNameFilter)
				results = results.filter(l => l.name ? l.name.toLowerCase().indexOf(this.scenarioNameFilter.toLowerCase()) > -1 : false);
			return results;
		},
		scenariosSeasons() {
			let results = this.scenarioOverride ? this.scenarioOverride : this.getServiceGameSystem().scenarios(this.correlationId(), GlobalUtility.$store).filter(l => l.season && !String.isNullOrEmpty(l.season));
			results = [...new Set(results.map(item => item.season))].map(item => { return { id: item, name: item }; });
			return VueUtility.selectBlank(results);
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups(this.correlationId());
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
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
		initializeLookups(correlationId) {
			return this.getServiceGameSystem().initializeLookups(correlationId, GlobalUtility.$injector);
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
		markup(correlationId, value) {
			if (!value)
				return null;
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, value));
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
		// eslint-disable-next-line
		async resetDialog(correlationId) {
			this.played = GlobalUtility.$store.getters.getScenarioPlayed(this.characterId);
			this.scenarioAdventureFilter = null;
			this.scenarioNameFilter = null;
			this.scenarioSeasonFilter = null;
			await this.resetDialogI(correlationId);
		},
		// eslint-disable-next-line
		async resetDialogI(correlationId) {
		},
		scenarioDescription(item) {
			const correlationId = this.correlationId();
			const value = this.getServiceGameSystem().scenarioDescription(correlationId, item);
			return this.markup(correlationId, value);
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
			return this.getServiceGameSystem().scenarioName(this.correlationId(), item);
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
