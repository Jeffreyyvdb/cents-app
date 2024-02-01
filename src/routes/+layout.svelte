<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';
</script>

<ModeWatcher />

<div class="relative flex min-h-screen flex-col bg-background" id="page" data-vaul-wrapper>
	<SiteHeader />
	<div class="flex-1">
		<slot />
	</div>
	<SiteFooter />
</div>
