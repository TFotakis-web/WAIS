<template>
	<ion-grid fixed>
		<ion-row class="mb-5">
			<ion-col>
				<companyInfoCard/>
			</ion-col>
		</ion-row>
		<ion-row>
			<ion-col>
<!--				<user-permissions-table-card/>-->
				<user-management-table-card/>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script>
	import companyInfoCard from '@/views/office/companyInfoCard';
	// import UserPermissionsTableCard from '@/views/office/userPermissionsTableCard';
	import UserManagementTableCard from '@/views/office/userManagementTableCard';

	export default {
		name: 'Office',
		components: {
			companyInfoCard,
			// UserPermissionsTableCard,
			UserManagementTableCard
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>

