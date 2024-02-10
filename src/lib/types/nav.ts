import { Icons } from '$lib/components/icons';

export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof Icons;
	label?: string;
};


export const mainNav  = {
	
	['Dashboard']: {
		title: 'Dashboard',
		href: '/'
	},
	['Wallets']: {
		title: 'Wallets',
		href: '/wallets'
	},
	['Settings']: {
		title: 'Settings',
		href: '/my/settings/profile'
	}
};

export const sideNav  = {
	...mainNav,
}

export const allNav = {
	['SignIn']: {
		title: "Sign In",
		href: "/signin"
	},
	['SignUp']: {
		title: "Sign Up",
		href: "/signup"
	},
	['SignOut']: {
		title: "Sign Out",
		href: "/signout"
	},
	['Callback']: {
		title: "Callback",
		href: "/callback"
	},
	...mainNav
}

export const allNavItems = Object.values(allNav);
export const mainNavItems = Object.values(mainNav);
export const sideNavItems = Object.values(sideNav);