<script lang="ts">
	import { signUpSchema as schema } from './schema';
	import type { PageData, ActionData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { dev } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { type FormOptions } from 'formsnap';
	import { Reload } from 'radix-icons-svelte';
	import { ExclamationTriangle } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import type { ActionResult } from '@sveltejs/kit';

	export let data: PageData;
	let signUpResult: ActionResult;

	let loading = false;
	const options: FormOptions<typeof schema> = {
		onSubmit(input) {
			loading = true;
		},
		onResult: ({ result }) => {
			signUpResult = result;
			loading = false;
			if (result.type === 'failure') {
				toast('Sign up failed', {
					description: result.data.message
				});
			}
		}
	};
</script>

<section class="m-auto max-w-md">
	<h1 class="mb-4 text-center font-title text-4xl leading-none md:text-5xl lg:text-6xl">
		Create your <span class="font-title">¢ents</span> account
	</h1>
	<Form.Root
		class="m-auto max-w-md"
		method="POST"
		form={data.form}
		{schema}
		let:config
		debug={dev}
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
		<Form.Field {config} name="confirm">
			<Form.Item>
				<Form.Label>Confirm</Form.Label>
				<Form.Input type="password" />
				<Form.Description>Confirm your password.</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<!-- <pre>{JSON.stringify(signUpResult, null, 2)}</pre> -->

		<Form.Button disabled={loading} class="my-2 w-full">
			{#if loading}
				<Reload class="mr-2 h-4 w-4 animate-spin" />
				Please wait
			{:else}
				Sign up
			{/if}
		</Form.Button>

		{#if signUpResult?.type === 'failure'}
			<Alert.Root variant="destructive">
				<ExclamationTriangle class="h-4 w-4" />
				<Alert.Title>{signUpResult?.data?.message ?? 'Invalid credentials'}</Alert.Title>
			</Alert.Root>
		{/if}
	</Form.Root>
</section>
