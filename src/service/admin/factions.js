import AdminService from '@thzero/library_client/service/admin';

class FactionsAdminService extends AdminService {
	_urlFragment() {
		return 'factions';
	}
}

export default FactionsAdminService;
