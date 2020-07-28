import AdminService from '@thzero/library_client/service/admin';

class BoonsAdminService extends AdminService {
	_urlFragment() {
		return 'boons';
	}
}

export default BoonsAdminService;
