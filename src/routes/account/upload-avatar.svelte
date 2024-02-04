<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { buttonVariants } from '$lib/components/ui/button';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			const { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div class="flex justify-center">


	{#if uploading || !avatarUrl}
	<div class="avatar no-image" />
	<Avatar.Root class="h-48 w-48">
		<Avatar.Fallback>¢</Avatar.Fallback>
	</Avatar.Root>
	{:else}
	<Avatar.Root class="h-48 w-48">
		<Avatar.Image src={avatarUrl} alt={avatarUrl ? 'Avatar' : 'No image'} />
		<Avatar.Fallback>¢</Avatar.Fallback>
	</Avatar.Root>
	{/if}
	<input type="hidden" name="avatar" value={url} />
</div>

<div class="mt-2 flex justify-center">
	<label class={buttonVariants({ variant: 'default' })} for="single">
		{uploading ? 'Uploading ...' : 'Upload avatar'}
	</label>
	
	<input
		style="visibility: hidden; position:absolute;"
		type="file"
		id="single"
		accept="image/*"
		bind:files
		on:change={uploadAvatar}
		disabled={uploading}
	/>
</div>
