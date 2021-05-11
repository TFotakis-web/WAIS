<template>
	<ion-grid fixed>
		<ion-card>
			<ion-item lines="full">
				<ion-card-title>{{ $t('views.Office.inviteUser.pageTitle') }}</ion-card-title>
			</ion-item>
			<ion-card-content>
				<form @submit.prevent="inviteUser">
					<ion-input-item v-model="form.email" :config="$inputConfigs.email"/>
					<ion-input-item v-model="form.role" :config="$inputConfigs.role"/>
					<ion-input-item v-model="form.permissions" :config="$inputConfigs.permissions"/>
					<div class="ion-margin-top">
						<loading-btn type="submit" :loading="loading" :text="$t('actions.invite')" :loadingText="$t('actions.inviting')"/>
					</div>
				</form>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import loadingBtn from '@/components/structure/loadingBtn';


	export default {
		name: 'InviteUser',
		components: {
			IonInputItem,
			loadingBtn,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.inviteUser.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);
		},
		data() {
			return {
				form: {
					role: '',
					email: '',
					permissions: [],
				},
				loading: false,
			};
		},
		methods: {
			inviteUser() {
				this.loading = true;
				// const modelPermissions = [
				// 	'OFFICE_INFO_QUERY',
				// 	'OFFICE_INFO_MUTATE',
				// 	'VEHICLES_QUERY',
				// 	'VEHICLES_MUTATE',
				// 	'CONTRACTS_QUERY',
				// 	'CONTRACTS_MUTATE',
				// 	'CUSTOMERS_QUERY',
				// 	'CUSTOMERS_MUTATE',
				// 	'EMPLOYEE_ADD',
				// 	'EMPLOYEE_REMOVE',
				// 	'CONTRACTOR_ADD',
				// 	'CONTRACTOR_REMOVE',
				// 	'OFFICE_CONN_CREATE',
				// 	'OFFICE_CONN_DELETE',
				// ];
				const modelPermissions = [];
				// const pagePermissions = JSON.stringify([
				// 	'VehiclePricing',
				// 	'IndustrialLiabilityPricing',
				// 	'FirePricing',
				// 	'LifePricing',
				// 	'ContractsFile',
				// 	'UncollectedContracts',
				// 	'CollectedContracts',
				// 	'ContractAdditionalActs',
				// 	'GreenCardContracts',
				// 	'UnclaimedContracts',
				// 	'InvalidContracts',
				// 	'NewContract',
				// 	'ProcessingDueDateRegister',
				// 	'ProcessingDuePayment',
				// 	'ProcessingPaid',
				// 	'ProcessingLosses',
				// 	'AccountingReceipts',
				// 	'AccountingRegisters',
				// 	'AccountingTodaysIncome',
				// 	'AccountingCommissionsUncollected',
				// 	'AccountingCommissionsCollected',
				// 	'AccountingMutualAccount',
				// 	'SupplierContractors',
				// 	'ContractorsExternalContractors',
				// 	'VehicleCards',
				// 	'CustomerCards',
				// 	'Library',
				// 	'Wallet',
				// 	'ContractApproval',
				// 	'Payment',
				// 	'Bank',
				// 	'Collaboration',
				// ]);
				// const pagePermissions = JSON.stringify([]);
				const pagePermissions = JSON.stringify(this.form.permissions);
				let payload;
				let action;
				if (this.form.role === 'EMPLOYEE') {
					payload = {
						email: this.form.email,
						empModelPermissions: modelPermissions,
						empPagePermissions: pagePermissions,
					};
					action = 'request/createInviteEmployeeToOfficeRequest';
				} else if (this.form.role === 'CONTRACTOR') {
					payload = {
						email: this.form.email,
						ctrModelPermissions: modelPermissions,
						ctrPagePermissions: pagePermissions,
					};
					action = 'request/createInviteContractorToOfficeRequest';
				} else {
					return;
				}
				this.$store.dispatch(action, payload)
					.then(() => {
						this.$toast.saveSuccess();
						this.$mitt.emit('markInputClean:all');
						this.$router.push({ name: 'Office' });
					})
					.catch(this.$toast.error)
					.finally(() => this.loading = false);
			},
		},
	};
</script>

