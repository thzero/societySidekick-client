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

				return AppUtility.settings().getSettingsUserGameSystemFilter(this.correlationId(), this.$store.state.user.user, (settings) => settings.gameSystemFilter);
			},
			set: function (newVal) {
				if (this.externalList) {
					this.gameSystemFilterOverrideI = newVal;
					return;
				}

				AppUtility.settings().updateSettingsUserGameSystemFilter(this.correlationId(), this.$store, this.$store.state.user.user, newVal, (settings) => { return settings.gameSystemFilter = newVal; });
			}
		}
	},
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups(this.correlationId());
	},
	methods: {
		initializeLookups(correlationId) {
			return this.serviceGameSystem.initializeLookups(correlationId, this.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		}
	}
};
</script>
