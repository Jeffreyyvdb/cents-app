<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	export let value = '';
	export let placeholder = '';
	export let id;
	export let label;
	export let type = 'text';
	export let disabled = false;
	export let required = false;
</script>

<div class="mb-2 w-full max-w-lg">
	<label for={id} class="pb-1 font-medium">
    <span class=""></span></label>
</div>
