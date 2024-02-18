<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Icons } from '$lib/components/icons';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sheet from '$lib/components/ui/sheet';
	import { siteConfig } from '$lib/config/site';
	import { downloadImageFromSb } from '$lib/services/supabaseService';
	import { allNav, mainNavItems, sideNav } from '$lib/types/nav';
	import type { SubmitFunction } from '@sveltejs/kit';
	import MobileLink from './mobile-link.svelte';

	let open = false;
	let loading = false;
	let downloadedAvatarUrl = '';

	let { profile, session } = $page.data;
	$: ({ profile, session } = $page.data);

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			open = false;
			loading = false;
			update();
		};
	};

	$: if (profile?.avatar_url) {
		downloadImageFromSb(profile.avatar_url).then((url) => (downloadedAvatarUrl = url));
	}
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
		>
			<Icons.Hamburger class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<MobileLink href={sideNav.Dashboard.href} class="flex items-center" bind:open>
			<Icons.logo class="mr-2 h-4 w-4" />
			<span class="font-title text-2xl">{siteConfig.name}</span>
		</MobileLink>
		<div class="my-4 h-[calc(100vh-8rem)] overflow-auto px-6 pb-10">
			<div class="flex flex-col space-y-3">
				{#if session}
					<a href={allNav.Settings.href} on:click={() => (open = !open)} class="flex-start flex">
						<Avatar.Root>
							<Avatar.Image src={downloadedAvatarUrl} class="object-cover" alt="Account" />
							<Avatar.Fallback>NT</Avatar.Fallback>
						</Avatar.Root>
						<span class="ml-4 leading-[40px]">{profile.full_name}</span>
					</a>

					<form method="POST" action={allNav.SignOut.href} use:enhance={handleSignOut}>
						<Button type="submit" disabled={loading} class="w-full">{allNav.SignOut.title}</Button>
					</form>
				{:else}
					<Button href={allNav.SignIn.href} on:click={() => (open = !open)}
						>{allNav.SignIn.title}</Button
					>
					<Button href={allNav.SignUp.href} variant="secondary" on:click={() => (open = !open)}
						>{allNav.SignUp.title}</Button
					>
				{/if}

				<Separator class="my-4" />

				{#each mainNavItems as navItem, index (navItem + index.toString())}
					{#if navItem.href}
						<MobileLink href={navItem.href} bind:open class="text-foreground">
							{navItem.title}
						</MobileLink>
					{/if}
				{/each}
			</div>
		</div>
	</Sheet.Content>
</Sheet.Root>
