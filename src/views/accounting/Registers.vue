<template>
	<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
</template>
<script>
	export default {
		name: 'AccountingCommissionsCollected',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', this.$t('components.navigation.sidenav.accounting.registers'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
