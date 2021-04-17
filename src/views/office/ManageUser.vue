<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-card>
			<ion-item lines="full">
				<ion-avatar slot="start">
					<ion-img :src="user.profilePicture"/>
				</ion-avatar>
				<ion-label>
					<h3>{{ user.fullName }}</h3>
					<p>{{ user.username }} • {{ user.role }}</p>
				</ion-label>
				<ion-badge v-if="user.state === 'pending'" color="warning">Pending</ion-badge>
				<ion-button @click="deleteUser" fill="clear" slot="end" color="danger">
					<ion-icon :icon="$ionicons.trashOutline" slot="start"/>
					<span>{{ $t('actions.delete') }}</span>
				</ion-button>
			</ion-item>
			<ion-card-content>
				<ion-item>
					<ion-label position="floating">{{ $t('fields.permissions') }}</ion-label>
					<ion-select v-model="user.permissions" multiple required>
						<ion-select-option v-for="o in permissionOptions" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
					</ion-select>
				</ion-item>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	export default {
		name: 'ManageUser',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.manageUser.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);

			const i = this.username.split('user')[0];
			this.user = {
				profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
				fullName: `Name${i} Surname${i}`,
				username: this.username,
				role: i % 2 === 0 ? 'Employee' : 'Contractor',
				state: i % 3 === 0 ? 'pending' : undefined,
				permissions: [],
			};
		},
		data() {
			return {
				user: {},
			};
		},
		methods: {
			deleteUser() {
				console.log('Delete user.');
			},
		},
		computed: {
			username() {
				return this.$route.params.username;
			},
			permissionOptions() {
				return [
					{ text: this.$t('views.homePage.pageTitle'), value: 'AdminHome' },
					{ text: this.$t('components.navigation.navbar-item.notifications'), value: 'AdminNotifications' },
					{ text: this.$t('views.Office.pageTitle'), value: 'Office' },
					{ text: this.$t('views.userProfile.pageTitle'), value: 'UserProfile' },
					{ text: this.$t('views.homePage.pageTitle'), value: 'Home' },
					{ text: this.$t('components.navigation.navbar-item.notifications'), value: 'Notifications' },
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

