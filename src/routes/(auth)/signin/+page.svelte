<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { type FormOptions } from 'formsnap';
	import { Reload } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { signInSchema as schema } from './schema';
	import { ExclamationTriangle } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import type { ActionResult } from '@sveltejs/kit';

	export let data: PageData;

	let signInResult: ActionResult;
	let loading = false;

	const options: FormOptions<typeof schema> = {
		onSubmit(input) {
			loading = true;
		},
		onResult: ({ result }) => {
			signInResult = result;
			loading = false;
			if (result.type === 'failure') {
				toast('Sign in failed', {
					description: result.data.message
				});
			}
		}
	};
</script>

<svelte:head>
	<title>Cents app Sign in</title>
</svelte:head>

<section class="m-auto max-w-md">
	<h1 class="mb-4 text-center font-title text-4xl leading-none md:text-5xl lg:text-6xl">
		Sign in to ¢ents
	</h1>
	<Form.Root
		method="POST"
		form={data.form}
		{schema}
		let:config
		debug={dev}
		action="?/signin"
		{options}
	>
		<Form.Field {config} name="email">
			<Form.Item>
				<Form.Label>Email</Form.Label>
				<Form.Input />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="password">
			<Form.Item>
				<Form.Label>Password</Form.Label>
				<Form.Input type="password" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading} class="my-2 w-full">
			{#if loading}
				<Reload class="mr-2 h-4 w-4 animate-spin" />
				Please wait
			{:else}
				Sign in
			{/if}
		</Form.Button>

		{#if signInResult?.type === 'failure'}
			<Alert.Root variant="destructive">
				<ExclamationTriangle class="h-4 w-4" />
				<Alert.Title>{signInResult?.data?.message ?? 'Invalid credentials'}</Alert.Title>
			</Alert.Root>
		{/if}
	</Form.Root>
</section>
