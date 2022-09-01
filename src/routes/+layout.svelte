<script>
	import "../app.css";
	import "purecss";
</script>

<div id="content">
	<slot />
</div>

<style>
	#content {
		max-width: 800px;
		margin: 0 auto;
	}
	@media (max-width: 48em) {
		#content {
			margin: 0 10px 0 10px;
		}
	}
</style>
