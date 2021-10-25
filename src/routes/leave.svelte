<script>
	import { goto } from "@sapper/app"
	import { onMount } from "svelte"

	onMount(() => {
		async function redirect() {
			await goto("/");
		}
		redirect();
	})
</script>