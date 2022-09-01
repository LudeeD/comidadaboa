<script>
    import { goto } from "$app/navigation";

    let emogilist = [
        "🥑",
        "🍆",
        "🥕",
        "🥦",
        "🧅",
        "🍄",
        "🍖",
        "🌮",
        "🌯",
        "🍲",
        "🥣",
        "🥗",
        "🍤",
        "🥦",
    ];

    const randomEmogi = emogilist[Math.floor(Math.random() * emogilist.length)];
    const randomEmogi2 =
        emogilist[Math.floor(Math.random() * emogilist.length)];
</script>

<center on:click={() => goto("/")}>
    <h1 style="margin-bottom: 2px;">
        {randomEmogi2} Comida da Boa {randomEmogi}
    </h1>
    <p style="margin-top: 2px;">
        feito com ❤ por <a href="https://luissilva.eu">Luís Silva</a>
    </p>
</center>

<style>
    h1 {
        font-size: 3em;
        font-weight: 900;
    }
    @media (max-width: 48em) {
        h1 {
            font-size: 1.8em;
            font-weight: 700;
        }
    }
</style>
