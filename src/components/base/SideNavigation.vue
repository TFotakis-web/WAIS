<template>
	<ion-menu content-id="main-content" type="push">
		<ion-content>
			<ion-list id="categories-list">
				<side-navigation-category v-for="routeCategory in sidenav" :key="routeCategory.name" :routeCategory="routeCategory"/>
			</ion-list>
			<ion-list lines="none">
				<ion-item lines="none" class="topLevelRoute">
					<ion-icon slot="start" :icon="$ionicons.moonOutline"></ion-icon>
					<ion-label>Toggle Dark Theme</ion-label>
					<ion-toggle id="themeToggle" slot="end" :checked="colorTheme === 'dark'" @ionChange="toggleTheme"/>
				</ion-item>
				<localeDropdown class="topLevelRoute"/>
				<ion-item lines="none" @click="signOut" button class="topLevelRoute">
					<ion-icon slot="start" :icon="$ionicons.logOutOutline"></ion-icon>
					<ion-label>{{ $t('components.navigation.navbar-item.signOut') }}</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>
<script>
	import SideNavigationCategory from '@/components/base/SideNavigationCategory';
	import localeDropdown from '@/components/structure/localeDropdown';

	import { mapActions } from 'vuex';

	export default {
		name: 'SideNavigation',
		components: {
			SideNavigationCategory,
			localeDropdown,
		},
		data() {
			return {
				shown: false,
				colorTheme: this.$cookies.get('color-theme') || 'light',
			};
		},
		mounted() {
			this.setColorTheme();
		},
		methods: {
			toggleTheme() {
				this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
				this.setColorTheme();
			},
			setColorTheme() {
				document.body.setAttribute('color-theme', this.colorTheme);
				this.$cookies.set('color-theme', this.colorTheme);
			},
			...mapActions('auth', ['signOut']),
		},
		computed: {
			sidenav: function() {
				const allRoutes = [
					{
						name: this.$t('views.homePage.pageTitle'),
						icon: this.$ionicons.homeOutline,
						to: { name: 'AdminHome' },
					},
					{
						name: this.$t('components.navigation.navbar-item.notifications'),
						to: { name: 'AdminNotifications' },
						icon: this.$ionicons.notificationsOutline,
						badge: () => this.$store.getters['request/requestsForMe'].length,
					},

					{
						to: { name: 'Office' },
						thumbnail: this.$store.getters['office/myOffice'].office_logo,
						defaultThumbnail: this.$store.getters['platformData/defaultOfficeLogo'],
						h1: this.$store.getters['office/myOffice'].officeName || this.$t('views.Office.pageTitle'),
						// h1: 'Office Name',
					},

					{
						to: { name: 'UserProfile' },
						thumbnail: this.$store.getters['auth/userProfile'].profilePicture,
						defaultThumbnail: this.$store.getters['platformData/defaultProfilePicture'],
						h2: this.$store.getters['auth/fullName'],
						p: this.$store.getters['auth/username'],
					},

					{
						name: this.$t('views.homePage.pageTitle'),
						icon: this.$ionicons.homeOutline,
						to: { name: 'Home' },
					},
					{
						name: this.$t('components.navigation.navbar-item.notifications'),
						to: { name: 'Notifications' },
						icon: this.$ionicons.notificationsOutline,
						badge: () => this.$store.getters['request/requestsForMe'].length,
					},
					{
						name: this.$t('components.navigation.sidenav.pricing._groupName'),
						icon: this.$ionicons.barChartOutline,
						children: [
							{
								name: this.$t('components.navigation.sidenav.pricing.vehicle'),
								to: { name: 'VehiclePricing' },
							},
							{
								name: this.$t('components.navigation.sidenav.pricing.industrialLiability'),
								to: { name: 'IndustrialLiabilityPricing' },
							},
							{
								name: this.$t('components.navigation.sidenav.pricing.fire'),
								to: { name: 'FirePricing' },
							},
							{
								name: this.$t('components.navigation.sidenav.pricing.life'),
								to: { name: 'LifePricing' },
							},
						],
					},
					{
						name: this.$t('components.navigation.sidenav.contracts._groupName'),
						icon: this.$ionicons.documentTextOutline,
						children: [
							{
								name: this.$t('components.navigation.sidenav.contracts.file'),
								to: { name: 'ContractsFile' },
							},
							{
								name: this.$t('components.navigation.sidenav.contracts.uncollected'),
								to: { name: 'UncollectedContracts' },
							},
							{
								name: this.$t('components.navigation.sidenav.contracts.collected'),
								to: { name: 'CollectedContracts' },
							},
							{
								name: this.$t('components.navigation.sidenav.contracts.additionalActs'),
								to: { name: 'ContractAdditionalActs' },
							},
							{
								name: this.$t('components.navigation.sidenav.contracts.greenCard'),
								to: { name: 'GreenCardContracts' },
							},
							{
								name: this.$t('components.navigation.sidenav.contracts.unclaimed'),
								to: { name: 'UnclaimedContracts' },
							},
							{
								name: this.$t('components.navigation.sidenav.contracts.invalid'),
								to: { name: 'InvalidContracts' },
							},
							{
								name: this.$t('components.navigation.sidenav.contracts.new'),
								to: { name: 'NewContract' },
							},
						],
					},
					{
						name: this.$t('components.navigation.sidenav.processing._groupName'),
						icon: this.$ionicons.listOutline,
						children: [
							{
								name: this.$t('components.navigation.sidenav.processing.dueDateRegister'),
								to: { name: 'ProcessingDueDateRegister' },
							},
							{
								name: this.$t('components.navigation.sidenav.processing.duePayment'),
								to: { name: 'ProcessingDuePayment' },
							},
							{
								name: this.$t('components.navigation.sidenav.processing.paid'),
								to: { name: 'ProcessingPaid' },
							},
							{
								name: this.$t('components.navigation.sidenav.processing.losses'),
								to: { name: 'ProcessingLosses' },
							},
						],
					},
					{
						name: this.$t('components.navigation.sidenav.accounting._groupName'),
						icon: this.$ionicons.cartOutline,
						children: [
							{
								name: this.$t('components.navigation.sidenav.accounting.receipts'),
								to: { name: 'AccountingReceipts' },
							},
							{
								name: this.$t('components.navigation.sidenav.accounting.registers'),
								to: { name: 'AccountingRegisters' },
							},
							{
								name: this.$t('components.navigation.sidenav.accounting.todaysIncome'),
								to: { name: 'AccountingTodaysIncome' },
							},
							{
								name: this.$t('components.navigation.sidenav.accounting.commissionsUncollected'),
								to: { name: 'AccountingCommissionsUncollected' },
							},
							{
								name: this.$t('components.navigation.sidenav.accounting.commissionsCollected'),
								to: { name: 'AccountingCommissionsCollected' },
							},
							{
								name: this.$t('components.navigation.sidenav.accounting.mutualAccount'),
								to: { name: 'AccountingMutualAccount' },
							},
						],
					},
					{
						name: this.$t('components.navigation.sidenav.contractors._groupName'),
						icon: this.$ionicons.peopleOutline,
						children: [
							{
								name: this.$t('components.navigation.sidenav.contractors.suppliers'),
								to: { name: 'SupplierContractors' },
							},
							{
								name: this.$t('components.navigation.sidenav.contractors.externalContractors'),
								to: { name: 'ContractorsExternalContractors' },
							},
						],
					},
					{
						name: this.$t('components.navigation.sidenav.cards._groupName'),
						icon: this.$ionicons.idCardOutline,
						children: [
							{
								name: this.$t('components.navigation.sidenav.cards.vehicleCards'),
								to: { name: 'VehicleCards' },
							},
							{
								name: this.$t('components.navigation.sidenav.cards.customerCards'),
								to: { name: 'CustomerCards' },
							},
						],
					},
					{
						name: this.$t('components.navigation.sidenav.library._groupName'),
						to: { name: 'Library' },
						icon: this.$ionicons.bookOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.wallet'),
						to: { name: 'Wallet' },
						icon: this.$ionicons.walletOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.contract-approval'),
						to: { name: 'ContractApproval' },
						icon: this.$ionicons.bagCheckOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.payment'),
						to: { name: 'Payment' },
						icon: this.$ionicons.cardOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.bank'),
						to: { name: 'Bank' },
						icon: this.$ionicons.briefcaseOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.collaboration'),
						to: { name: 'Collaboration' },
						icon: this.$ionicons.personAddOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.devtools'),
						to: { name: 'DevTools' },
						icon: this.$ionicons.bugOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.database'),
						to: { name: 'PlatformData' },
						icon: this.$ionicons.cogOutline,
					},
				];

				const routes = [];
				for (const category of allRoutes) {
					if (category.children) {
						const children = [];
						for (const child of category.children) {
							const routeName = child.to.name;
							if (this.$router.hasPermissionsByName(routeName)) {
								children.push(child);
							}
						}
						if (children.length) {
							category.children = children;
							routes.push(category);
						}
					} else {
						const routeName = category.to.name;
						if (this.$router.hasPermissionsByName(routeName)) {
							routes.push(category);
						}
					}
				}

				return routes;
			},
		},
	};
</script>
<style lang="scss">
	ion-menu {
		ion-content {
			--padding-start: 8px;
			--padding-end: 8px;
			--padding-top: 20px;
			--padding-bottom: 20px;
			--background: var(--ion-item-background, var(--ion-background-color, #fff));

			ion-list {
				padding: 20px 0;
				border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);

				ion-list-header {
					font-size: 22px;
					font-weight: 600;
					min-height: 20px;
					padding-left: 10px;
				}

				ion-item {
					--padding-start: 10px;
					--padding-end: 10px;
					border-radius: 4px;

					ion-icon {
						color: #616e7e;
					}

				}
			}
		}
	}

	.topLevelRoute ion-label {
		font-weight: 500;
	}
</style>
