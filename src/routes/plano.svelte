<script>
    import { onMount } from "svelte";

    let daysOpen = [false, false, false, false, false, false, false];

    onMount(async () => {
        const d = new Date();
        let day = d.getDay();
        daysOpen[day] = true;
    });
</script>

<details bind:open={daysOpen[1]}>
    <summary>Segunda-Feira</summary>
    <ul>
        <li>demo</li>
        <li>demo</li>
    </ul>
</details>
<details bind:open={daysOpen[2]}>
    <summary>Terça-Feira</summary>
    <ul>
        <li>demo</li>
        <li>demo</li>
    </ul>
</details>
<details bind:open={daysOpen[3]}>
    <summary>Quarta-Feira</summary>
    <ul>
        <li>demo</li>
        <li>demo</li>
    </ul>
</details>
<details bind:open={daysOpen[4]}>
    <summary>Quinta-Feira</summary>
    <ul>
        <li>demo</li>
        <li>demo</li>
    </ul>
</details>
<details bind:open={daysOpen[5]}>
    <summary>Sexta-Feira</summary>
    <ul>
        <li>demo</li>
        <li>demo</li>
    </ul>
</details>
<details bind:open={daysOpen[6]}>
    <summary>Sábado</summary>
    <ul>
        <li>demo</li>
        <li>demo</li>
    </ul>
</details>
<details bind:open={daysOpen[0]}>
    <summary>Domingo</summary>
    <ul>
        <li>demo</li>
        <li>demo</li>
    </ul>
</details>
