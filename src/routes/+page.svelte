<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';

	let chart;
	var options = {
		series: [
			{
				name: 'Desktops',
				data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
			}
		],
		chart: {
			toolbar: { show: false, tools: { download: false } },
			height: 350,
			type: 'line',
			zoom: {
				enabled: false
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'straight'
		},
		title: {
			text: 'Product Trends by Month',
			align: 'left'
		},
		grid: {},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
		},

		tooltip: {
			theme: 'dark'
		}
	};

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

	onMount(async () => {
		// Dynamically import ApexCharts
		const { default: ApexCharts } = await import('apexcharts');

		// Create a new instance of ApexCharts
		chart = new ApexCharts(document.querySelector('#chart'), options);

		// Render the chart
		chart.render();
	});
</script>

<div class="container relative">
	<div class="mt-2">
		<h1 class="text-center text-6xl font-bold">Main portfolio</h1>
		<section class="my-6 flex flex-wrap justify-center gap-4">
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
		<section class="justify-center">
			<div id="chart"></div>
		</section>
	</div>
</div>
