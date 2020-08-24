<script>
import base from './base';

export default {
	name: 'BaseApp',
	extends: base,
	async created() {
		this.$EventBus.$on('auth-refresh', async (user) => {
			this.logger.debug('BaseApp', 'created', 'auth-refresh', user);
			let items = await this.initialize();
			if (!items)
				return;
			await Promise.all(items);
		});
	},
	async mounted() {
		(async () => {
			let items = await this.initialize();
			if (!items)
				return;
			await Promise.all(items);
			// await Promise.all([
			// 	this.$store.dispatcher.root.initialize(),
			// 	this.$store.dispatcher.characters.initializeCharacters()
			// ])
		})().catch(err => {
			// eslint-disable-next-line
			console.error(err);
		});
	},
	methods: {
		async initialize() {
			return null;
		}
	}
};
</script>

<style>
	.displayLink {
		cursor: pointer;
		text-decoration: underline;
	}
</style>
