<script>
import { computed, onMounted, ref, watch } from 'vue';

import Constants from '@/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseEditComponent } from '@/components/baseEdit';

// Base dashboard composable. The leaf provides its game-system service via options.serviceGameSystem.
export function useBaseDashboardComponent(props, context, options) {
	const base = useBaseEditComponent(props, context, options);

	const serviceGameSystem = (options && options.serviceGameSystem) ? options.serviceGameSystem : null;
	const serviceCharacter = LibraryClientUtility.$injector.getService(Constants.InjectorKeys.SERVICE_CHARACTERS);

	const collapseInner = ref(false);
	const editable = ref(false);

	const collapse = computed({
		get() {
			return collapseInner.value;
		},
		set(newVal) {
			collapseInner.value = newVal;
		}
	});

	const changeValue = async (value) => {
		if (!value)
			return;

		// 0.18 signature: validateEdit(correlationId, character, user, act)
		editable.value = await serviceCharacter.validateEdit(base.correlationId(), props.value, LibraryClientUtility.$store.user.user, 'edit');
		editable.value = true; // TODO(migration): original forced editable = true here.
	};
	const getGameSystemName = (id) => {
		const results = LibraryClientUtility.$store.getters.getGameSystem(base.correlationId(), id);
		return results ? results.name : '';
	};

	onMounted(async () => {
		editable.value = false;
		await changeValue(props.value);
	});
	watch(() => props.value, async (newVal) => {
		await changeValue(newVal);
	});

	return {
		...base,
		serviceGameSystem,
		serviceCharacter,
		collapseInner,
		editable,
		collapse,
		changeValue,
		getGameSystemName
	};
};
</script>
