<script>
    import Banner from "$lib/Banner.svelte";
    import { goto } from "$app/navigation";
    import DragDropList from "$lib/DragDropList.svelte";
    import { planning } from "$lib/meal_plan";

    let removesItems = true;
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
        }
    }}>Gerar novo plano 🎲</button
>
<button
    disabled
    on:click={() => {
        goto("/lista");
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
