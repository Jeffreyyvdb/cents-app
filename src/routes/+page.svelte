<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next',
			label: 'Next.js'
		},
		{
			value: 'astro',
			label: 'Astro'
		},
		{
			value: 'nuxt',
			label: 'Nuxt.js'
		}
	];
</script>

<div class="container relative">
	<div class="mt-2">
		<h1 class="text-center text-6xl font-bold">Main portfolio</h1>
		<section class="my-6 flex justify-center gap-4">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-xl">$ 13.379,86</Card.Title>
					<Card.Description class="text-green-500">+$143,75 ^ 1,08% (24h)</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-xl">€ 12.298,37</Card.Title>
					<Card.Description class="text-green-500">+€132,13 ^ 1,08% (24h)</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-xl">₤ 10.490,88</Card.Title>
					<Card.Description class="text-green-500">+₤112,61 ^ 1,08% (24h)</Card.Description>
				</Card.Header>
			</Card.Root>
		</section>
	</div>
</div>
