<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import type { ActionData, PageData } from './$types';
	import { loginSchema as schema } from './schema';
	import type { SubmitFunction } from 'formsnap';

	export let data: PageData;
	export let form: ActionData;

	$: {
		if (form?.succes === false) {
			toast('Login failed', {
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
	<Form.Button>Login</Form.Button>
</Form.Root>
