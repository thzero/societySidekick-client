// A stand-in for a signed-in Firebase user. Firebase restores a signed-in
// user from storage when the app starts and reads the ID token's claims
// locally, without checking its signature; so a user written to localStorage
// before the app loads, plus an answer to Firebase's account lookup, is a
// signed-in user as far as the app can tell. No Google sign-in takes place.

import config from '../src/config/e2e.json' with { type: 'json' };

const firebase = config.external.firebase;

export const storageKey = `firebase:authUser:${firebase.apiKey}:[DEFAULT]`;

const base64url = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');

// An unsigned ID token: Firebase decodes it, and never verifies it client side.
export const idToken = (user) => {
	const now = Math.floor(Date.now() / 1000);
	return [
		base64url({ alg: 'none', typ: 'JWT' }),
		base64url({
			iss: `https://securetoken.google.com/${firebase.projectId}`,
			aud: firebase.projectId,
			auth_time: now,
			iat: now,
			exp: now + 3600,
			sub: user.id,
			user_id: user.id,
			email: user.email,
			name: user.name,
			firebase: { sign_in_provider: 'google.com', identities: {} }
		}),
		'signature'
	].join('.');
};

// What Firebase keeps in storage for a signed-in user (UserImpl.toJSON).
export const persistedUser = (user) => ({
	uid: user.id,
	email: user.email,
	emailVerified: true,
	displayName: user.name,
	isAnonymous: false,
	providerData: [ { providerId: 'google.com', uid: user.id, displayName: user.name, email: user.email, phoneNumber: null, photoURL: null } ],
	stsTokenManager: {
		refreshToken: 'refresh-token',
		accessToken: idToken(user),
		expirationTime: Date.now() + 3600 * 1000
	},
	createdAt: '1700000000000',
	lastLoginAt: '1700000000000',
	apiKey: firebase.apiKey,
	appName: '[DEFAULT]'
});

// Firebase's accounts:lookup answer for the user.
export const lookup = (user) => ({
	kind: 'identitytoolkit#GetAccountInfoResponse',
	users: [ {
		localId: user.id,
		email: user.email,
		displayName: user.name,
		emailVerified: true,
		providerUserInfo: [ { providerId: 'google.com', federatedId: user.id, email: user.email, displayName: user.name, rawId: user.id } ],
		createdAt: '1700000000000',
		lastLoginAt: '1700000000000'
	} ]
});

export const users = {
	admin: { id: 'u-admin', name: 'Ada Admin', email: 'ada@example.com', roles: [ 'admin' ] },
	user: { id: 'u-user', name: 'Uma User', email: 'uma@example.com', roles: [ 'user' ] }
};
