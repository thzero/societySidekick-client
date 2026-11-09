import { users } from './auth.js';
import { character, ok } from './backend.js';
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

// Opens the character's new scenario dialog; returns its card.
const openScenario = async (page) => {
	await open(page, '/character/ch-1');
	await settled(page);
	await page.locator('button:has(.mdi-plus)').first().click();

	const dialog = page.locator('.v-overlay--active .v-card', { has: page.locator('.v-stepper') }).first();
	await expect(dialog).toBeVisible();
	return dialog;
};

const field = (dialog, label) => dialog.locator('.v-input', { has: dialog.page().locator('.v-field', { hasText: label }) }).first();
const step = (dialog, name) => dialog.locator('.v-stepper-item', { hasText: name });

test.describe('the new scenario dialog', () => {
	// the Name is readonly, filled from the lookup; readonly hid its validation
	test('marks the scenario name as required until one is selected', async ({ page }) => {
		const dialog = await openScenario(page);

		await expect(field(dialog, 'Name')).toHaveClass(/v-input--error/);
		await expect(step(dialog, 'Scenario')).toHaveClass(/v-stepper-item--error/);

		await dialog.getByRole('button', { name: 'Select' }).click();
		const lookup = page.locator('.v-overlay--active .v-card', { has: page.locator('.vt-form-dialog-body') }).filter({ hasText: 'Breaking the Storm' });
		await lookup.locator('.v-card', { hasText: 'Excising Ruination' }).getByRole('button', { name: 'Select' }).click();

		await expect(field(dialog, 'Name')).not.toHaveClass(/v-input--error/);
		await expect(step(dialog, 'Scenario')).not.toHaveClass(/v-stepper-item--error/);
	});

	test.describe('for a character with no faction', () => {
		test.use({ routes: { 'GET characters/:id': () => ok({ ...character(), factionId: null }) } });

		// its vid named no rule, so the field never said it was required
		test('marks the fame faction as required, and flags the fame step', async ({ page }) => {
			const dialog = await openScenario(page);

			await expect(step(dialog, 'Fame')).toHaveClass(/v-stepper-item--error/);
			await step(dialog, 'Fame').click();

			await expect(field(dialog, 'Fame Faction')).toHaveClass(/v-input--error/);
			await expect(field(dialog, 'Fame Faction')).toContainText('Value is required');
		});
	});

	// required on the server, and nothing in the dialog said so
	test('requires the gold income, and flags the gold step until it is in', async ({ page }) => {
		const dialog = await openScenario(page);

		await expect(step(dialog, 'Gold')).toHaveClass(/v-stepper-item--error/);
		await step(dialog, 'Gold').click();
		const income = field(dialog, 'Gold Income');
		await expect(income).toHaveClass(/v-input--error/);
		await expect(income.locator('label').first()).toHaveText('Gold Income *');

		await income.locator('input').fill('8');

		await expect(income).not.toHaveClass(/v-input--error/);
		await expect(step(dialog, 'Gold')).not.toHaveClass(/v-stepper-item--error/);
	});

	// it starts out filled with the character's faction, so only the label can
	// say it is required
	test('labels the fame faction required even while it is filled in', async ({ page }) => {
		const dialog = await openScenario(page);
		await step(dialog, 'Fame').click();

		await expect(field(dialog, 'Fame Faction').locator('label').first()).toHaveText('Fame Faction *');
		await expect(field(dialog, 'Fame Spent').locator('label').first()).toHaveText('Fame Spent');
	});

	test.describe('when the server rejects the save', () => {
		// as the server's joi validation answers a scenario without a fame faction
		test.use({ routes: { 'POST characters/scenario/:id': () => ({ success: false, errors: [ { message: '"fameFactionId" is required', code: 'fameFactionId', field: 'fameFactionId', type: 'any.required' } ] }) } });

		// the forms had a TODO where the server's messages should have gone, so
		// a rejected save showed nothing but a notification
		test('says why, and stays open', async ({ page, backend }) => {
			const dialog = await openScenario(page);
			await dialog.getByRole('button', { name: 'Select' }).click();
			const lookup = page.locator('.v-overlay--active .v-card', { has: page.locator('.vt-form-dialog-body') }).filter({ hasText: 'Breaking the Storm' });
			await lookup.locator('.v-card', { hasText: 'Excising Ruination' }).getByRole('button', { name: 'Select' }).click();
			await step(dialog, 'Gold').click();
			await field(dialog, 'Gold Income').locator('input').fill('8');

			await dialog.getByRole('button', { name: 'Ok' }).click();

			await expect(dialog.locator('.text-error.v-messages')).toHaveText('Fame Faction is required.');
			await expect(dialog).toBeVisible();
			expect(backend.requests.some((l) => l.method === 'POST' && l.path === 'characters/scenario/ch-1')).toBe(true);
		});
	});

	test('takes the character\'s faction for the fame, so the fame step is fine', async ({ page }) => {
		const dialog = await openScenario(page);

		await expect(step(dialog, 'Fame')).not.toHaveClass(/v-stepper-item--error/);
	});
});

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
