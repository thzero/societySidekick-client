import AdminService from '@thzero/library/service/admin';

class ClassesAdminService extends AdminService {
	_urlFragment() {
		return 'classes';
	}
}

export default ClassesAdminService;
