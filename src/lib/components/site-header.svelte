<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ModeToggle from '$lib/components/move-toggle.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { siteConfig } from '$lib/config/site';
	import { downloadImageFromSb } from '$lib/supabase';
	import { cn } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import CommandMenu from './command-menu.svelte';
	import { Icons } from './icons';
	import MainNav from './nav/main-nav.svelte';
	import MobileNav from './nav/mobile-nav.svelte';
	import { Button, buttonVariants } from './ui/button';

	let loading = false;
	let downloadedAvatarUrl = '';

	let { profile, session } = $page.data;
	$: ({ profile, session } = $page.data);

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	$: if (profile?.avatar_url) {
		downloadImageFromSb(profile.avatar_url).then((url) => (downloadedAvatarUrl = url));
	}
</script>

<header
	class=" sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<MainNav />
		<MobileNav />
		<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
			<div class="w-full flex-1 md:w-auto md:flex-none">
				<CommandMenu />
			</div>
			<nav class="flex items-center">
				<a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
					<div
						class={cn(
							buttonVariants({
								size: 'sm',
								variant: 'ghost'
							}),
							'w-9 px-0'
						)}
					>
						<Icons.twitter class="h-3 w-3 fill-current" />
						<span class="sr-only">X (formerly known as Twitter)</span>
					</div>
				</a>
				<ModeToggle />
				<!-- Avatar -->
				{#if session}
					<form method="POST" action="/signout" use:enhance={handleSignOut}>
						<Button type="submit" disabled={loading} variant="ghost" class="hidden md:block"
							>Sign out</Button
						>
					</form>

					<a href="/my/settings/profile" class=" ml-2 hidden justify-between md:flex">
						<Avatar.Root>
							<Avatar.Image
								src={downloadedAvatarUrl ?? 'https://picsum.photos/200'}
								class="object-cover"
								alt="Profile"
							/>
							<Avatar.Fallback>¢</Avatar.Fallback>
						</Avatar.Root>
					</a>
				{:else}
					<Button href="/signin" variant="ghost" class="hidden md:block">Sign in</Button>
					<Button href="/signup" variant="ghost" class="hidden md:block">Sign up</Button>
				{/if}
			</nav>
		</div>
	</div>
</header>
