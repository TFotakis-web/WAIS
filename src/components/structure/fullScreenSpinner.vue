<template>
	<div style="background: #fafafa; width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 100000;">
		<div style=" position: absolute; left: 50%; top: 50%; transform: translate(-32px, -32px); z-index: 100000;">
			<mdb-spinner big/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fullScreenSpinner'
	};
</script>
