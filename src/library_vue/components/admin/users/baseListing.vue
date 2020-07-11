<script>
import baseList from '../baseList';

export default {
	name: 'BaseAdminUsersListing',
	extends: baseList,
	computed: {
		users() {
			const users = this.$store.state.adminUsers.users;
			return users ? users.slice(0) : [];
		}
	},
	async mounted() {
		await this.$store.dispatcher.adminUsers.searchAdminUsers({});
	},
	methods: {
		defaultItem() {
		},
		async dialogDeletePreCompleteOkDelete(dispatcher, id) {
			return await dispatcher.adminUsers.deleteAdminUser(id);
		},
		initializeHeaders() {
			return [
				{ text: this.$trans.t('users.name'), align: 'left', value: 'external.name', },
				{ text: this.$trans.t('users.id'), align: 'left', value: 'external.id', },
				{ text: this.$trans.t('users.externalId'), align: 'left', value: 'external.externalId', },
				{ text: this.$trans.t('users.roles'), align: 'left', value: 'roles' },
				{ text: this.$trans.t('users.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>
