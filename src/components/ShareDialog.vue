<template>
	<VFormDialog
		:label="label"
		:signal="signal"
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
					<VTextField
						ref="name"
						v-model="shareUrl"
						vid="name"
						:label="$t('forms.link')"
						:readonly="true"
						@click="clickCopy()"
					/>
				</td>
				<td>
					<v-btn
						depressed
						large
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
			top
			:timeout="2000"
		>
			{{ snackbarText }}
		</v-snackbar>
	</VFormDialog>
</template>

<script>
import AppUtility from '@/utility/app';
import GlobalUtility from '@thzero/library_client/utility/global';

import VFormDialog from '@/library_vue_vuetify/components/form/VFormDialog';
import VTextField from '@/library_vue_vuetify/components/form/VTextField';

export default {
	name: 'ScenarioShareDialog',
	components: {
		VFormDialog,
		VTextField
	},
	extends: VFormDialog,
	props: {
		label: {
			type: String,
			default: ''
		},
		url: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		shareUrl: null,
		snackbar: false,
		snackbarText: ''
	}),
	methods: {
		async cancel() {
			this.$emit('cancel');
		},
		clickCopy() {
			const self = this;
			self.snackbar = false;
			navigator.permissions.query({name: 'clipboard-write'}).then(result => {
				if (result.state == 'granted' || result.state == 'prompt') {
					navigator.clipboard.writeText(this.shareUrl).then(() => {
						self.snackbar = true;
						self.snackbarText = self.$trans.t('strings.copyToClipboard');
					},
					() => {
						self.snackbar = true;
						self.snackbarText = self.$trans.t('errors.copyToClipboard');
					});
				}
			});
		},
		async close() {
			this.shareUrl = null;
		},
		hasGamerTag() {
			return this.isLoggedIn && AppUtility.settings().getSettingsUserGamerTag(this.correlationId(), GlobalUtility.$store.user.user);
		},
		isLoggedIn() {
			return GlobalUtility.$store.state.user && GlobalUtility.$store.state.user.isLoggedIn;
		},
		async ok() {
			this.$emit('ok');
			return true;
		},
		async open() {
		},
		openDialog(id) {
			const gameSystem = AppUtility.findSharedConstantsGameSystemById(id);
			if (!gameSystem)
				return;

			let url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' : ''}${window.location.port}/#/${this.url}/`;
			url += AppUtility.generateShareKeyForUser(GlobalUtility.$store.state.user.user, gameSystem.friendlyId);
			this.shareUrl = url;
		}
	}
};
</script>

<style scoped>
</style>
