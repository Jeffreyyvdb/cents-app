<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { downloadImageFromSb, uploadImageToSb } from '$lib/supabase';
	import { generateDefaultAvatarUrl } from '$lib/utils';
	import type { FormOptions } from 'formsnap';
	import { Reload } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { profileFormSchema } from './schema';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let form: SuperValidated<typeof profileFormSchema>;
	export let url: string | null = '';
	export let userId: string = '';

	let loading = false;
	let uploading = false;
	let downloading = false;
	let updateResult;
	let files: FileList | null = null;
	let avatarUrl: string | null = null;

	const options: FormOptions<typeof profileFormSchema> = {
		async onSubmit(input) {
			loading = true;
		},
		onResult: (event) => {
			updateResult = event.result;
			loading = false;

			if (updateResult.type === 'failure') {
				toast('Updating profile failed', {
					description: updateResult?.data?.message
				});
			} else if (updateResult.type === 'success') {
				toast('Profile succesfully updated.');
			}
		}
	};

	const upload = async () => {
		if (!files) {
			throw new Error('There are no files uploaded.');
		}
		uploading = true;
		url = await uploadImageToSb(files, userId);
		uploading = false;
	};

	$: if (url) {
		downloading = true;
		// Cannot use await here.
		downloadImageFromSb(url).then((imageUrl) => (avatarUrl = imageUrl));
		downloading = false;
	}
</script>

<Form.Root
	{form}
	schema={profileFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	debug={dev}
	enctype="multipart/form-data"
	{options}
>
	<div class=" w-full max-w-lg">
		<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
			<div class="h-32 w-32 rounded-full">
				{#if uploading}
					<Skeleton class="h-32 w-32 rounded-full" />
				{:else}
					<img
						src={avatarUrl ?? generateDefaultAvatarUrl(form.data.fullname)}
						alt={avatarUrl ? 'Avatar' : 'No image'}
						class="h-32 w-32 rounded-full border object-cover"
						id="avatar-preview"
					/>
				{/if}
			</div>
		</label>
		<input type="file" id="avatar" accept="image/*" hidden bind:files on:change={upload} />
		<!-- The input that will be sent to the server  -->
		<input type="hidden" name="avatarUrl" value={url} />
	</div>
	<Form.Item>
		<Form.Field {config} name="fullname">
			<Form.Label>Name</Form.Label>
			<Form.Input placeholder="John Doe" />
			<Form.Description>This is your display name.</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Item>
		<Form.Field {config} name="username">
			<Form.Label>Username</Form.Label>
			<Form.Input placeholder="@JohnDoe" />
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="bio">
			<Form.Label>Bio</Form.Label>
			<Form.Textarea
				disabled
				placeholder="Tell us a little bit about yourself"
				class="resize-none"
			/>
			<Form.Description>
				You can <span>@mention</span> other users and organizations to link to them.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="website">
			<Form.Label>Website</Form.Label>
			<Form.Input />
			<Form.Description>Your personal website, blog, or portfolio.</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Button disabled={loading}>
		{#if loading}
			<Reload class="mr-2 h-4 w-4 animate-spin" />
			Please wait
		{:else}
			Update Profile
		{/if}
	</Form.Button>
</Form.Root>
