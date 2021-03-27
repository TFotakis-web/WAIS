<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-row>
			<ion-col>
				<testing-card/>
			</ion-col>
			<ion-col>
				<dev-options-card/>
			</ion-col>
		</ion-row>
	</ion-grid>
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
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => this.$t('views.devTools.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
<style scoped>
</style>
