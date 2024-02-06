<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { profileFormSchema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { toast } from 'svelte-sonner';
	import { Reload } from 'radix-icons-svelte';

	export let data: SuperValidated<typeof profileFormSchema>;
	let loading = false;
	let updateResult;

	const options: FormOptions<typeof profileFormSchema> = {
		onSubmit(input) {
			loading = true;
		},
		onResult: ({ result }) => {
			updateResult = result;
			loading = false;

			console.log(updateResult);
			if (result.type === 'failure') {
				toast('Updating profile failed', {
					description: result.data.message
				});
			} else if (result.type === 'success') {
				toast('Profile succesfully updated.');
			}
		}
	};

	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;

		if (!target.files) {
			return;
		}

		if (target.files.length > 0) {
			const src = URL.createObjectURL(target.files[0]);
			// Cant we do this with binding?
			const preview = document.getElementById('avatar-preview') as HTMLImageElement;
			preview.src = src;
		}
	};
</script>

<Form.Root
	form={data}
	schema={profileFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	debug={true}
	enctype="multipart/form-data"
	{options}
>
	<div class=" w-full max-w-lg">
		<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
			<!-- Add an pencil for editing? -->
			<!-- <label for="avatar" class="absolute -right-0.5 bottom-0.5 hover:cursor-pointer">
			<span><Icon src={Pencil} class="h-4 w-4" /></span>
		</label> -->
			<div class="w-32 rounded-full border">
				<!-- How to show fixed size an shape of picture -->
				<img
					src="https://picsum.photos/200"
					class="w-32 rounded-full border"
					alt="user avatar"
					id="avatar-preview"
				/>
			</div>
		</label>
		<input
			type="file"
			name="avatar"
			id="avatar"
			value=""
			accept="image/*"
			hidden
			on:change={showPreview}
		/>
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
