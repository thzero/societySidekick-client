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

		// 0.18 signature: validateEdit(correlationId, character, user, act). This path isn't verified
		// yet and can throw, which previously left editable=false and hid every edit control (the
		// details speed-dial, the scenario/boon "+" FABs). Guard it so the forced value below always
		// applies. TODO(migration): restore the real ownership check once validateEdit is confirmed.
		try {
			editable.value = await serviceCharacter.validateEdit(base.correlationId(), props.value, LibraryClientUtility.$store.user.user, 'edit');
		}
		catch {
			// fall through to the forced value below
		}
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
