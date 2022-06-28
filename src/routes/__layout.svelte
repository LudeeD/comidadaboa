<script>
	import "../app.css";
</script>

<center>
	<a href="/"><h1 style="margin-bottom: 0px;">== Comida da Boa ==</h1></a>
	<small>por <a href="https://luissilva.eu">Luís Silva</a></small>

	<br />
	<br />
</center>

<div style="max-width: 400px; margin:auto">
	<slot />
</div>

<style>
	a,
	a:hover,
	a:visited,
	a:active {
		color: inherit;
		text-decoration: none;
	}

	h1 {
		font-size: 2em;
	}
</style>
