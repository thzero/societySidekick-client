<script>
import { onMounted, ref } from 'vue';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';
import VueUtility from '@thzero/library_client_vue3/utility/index';

import { useBaseComponent } from '@/components/base';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

// Base character-details composable. Leaf owns the (large) template + registers CharacterDetailsDialog
// + VtConfirmationDialog, and passes options { serviceGameSystem }.
export function useGameSystemBaseCharacterDetailsComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = options.serviceGameSystem;
	const serviceMarkup = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_MARKUP_PARSER);

	const detailsDialogRef = ref(null);
	const deleteConfirmDialogRef = ref(null);

	const fab = ref(false);
	const collapseInner = ref(false);
	const dialogConfirmDeleteSignal = ref(new DialogSupport());
	const dialogDetailsSignal = ref(new DialogSupport());
	const lookups = ref([]);
	const panel = ref(0);

	const boonDescription = (id) => {
		const correlationId = base.correlationId();
		const description = serviceGameSystem.boonDescriptionById(correlationId, id, LibraryClientUtility.$store);
		if (!description)
			return null;
		return serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, description));
	};
	const boonName = (id) => {
		return serviceGameSystem.boonNameById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const factionDescription = (id) => {
		const correlationId = base.correlationId();
		const description = serviceGameSystem.factionDescriptionById(correlationId, id, LibraryClientUtility.$store);
		if (!description)
			return null;
		return serviceMarkup.trimResults(correlationId, serviceMarkup.render(correlationId, description));
	};
	const factionName = (id) => {
		return serviceGameSystem.factionNameById(base.correlationId(), id, LibraryClientUtility.$store);
	};
	const statusName = (id) => {
		return serviceGameSystem.characterLookupStatusName(base.correlationId(), id, lookups.value);
	};
	const dialogConfirmDeleteOk = async () => {
		VueUtility.invalid();
	};
	const dialogDetailsOpen = async () => {
		await detailsDialogRef.value.reset(base.correlationId(), props.value);
		dialogDetailsSignal.value.open();
	};
	const dialogDetailsDeleteOpen = () => {
		dialogConfirmDeleteSignal.value.open();
	};
	const dialogPreCompleteOkDelete = async (correlationId) => {
		return await LibraryClientUtility.$store.dispatcher.characters.deleteCharacter(correlationId, props.value.id);
	};
	const initializeLookups = (correlationId) => {
		return serviceGameSystem.initializeLookups(correlationId, LibraryClientUtility.$injector);
	};

	onMounted(() => {
		lookups.value = initializeLookups(base.correlationId());
	});

	return {
		...base,
		serviceGameSystem,
		serviceMarkup,
		detailsDialogRef,
		deleteConfirmDialogRef,
		fab,
		collapseInner,
		dialogConfirmDeleteSignal,
		dialogDetailsSignal,
		lookups,
		panel,
		boonDescription,
		boonName,
		factionDescription,
		factionName,
		statusName,
		dialogConfirmDeleteOk,
		dialogDetailsOpen,
		dialogDetailsDeleteOpen,
		dialogPreCompleteOkDelete,
		initializeLookups
	};
};
</script>
