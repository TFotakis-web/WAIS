<template>
	<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
</template>
<script>
	export default {
		name: 'AccountingCommissionsCollected',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('components.navigation.sidenav.pricing.life'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
