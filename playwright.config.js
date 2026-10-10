import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;

export const port = 5181;

export default defineConfig({
	testDir: 'e2e',
	testMatch: '**/*.spec.js',
	fullyParallel: true,
	forbidOnly: CI,
	retries: CI ? 1 : 0,
	workers: CI ? 2 : undefined,
	reporter: CI ? [ [ 'github' ], [ 'html', { open: 'never' } ] ] : [ [ 'list' ] ],
	use: {
		baseURL: `http://localhost:${port}`,
		trace: 'on-first-retry'
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: [ '**/navigation.spec.js' ] }
	],
	// the production build, served as it would be deployed, against
	// src/config/e2e.json; into its own folder, so dist is left alone
	webServer: {
		command: `npx vite build --outDir dist-e2e && npx vite preview --outDir dist-e2e --port ${port} --strictPort`,
		env: { CONFIG_ENV: 'e2e' },
		url: `http://localhost:${port}`,
		reuseExistingServer: !CI,
		timeout: 180000
	}
});
