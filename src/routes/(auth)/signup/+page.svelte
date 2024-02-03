<script lang="ts">
	import { signUpSchema as schema } from './schema';
	import type { PageData, ActionData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { dev } from '$app/environment';
	import { toast } from 'svelte-sonner';

	export let data: PageData;
	export let form: ActionData;

	$: {
		if (form?.succes === false) {
			toast('Sign up failed', {
				description: form?.message
			});
		}
	}
</script>

<Form.Root class="m-auto max-w-md" method="POST" form={data.form} {schema} let:config debug={dev}>
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
