<script>
import { computed, ref } from 'vue';

import AppUtility from '@/utility/app';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseComponent } from '@/components/base';

// Base filter composable. The leaf provides its game-system service via options.serviceGameSystem.
export function useBaseFilterComponent(props, context, options) {
	const base = useBaseComponent(props, context, options);

	const serviceGameSystem = (options && options.serviceGameSystem) ? options.serviceGameSystem : null;
	const gameSystemFilterOverrideI = ref(null);
	const lookups = ref([]);
	const sortKeys = ref([]);

	const gameSystemFilter = computed({
		get() {
			if (props.externalList) {
				if (gameSystemFilterOverrideI.value)
					return gameSystemFilterOverrideI.value;
				return props.gameSystemFilterOverride;
			}
			return AppUtility.settings().getSettingsUserGameSystemFilter(base.correlationId(), LibraryClientUtility.$store.user.user, (settings) => settings.gameSystemFilter);
		},
		set(newVal) {
			if (props.externalList) {
				gameSystemFilterOverrideI.value = newVal;
				return;
			}
			AppUtility.settings().updateSettingsUserGameSystemFilter(base.correlationId(), LibraryClientUtility.$store, LibraryClientUtility.$store.user.user, newVal, (settings) => { return settings.gameSystemFilter = newVal; });
		}
	});

	const initializeLookups = (correlationIdI) => {
		return serviceGameSystem.initializeLookups(correlationIdI, LibraryClientUtility.$injector);
	};
	const clear = () => {
	};

	lookups.value = initializeLookups(base.correlationId());

	return {
		...base,
		serviceGameSystem,
		gameSystemFilterOverrideI,
		lookups,
		sortKeys,
		gameSystemFilter,
		initializeLookups,
		clear
	};
};
</script>
