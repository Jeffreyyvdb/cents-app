<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
</script>

<ModeWatcher />

<div class="bg-background relative flex min-h-screen flex-col" id="page" data-vaul-drawer-wrapper>
	<!-- <SiteHeader /> -->
	<div class="flex-1">
		<slot />
	</div>
	<!-- <SiteFooter /> -->
</div>
