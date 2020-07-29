import AdminService from '@thzero/library_client/service/admin';

class ScenariosAdminService extends AdminService {
	_urlFragment() {
		return 'scenarios';
	}
}

export default ScenariosAdminService;
