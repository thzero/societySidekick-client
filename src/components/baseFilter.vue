<script>
import base from '@/library_vue/components/base';

import AppUtility from '@/utility/app';

export default {
	name: 'BaseFilter',
	extends: base,
	props: {
		gameSystemFilterOverride: {
			type: String,
			default: null
		},
		externalList: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		lookups: [],
		serviceGameSystem: null,
		sortKeys: []
	}),
	computed: {
		gameSystemFilter: {
			get: function () {
				if (this.externalList)
					return this.gameSystemFilterOverride;

				return AppUtility.settings().getSettingsUserGameSystemFilter(this.$store.state.user.user, (settings) => settings.gameSystemFilter);
			},
			set: function (newVal) {
				if (this.externalList) {
					this.gameSystemFilterOverride = newVal;
					return;
				}

				AppUtility.settings().updateSettingsUserGameSystemFilter(this.$store, this.$store.state.user.user, newVal, (settings) => { return settings.gameSystemFilter = newVal; });
			}
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups();
	},
	methods: {
		initializeLookups() {
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		}
	}
};
</script>
