<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<h1 class="ion-text-center">{{ username }}</h1>
	</ion-grid>
</template>
<script>
	export default {
		name: 'ManageUser',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.manageUser.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);
		},
		computed: {
			username() {
				return this.$route.params.username;
			},
		},
	};
</script>

