<script context="module">
    export async function load({ fetch }) {
        const response = await fetch("/api/recent");
        const recipes = await response.json();

        if (response.ok) {
            let ret = {
                props: {
                    recipes: recipes["recipes"],
                },
            };
            return ret;
        }

        return {
            status: response.status,
            error: new Error("Could not fetch the guide"),
        };
    }
</script>

<script>
    export let recipes;

    import ButtonRandom from "$lib/ButtonRandom.svelte";

    import { goto } from "$app/navigation";

    let gotoinfo = () => {
        goto("/info");
    };
</script>

<svelte:head>
    <title>Página Inicial</title>
</svelte:head>

<center>
    <ButtonRandom text={"Ideias para hoje? 👨‍🍳"} />
</center>

<h3>Receitas Novas</h3>
{#each recipes as name}
    <p>- {name}</p>
{/each}

<br />
<br />
<hr />

<button>Receitas 📚</button>
<button>Planear 📜</button>
<button style="float: right;" on:click={gotoinfo}>Informações ℹ️</button>

<style>
</style>
