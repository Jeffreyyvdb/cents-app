<script lang="ts">
	export let data;
</script>

<div class="container relative">
	<ul>
		{#each data.countries as country}
			<li>{country.name}</li>
		{/each}
	</ul>
</div>
