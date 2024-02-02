<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { onMount } from 'svelte';

	import dataSet from './market-price.json';

	// Transform "x" values to JavaScript Date objects
	const formattedData = dataSet.values.map((item) => ({
		x: new Date(item.x * 1000), // Assuming the timestamp is in seconds
		y: item.y
	}));

	let options = {
		chart: {
			toolbar: { show: false, tools: { download: false } },
			type: 'area',
			height: 350
		},
		title: {
			text: 'Bitcoin price / last 30 days',
			align: 'left',
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: '24px',
				color: '#213043'
			}
		},

		toolbar: {
			show: false,
			tools: {
				download: false,
				selection: false,
				zoom: false,
				zoomin: false,
				zoomout: false,
				pan: false,
				reset: false
			}
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			x: {
				format: 'dd MMM yyyy'
			},
			fixed: {
				enabled: false,
				position: 'topRight'
			},
			theme: 'dark'
		},
		fill: {
			opacity: 1,
			type: 'gradient'
		},
		colors: ['#22c55e'],
		series: [
			{
				name: 'BTC (USD)',
				data: formattedData
			}
		],
		xaxis: {
			type: 'datetime',
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		}
	};

	let chart: any;

	onMount(async () => {
		const { default: ApexCharts } = await import('apexcharts');

		// Create a new instance of ApexCharts
		chart = new ApexCharts(chart, options);

		// Render the chart
		chart.render();
	});
</script>

<div class="container relative">
	<div class="mt-2">
		<h1 class="text-center text-4xl font-bold md:text-6xl">Main portfolio</h1>
		<section class="my-6 md:flex md:flex-wrap md:justify-center md:gap-4">
			<Card.Root class="mb-2">
				<Card.Header>
					<Card.Title class="text-xl">$ 13.379,86</Card.Title>
					<Card.Description class="text-green-500">+$143,75 ^ 1,08% (24h)</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root class="mb-2">
				<Card.Header>
					<Card.Title class="text-xl">€ 12.298,37</Card.Title>
					<Card.Description class="text-green-500">+€132,13 ^ 1,08% (24h)</Card.Description>
				</Card.Header>
			</Card.Root>

			<Card.Root class="mb-2">
				<Card.Header>
					<Card.Title class="text-xl">₤ 10.490,88</Card.Title>
					<Card.Description class="text-green-500">+₤112,61 ^ 1,08% (24h)</Card.Description>
				</Card.Header>
			</Card.Root>
		</section>
		<section class="justify-center overflow-hidden">
			<div bind:this={chart}></div>
		</section>
	</div>
</div>
