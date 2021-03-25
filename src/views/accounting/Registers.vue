<template>
	<h1 style="text-align: center; position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%);">{{ $t('various.underConstruction') }}</h1>
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
