<script lang="ts">
	import type { PageData } from './$types';
	import ProfileForm from './profile-form.svelte';
	import { Separator } from '$lib/components/ui/separator';
	export let data: PageData;
</script>

<svelte:head>
	<title>Cents app profile settings</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Profile</h3>
		<p class="text-sm text-muted-foreground">This is how others will see you on the site.</p>
	</div>
	<Separator />
	<ProfileForm form={data.form} url={data.url}  userId={data.userId} />
</div>
