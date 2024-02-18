<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import {SiteHeader, SiteFooter} from '$lib/features/navigation';
	import { dev } from '$app/environment';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/services/supabaseService';
	import { invalidateAll } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';

	inject({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Toaster />
<ModeWatcher />

<div class="relative flex min-h-screen flex-col bg-background" id="page" data-vaul-wrapper>
	<SiteHeader />
	<div class="flex-1">
		<div class="container relative">
			<slot />
		</div>
	</div>
	<SiteFooter />
</div>
