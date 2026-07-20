<script>
import { computed, onMounted, ref } from 'vue';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryMomentUtility from '@thzero/library_common/utility/moment';

import { useBaseComponent } from '@/components/base';

// Base boon-lookup-dialog composable. Leaf owns the template (VtFormDialog wrapper) and passes
// its service via options.serviceGameSystem. Exposes reset(correlationId) for the parent dialog ref.
export function useBaseBoonLookupDialogComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;

	const lookups = ref([]);
	const played = ref([]);
	const boonNameFilter = ref(null);

	const boons = computed(() => {
		let results = serviceGameSystem.boons(base.correlationId(), LibraryClientUtility.$store);
		results = results.filter(l => l.scenarioId == null);
		if (boonNameFilter.value)
			results = results.filter(l => l.name ? l.name.toLowerCase().indexOf(boonNameFilter.value.toLowerCase()) > -1 : false);
		return results;
	});

	const boonName = (item) => {
		return serviceGameSystem.boonName(base.correlationId(), item, LibraryClientUtility.$store);
	};
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
		return serviceGameSystem.initializeLookups(correlationId, LibraryClientUtility.$injector);
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
		boonNameFilter.value = null;
		if (options.resetDialogI)
			await options.resetDialogI(correlationId);
	};

	onMounted(() => {
		lookups.value = initializeLookups(base.correlationId());
	});

	return {
		...base,
		serviceGameSystem,
		lookups,
		played,
		boonNameFilter,
		boons,
		boonName,
		close,
		cancel,
		ok,
		initializeLookups,
		getPlayed,
		hasPlayed,
		playedCharacterName,
		playedCharacterNumber,
		playedTimestamp,
		reset
	};
};
</script>
