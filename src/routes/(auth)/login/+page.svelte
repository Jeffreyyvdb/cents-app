<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { loginSchema as schema } from './schema';
	import type { PageData } from './$types';

	export let data: PageData;
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
