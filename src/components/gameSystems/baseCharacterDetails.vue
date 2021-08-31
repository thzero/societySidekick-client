<script>
import LibraryConstants from '@thzero/library_client/constants';

import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/components/base';

import VueUtility from '@/library_vue/utility/index';

import VConfirmationDialog from '@/library_vue_vuetify/components/VConfirmationDialog';

import DialogSupport from '@/library_vue_components/support/dialog';

export default {
	name: 'BaseCharacterDetails',
	components: {
		VConfirmationDialog
	},
	extends: base,
	props: {
		value: {
			type: Object,
			default: null
		},
		editable: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		fab: false,
		collapseInner: false,
		dialogConfirmDeleteSignal: new DialogSupport(),
		dialogDetailsSignal: new DialogSupport(),
		lookups: [],
		panel: 0,
		serviceGameSystem: null
	}),
	created() {
		this.initializeServices();
		this.lookups = this.initializeLookups(this.correlationId());
		this._serviceMarkup = GlobalUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription(id) {
			const correlationId = this.correlationId();
			const description = this.serviceGameSystem.boonDescriptionById(correlationId, id, GlobalUtility.$store);
			if (!description)
				return null;
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, description));
		},
		boonName(id) {
			return this.serviceGameSystem.boonNameById(this.correlationId(), id, GlobalUtility.$store);
		},
		factionDescription(id) {
			const correlationId = this.correlationId();
			const description = this.serviceGameSystem.factionDescriptionById(correlationId, id, GlobalUtility.$store);
			if (!description)
				return null;
			return this._serviceMarkup.trimResults(correlationId, this._serviceMarkup.render(correlationId, description));
		},
		factionName(id) {
			return this.serviceGameSystem.factionNameById(this.correlationId(), id, GlobalUtility.$store);
		},
		async dialogConfirmDeleteOk() {
			VueUtility.invalid();
		},
		async dialogDetailsOpen() {
			await this.$refs.detailsDialog.reset(this.correlationId(), this.value);
			this.dialogDetailsSignal.open();
		},
		dialogDetailsDeleteOpen() {
			this.dialogConfirmDeleteSignal.open();
		},
		async dialogPreCompleteOkDelete(correlationId) {
			return await GlobalUtility.$store.dispatcher.characters.deleteCharacter(correlationId, this.value.id);
		},
		initializeLookups(correlationId) {
			return this.serviceGameSystem.initializeLookups(correlationId, GlobalUtility.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		statusName(id) {
			return this.serviceGameSystem.characterLookupStatusName(this.correlationId(), id, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>
