<script lang="ts">
	import WalletForm from './wallet-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Cents app wallets</title>
</svelte:head>

<h1>Wallets</h1>

<WalletForm form={data.form} />
