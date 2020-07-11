<script>
import Vue from 'vue';

import base from './base';

export default {
	name: 'BaseNotFound',
	extends: base,
	computed: {
		imageWidth() {
			let width = (window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth);
			if (width > 512)
				return '512px';

			return width *.75 + 'px';
		}
	},
	methods: {
		clickHome() {
			Vue.prototype.$navRouter.push('/');
		}
	}
};
</script>
