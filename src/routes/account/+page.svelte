<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { type FormOptions } from 'formsnap';
	import { Reload } from 'radix-icons-svelte';
	import type { PageData } from './$types';
	import { updateAccountSchema as schema } from './schema';
	import UploadAvatar from './upload-avatar.svelte';

	export let data: PageData;

	let { form } = data;
	$: ({ form } = data);

	let loading = false;

	const options: FormOptions<typeof schema> = {
		onSubmit(input) {
			loading = true;
		},
		onResult: ({ result }) => {
			loading = false;
		}
	};
</script>

<section class="m-auto max-w-md">
	<h1 class="mb-4 text-center text-4xl font-extrabold leading-none md:text-5xl lg:text-6xl">
		Your account
	</h1>
	<Form.Root class="m-auto max-w-md" method="POST" {form} {schema} {options} let:config debug={dev}>
		<UploadAvatar supabase={data.supabase} bind:url={form.data.avatar} />

		<Form.Field {config} name="displayName">
			<Form.Item>
				<Form.Label>Display name</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="username">
			<Form.Item>
				<Form.Label>Username</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="website">
			<Form.Item>
				<Form.Label>Website</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Button disabled={loading} class="my-2 w-full">
			{#if loading}
				<Reload class="mr-2 h-4 w-4 animate-spin" />
				Please wait
			{:else}
				Update
			{/if}
		</Form.Button>

		<!-- <pre>{JSON.stringify(data.form, null, 2)}</pre> -->
	</Form.Root>
</section>
