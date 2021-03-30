<template>
	<div style="text-align: center; position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%);">
		<h1>{{ $t('views.error404.header') }}</h1>
		<h4>
			<span>{{ $t('views.error404.message') + ' ' }}</span>
			<router-link :to="{ name: 'Home' }">{{ $t('views.homePage.pageTitle') }}.</router-link>
		</h4>
	</div>
</template>
<script>
	export default {
		name: 'NotFound',
	};
</script>
