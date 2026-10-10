import { users } from './auth.js';
import { expect, open, settled, test } from './fixtures.js';

test.describe('a signed-in player', () => {
	test.use({ signedIn: users.user });

	test('sees their name on the home page', async ({ page }) => {
		await open(page, '/');

		await expect(page.getByText('Uma User')).toBeVisible();
	});

	test('lists their characters once a game system is picked', async ({ page, backend }) => {
		await open(page, '/');
		await expect(page.getByText('Uma User')).toBeVisible();

		await page.locator('.v-field', { hasText: 'Game System' }).first().click();
		await page.getByRole('option', { name: 'Pathfinder 2e' }).click();

		await expect(page.getByText(/Khartan the Wild/i)).toBeVisible();
		expect(backend.unhandled, 'backend calls with no fixture').toEqual([]);
	});

	test('opens a character with its totals and scenarios', async ({ page, backend }) => {
		await open(page, '/character/ch-1');

		await expect(page.getByText(/Khartan the Wild/i)).toBeVisible();
		await expect(page.getByText('Envoys\' Alliance').first()).toBeVisible();
		await expect(page.getByText('0) Initial')).toBeVisible();
		await expect(page.getByText('The Absalom Initiation')).toBeVisible();
		expect(backend.unhandled, 'backend calls with no fixture').toEqual([]);
	});

	test('opens their settings', async ({ page }) => {
		await open(page, '/settings');

		await expect(page.getByText('Gamer Tag').filter({ visible: true }).first()).toBeVisible();
	});

	// the route requires the admin role
	test('is kept out of the admin page', async ({ page, backend }) => {
		await open(page, '/admin');

		await expect(page).toHaveURL('/');
		await settled(page);
		expect(backend.requests.filter((l) => l.path.startsWith('admin/'))).toEqual([]);
	});
});

test.describe('a signed-in admin', () => {
	test.use({ signedIn: users.admin });

	// the route has required the admin role since 2026-10-04, and the admin role
	// lacked the 'admin' operation, so no one could open it
	test('opens the admin page', async ({ page, backend }) => {
		await open(page, '/admin');

		await expect(page).toHaveURL('/admin');
		await expect(page.getByText('No news available...')).toBeVisible();
		expect(backend.requests.map((l) => l.path)).toContain('admin/news/search');
		expect(backend.unhandled, 'backend calls with no fixture').toEqual([]);
	});

	for (const tab of [ 'Boons', 'Classes', 'Equipment', 'Factions', 'Scenarios', 'Users' ]) {
		test(`opens the ${tab} admin tab`, async ({ page, backend }) => {
			await open(page, '/admin');
			await expect(page.getByText('No news available...')).toBeVisible();

			await page.getByRole('tab', { name: tab }).first().click();
			await settled(page);

			expect(backend.unhandled, 'backend calls with no fixture').toEqual([]);
		});
	}
});
