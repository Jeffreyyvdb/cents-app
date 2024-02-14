<script lang="ts">
	import ValueCard from '$lib/components/dashboard/value-card.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { siteConfig } from '$lib/config/site';
	import { onMount } from 'svelte';
	import { getHistoricalPrices } from '$lib/supabase';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
	let chartIsLoading = true;

	// Transform "x" values to JavaScript Date objects
	// const formattedData = dataSet.values.map((item) => ({
	// 	x: new Date(item.x * 1000), // Assuming the timestamp is in seconds
	// 	y: item.y
	// }));

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

		const januari2008 = new Date(2008, 0, 1);
		const januari2024 = new Date(2024, 0, 1);

		const prices = await getHistoricalPrices('BTC', januari2008, januari2024);

		let options = {
			grid: { show: false },
			fontFamily: 'inherit',
			foreColor: 'inherit',
			width: '100%',
			height: '100%',
			type: 'area',
			sparkline: {
				enabled: true
			},
			yaxis: { show: false },
			chart: {
				animations: { enabled: false },
				toolbar: { show: false, tools: { download: false } },
				type: 'area',
				zoom: { enabled: false }
			},
			dataLabels: {
				enabled: false
			},
			tooltip: {
				x: {
					format: 'dd MMM yyyy'
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
					data: prices?.map((data) => ({ x: data.date, y: data.close }))
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

		chartIsLoading = false;
		// Create a new instance of ApexCharts
		chart = new ApexCharts(chart, options);

		// Render the chart
		chart.render();
	});
</script>

<svelte:head>
	<title>Cent app dashboard</title>
</svelte:head>

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
	<section class="flex items-center justify-center">
		<Card.Root class="w-full flex-col md:w-2/4">
			<div class="aspect-[16/10] w-full">
				<div bind:this={chart} class="h-full w-full flex-auto"></div>
			</div>
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
