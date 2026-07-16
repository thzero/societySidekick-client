import fs from 'fs';
import path from 'path';
import { fileURLToPath, URL } from 'node:url'

// Utilities
import { defineConfig } from 'vite'

// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

let configEnv = process.env.NODE_ENV;
console.log('vite.config.NODE_ENV', configEnv);
if (!configEnv)
	configEnv = 'development';
const config = process.env._CONFIG;
console.log('vite.config._CONFIG', config);
if (config) {
	const filename = path.join(__dirname, `./src/config/${configEnv}.json`);
	console.log('vite.config.filename', filename);
	fs.writeFileSync(filename, config);
	const contents = fs.readFileSync(filename, 'utf8');
	console.log('vite.config.file', contents);
}
console.log('vite.config._CONFIG_ENV', configEnv);

// Generate the aggregated open-source manifest from every installed @thzero package
// that ships an openSource.js. Consumed via the 'open-source-config' alias below.
const dir = path.join(__dirname, 'node_modules', '@thzero');
const items = [];
try {
	const dirs = fs.readdirSync(dir);
	console.log('\tOpenSource...');
	for (const item of dirs) {
		try {
			const file = path.join(dir, item, 'openSource.js');
			if (!fs.existsSync(file))
				continue;
			const data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
			items.push(data.replace('export default', ''));
			console.log(`\t${item}...processed.`);
		}
		catch (err) {
			console.log('\t...failed.', err);
		}
	}
}
catch (err) {
	console.log('\t...@thzero node_modules not found yet.', err.message);
}

try {
	const openSourceJs = `/* eslint-disable */\n/* GENERATED FILE - DO NOT EDIT */\nexport function useDependenciesClientBase () { return [ ${items.join(`, `)} ]; }`;
	fs.writeFileSync(path.join(__dirname, 'src', 'openSource.js'), openSourceJs);
} catch (err) {
	console.log(err);
}

// https://vitejs.dev/config/
export default defineConfig({
	optimizeDeps: {
		force: configEnv === 'development'
	},
	plugins: [
		vue(),
		// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
		vuetify({
			autoImport: true,
		}),
	],
	define: { 'process.env': {} },
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'local-config': fileURLToPath(new URL(`./src/config/${configEnv}.json`, import.meta.url)),
			'open-source-config': fileURLToPath(new URL(`./src/openSource.js`, import.meta.url)),
		},
		extensions: [
			'.js',
			'.json',
			'.jsx',
			'.mjs',
			'.ts',
			'.tsx',
			'.vue',
		],
	},
	server: {
		port: 8080,
	},
})
