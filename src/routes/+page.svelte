<script lang="ts">
	import ValueCard from '$lib/components/dashboard/value-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { siteConfig } from '$lib/config/site';
	import { onMount } from 'svelte';
	import dataSet from './market-price.json';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	// Transform "x" values to JavaScript Date objects
	const formattedData = dataSet.values.map((item) => ({
		x: new Date(item.x * 1000), // Assuming the timestamp is in seconds
		y: item.y
	}));

	let options = {
		yaxis: { show: false },
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
				fontSize: '16px',
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

	let transactions = [
		{
			action: 'Buy',
			asset: 'BTC',
			price: 150.0,
			amount: 0.0038
		},
		{
			action: 'Sell',
			asset: 'ETH',
			price: 200.0,
			amount: 0.02
		},
		{
			action: 'Buy',
			asset: 'LTC',
			price: 80.0,
			amount: 0.01
		},
		{
			action: 'Sell',
			asset: 'XRP',
			price: 25.5,
			amount: 50.0
		},
		{
			action: 'Buy',
			asset: 'ADA',
			price: 1.75,
			amount: 100.0
		}
	];

	onMount(async () => {
		const { default: ApexCharts } = await import('apexcharts');

		// Create a new instance of ApexCharts
		chart = new ApexCharts(chart, options);

		// Render the chart
		chart.render();
	});
</script>

<div class="mt-2">
	<h1 class="text-center font-title text-4xl md:text-6xl">{siteConfig.name}</h1>
	<h1 class="text-center text-2xl font-bold capitalize md:text-4xl">Main Wallet</h1>
	<!-- Changes  -->
	<section class="my-2 md:flex md:flex-wrap md:justify-center md:gap-4">
		<ValueCard value="$ 13.379,86" change="+$143,75 ^ 1,08% (24h)" />
		<ValueCard value="€ 12.298,37" change="+€132,13 ^ 1,08% (24h)" />
		<ValueCard value="₤ 10.490,88" change="+₤112,61 ^ 1,08% (24h)" />
	</section>

	<!-- Chart -->
	<section class="my-2 justify-center overflow-hidden">
		<Card.Root class="p-2">
			<div bind:this={chart} class=""></div>
		</Card.Root>
	</section>
	<!-- Recent transactions -->
	<section class="my-2">
		<Card.Root class="p-2">
			<Card.Header>
				<Button>Add transaction</Button>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Caption>A list of your recent transactions.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head class="">Action</Table.Head>
							<Table.Head>Asset</Table.Head>
							<Table.Head>Your price</Table.Head>
							<Table.Head>Amount</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each transactions as tx}
							<Table.Row>
								<Table.Cell class="font-medium">{tx.action}</Table.Cell>
								<Table.Cell>{tx.asset}</Table.Cell>
								<Table.Cell>€{tx.price}</Table.Cell>
								<Table.Cell>{tx.amount}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</section>
</div>
