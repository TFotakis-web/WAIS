<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-card>
			<ion-item lines="full">
				<ion-card-title>{{ $t('views.Office.inviteUser.pageTitle') }}</ion-card-title>
			</ion-item>
			<ion-card-content>
				<form @submit.prevent="inviteUser">
					<ion-item>
						<ion-label position="floating">{{ $t('fields.role') }}</ion-label>
						<ion-select v-model="form.role" required interface="popover">
							<ion-select-option v-for="o in roleOptions" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
						</ion-select>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
						<ion-input v-model="form.email" type="email" name="email" autocomplete="email" required/>
					</ion-item>
					<ion-item>
						<ion-label position="floating">{{ $t('fields.permissions') }}</ion-label>
						<ion-select v-model="form.permissions" multiple required>
							<ion-select-option v-for="o in permissionOptions" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
						</ion-select>
					</ion-item>
					<div class="ion-margin-top">
						<loadingBtn type="submit" :loading="loading" :text="$t('actions.invite')" :loadingText="$t('actions.inviting')"/>
					</div>
				</form>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'InviteUser',
		components: {
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
				// const modelPermissions = [];
				const modelPermissions = this.form.permissions;
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
				const pagePermissions = JSON.stringify([]);
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
						this.$router.push({ name: 'Office' });
					})
					.catch(this.$toast.error)
					.finally(() => this.loading = false);
			},
		},
		computed: {
			roleOptions() {
				return [
					{ text: this.$t('fields.roles.employee'), value: 'EMPLOYEE' },
					{ text: this.$t('fields.roles.contractor'), value: 'CONTRACTOR' },
				];
			},
			permissionOptions() {
				return [
					// { text: this.$t('views.homePage.pageTitle'), value: 'AdminHome' },
					// { text: this.$t('components.navigation.navbar-item.notifications'), value: 'AdminNotifications' },
					// { text: this.$t('views.Office.pageTitle'), value: 'Office' },
					// { text: this.$t('views.userProfile.pageTitle'), value: 'UserProfile' },
					// { text: this.$t('views.homePage.pageTitle'), value: 'Home' },
					// { text: this.$t('components.navigation.navbar-item.notifications'), value: 'Notifications' },
					{ text: this.$t('components.navigation.sidenav.pricing.vehicle'), value: 'VehiclePricing' },
					{ text: this.$t('components.navigation.sidenav.pricing.industrialLiability'), value: 'IndustrialLiabilityPricing' },
					{ text: this.$t('components.navigation.sidenav.pricing.fire'), value: 'FirePricing' },
					{ text: this.$t('components.navigation.sidenav.pricing.life'), value: 'LifePricing' },
					{ text: this.$t('components.navigation.sidenav.contracts.file'), value: 'ContractsFile' },
					{ text: this.$t('components.navigation.sidenav.contracts.uncollected'), value: 'UncollectedContracts' },
					{ text: this.$t('components.navigation.sidenav.contracts.collected'), value: 'CollectedContracts' },
					{ text: this.$t('components.navigation.sidenav.contracts.additionalActs'), value: 'ContractAdditionalActs' },
					{ text: this.$t('components.navigation.sidenav.contracts.greenCard'), value: 'GreenCardContracts' },
					{ text: this.$t('components.navigation.sidenav.contracts.unclaimed'), value: 'UnclaimedContracts' },
					{ text: this.$t('components.navigation.sidenav.contracts.invalid'), value: 'InvalidContracts' },
					{ text: this.$t('components.navigation.sidenav.contracts.new'), value: 'NewContract' },
					{ text: this.$t('components.navigation.sidenav.processing.dueDateRegister'), value: 'ProcessingDueDateRegister' },
					{ text: this.$t('components.navigation.sidenav.processing.duePayment'), value: 'ProcessingDuePayment' },
					{ text: this.$t('components.navigation.sidenav.processing.paid'), value: 'ProcessingPaid' },
					{ text: this.$t('components.navigation.sidenav.processing.losses'), value: 'ProcessingLosses' },
					{ text: this.$t('components.navigation.sidenav.accounting.receipts'), value: 'AccountingReceipts' },
					{ text: this.$t('components.navigation.sidenav.accounting.registers'), value: 'AccountingRegisters' },
					{ text: this.$t('components.navigation.sidenav.accounting.todaysIncome'), value: 'AccountingTodaysIncome' },
					{ text: this.$t('components.navigation.sidenav.accounting.commissionsUncollected'), value: 'AccountingCommissionsUncollected' },
					{ text: this.$t('components.navigation.sidenav.accounting.commissionsCollected'), value: 'AccountingCommissionsCollected' },
					{ text: this.$t('components.navigation.sidenav.accounting.mutualAccount'), value: 'AccountingMutualAccount' },
					{ text: this.$t('components.navigation.sidenav.contractors.suppliers'), value: 'SupplierContractors' },
					{ text: this.$t('components.navigation.sidenav.contractors.externalContractors'), value: 'ContractorsExternalContractors' },
					{ text: this.$t('components.navigation.sidenav.cards.vehicleCards'), value: 'VehicleCards' },
					{ text: this.$t('components.navigation.sidenav.cards.customerCards'), value: 'CustomerCards' },
					{ text: this.$t('components.navigation.sidenav.library._groupName'), value: 'Library' },
					{ text: this.$t('components.navigation.navbar-item.wallet'), value: 'Wallet' },
					{ text: this.$t('components.navigation.navbar-item.contract-approval'), value: 'ContractApproval' },
					{ text: this.$t('components.navigation.navbar-item.payment'), value: 'Payment' },
					{ text: this.$t('components.navigation.navbar-item.bank'), value: 'Bank' },
					{ text: this.$t('components.navigation.navbar-item.collaboration'), value: 'Collaboration' },
					// { text: this.$t('components.navigation.navbar-item.devtools'), value: 'DevTools' },
					// { text: this.$t('components.navigation.navbar-item.database'), value: 'PlatformData' },
				];
			},
		},
	};
</script>

