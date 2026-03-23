export const colResponsive = (xs: number, sm: number, md: number, lg: number, xl: number, xxl: number) => {
	return {
		xs: { span: xs },
		sm: { span: sm },
		md: { span: md },
		lg: { span: lg },
		xl: { span: xl },
		xxl: { span: xxl },
	};
};
export const AppConsts = {
	appBaseUrl: import.meta.env.REACT_APP_APP_BASE_URL,
	remoteServiceBaseUrl: import.meta.env.VITE_API_BASE_URL,
	COLOR_PRIMARY: '#00a76f',

	PAGESIZE: 20,
	PageSizeOptions: ['10', '20', '50', '100', '200', '500'],
	localization: {
		defaultLocalizationSourceName: 'MIGViet',
	},
	Permission: {
		Pages_Tenants: "Pages.Tenants",
		Pages_Users: "Pages.Users",
		Pages_Users_Activation: "Pages.Users.Activation",
		Pages_Roles: "Pages.Roles",
	},
	Granted_Permissions_Const: {
		Pages_Tenants: { name: "Pages.Tenants", display_name: "Pages.Tenants" },
		Pages_Users: { name: "Pages.Users", display_name: "Pages.Users" },
		Pages_Roles: { name: "Pages.Roles", display_name: "Pages.Roles" },
	},
	fontFamily: {
		primary: 'Open Sans Variable',
		secondary: 'Inter Variable',
	},
	fontSize: {
		xs: '12',
		sm: '14',
		default: '16',
		lg: '18',
		xl: '20',
	},
	fontWeight: {
		light: '300',
		normal: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
	},
	lineHeight: {
		none: '1',
		tight: '1.25',
		normal: '1.375',
		relaxed: '1.5',
	},
};