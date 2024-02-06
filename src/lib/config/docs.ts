import type { NavItem, SidebarNavItem } from '$lib/types/nav';

interface DocsConfig {
	mainNav: NavItem[];
	sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
	mainNav: [
		{
			title: 'Dashboard',
			href: '/'
		},
		{
			title: 'Wallets',
			href: '/wallets'
		},
		{
			title: 'Settings',
			href: '/my/setttings/profile'
		}
	],
	sidebarNav: []
};

type Example = {
	name: string;
	href: string;
	label?: string;
	code: string;
};
export const examples: Example[] = [
	{
		name: 'Dashboard',
		href: '/examples/dashboard',
		code: 'https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/lib/components/docs/dashboard'
	},
	{
		name: 'Cards',
		href: '/examples/cards',
		code: 'https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/cards'
	},
	{
		name: 'Tasks',
		href: '/examples/tasks',
		code: 'https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/tasks'
	},
	{
		name: 'Playground',
		href: '/examples/playground',
		code: 'https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/playground'
	},
	{
		name: 'Forms',
		href: '/examples/forms',
		code: 'https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/forms'
	},
	{
		name: 'Music',
		href: '/examples/music',
		code: 'https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/music'
	},
	{
		name: 'Authentication',
		href: '/examples/authentication',
		code: 'https://github.com/huntabyte/shadcn-svelte/tree/main/apps/www/src/routes/examples/authentication'
	}
];
