<script>
    export let data;
    let search = "";
</script>

<article class="card" style="margin-left: 4px; margin-right: 4px">
    <header>
        <h3>Receitas</h3>
    </header>
    <ul>
        {#each data.recipes as item, index}
            <li>
                <a href="/recipes/{item.slug}">{item.title}</a>
            </li>
        {/each}
    </ul>
</article>

<!--div class="search_div">
    <input
        class="search"
        type="text"
        bind:value={search}
        placeholder="Pesquisa"
    />
</div-->
