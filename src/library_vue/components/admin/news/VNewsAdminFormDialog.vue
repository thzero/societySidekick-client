<script>
import VAdminFormDialog from '@/library_vue/components/admin/VAdminFormDialog';
import VCheckboxWithValidation from '@/library_vue/components/form/VCheckboxWithValidation';
import VDateTimeFieldWithValidation from '@/library_vue/components/form/VDateTimeFieldWithValidation';
import VMarkdownEditor from '@/library_vue/components/markup/VMarkdownEditor';
import VSelectWithValidation from '@/library_vue/components/form/VSelectWithValidation';
import VTextFieldWithValidation from '@/library_vue/components/form/VTextFieldWithValidation';

export default {
	name: 'VNewsAdminFormDialog',
	components: {
		VAdminFormDialog,
		VCheckboxWithValidation,
		VDateTimeFieldWithValidation,
		VMarkdownEditor,
		VSelectWithValidation,
		VTextFieldWithValidation
	},
	extends: VAdminFormDialog,
	methods: {
		async preComplete() {
			let response;
			if (this.innerValue.id)
				response = await this.$store.dispatcher.adminNews.updateAdminNews(this.innerValue);
			else
				response = await this.$store.dispatcher.adminNews.createAdminNews(this.innerValue);
			this.logger.debug('VNewsAdminFormDialog', 'preComplete', response);
			return response;
		}
	}
};
</script>
