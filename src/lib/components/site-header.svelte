<script lang="ts">
	import MainNav from './nav/main-nav.svelte';
	import MobileNav from './nav/mobile-nav.svelte';
	import { Icons } from './icons';
	import { siteConfig } from '$lib/config/site';
	import { cn } from '$lib/utils';
	import { buttonVariants } from './ui/button';
	import ModeToggle from '$lib/components/move-toggle.svelte';
	import CommandMenu from './command-menu.svelte';
	import { Button } from './ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { enhance, type applyAction } from '$app/forms';
	import type { PageData } from '../../routes/$types';

	import { supabaseClient } from '$lib/supabase';

	export let data: PageData;
</script>

<header
	class=" sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-14 max-w-screen-2xl items-center">
		<MainNav />
		<MobileNav {data} />
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
				{#if data.session}
					<form
						action="/logout"
						method="POST"
						use:enhance={async ({ formElement, formData, action, cancel }) => {
							const { error } = await supabaseClient.auth.signOut();
							if (error) {
								console.log(error);
							}
							cancel();
						}}
					>
						<Button type="submit" variant="ghost" class="hidden md:block">Logout</Button>
					</form>
					<a href="/profile" class=" ml-2 hidden justify-between md:flex">
						<Avatar.Root>
							<Avatar.Image
								src="https://avatars.githubusercontent.com/u/60582071?v=4"
								alt="Profile"
							/>
							<Avatar.Fallback>JB</Avatar.Fallback>
							<span>Jeffrey van den Brink</span>
						</Avatar.Root>
					</a>
				{:else}
					<Button href="/login" variant="ghost" class="hidden md:block">Login</Button>
					<Button href="/signup" variant="ghost" class="hidden md:block">Sign Up</Button>
				{/if}
			</nav>
		</div>
	</div>
</header>
