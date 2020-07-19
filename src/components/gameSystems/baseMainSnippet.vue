<script>
import baseEdit from '@/components/baseEdit';

export default {
	name: 'BaseMainSnippet',
	extends: baseEdit,
	data: () => ({
		serviceGameSystem: null
	}),
	created() {
		this.initializeServices();
	},
	methods: {
		initializeServices() {
			this.notImplementedError();
		}
	}
};
</script>

<style scoped>
</style>

<style>
</style>
