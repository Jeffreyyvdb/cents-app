<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site';
	import { cn } from '$lib/utils';
	import { Icons } from '$lib/components/icons';
</script>

<div class="mr-4 hidden md:flex">
	<a href="/" class="mr-6 flex items-center space-x-2">
		<Icons.logo class="h-6 w-6" />
		<span class="hidden font-title text-2xl sm:inline-block">
			{siteConfig.name}
		</span>
	</a>
	<nav class="flex items-center gap-6 text-sm">
		<a
			href="/"
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname === '/' ? 'text-foreground' : 'text-foreground/60'
			)}
		>
			Dashboard
		</a>

		<a
			href="/wallets"
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname.startsWith('/wallets') ? 'text-foreground' : 'text-foreground/60'
			)}
		>
			Wallets
		</a>
		<a
			href="/my/settings/profile"
			class={cn(
				'transition-colors hover:text-foreground/80',
				$page.url.pathname.startsWith('/settings') ? 'text-foreground' : 'text-foreground/60'
			)}
		>
			Settings
		</a>
	</nav>
</div>
