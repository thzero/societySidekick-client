<template>
	<VtFormDialog
		:label="label"
		:signal="signal"
		:validation="validation"
		:button-cancel="false"
		:button-clear="false"
		max-width="450px"
		@close="close"
		@cancel="cancel"
		@ok="ok"
		@open="open"
	>
		<table
			v-if="hasGamerTag"
			style="width: 100%;"
		>
			<tr>
				<td>
					<VtTextField
						ref="nameRef"
						v-model="shareUrl"
						vid="name"
						:label="$t('forms.link')"
						:readonly="true"
						@click="clickCopy()"
					/>
				</td>
				<td>
					<v-btn
						variant="flat"
						size="large"
						style="min-width: 0px"
						@click="clickCopy()"
					>
						<v-icon>mdi-content-copy</v-icon>
					</v-btn>
				</td>
			</tr>
		</table>
		<v-alert
			v-if="!hasGamerTag"
		>
			{{ missingGamerTag }}
		</v-alert>
		<v-snackbar
			v-model="snackbar"
			location="top"
			:timeout="2000"
		>
			{{ snackbarText }}
		</v-snackbar>
	</VtFormDialog>
</template>

<script>
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import AppUtility from '@/utility/app';

import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

// TODO(migration): the Vue2 version did `extends VFormDialog` and overrode its lifecycle methods.
// It is re-shaped here to WRAP <VtFormDialog> as a child and delegate via events. Human review:
//  1. `signal`/`openDialog(id)` wiring — the parent still calls openDialog(id) via a template ref
//     (setup returns are exposed), then must toggle `signal` to actually show the dialog. Confirm
//     the parent contract still holds after migration.
//  2. `isLoggedIn` / `missingGamerTag` were referenced in the old template but `missingGamerTag`
//     was never defined and `hasGamerTag`/`isLoggedIn` were methods used without parens (always
//     truthy). They are re-expressed as computeds below; verify the intended semantics/i18n key.
//  3. VtFormDialog requires a `:validation` (vuelidate) prop — an empty scope is supplied since
//     this dialog has no editable validated fields.
export default {
	name: 'ScenarioShareDialog',
	components: {
		VtFormDialog,
		VtTextField
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		signal: {
			type: Boolean,
			default: false
		},
		url: {
			type: String,
			default: ''
		}
	},
	emits: ['cancel', 'ok'],
	setup(props, context) {
		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			successResponse
		} = useBaseComponent(props, context);

		const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

		const shareUrl = ref(null);
		const snackbar = ref(false);
		const snackbarText = ref('');

		const isLoggedIn = computed(() => {
			return serviceStore != null && serviceStore.user != null;
		});
		const hasGamerTag = computed(() => {
			return isLoggedIn.value && AppUtility.settings().getSettingsUserGamerTag(correlationId(), serviceStore.user);
		});
		const missingGamerTag = computed(() => {
			// TODO(migration): original referenced an undefined `missingGamerTag`; using a message key.
			return LibraryClientUtility.$trans.t('messages.share.missingGamerTag');
		});

		const cancel = async () => {
			context.emit('cancel');
		};
		const clickCopy = () => {
			snackbar.value = false;
			navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
				if (result.state == 'granted' || result.state == 'prompt') {
					navigator.clipboard.writeText(shareUrl.value).then(() => {
						snackbar.value = true;
						snackbarText.value = LibraryClientUtility.$trans.t('strings.copyToClipboard');
					},
					() => {
						snackbar.value = true;
						snackbarText.value = LibraryClientUtility.$trans.t('errors.copyToClipboard');
					});
				}
			});
		};
		const close = async () => {
			shareUrl.value = null;
		};
		const ok = async () => {
			context.emit('ok');
			return true;
		};
		const open = async () => {
		};
		const openDialog = (id) => {
			const gameSystem = AppUtility.findSharedConstantsGameSystemById(id);
			if (!gameSystem)
				return;

			let url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' : ''}${window.location.port}/#/${props.url}/`;
			url += AppUtility.generateShareKeyForUser(serviceStore.user, gameSystem.friendlyId);
			shareUrl.value = url;
		};

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			successResponse,
			serviceStore,
			shareUrl,
			snackbar,
			snackbarText,
			isLoggedIn,
			hasGamerTag,
			missingGamerTag,
			cancel,
			clickCopy,
			close,
			ok,
			open,
			openDialog,
			validation: useVuelidate({ $scope: 'ScenarioShareDialog' })
		};
	}
};
</script>

<style scoped>
</style>
