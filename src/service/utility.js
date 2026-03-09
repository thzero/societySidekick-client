import LibraryClientConstants from '@thzero/library_client/constants.js';

import UtilityService from '@thzero/library_client/service/utility';

class AppUtilityService extends UtilityService {
	constructor() {
		super();

		this._serviceStore = null;
	}

	async init(injector) {
		await super.init(injector);

		this._serviceStore = injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);
	}

	// async initialize(correlationId) {
	// 	return this._successResponse(correlationId);
	// 	// TODO: No Backend
	// 	// const response = super.initialize(correlationId);

	// 	// // TODO
	// 	// // (async () => {
	// 	// // 	await this._serviceStore.dispatcher.requestCountries(correlationId);
	// 	// // })();

	// 	// return response;
	// }
}

export default AppUtilityService;
