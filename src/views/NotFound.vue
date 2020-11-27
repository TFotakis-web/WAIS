<template>
	<div class="text-center pt-5">
		<h1 class="mb-3">
			<strong>{{ $t('views.error404.header') }}</strong>
		</h1>
		<h4>
			{{ $t('views.error404.message') }}
			<router-link :to="{ name: 'Home' }">{{ $t('views.homePage.pageTitle') }}.</router-link>
		</h4>
	</div>
</template>

<script>
	export default {
		name: 'NotFound',
	};
</script>
