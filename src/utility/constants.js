const Constants = {
	DateTime: {
		DEFAULT_DATE_FORMAT: 'MM/DD/YYYY',
		DEFAULT_TIME_FORMAT: 'HH:mm'
	},
	Features: {
		Auth: true,
		CookieComply: true,
		Home: {
			additional: false,
			additionalId: null
		},
		MobileAppLanding: false,
		MobileOnly: false,
		Favorites: true,
		Gaming: false,
		Github: true,
		RememberMe: false,
		Statistics: false
	},
	InjectorKeys: {
		SERVICE_API: 'serviceApi',
	},
	Overlay: {
		Timeout: 5000
	}
};

export default Constants;
