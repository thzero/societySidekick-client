<script>
import baseList from '../baseList';
import VMarkdown from '../../markup/VMarkdown';

export default {
	name: 'BaseAdminNewsListing',
	components: {
		VMarkdown
	},
	extends: baseList,
	computed: {
		news() {
			const news = this.$store.state.adminNews.news;
			return news ? news.slice(0) : [];
		}
	},
	async mounted() {
		await this.$store.dispatcher.adminNews.searchNews(this.correlationId(), {});
	},
	methods: {
		defaultItem() {
			return null;
		},
		async dialogDeletePreCompleteOkDelete(correlationId, dispatcher, id) {
			return await dispatcher.adminNews.deleteAdminNews(correlationId, id);
		},
		initializeHeaders() {
			return [
				{ text: this.$trans.t('news.name'), align: 'left', value: 'title', },
				{ text: this.$trans.t('news.gameSystem'), align: 'left', value: 'gameSystemId' },
				{ text: this.$trans.t('news.article'), align: 'left', sortable: false, value: 'article' },
				{ text: this.$trans.t('news.sticky'), align: 'left', value: 'sticky' },
				{ text: this.$trans.t('news.requiresAuth'), align: 'left', value: 'requiresAuth' },
				{ text: this.$trans.t('news.publishDate'), align: 'left', value: 'timestamp' },
				{ text: this.$trans.t('news.statusName'), align: 'left', value: 'status' },
				{ text: this.$trans.t('news.actions'), align: 'right', value: 'action', sortable: false }
			];
		}
	}
};
</script>
