<script>
import GlobalUtility from '@thzero/library_client/utility/global';

import base from '@/library_vue/components/base';

export default {
	extends: base,
	data: () => ({
		hover: null
	}),
	methods: {
		formatCurrency(value) {
			return value ? Number(value).toLocaleString() : '';
		},
		formatNumber(value) {
			return value ? Number(value).toLocaleString() : '';
		},
		handleDisplay(value) {
			GlobalUtility.$EventBus.emit('display-markup', value);
		},
		handleDisplayHover(value, delay) {
			delay = delay ? delay : 1000;
			if (this.hover)
				clearTimeout(this.hover);
			this.hover = setTimeout(() => { GlobalUtility.$EventBus.emit('display-markup', value); }, delay);
		},
		handleDisplayHoverClear() {
			if (this.hover)
				clearTimeout(this.hover);
		}
	}
};
</script>
