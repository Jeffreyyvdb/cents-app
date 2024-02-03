<script lang="ts">
	import { signUpSchema as schema } from './schema';
	import type { PageData, ActionData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { dev } from '$app/environment';
	import { toast } from 'svelte-sonner';
	import { type FormOptions } from 'formsnap';

	export let data: PageData;

	const options: FormOptions<typeof schema> = {
		onResult: ({ result }) => {
			console.log('result', result);
			if (result.type === 'failure') {
				toast('Sign up failed', {
					description: result.data.message
				});
			}
		}
	};
</script>

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
	<Form.Button>Sign Up</Form.Button>
	<!-- <pre>{JSON.stringify(form, null, 2)}</pre> -->
</Form.Root>
