<script>
    import { onMount } from "svelte";
    import pako from "pako";
    import Nav from "../../components/Nav.svelte";

    let list = [];
    let new_item = "";

    onMount(async () => {
        const storedlist = localStorage.getItem("list") || "[]";
        list = JSON.parse(storedlist);
    });

    const removeFromMenu = (index) => {
        list.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(list));
        list = [...list];
    };

    const share = () => {
        alert("Ainda não está implementado");
        // const state = localStorage.getItem("menu") || "[]";
        // const compressed = pako.deflate(state);
        // console.log(compressed);
        //console.log(btoa(compressed));
    };

    const clean = () => {
        // get the ids of the checked items
        const checked = Array.from(document.querySelectorAll("input:checked"))
            .map((input) => input.id)
            .map((id) => parseInt(id));

        // remove the checked items from the list
        list = list.filter((item, index) => !checked.includes(index));
        localStorage.setItem("list", JSON.stringify(list));

        // uncheck all the checkboxes
        Array.from(document.querySelectorAll("input:checked")).forEach(
            (input) => (input.checked = false)
        );
    };
</script>

<Nav />
<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>Lista de Compras</h3>
    </header>
    <div
        style="display: flex; padding-left: 32px; padding-top: 32px; flex-direction: column"
    >
        {#each list as item, index}
            <label>
                <input type="checkbox" id={index} />
                <span class="checkable">{item}</span>
            </label>
        {/each}
    </div>
    <p />
    <form
        on:submit={() => {
            list = [...list, new_item];
            localStorage.setItem("list", JSON.stringify(list));
            new_item = "";
        }}
    >
        <input
            class="search"
            type="text"
            bind:value={new_item}
            placeholder="Adicionar item..."
        />
    </form>
    {#if list.length > 0}
        <footer style="display: flex; justify-content: space-around ">
            <button class="error" on:click={clean}>Limpar</button>
            <label for="modal_2" class="button">Partilhar</label>
        </footer>
    {/if}
</article>

<div class="modal">
    <input id="modal_2" type="checkbox" />
    <label for="modal_2" class="overlay" />
    <article>
        <header>
            <h3>Great offer</h3>
            <label for="modal_2" class="close">&times;</label>
        </header>
        <section class="content">
            We have a special offer for you. I am sure you will love it! However
            this does look spammy...
        </section>
        <footer>
            <a class="button" href="#">See offer</a>
            <label for="modal_2" class="button dangerous"> Cancel </label>
        </footer>
    </article>
</div>
