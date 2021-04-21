<template>
	<ion-grid fixed>
		<ion-row class="mb-5">
			<ion-col>
				<office-info-card/>
			</ion-col>
		</ion-row>
		<ion-row>
			<ion-col>
				<!--				<user-permissions-table-card/>-->
				<user-management-table-card/>
			</ion-col>
		</ion-row>
		<ion-row>
		<ion-col>
			<office-management-table-card/>
		</ion-col>
	</ion-row>
	</ion-grid>
</template>
<script>
	import officeInfoCard from '@/views/office/officeInfoCard';
	// import UserPermissionsTableCard from '@/views/office/userPermissionsTableCard';
	import UserManagementTableCard from '@/views/office/userManagementTableCard';
	import OfficeManagementTableCard from '@/views/office/officeManagementTableCard';

	export default {
		name: 'Office',
		components: {
			officeInfoCard,
			// UserPermissionsTableCard,
			UserManagementTableCard,
			OfficeManagementTableCard,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>

