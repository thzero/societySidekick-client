import Vue from 'vue';

import LibraryUtility from '@thzero/library_common/utility';

import {} from '@thzero/library_common/utility/string';

Vue.config.devtools = LibraryUtility.isDev;
Vue.config.productionTip = false;

// eslint-disable-next-line
async function start(app, router, storeRequest, vuetify, bootFiles, starter) {
	let store = null;
	try {
		const obj = new storeRequest();
		store = await obj.execute();
	}
	catch (err) {
		store = storeRequest;
	}

	if (!store)
		throw Error('Unable to create store.');

	if (bootFiles && (bootFiles.length > 0)) {
		let obj;
		for (const bootFile of bootFiles) {
			if (typeof bootFile !== 'function')
				continue;

			try {
				try {
					await bootFile({
						Vue,
						app,
						router,
						store
					});
					continue;
				}
				catch (err) {
					obj = new bootFile();
					await obj.execute(
						Vue,
						app,
						router,
						store
					);
					continue;
				}
			}
			catch (err) {
				if (err && err.url) {
					window.location.href = err.url;
					return;
				}

				// eslint-disable-next-line
				console.error('boot error:', err);
				return;
			}
		}
	}

	Vue.prototype.$navRouter = router;
	Vue.prototype.$store = store;

	const vueApp = {
		el: '#app',
		router,
		store,
		vuetify,
		render: h => h(app)
	};

	if (!starter) {
		new Vue(vueApp).$mount('#app');
		return;
	}

	try {
		const result = starter({
			Vue,
			app,
			router,
			store
		});

		result
			// eslint-disable-next-line
			.then(values => {
				new Vue(vueApp).$mount('#app');
			})
			.catch(err => {
				// eslint-disable-next-line
				console.error('boot error:', err);
			});
	}
	catch (err) {
		if (err && err.url) {
			window.location.href = err.url;
			return;
		}

		// eslint-disable-next-line
		console.error('boot error:', err);
	}
}

export default start;
