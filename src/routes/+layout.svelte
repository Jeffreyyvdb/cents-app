<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Navigation from '$lib/components/navigation/navigation.svelte';

</script>

<ModeWatcher />

<div class="relative flex min-h-screen flex-col" id="page" data-vaul-drawer-wrapper>
	<Navigation/>
	<div class="mt-8 md:mt-12">
		<slot />
	</div>
	<!-- <SiteFooter /> -->
</div>
