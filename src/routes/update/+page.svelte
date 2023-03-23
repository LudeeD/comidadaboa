<script>
    import pako from "pako";
    import { onMount } from "svelte";

    let new_data = false;
    let new_menu = [];

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const pk = urlParams.get("pako");
        const raw = atob(pk);
        const y = new Uint8Array(raw.split(","));
        new_menu = JSON.parse(pako.inflate(y, { to: "string" }));
        if (new_menu.length > 0) {
            new_data = true;
        }
    });

    const update = () => {
        localStorage.setItem("menu", JSON.stringify(new_menu));
        new_data = false;
    };
</script>

<h1>Actualizar</h1>

{#if new_data}
    <h2>Novo conteúdo disponível</h2>
    <button on:click={update}>Atualizar</button>
{:else}
    <h2>Está tudo atualizado</h2>
{/if}
