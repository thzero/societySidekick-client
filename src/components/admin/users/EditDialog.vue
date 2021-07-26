<script>
import SharedConstants from '@/common/constants';

import VUsersAdminFormDialog from '@/library_vue_vuetify/components/admin/users/VUsersAdminFormDialog';

export default {
	name: 'AdminUsersEditDialog',
	extends: VUsersAdminFormDialog,
	methods: {
		getRoles() {
			return Object.values(SharedConstants.Roles);
		}
	}
};
</script>

<style scoped>
</style>
