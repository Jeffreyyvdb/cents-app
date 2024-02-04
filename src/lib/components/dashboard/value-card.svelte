<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let value: string;
	export let change: string;
</script>

<Card.Root class="mb-2">
	<Card.Header>
		<Card.Title class="text-xl">{value}</Card.Title>
		<Card.Description class="text-green-500">{change}</Card.Description>
	</Card.Header>
</Card.Root>
