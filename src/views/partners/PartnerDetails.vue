<template>
	<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
</template>
<script>
	export default {
		name: 'PartnerDetails',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.partnerDetails.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'Partners' }).fullPath);
		},
	};
</script>
