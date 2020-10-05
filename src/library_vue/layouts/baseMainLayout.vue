<script>
import Vue from 'vue';

import LibraryConstants from '@thzero/library_client/constants';

import baseLayout from './baseLayout';
import VLayoutFooter from '../components/VLayoutFooter';
import VLoadingOverlay from '../components/VLoadingOverlay';

import DialogSupport from '../components/support/dialog';

const auth = Vue.prototype.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_AUTH);

export default {
	name: 'BaseMainLayout',
	components: {
		VLayoutFooter,
		VLoadingOverlay
	},
	extends: baseLayout,
	data: () => ({
		closeOnContentClick: true,
		// drawer: false,
		displayMarkupValue: null,
		dialogSignOut: new DialogSupport()
	}),
	computed: {
		isAuthCompleted() {
			return this.$store.state.user && this.$store.state.user.authCompleted;
		},
		isLoggedIn() {
			return this.$store.state.user && this.$store.state.user.isLoggedIn;
		}
	},
	methods: {
		clickAbout() {
			this.$navRouter.push('/about');
		},
		clickOpenSource() {
			this.$navRouter.push('/openSource');
		},
		async clickSignIn() {
			this.$navRouter.push('/auth');
		},
		clickSupport() {
			this.$navRouter.push('/support');
		},
		async dialogSignOutOk() {
			this.dialogSignOut.ok();
			await auth.signOut(this.correlationId());
		},
		toggleDrawer() {
			// this.drawer = !this.drawer
			this.$EventBus.$emit('toggle-drawer');
		}
	}
};
</script>