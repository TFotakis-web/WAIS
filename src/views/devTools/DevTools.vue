<template>
	<div class="text-center pt-5">
		<h1>{{ $t('views.devTools.pageTitle') }}</h1>
		<h5 class="text-info mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container class="text-left">
			<mdb-row>
				<mdb-col>
					<testing-card/>
				</mdb-col>
				<mdb-col>
					<dev-options-card/>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>
<script>
	import TestingCard from '@/views/devTools/testingCard';
	import DevOptionsCard from '@/views/devTools/devOptionsCard';

	export default {
		name: 'DevTools',
		components: {
			TestingCard,
			DevOptionsCard,
		},
	};
</script>
<style scoped>
</style>
