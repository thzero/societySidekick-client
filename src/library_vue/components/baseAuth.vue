<template>
	<v-container fluid>
		<v-row justify="center">
			<v-card>
				<v-card-text
					style="min-width: 300px;"
				>
					<v-container fluid>
						<v-row justify="center">
							<v-btn
								v-if="display"
								:disabled="disabled"
								color="primary"
								@click="signInGoogle"
							>
								{{ $t('auth.google') }}
							</v-btn>
						</v-row>
						<v-row justify="center">
							<v-switch
								v-if="allowRememberMe"
								v-model="rememberMe"
								:label="$t('auth.rememberMe')"
							/>
						</v-row>
					</v-container>
				</v-card-text>
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library/constants';

import base from './base';

export default {
	name: 'BaseAuth',
	extends: base,
	data: () => ({
		allowRememberMe: false,
		available: false,
		disabled: false,
		isLoggedIn: false,
		rememberMe: false,
		features: null
	}),
	computed: {
		display() {
			return !this.isLoggedIn;
		}
	},
	async beforeCreate() {
		this.features = this.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_FEATURES);
		this.allowRememberMe = this.features && this.features.features ? this.features.features.RememberMe : false;
		this.auth = this.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_AUTH);
		this.available = await this.auth.isAuthenticated;
		if (this.available)
			this.$navRouter.push('/');
	},
	async mounted() {
		await this.auth.signInCompleted();
		Vue.prototype.$EventBus.$on('auth', isLoggedIn => {
			this.logger.debug('isLoggedIn', isLoggedIn);
			this.isLoggedIn = isLoggedIn;
			this.disabled = isLoggedIn;
		});
	},
	methods: {
		async signInGoogle() {
			this.disabled = true;
			await this.auth.signIn();
		}
	}
};
</script>

<style>
#federatedSignIn {
	width: 100%;
}
#google button {
	width: 250px;
}
#google button span {
	padding-top: 13px;
	padding-left: 26px;
	padding-bottom: 12px;
	font-size: 18px;
	font-family: Roboto, sans-serif;
}
</style>
