<script>
    const foodEmojis = [
        "🍇",
        "🍈",
        "🍉",
        "🍊",
        "🍋",
        "🍌",
        "🍍",
        "🥭",
        "🍎",
        "🍏",
        "🍐",
        "🍒",
        "🍓",
        "🥝",
        "🍅",
        "🥑",
        "🥔",
        "🍠",
        "🥕",
        "🌽",
        "🥒",
        "🥬",
        "🥦",
        "🍄",
        "🥜",
        "🌰",
        "🍞",
        "🥐",
        "🥖",
        "🥨",
        "🥞",
        "🧀",
        "🍖",
        "🍗",
        "🥩",
        "🥓",
        "🍔",
        "🍟",
        "🍕",
        "🌭",
        "🥪",
        "🌮",
        "🌯",
        "🥙",
        "🍱",
        "🍲",
        "🍛",
        "🍜",
        "🍝",
        "🍠",
        "🍢",
        "🍣",
        "🍤",
        "🍥",
        "🥮",
        "🍡",
        "🥟",
        "🥠",
        "🥡",
        "🦪",
        "🍦",
        "🍧",
        "🍨",
        "🍩",
        "🍪",
        "🎂",
        "🍰",
        "🧁",
        "🥧",
        "🍫",
        "🍬",
        "🍭",
        "🍮",
        "🍯",
        "🍼",
        "🥛",
        "☕",
        "🍵",
        "🍶",
        "🍾",
        "🍷",
        "🍸",
        "🍹",
        "🧉",
        "🥤",
        "🧊",
    ];

    let choosenEmoji = "👨‍🍳";

    function randomFoodEmoji() {
        const index = Math.floor(Math.random() * foodEmojis.length);
        choosenEmoji = foodEmojis[index];
    }

    setInterval(randomFoodEmoji, 10000);
</script>

<div style="overflow: hidden;height: 60px;">
    <nav class="navbar">
        <a href="/" class="brand">{choosenEmoji} Comida da Boa</a>

        <input id="bmenub" type="checkbox" class="show" />
        <label for="bmenub" class="burger pseudo button">&#8801;</label>

        <div class="menu">
            <a href="/" class="pseudo button">📜 Receitas</a>
            <a href="/menu" class="pseudo button">📅 Menu Semanal</a>
            <a href="/list" class="pseudo button">🛒 Lista de Compras</a>
        </div>
    </nav>
</div>

<style>
    .navbar {
        background-color: #e3f09b;
    }
</style>
