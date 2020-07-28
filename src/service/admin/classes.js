import AdminService from '@thzero/library_client/service/admin';

class ClassesAdminService extends AdminService {
	_urlFragment() {
		return 'classes';
	}
}

export default ClassesAdminService;
