<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { type FormOptions } from 'formsnap';
	import { Reload } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import { loginSchema as schema } from './schema';
	import { ExclamationTriangle } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import type { ActionResult } from '@sveltejs/kit';

	export let data: PageData;

	let loginResult: ActionResult;
	let loading = false;

	const options: FormOptions<typeof schema> = {
		onSubmit(input) {
			loading = true;
		},
		onResult: ({ result }) => {
			loginResult = result;
			loading = false;
			if (result.type === 'failure') {
				toast('Login failed', {
					description: result.data.message
				});
			}
		}
	};
</script>

<section class="m-auto max-w-md">
	<h1 class="mb-4 text-center font-title text-4xl leading-none md:text-5xl lg:text-6xl">
		Login to ¢ents
	</h1>
	<Form.Root method="POST" form={data.form} {schema} let:config debug={dev} {options}>
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
		{#if loading}
			<Form.Button disabled class="my-2 w-full">
				<Reload class="mr-2 h-4 w-4 animate-spin" />
				Please wait
			</Form.Button>
		{:else}
			<Form.Button class="my-2 w-full">Login</Form.Button>
		{/if}

		{#if loginResult?.type === 'failure'}
			<Alert.Root variant="destructive">
				<ExclamationTriangle class="h-4 w-4" />
				<Alert.Title>{loginResult?.data?.message}</Alert.Title>
			</Alert.Root>
		{/if}
	</Form.Root>
</section>
