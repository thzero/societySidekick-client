<script>
import Constants from '@/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import baseEdit from '@/library_vue_components/components/baseEdit';

export default {
	name: 'BaseDashboard',
	extends: baseEdit,
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		collapseInner: false,
		editable : false,
		serviceCharacter: null,
		serviceGameSystem: null
	}),
	computed: {
		collapse: {
			get: function () {
				return this.collapseInner;
			},
			set: function (newVal) {
				this.collapseInner = newVal;
			}
		}
	},
	created() {
		this.serviceCharacter = GlobalUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);
		this.initializeServices();
	},
	async mounted() {
		this.editable = false;

		await this.changeValue(this.value);

		// TODO: This is dumb...	we are waiting so that we don't reload a couple of times
		const self = this;
		const timer = setInterval(async () => {
			clearInterval(timer);
			self.$watch('value', async (newVal) => {
				await self.changeValue(newVal);
			});
		}, 150);
	},
	methods: {
		async changeValue(value) {
			if (this.observerIsNull(value))
				return;

			this.editable = await this.serviceCharacter.validateEdit(this.value, GlobalUtility.$store.state.user.user, 'edit');
			this.editable = true; // TOOD: Uh why is this still editable?
		},
		getGameSystemName(id) {
			const results = GlobalUtility.$store.getters.getGameSystem(id);
			return results ? results.name : '';
		},
		initializeServices() {
			this.notImplementedError();
		}
	}
};
</script>

<style scoped>
	td {
		padding-left: 4px;
		padding-bottom: 1px;
		padding-right: 4px;
		padding-top: 4px;
		text-align: middle;
		border-spacing: 4px 0px 0px 0px;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	th {
		padding-left: 4px;
		padding-bottom: 1px;
		padding-top: 4px;
		text-align: middle;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
</style>

