<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import type { FormOptions } from 'formsnap';
	import { Reload } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { walletFormSchema } from './walletSchema';

	export let form: SuperValidated<typeof walletFormSchema>;

	let loading = false;
	let updateResult;

	const options: FormOptions<typeof walletFormSchema> = {
		async onSubmit(input) {
			loading = true;
		},
		onResult: (event) => {
			updateResult = event.result;
			loading = false;

			if (updateResult.type === 'failure') {
				toast('Creating wallet failed.', {
					description: updateResult?.data?.message
				});
			} else if (updateResult.type === 'success') {
				toast('Wallet succesfully created.');
			}
		}
	};
</script>

<Form.Root
	{form}
	schema={walletFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	action="?/create"
	debug={dev}
	><Form.Item>
		<Form.Field {config} name="name">
			<Form.Label>Name</Form.Label>
			<Form.Input placeholder="Bitcoin wallet" />
			<Form.Description>This is the name of your wallet.</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>

	<Form.Button disabled={loading}>
		{#if loading}
			<Reload class="mr-2 h-4 w-4 animate-spin" />
			Please wait
		{:else}
			Create wallet
		{/if}
	</Form.Button>
</Form.Root>
