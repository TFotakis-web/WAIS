<template>
	<ion-grid fixed>
		<ion-row class="mb-5">
			<ion-col>
				<office-info-card/>
			</ion-col>
		</ion-row>
		<ion-row>
			<ion-col>
				<employee-management-card/>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script>
	import EmployeeManagementCard from '@/views/office/employeeManagementCard';
	import officeInfoCard from '@/views/office/officeInfoCard';


	export default {
		name: 'Office',
		components: {
			EmployeeManagementCard,
			officeInfoCard,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>

