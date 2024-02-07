<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { supabaseClient } from '$lib/supabase';
	import type { FormOptions } from 'formsnap';
	import { Reload } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { profileFormSchema } from './schema';
	import { generateDefaultAvatarUrl } from '$lib/utils';
	import { fullname } from '$lib/stores';

	export let form: SuperValidated<typeof profileFormSchema>;
	export let url: string | null = '';
	export let userId: string = '';

	let loading = false;
	let updateResult;
	const dispatch = createEventDispatcher();
	let files: FileList | null = null;
	let uploading = false;
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
				// also update the user store to reflect changes to name/avatar in the navigation
				let newName = updateResult?.data?.form?.data?.fullname;
				fullname.set(newName);
			}
		}
	};

	const uploadImage = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload');
			}

			// Generate name with userId and file extension
			const fileExt = files[0].name.split('.').pop();
			const filePath = `avatars/${userId}/${Math.random()}.${fileExt}`;

			const { error } = await supabaseClient.storage
				.from('avatars')
				.upload(filePath, files[0], { upsert: true });

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

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabaseClient.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			avatarUrl = URL.createObjectURL(data);
		} catch (error) {
			console.error('Error downloading avatar', error);
		}
	};

	$: if (url) {
		downloadImage(url);
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
			<!-- Add an pencil for editing? -->
			<!-- <label for="avatar" class="absolute -right-0.5 bottom-0.5 hover:cursor-pointer">
			<span><Icon src={Pencil} class="h-4 w-4" /></span>
		</label> -->
			<div class="h-32 w-32 rounded-full border">
				<img
					src={avatarUrl ?? generateDefaultAvatarUrl(form.data.fullname)}
					alt={avatarUrl ? 'Avatar' : 'No image'}
					class="h-32 w-32 rounded-full border object-cover"
					id="avatar-preview"
				/>
				<!-- How to show fixed size an shape of picture -->
			</div>
		</label>

		<input type="file" id="avatar" accept="image/*" hidden bind:files on:change={uploadImage} />

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
	<!-- <Form.Item>
		<Form.Field {config} name="email">
			<Form.Label>Email</Form.Label>
			<Form.Select disabled>
				<Form.SelectTrigger placeholder="Select a verified email to display" />
				<Form.SelectContent>
					<Form.SelectItem value="m@example.com" label="m@example.com"
						>m@example.com
					</Form.SelectItem>
					<Form.SelectItem value="m@google.com" label="m@google.com">m@google.com</Form.SelectItem>
					<Form.SelectItem value="m@support.com" label="m@support.com"
						>m@support.com
					</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Description>
				You can manage verified email addresses in your <a href="/examples/forms">email settings</a
				>.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item> -->
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
