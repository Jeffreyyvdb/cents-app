<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site';
	import { cn } from '$lib/utils';
	import { Icons } from '$lib/components/icons';
	import { allNav, mainNav } from '$lib/types/nav';
</script>

<div class="mr-4 hidden md:flex">
	<a href={allNav.Dashboard.href} class="mr-6 flex items-center space-x-2">
		<Icons.logo class="h-6 w-6" />
		<span class="hidden font-title text-2xl sm:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">
		<a
			href={mainNav.Dashboard.href}
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname === mainNav.Dashboard.href ? 'text-foreground' : 'text-foreground/60'
			)}
		>
			{mainNav.Dashboard.title}
		</a>

		<a
			href={mainNav.Wallets.href}
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname.startsWith(mainNav.Wallets.href)
					? 'text-foreground'
					: 'text-foreground/60'
			)}
		>
			{mainNav.Wallets.title}
		</a>
		<a
			href={mainNav.Settings.href}
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname.startsWith(mainNav.Settings.href)
					? 'text-foreground'
					: 'text-foreground/60'
			)}
		>
			{mainNav.Settings.title}
		</a>
	</nav>
</div>
