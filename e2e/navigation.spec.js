import { expect, open, settled, test } from './fixtures.js';

// Every public page, with text only that page shows. The fixture fails any
// test whose page throws, so this is also the "nothing crashes" check.
const pages = [
	[ '/', 'Latest News' ],
	[ '/home', 'Latest News' ],
	[ '/openSource', '@thzero/library_client' ],
	[ '/notFound', 'You have been led astray.' ]
];

for (const [ path, text ] of pages) {
	test(`${path} shows its content`, async ({ page, backend }) => {
		await open(page, path);

		await expect(page.getByText(text).first()).toBeVisible();
		expect(backend.unhandled, 'backend calls with no fixture').toEqual([]);
	});
}

test('the home page shows the latest news', async ({ page }) => {
	await open(page, '/');

	await expect(page.getByText('First News')).toBeVisible();
	await expect(page.getByText('Something happened')).toBeVisible();
});

test('an unknown page says so and offers the way home', async ({ page }) => {
	await open(page, '/nowhere/at/all');

	await expect(page.getByText('You have been led astray.')).toBeVisible();
	await page.getByRole('button', { name: 'Home' }).click();
	await expect(page).toHaveURL('/');
});

// the pages that need a login send a visitor home without asking the backend
// for anything of theirs
for (const path of [ '/cards', '/character/ch-1', '/settings', '/support', '/admin' ]) {
	test(`${path} sends a visitor who is not logged in home`, async ({ page, backend }) => {
		await open(page, path);

		await expect(page).toHaveURL('/');
		await settled(page);
		expect(backend.requests.filter((l) => l.path.startsWith('characters/') && l.path !== 'characters/initialize')).toEqual([]);
	});
}

test.describe('a shared link', () => {
	// CharacterList seeded its game system from the visitor's own settings and
	// ignored the page's, so a shared list was always empty
	test('lists the player\'s characters for the game system', async ({ page, backend }) => {
		await open(page, '/characters/g-sharer/pathfinder2e');

		await expect(page.getByText('Sam Sharer')).toBeVisible();
		await expect(page.getByText(/Khartan the Wild/i)).toBeVisible();
		expect(backend.requests.map((l) => l.path)).toContain('characters/listing/gamerId/g-sharer/nFxpKVcCusf4qztVj9CpT5');
	});

	test('to a player who does not exist goes home', async ({ page }) => {
		await open(page, '/characters/nobody/pathfinder2e');

		await expect(page).toHaveURL('/');
	});

	test('to a game system that does not exist goes home', async ({ page, backend }) => {
		await open(page, '/characters/g-sharer/nothing');

		await expect(page).toHaveURL('/');
		await settled(page);
		expect(backend.requests.filter((l) => l.path.startsWith('users/gamerId'))).toEqual([]);
	});
});

for (const [ colorScheme, name ] of [ [ 'dark', 'defaultThemeDark' ], [ 'light', 'defaultTheme' ] ]) {
	test.describe(`in ${colorScheme} mode`, () => {
		test.use({ colorScheme });

		// set through the library's useThemeComponent, with theme.change; the
		// assignment it replaced logged a Vuetify deprecation on every start
		test(`uses ${name}, without Vuetify deprecations`, async ({ page }) => {
			const deprecations = [];
			page.on('console', (message) => {
				if (message.text().includes('[Vuetify UPGRADE]'))
					deprecations.push(message.text());
			});

			await open(page, '/');

			await expect(page.locator(`.v-application.v-theme--${name}`)).toBeVisible();
			expect(deprecations).toEqual([]);
		});
	});
}

test('the footer shows the version', async ({ page }) => {
	await open(page, '/');

	await expect(page.getByText('0.15.41 10/10/2026').first()).toBeVisible();
});

test('reloading a deep link serves the app, not a 404', async ({ page }) => {
	await open(page, '/characters/g-sharer/pathfinder2e');
	await page.reload();

	await expect(page.getByText(/Khartan the Wild/i)).toBeVisible();
});
