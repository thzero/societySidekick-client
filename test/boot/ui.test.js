import { describe, expect, it } from 'vitest';

import UiBoot from '@/boot/ui';

const themes = () => {
	const options = { themes: {} };
	new UiBoot()._initializeThemes(options);
	return options.themes;
};

describe('UiBoot themes', () => {
	it('registers a light and a dark variant of the theme', () => {
		expect(Object.keys(themes()).sort()).toEqual([ 'defaultTheme', 'defaultThemeDark' ]);
	});

	it.each([
		[ 'defaultTheme', false ],
		[ 'defaultThemeDark', true ]
	])('%s has dark set to %s', (name, dark) => {
		expect(themes()[name].dark).toBe(dark);
	});

	// appBase picks a theme by appending 'Dark' to the user's theme, so every
	// theme needs its Dark twin
	it('has a Dark twin for every light theme', () => {
		const all = themes();
		for (const name of Object.keys(all).filter((l) => !l.endsWith('Dark')))
			expect(all[`${name}Dark`], name).toBeTruthy();
	});

	it('gives every theme the colors Vuetify components use', () => {
		for (const [ name, theme ] of Object.entries(themes())) {
			for (const color of [ 'primary', 'secondary', 'accent', 'error', 'info', 'success', 'warning' ])
				expect(theme.colors[color], `${name}.${color}`).toMatch(/^#[0-9a-fA-F]{6}$/);
		}
	});
});
