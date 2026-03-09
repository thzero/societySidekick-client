<script>
import VtAuth from '@thzero/library_client_vue3_vuetify3/components/VtAuth';

export default {
	name: 'Auth',
	extends: VtAuth,
	setup(props, context) {
		return VtAuth.setup(props, context);
	}
};
</script>
