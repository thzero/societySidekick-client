import { describe, expect, it } from 'vitest';

import router from '@/router';

import SecurityService from '@/service/security';

import { createServices, K, useServices } from '../helpers/services';

// Builds the service through its real init(), the way the boot does, over
// skick's own role model.
const security = async ({ loggedIn = true } = {}) => {
	const services = createServices({ [K.SERVICE_STORE]: { userAuthIsLoggedIn: loggedIn } });
	useServices(services);
	const service = new SecurityService();
	await service.init({ getService: (key) => services[key] ?? null });
	return service;
};

const user = (...roles) => ({ id: 'u1', roles });

describe('AppSecurityService', () => {
	const adminRoles = resolveRoles('/admin');

	// the route has required the admin role since 2026-10-04, but the admin
	// role had no 'admin' operation, so no one could open the admin page
	it('lets an admin into the admin page', async () => {
		expect(await (await security()).authorizationCheckRoles('c', user('user', 'admin'), adminRoles)).toBe(true);
	});

	it('keeps a user out of the admin page', async () => {
		expect(await (await security()).authorizationCheckRoles('c', user('user'), adminRoles)).toBe(false);
	});

	it('keeps someone without roles out of the admin page', async () => {
		expect(await (await security()).authorizationCheckRoles('c', user(), adminRoles)).toBe(false);
	});

	it('gives an admin the user operations too', async () => {
		const service = await security();

		expect(await service.validate('c', 'admin', null, 'character', 'edit')).toBe(true);
		expect(await service.validate('c', 'admin', null, 'scenarios', 'update')).toBe(true);
	});

	it('does not give a user the admin operations', async () => {
		const service = await security();

		expect(await service.validate('c', 'user', null, 'character', 'edit')).toBe(true);
		expect(await service.validate('c', 'user', null, 'scenarios', 'update')).toBe(false);
	});

	it('keeps anyone logged out of the admin area', async () => {
		expect(await (await security({ loggedIn: false })).securityAdmin('c', adminRoles)).toBe(false);
	});
});

function resolveRoles(path) {
	return router.resolve(path).meta.requiresAuthRoles;
}
