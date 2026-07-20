<script>
import { computed, ref } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import LibraryCommonUtility from '@thzero/library_common/utility';

import { useBaseComponent } from '@/components/base';

// Base gear-set dialog composable (shared, non-game-system). Leaf owns the template (VtFormDialog wrapper +
// nested VtConfirmationDialog) and its own preComplete logic. Exposes reset(cid) for the parent dialog ref.
export function useBaseInventoryGearSetDialogComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const gearSetId = ref(null);
	const name = ref(null);

	const gearSets = computed(() => {
		return AppUtility.settings().getSettingsUserGameSystem(base.correlationId(), LibraryClientUtility.$store.user.user, props.gameSystemId, (settings) => settings.gearSets);
	});
	const gearSetsBlank = computed(() => {
		return LibraryCommonUtility.selectBlank(AppUtility.settings().getSettingsUserGameSystem(base.correlationId(), LibraryClientUtility.$store.user.user, props.gameSystemId, (settings) => settings.gearSets));
	});

	const cancel = async () => {
		context.emit('cancel');
	};
	const close = async () => {
	};
	const ok = async () => {
		context.emit('ok');
		return true;
	};
	const reset = async (correlationId) => {
		name.value = null;
		gearSetId.value = null;
	};

	return {
		...base,
		gearSetId,
		name,
		gearSets,
		gearSetsBlank,
		cancel,
		close,
		ok,
		reset
	};
};
</script>
