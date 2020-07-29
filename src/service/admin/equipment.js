import AdminService from '@thzero/library_client/service/admin';

class EquipmentAdminService extends AdminService {
	_urlFragment() {
		return 'equipment';
	}
}

export default EquipmentAdminService;
