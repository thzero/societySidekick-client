<script>
import { computed } from 'vue';

import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useGameSystemBaseSnippetComponent } from '@/components/gameSystems/baseSnippet';

// Base for game-system-agnostic snippets. Composes baseSnippet and adds shared
// character/location helpers. Leaf passes its service via options.serviceGameSystem.
export function useGameSystemBaseGameSystemSnippetComponent(props, context, options) {
	const base = useGameSystemBaseSnippetComponent(props, context, options);

	const gameSystemil8n = computed(() => {
		return base.serviceGameSystem ? base.serviceGameSystem.il8n : '';
	});

	const clickCharacter = (id) => {
		LibraryClientUtility.$navRouter.push(LibraryCommonUtility.formatUrl({ url: '/character', params: [ id ] }));
	};
	const initLookup = (correlationIdI) => {
		return base.serviceGameSystem.initializeLookups(correlationIdI, LibraryClientUtility.$injector);
	};
	const isParticipantGamemaster = (participant) => {
		return participant == SharedConstants.ScenarioParticipants.GAMEMASTER;
	};
	const locationName = (id) => {
		const location = AppUtility.settings().getSettingsUserLocation(base.correlationId(), LibraryClientUtility.$store.user.user, id);
		return location ? '@ ' + location.name : '';
	};

	return {
		...base,
		gameSystemil8n,
		clickCharacter,
		initLookup,
		isParticipantGamemaster,
		locationName
	};
};
</script>
