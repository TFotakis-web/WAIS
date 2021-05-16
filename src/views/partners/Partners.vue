<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<partner-management-card/>
	</ion-grid>
</template>
<script>
	import PartnerManagementCard from '@/views/partners/partnerManagementCard';


	export default {
		name: 'Partners',
		components: { PartnerManagementCard },
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.partners.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
