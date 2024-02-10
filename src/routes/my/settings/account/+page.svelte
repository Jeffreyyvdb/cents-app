<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import AccountForm from './account-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Cents app account settings</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Account</h3>
		<p class="text-sm text-muted-foreground">
			Update your account settings. Set your preferred language and timezone. 
		</p>
	</div>
	<Separator />
	<AccountForm data={data.form} />
</div>
