import { users } from './auth.js';
import { expect, open, settled, test } from './fixtures.js';

test.use({ signedIn: users.user });

// Opens the character, its new scenario dialog, and from that the scenario
// lookup; returns the lookup dialog's card.
const openLookup = async (page) => {
	await open(page, '/character/ch-1');
	await settled(page);
	await page.locator('button:has(.mdi-plus)').first().click();
	await page.getByRole('button', { name: 'Select' }).click();

	const lookup = page.locator('.v-overlay--active .v-card', { has: page.locator('.vt-form-dialog-body') }).filter({ hasText: 'Breaking the Storm' });
	await expect(lookup).toBeVisible();
	return lookup;
};

const box = (locator) => locator.boundingBox();

test.describe('the scenario lookup', () => {
	// VtFormDialog fixed the body's height without letting it scroll, so long
	// scenario descriptions spilled over the title, the filters and Cancel
	test('scrolls its list inside the dialog, under the title and above the buttons', async ({ page }) => {
		const lookup = await openLookup(page);
		const body = lookup.locator('.vt-form-dialog-body');
		// the label's badge; the row around it has padding the body may start in
		const title = lookup.locator(':scope > .v-card-title .v-sheet');
		const actions = lookup.locator(':scope > .v-card-actions');

		const [ titleBox, bodyBox, actionsBox ] = [ await box(title), await box(body), await box(actions) ];
		expect(bodyBox.y).toBeGreaterThanOrEqual(titleBox.y + titleBox.height - 1);
		expect(actionsBox.y).toBeGreaterThanOrEqual(bodyBox.y + bodyBox.height - 1);

		const scroll = await body.evaluate((l) => ({ overflow: getComputedStyle(l).overflowY, scrollHeight: l.scrollHeight, clientHeight: l.clientHeight }));
		expect(scroll.overflow).toBe('auto');
		expect(scroll.scrollHeight).toBeGreaterThan(scroll.clientHeight);
	});

	test('shows its filters at the top of the list', async ({ page }) => {
		const lookup = await openLookup(page);
		const body = await box(lookup.locator('.vt-form-dialog-body'));
		const name = await box(lookup.locator('.v-field', { hasText: 'Name' }).first());

		expect(name.y).toBeGreaterThanOrEqual(body.y);
		expect(name.y + name.height).toBeLessThanOrEqual(body.y + body.height);
	});

	test('leaves out the starting scenario', async ({ page }) => {
		const lookup = await openLookup(page);

		await expect(lookup.getByText('The Whitefang Wyrm')).toBeVisible();
		await expect(lookup.getByText(/^#?Initial$/)).toHaveCount(0);
	});

	test('filters by name', async ({ page }) => {
		const lookup = await openLookup(page);

		await lookup.locator('.v-field', { hasText: 'Name' }).first().locator('input').fill('parting');

		await expect(lookup.getByText('Breaking the Storm: Parting Clouds')).toBeVisible();
		await expect(lookup.getByText('Breaking the Storm: Excising Ruination')).toHaveCount(0);
	});

	test('fills in the scenario it selects', async ({ page }) => {
		const lookup = await openLookup(page);

		await lookup.locator('.v-card', { hasText: 'Excising Ruination' }).getByRole('button', { name: 'Select' }).click();

		await expect(lookup).toBeHidden();
		const name = page.locator('.v-overlay--active .v-field', { hasText: 'Name' }).first().locator('input');
		await expect(name).toHaveValue(/Excising Ruination/);
	});
});
