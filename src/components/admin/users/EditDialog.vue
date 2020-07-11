<script>
import SharedConstants from '@/common/constants';

import BaseEditDialog from '@/library_vue/components/admin/users/EditDialog';

export default {
	name: 'AdminUsersEditDialog',
	extends: BaseEditDialog,
	methods: {
		getRoles() {
			return Object.values(SharedConstants.Roles);
		}
	}
};
</script>

<style scoped>
</style>
