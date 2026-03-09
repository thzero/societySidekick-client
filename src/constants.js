const Constants = {
	InjectorKeys: {
	},
	ErrorCodes: {
		DuplicateName: 'duplicateName',
		DuplicateNumber: 'duplicateNumber',
		DuplicateOrder: 'duplicateOrder',
		InvalidObject: 'invalidObject',
		InvalidPermissions: 'invalidPermissions',
		ObjectChanged: 'objectChanged',
		QuotaReached: 'quotaExceeded'
	},
	ErrorFields: {
		Generic: 'generic',
		Name: 'name',
		Number: 'number',
		Order: 'order'
	},
	IdGenerator: {
		alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		lengthLong: null,
		lengthShort: null
	},
	Licenses: {
		Free: {
			apache20: {
				id: 'apache-2.0',
				name: 'Apache 2.0',
				url: 'https://apache.org/licenses/LICENSE-2.0'
			},
			ccBy: {
				id: 'cc-by',
				name: 'Creative Commons Attribution 4.0',
				icon: 'https://i.creativecommons.org/l/by/4.0/88x31.png',
				image: '<a rel="license" target="_blank" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>',
				url: 'https://creativecommons.org/licenses/by/4.0/legalcode'
			},
			ccByNc: {
				id: 'cc-by-nc',
				name: 'Creative Commons Attribution-NonCommercial 4.0',
				icon: 'https://i.creativecommons.org/l/by-nc/4.0/88x31.png',
				image: '<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>',
				url: 'https://creativecommons.org/licenses/by-nc/4.0/legalcode'
			},
			ccByNcSa: {
				id: 'cc-by-nc-sa',
				name: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0',
				icon: 'https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png',
				image: '<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>',
				url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode'
			},
			ccBySa: {
				id: 'cc-by-sa',
				name: 'Creative Commons Attribution-ShareAlike 4.0',
				icon: 'https://i.creativecommons.org/l/by-sa/4.0/88x31.png',
				image: '<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>',
				url: 'https://creativecommons.org/licenses/by-sa/4.0/legalcode'
			},
			bsd2Clause: {
				id: 'bsd-2-clause',
				name: 'BSD 2-clause "Simplified"',
				url: 'https://choosealicense.com/licenses/bsd-2-clause'
			},
			bsd3Clause: {
				id: 'bsd-3-clause',
				name: 'BSD 3-clause "New" or "Revised"',
				url: 'https://choosealicense.com/licenses/bsd-3-clause'
			},
			isc: {
				id: 'isc',
				name: 'ISC',
				url: 'https://choosealicense.com/licenses/isc/'
			},
			mit: {
				id: 'mit',
				name: 'MIT',
				image: '<a rel="license" target="_blank" href="https://mit-license.org"><img alt="MIT License" style="border-width:0" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/License_icon-mit-88x31-2.svg" /></a><br />This work is licensed under the <a rel="license" href="https://mit-license.org">MIT License</a>',
				url: 'https://mit-license.org'
			}
		},
		Public: {
			pd: {
				id: 'pd',
				name: 'Public Domain'
			}
		}
	},
	NewsTypes: {
		ADMIN: 'admin',
		MAIN: 'main'
	},
	Roles: {
		Admin: 'admin',
		User: 'user'
	},
	Site: {
		emails: {
			contributing: "info@thzero.com",
			inquiry: "info@thzero.com"
		}
	},
	Stores: { // TODO: Config driven...
		Gaming: 'gaming'
	}
};

export default Constants;
