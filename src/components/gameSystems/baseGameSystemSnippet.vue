<script>
import SharedConstants from '@/common/constants';

import AppUtility from '@/utility/app';
import LibraryUtility from '@thzero/library_common/utility';

import baseSnippet from '@/components/gameSystems/baseSnippet';

export default {
	name: 'BaseGameSystemSnippet',
	extends: baseSnippet,
	props: {
		user: {
			type: Object,
			default: null
		},
		value: {
			type: Object,
			default: null
		}
	},
	computed: {
		gameSystemil8n() {
			return this.serviceGameSystem ? this.serviceGameSystem.il8n : '';
		}
	},
	methods: {
		clickCharacter(id) {
			this.$navRouter.push(LibraryUtility.formatUrl({ url: '/character', params: [ id ]}));
		},
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initLookup() {
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		isParticipantGamemaster(participant) {
			return participant == SharedConstants.ScenarioParticipants.GAMEMASTER;
		},
		locationName(id) {
			const location = AppUtility.settings().getSettingsUserLocation(this.$store.state.user.user, id);
			return location ? '@ ' + location.name : '';
		}
	}
};
</script>
