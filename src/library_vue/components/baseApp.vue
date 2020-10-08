<script>
import base from './base';

export default {
	name: 'BaseApp',
	extends: base,
	async created() {
		this.$EventBus.$on('auth-refresh', async (user) => {
			const correlationId = this.correlationId();
			this.logger.debug('BaseApp', 'created', 'auth-refresh', user, correlationId);
			let items = await this.initialize(correlationId);
			if (!items)
				return;
			await Promise.all(items);
		});
	},
	async mounted() {
		(async () => {
			const correlationId = this.correlationId();
			let items = await this.initialize(correlationId);
			if (!items)
				return;
			await Promise.all(items);
			// await Promise.all([
			// 	this.$store.dispatcher.root.initialize(correlationId),
			// 	this.$store.dispatcher.characters.initializeCharacters(correlationId)
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
