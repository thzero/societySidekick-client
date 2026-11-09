import { users } from './auth.js';
import { character, ok } from './backend.js';
import { expect, open, settled, test } from './fixtures.js';

test.use({ signedIn: users.user });

// Opens the character's edit dialog (the cog's speed dial, then the pencil);
// returns the dialog's card.
const openEdit = async (page) => {
	await open(page, '/character/ch-1');
	await settled(page);
	await page.locator('button:has(.mdi-cog)').first().click();
	await page.locator('button:has(.mdi-pencil)').first().click();

	const dialog = page.locator('.v-overlay--active .v-card', { hasText: 'Tag Line' }).first();
	await expect(dialog).toBeVisible();
	return dialog;
};

const field = (dialog, label) => dialog.locator('.v-field', { hasText: label }).first();
const step = (dialog, name) => dialog.locator('.v-stepper-item', { hasText: name });

const choose = async (page, dialog, label, option) => {
	await field(dialog, label).click();
	await page.getByRole('option', { name: option }).click();
};

test.describe('the character edit dialog', () => {
	test('saves only once something changed', async ({ page }) => {
		const dialog = await openEdit(page);
		const okButton = dialog.getByRole('button', { name: 'Ok' });
		await expect(okButton).toBeDisabled();

		await field(dialog, 'Name').locator('input').fill('Khartan the Tame');

		await expect(okButton).toBeEnabled();
	});

	test('flags no step while everything is valid', async ({ page }) => {
		const dialog = await openEdit(page);

		await expect(dialog.locator('.v-stepper-item--error')).toHaveCount(0);
	});

	test('flags the basic step when the name is cleared', async ({ page }) => {
		const dialog = await openEdit(page);

		await field(dialog, 'Name').locator('input').fill('');

		await expect(step(dialog, 'Basic')).toHaveClass(/v-stepper-item--error/);
		// its vid was 'name', the rule is innerValue.name, so it never showed
		await expect(dialog.locator('.v-input', { has: page.locator('.v-field', { hasText: 'Name' }) }).first()).toContainText('Value is required');
		await expect(dialog.getByRole('button', { name: 'Ok' })).toBeDisabled();
	});

	test('says nothing is required on the character when nothing is missing', async ({ page }) => {
		await open(page, '/character/ch-1');

		await expect(page.getByText('Envoys\' Alliance').first()).toBeVisible();
		await expect(page.locator('.requiredValue').filter({ visible: true })).toHaveCount(0);
	});

	test.describe('for a character with no class or faction', () => {
		test.use({ routes: { 'GET characters/:id': () => ok({ ...character(), classId: null, factionId: null }) } });

		// the class showed as ' / 1' and the faction as an empty cell
		test('says on the character that the class and faction are required', async ({ page }) => {
			await open(page, '/character/ch-1');

			const required = page.locator('.requiredValue').filter({ visible: true });
			await expect(required).toHaveCount(2);
			await expect(required.first()).toContainText('Required');
		});

		test('opens the edit dialog from what is required', async ({ page }) => {
			await open(page, '/character/ch-1');
			await settled(page);

			await page.locator('.requiredValue').filter({ visible: true }).last().click();

			await expect(page.locator('.v-overlay--active .v-card', { hasText: 'Tag Line' }).first()).toBeVisible();
		});

		// class and faction are required, but on the Details step: Ok stayed
		// disabled while the Basic step showed nothing wrong
		test('flags the details step, which keeps Ok disabled', async ({ page }) => {
			const dialog = await openEdit(page);

			await field(dialog, 'Name').locator('input').fill('Khartan the Tame');

			await expect(step(dialog, 'Details')).toHaveClass(/v-stepper-item--error/);
			await expect(step(dialog, 'Basic')).not.toHaveClass(/v-stepper-item--error/);
			await expect(dialog.getByRole('button', { name: 'Ok' })).toBeDisabled();
		});

		test('can save once the class and faction are chosen', async ({ page, backend }) => {
			const dialog = await openEdit(page);
			await field(dialog, 'Name').locator('input').fill('Khartan the Tame');

			await step(dialog, 'Details').click();
			await choose(page, dialog, 'Class', 'Fighter');
			await choose(page, dialog, 'Faction', 'Envoys\' Alliance');

			await expect(step(dialog, 'Details')).not.toHaveClass(/v-stepper-item--error/);
			await dialog.getByRole('button', { name: 'Ok' }).click();

			await expect(dialog).toBeHidden();
			const saved = backend.requests.find((l) => l.method === 'POST' && l.path === 'characters/details/ch-1');
			expect(saved?.body).toMatchObject({ name: 'Khartan the Tame', classId: 'c-fighter', factionId: 'f-envoy' });
			expect(backend.unhandled, 'backend calls with no fixture').toEqual([]);
		});
	});
});
