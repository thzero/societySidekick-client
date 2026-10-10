import { test as base, expect } from '@playwright/test';

import config from '../src/config/e2e.json' with { type: 'json' };

import { port } from '../playwright.config.js';

import { lookup, persistedUser, storageKey } from './auth.js';
import { defaultRoutes, match, ok } from './backend.js';

const backendUrl = config.backend.find((l) => l.key === 'backend').baseUrl;
const origin = `http://localhost:${port}`;

// Page errors every test fails on unless it opts out. A test pinning a known
// bug lists the messages it expects in `allowedErrors`.
export const test = base.extend({
	colorScheme: 'dark',

	allowedErrors: [ [], { option: true } ],

	// a returning visitor who accepted cookies; the banner covers the bottom
	// of the page. false shows it, as to a new visitor.
	cookieConsent: [ true, { option: true } ],

	// Overrides for the fake backend: { 'POST characters/listing': handler }.
	routes: [ {}, { option: true } ],

	// The signed-in user, as the backend knows them ({ id, name, email, roles },
	// see users in auth.js), or null for a visitor. Firebase is stubbed, not
	// signed into: see auth.js.
	signedIn: [ null, { option: true } ],

	// what the fake backend received, and what it had no route for; automatic,
	// so no test can reach a real backend by forgetting to ask for it
	backend: [ async ({ context, routes, signedIn }, use) => {
		const handlers = {
			...defaultRoutes(),
			// the backend's record of the user who signed in: the Google profile
			// under external, and the roles that decide access
			'POST users/update': ({ body }) => ok({
				id: body.id,
				external: { id: body.id, name: body.name, email: body.email, picture: body.picture },
				roles: signedIn?.roles ?? [],
				settings: { gameSystems: [] }
			}),
			...routes
		};
		// requests: what the backend received; unhandled: backend calls with no
		// route; blocked: outside requests that were refused
		const backend = { requests: [], unhandled: [], blocked: [] };

		// on the context, so a popup (Google sign-in) is caught too
		await context.route('**/*', async (route) => {
			const request = route.request();
			const url = request.url();

			if (url.startsWith(origin))
				return route.continue();

			if (url.startsWith(backendUrl)) {
				const path = url.slice(backendUrl.length).split('?')[0];
				const method = request.method();
				let body = null;
				try {
					body = request.postDataJSON();
				}
				catch {
					body = request.postData();
				}
				backend.requests.push({ method, path, body, headers: request.headers() });

				for (const [ pattern, handler ] of Object.entries(handlers)) {
					const params = match(pattern, method, path);
					if (!params)
						continue;
					const result = await handler({ method, path, params, body });
					const status = result?.status ?? 200;
					const json = result?.status ? result.json : result;
					return route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(json) });
				}

				backend.unhandled.push(`${method} ${path}`);
				return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, results: null }) });
			}

			// Firebase reloads a restored user through accounts:lookup
			if (signedIn && url.includes('identitytoolkit.googleapis.com') && url.includes('accounts:lookup'))
				return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(lookup(signedIn)) });

			// firebase, analytics and anything else outside: never reached
			backend.blocked.push(url.split('?')[0]);
			return route.abort();
		});

		await use(backend);
	}, { auto: true } ],

	page: async ({ page, allowedErrors, cookieConsent, signedIn }, use, testInfo) => {
		const errors = [];
		page.on('pageerror', (err) => errors.push(err.message));
		// Vue catches errors in render functions and computeds and logs them
		// rather than throwing, so watch the console for JS errors too. Fetch
		// failures are the blocked outside requests, not bugs.
		page.on('console', (message) => {
			if (message.type() !== 'error')
				return;
			const text = message.text();
			if (/\b(ReferenceError|TypeError|SyntaxError|RangeError)\b/.test(text) && !text.includes('Failed to fetch'))
				errors.push(text.split('\n')[0]);
		});

		if (cookieConsent)
			await page.addInitScript(() => localStorage.setItem('cookie-comply', 'all'));

		// before the app starts, where Firebase looks for a signed-in user
		if (signedIn) {
			await page.addInitScript(([ key, value ]) => {
				if (!sessionStorage.getItem('e2e-signed-out'))
					localStorage.setItem(key, value);
			}, [ storageKey, JSON.stringify(persistedUser(signedIn)) ]);
		}

		await use(page);

		const unexpected = errors.filter((message) => !allowedErrors.some((allowed) => message.includes(allowed)));
		if (unexpected.length > 0)
			await testInfo.attach('page errors', { body: unexpected.join('\n\n'), contentType: 'text/plain' });
		expect(unexpected, 'uncaught page errors').toEqual([]);
	}
});

// Loads a path and waits for the app shell.
export const open = async (page, path) => {
	await page.goto(path);
	await expect(page.locator('.v-application')).toBeVisible();
};

// Waits until the page has stopped talking to the backend. Every outside
// request is answered or aborted at once, so this is quick; use it before
// asserting a request was NOT made, or that something did not go wrong.
export const settled = (page) => page.waitForLoadState('networkidle');

export { expect };
