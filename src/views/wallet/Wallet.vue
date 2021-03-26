<template>
	<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
</template>
<script>
	export default {
		name: 'ContractApproval',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', this.$t('components.navigation.navbar-item.wallet'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
