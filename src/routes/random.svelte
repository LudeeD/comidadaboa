<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let max_recipes = 10;

    onMount(async () => {
        let r = Math.floor(Math.random() * (max_recipes - 0 + 1) + 0);
        goto(`/receitas/${r}`);
    });
</script>
