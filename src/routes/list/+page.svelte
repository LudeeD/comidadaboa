<script>
    import { onMount } from "svelte";
    import pako from "pako";

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

<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>Lista de Compras</h3>
    </header>
    <ul>
        {#each list as item, index}
            <li>
                <label>
                    <input type="checkbox" id={index} />
                    <span class="checkable">{item}</span>
                </label>
            </li>
        {/each}
    </ul>
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
    <footer>
        <button on:click={share}>Partilhar</button>
        <button on:click={clean}>Limpar</button>
    </footer>
</article>
