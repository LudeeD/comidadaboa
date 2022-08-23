<script>
    import Banner from "$lib/Banner.svelte";
    import { goto } from "$app/navigation";
    import DragDropList from "$lib/DragDropList.svelte";
    import { planning } from "$lib/meal_plan";

    let removesItems = true;

    const getIngredientsForPlan = () => {
        let ids = $planning.map((elem) => elem.id);
        let query = "";
        if (ids.length > 0) {
            query += ids[0];
        }
        if (ids.length > 1) {
            for (let index = 1; index < ids.length; index++) {
                query += "," + ids[index];
            }
        }
        console.log(query);

        goto("/plano/ingredientes?q=" + query);
    };
</script>

<Banner />

<hr />

<button
    on:click={() => {
        if ($planning.length > 0) {
            let yes = confirm(
                "Hey 👋, gerar um novo plano vai apagar o antigo, tens a certeza ?"
            );
            if (yes) {
                $planning = [];
                goto("/plano/novo");
            } else {
                return;
            }
        } else {
            $planning = [];
            goto("/plano/novo");
        }
    }}>Gerar novo plano 🎲</button
>
<button
    on:click={() => {
        getIngredientsForPlan();
    }}>Gerar Lista Compras 🛒</button
>
<button
    disabled
    style="float: right;"
    on:click={() => {
        goto("/lista");
    }}>Partilhar 🔗</button
>

<hr />

{#if $planning.length}
    <small><b>Sugestão:</b> organiza as receitas arrastando as caixinhas</small>
{:else}
    <small>
        <b>Sugestão:</b> clica em gerar plano para teres receitas para toda a semana
    </small>
{/if}
<br />

<br />

<div class="list">
    <DragDropList bind:data={$planning} removesItems={true} />
</div>

<style>
</style>
