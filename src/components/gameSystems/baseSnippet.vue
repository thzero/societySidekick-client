<script>
import Constants from '@/constants';
import SharedConstants from '@/common/constants';

import base from '@/components/base';

export default {
	name: 'BaseSnippet',
	extends: base,
	props: {
		externalListType: {
			type: String,
			default: null
		},
		user: {
			type: Object,
			default: null
		},
		value: {
			type: [Object, String],
			default: null
		}
	},
	data: () => ({
		lookups: {},
		serviceGameSystem: null
	}),
	computed: {
		isExternalList() {
			return (this.externalListType === Constants.ExternalListTypes.Favorites || this.externalListType === Constants.ExternalListTypes.Scenarios);
		},
		isExternalListFavorites() {
			return this.externalListType === Constants.ExternalListTypes.Favorites;
		},
		isExternalListScenarios() {
			return this.externalListType === Constants.ExternalListTypes.Scenarios;
		},
		// GameSystems Update
		isGameSystemDungeonsAndDragons5e() {
			return this.value && this.value.gameSystemId == SharedConstants.GameSystems.DungeonsAndDragons5e.id;
		},
		isGameSystemPathfinder2e() {
			return this.value && this.value.gameSystemId == SharedConstants.GameSystems.Pathfinder2e.id;
		},
		isGameSystemStarfinder1e() {
			return this.value && this.value.gameSystemId == SharedConstants.GameSystems.Starfinder1e.id;
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups();
	},
	methods: {
		getGameSystemName(id) {
			const results = this.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initializeLookups() {
			if (!this.serviceGameSystem)
				return [];
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initializeServices() {
		}
	}
};
</script>
