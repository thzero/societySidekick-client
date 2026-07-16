import bootUi from '@thzero/library_client_vue3_vuetify3/boot/ui';
import BaseBoot from '@thzero/library_client/boot/base';

export default class UiBoot extends BaseBoot {
	async execute(framework, router, store, options) {
		options.vuetify = {
			theme: {
				defaultTheme: 'defaultTheme',
				themes: {
				}
			}
		};
		this._initializeThemes(options.vuetify.theme);

		await bootUi({ framework, options });
	}

	_initializeThemes(options) {
		this._initializeThemeAdd(options, 'defaultTheme', this._initializeThemesDefault());
		this._initializeThemeAdd(options, 'defaultThemeDark', this._initializeThemesDefaultDark());
	}

	_initializeThemesDefault() {
		return {
			dark: false,
			colors: {
				primary: '#2196f3',
				'primary-darken-1': '#3700B3',
				secondary: '#03a9f4',
				'secondary-darken-1': '#018786',
				accent: '#00bcd4',
				error: '#B00020',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FB8C00',
			}
		};
	}

	_initializeThemesDefaultDark() {
		return {
			dark: true,
			colors: {
				primary: '#0a6fc2',
				'primary-darken-1': '#3700B3',
				secondary: '#03a9f4',
				'secondary-darken-1': '#018786',
				accent: '#00bcd4',
				error: '#B00020',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FB8C00',
			}
		};
	}

	_initializeThemeAdd(options, name, theme) {
		options.themes[name] = theme;
	}
};
