<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-row class="mb-5">
			<ion-col>
				<companyInfoCard/>
			</ion-col>
		</ion-row>
		<ion-row>
			<ion-col>
				<user-permissions-table-card/>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script>
	import companyInfoCard from '@/views/office/companyInfoCard';
	import UserPermissionsTableCard from '@/views/office/userPermissionsTableCard';

	export default {
		name: 'Office',
		components: {
			UserPermissionsTableCard,
			companyInfoCard,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>

