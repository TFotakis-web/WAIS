<template>
	<div class="text-center pt-5">
		<h1 class="mb-3">
			<strong>{{ $t('error404.header') }}</strong>
		</h1>
		<h4>
			{{ $t('error404.message') }}
			<router-link :to="{ name: 'Home' }">{{ $t('Home page') }}.</router-link>
		</h4>
	</div>
</template>

<script>
	export default {
		name: 'NotFound',
	};
</script>
