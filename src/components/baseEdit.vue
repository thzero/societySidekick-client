<script>
import baseEdit from '@/library_vue/components/baseEdit';

export default {
	extends: baseEdit,
	methods: {
		formatCurrency(value) {
			if (!value)
				return '';

			return Number(value).toLocaleString();
		},
		formatNumber(value) {
			if (!value)
				return '';

			return Number(value).toLocaleString();
		}
	}
};
</script>
