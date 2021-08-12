<script>
import base from '@/library_vue/components/base';

import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

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
		gameSystemFilterOverrideI: null,
		lookups: [],
		serviceGameSystem: null,
		sortKeys: []
	}),
	computed: {
		gameSystemFilter: {
			get: function () {
				if (this.externalList) {
					if (this.gameSystemFilterOverrideI)
						return this.gameSystemFilterOverrideI;

					return this.gameSystemFilterOverride;
				}

				return AppUtility.settings().getSettingsUserGameSystemFilter(this.correlationId(), GlobalUtility.$store.state.user.user, (settings) => settings.gameSystemFilter);
			},
			set: function (newVal) {
				if (this.externalList) {
					this.gameSystemFilterOverrideI = newVal;
					return;
				}

				AppUtility.settings().updateSettingsUserGameSystemFilter(this.correlationId(), GlobalUtility.$store, GlobalUtility.$store.state.user.user, newVal, (settings) => { return settings.gameSystemFilter = newVal; });
			}
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups(this.correlationId());
	},
	methods: {
		clear() {
		},
		initializeLookups(correlationId) {
			return this.serviceGameSystem.initializeLookups(correlationId, GlobalUtility.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		}
	}
};
</script>
