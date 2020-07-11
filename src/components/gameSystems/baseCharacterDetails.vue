<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library/constants';

import base from '@/components/base';

import VueUtility from '@/library_vue/utility/index';

import VConfirmationDialog from '@/library_vue/components/VConfirmationDialog';

import DialogSupport from '@/library_vue/components/support/dialog';

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
		this.lookups = this.initializeLookups();
		this._serviceMarkup = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_MARKUP_PARSER);
	},
	methods: {
		boonDescription(id) {
			const description = this.serviceGameSystem.boonDescriptionById(id, this.$store);
			if (!description)
				return null;
			return this._serviceMarkup.trimResults(this._serviceMarkup.render(description));
		},
		boonName(id) {
			return this.serviceGameSystem.boonNameById(id, this.$store);
		},
		factionDescription(id) {
			const description = this.serviceGameSystem.factionDescriptionById(id, this.$store);
			if (!description)
				return null;
			return this._serviceMarkup.trimResults(this._serviceMarkup.render(description));
		},
		factionName(id) {
			return this.serviceGameSystem.factionNameById(id, this.$store);
		},
		async dialogConfirmDeleteOk() {
			VueUtility.invalid();
		},
		async dialogDetailsOpen() {
			await this.$refs.detailsDialog.reset(this.value);
			this.dialogDetailsSignal.open();
		},
		dialogDetailsDeleteOpen() {
			this.dialogConfirmDeleteSignal.open();
		},
		async dialogPreCompleteOkDelete() {
			return await this.$store.dispatcher.characters.deleteCharacter(this.value.id);
		},
		initializeLookups() {
			return this.serviceGameSystem.initializeLookups(this.$injector);
		},
		initializeServices() {
			this.notImplementedError();
		},
		statusName(id) {
			return this.serviceGameSystem.characterLookupStatusName(id, this.lookups);
		}
	}
};
</script>

<style scoped>
</style>
