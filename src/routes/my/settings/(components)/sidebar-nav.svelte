<script lang="ts">
	import { cn } from '$lib/utils';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	

	const items = [
		{
			title: 'Profile',
			href: '/my/settings/profile'
		},
		{
			title: 'Account',
			href: '/my/settings/account',
			disabled: true
		},
		{
			title: 'Security',
			href: '/my/settings/security',
			disabled: true
		}
	];

	let className: string | undefined | null = undefined;
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});
</script>

<nav class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}>
	{#each items as item}
		{@const isActive = $page.url.pathname === item.href}

		<Button
			href={item.href}
			variant="ghost"
			class={cn(
				!isActive && !item.disabled && 'hover:underline',
				'relative justify-start hover:bg-transparent',
				item.disabled ? 'cursor-default text-gray-400 hover:text-gray-400' : ''
			)}
			data-sveltekit-t
		>
			{#if isActive}
				<div
					class="absolute inset-0 rounded-md bg-muted"
					in:send={{ key: 'active-sidebar-tab' }}
					out:receive={{ key: 'active-sidebar-tab' }}
				/>
			{/if}
			<div class="relative">
				{item.title}
			</div>
		</Button>
	{/each}
</nav>
