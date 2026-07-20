<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@/components/base';

// Base scenario-lookup-dialog composable. Leaf owns the template (VtFormDialog wrapper) and passes
// its service via options.serviceGameSystem + options.scenarioListFilterInitial() (the id to exclude).
// Exposes reset(correlationId) for the parent dialog ref.
export function useBaseScenarioLookupDialogComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;
	const serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	const lookups = ref([]);
	const played = ref([]);
	const scenarioAdventureFilter = ref(null);
	const scenarioNameFilter = ref(null);
	const scenarioSeasonFilter = ref(null);

	const getServiceGameSystem = () => {
		return props.serviceGameSystemOverride ? props.serviceGameSystemOverride : serviceGameSystem;
	};

	const scenarioListFilter = (results) => {
		results = results ? results.filter(l => l.id !== options.scenarioListFilterInitial()) : [];
		if (scenarioAdventureFilter.value)
			results = results.filter(l => l.type === scenarioAdventureFilter.value);
		if (scenarioSeasonFilter.value)
			results = results.filter(l => l.season === scenarioSeasonFilter.value);
		return results;
	};

	const scenarios = computed(() => {
		let results = props.scenarioOverride ? props.scenarioOverride : getServiceGameSystem().scenarios(base.correlationId(), LibraryClientUtility.$store);
		results = scenarioListFilter(results);
		if (scenarioNameFilter.value)
			results = results.filter(l => l.name ? l.name.toLowerCase().indexOf(scenarioNameFilter.value.toLowerCase()) > -1 : false);
		return results;
	});
	const scenariosSeasons = computed(() => {
		let results = props.scenarioOverride ? props.scenarioOverride : getServiceGameSystem().scenarios(base.correlationId(), LibraryClientUtility.$store).filter(l => l.season && !String.isNullOrEmpty(l.season));
		results = [...new Set(results.map(item => item.season))].map(item => { return { id: item, name: item }; });
		return LibraryCommonUtility.selectBlank(results);
	});

	const close = async () => {
	};
	const cancel = async () => {
		context.emit('cancel');
	};
	const ok = async (id) => {
		context.emit('ok', id);
		return true;
	};
	const initializeLookups = (correlationId) => {
		return getServiceGameSystem().initializeLookups(correlationId, LibraryClientUtility.$injector);
	};
	const getPlayed = (id) => {
		const results = [];
		for (const p of played.value) {
			if (p.scenarioId === id) {
				p.character = LibraryClientUtility.$store.getters.getCharacter(base.correlationId(), p.characterId);
				results.push(p);
			}
		}
		return results;
	};
	const hasPlayed = (id) => {
		for (const p of played.value) {
			if (p.scenarioId === id) {
				p.character = LibraryClientUtility.$store.getters.getCharacter(base.correlationId(), p.characterId);
				return true;
			}
		}
		return false;
	};
	const markup = (correlationId, value) => {
		if (!value)
			return null;
		return serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, value));
	};
	const playedCharacterName = (item) => {
		if (!item)
			return null;
		const character = LibraryClientUtility.$store.getters.getCharacter(base.correlationId(), item.characterId);
		return character ? character.name : null;
	};
	const playedCharacterNumber = (item) => {
		if (!item)
			return null;
		const character = LibraryClientUtility.$store.getters.getCharacter(base.correlationId(), item.characterId);
		return character ? character.number : null;
	};
	const playedTimestamp = (item) => {
		return LibraryMomentUtility.getDateHuman(item ? item.timestamp : 0);
	};
	const reset = async (correlationId) => {
		played.value = LibraryClientUtility.$store.getters.getScenarioPlayed(correlationId, props.characterId);
		scenarioAdventureFilter.value = null;
		scenarioNameFilter.value = null;
		scenarioSeasonFilter.value = null;
		if (options.resetDialogI)
			await options.resetDialogI(correlationId);
	};
	const scenarioDescription = (item) => {
		const correlationId = base.correlationId();
		const value = getServiceGameSystem().scenarioDescription(correlationId, item);
		return markup(correlationId, value);
	};
	const scenarioName = (item) => {
		return getServiceGameSystem().scenarioName(base.correlationId(), item);
	};
	const scenarioParticipant = (id) => {
		const participant = lookups.value.scenarioParticipants.find(l => l.id === id);
		return participant ? participant.name : null;
	};
	const scenariosSeasonsList = () => {
		return options.scenariosSeasonsList ? options.scenariosSeasonsList() : [];
	};

	onMounted(() => {
		lookups.value = initializeLookups(base.correlationId());
	});

	return {
		...base,
		serviceGameSystem,
		serviceMarkup,
		lookups,
		played,
		scenarioAdventureFilter,
		scenarioNameFilter,
		scenarioSeasonFilter,
		getServiceGameSystem,
		scenarios,
		scenariosSeasons,
		close,
		cancel,
		ok,
		initializeLookups,
		getPlayed,
		hasPlayed,
		markup,
		playedCharacterName,
		playedCharacterNumber,
		playedTimestamp,
		reset,
		scenarioDescription,
		scenarioListFilter,
		scenarioName,
		scenarioParticipant,
		scenariosSeasonsList
	};
};
</script>
