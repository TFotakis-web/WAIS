<template>
	<ion-menu content-id="main-content" type="overlay">
		<ion-content>
			<ion-list>
				<ion-item :router-link="{name: 'Trade'}" button>
					<ion-thumbnail slot="start">
						<ion-img src="https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg"/>
					</ion-thumbnail>
					<ion-label>
						<!-- Todo: Replace with real trade name -->
						<h1>Trade Name</h1>
					</ion-label>
				</ion-item>
				<ion-item :router-link="{name: 'UserProfile'}" button>
					<ion-thumbnail slot="start">
						<ion-img src="https://www.w3schools.com/howto/img_avatar.png"/>
					</ion-thumbnail>
					<ion-label>
						<h2>{{ $store.getters['auth/fullName'] }}</h2>
						<p>{{ $store.getters['auth/username'] }}</p>
					</ion-label>
				</ion-item>
			</ion-list>
			<ion-list id="categories-list">
				<side-navigation-category v-for="routeCategory in sidenav" :key="routeCategory.name" :routeCategory="routeCategory"/>
			</ion-list>
			<ion-list>
				<ion-item lines="full" class="topLevelRoute">
					<ion-icon slot="start" :icon="ionicons.moonOutline"></ion-icon>
					<ion-label>Toggle Dark Theme</ion-label>
					<ion-toggle id="themeToggle" slot="end" :checked="colorTheme === 'dark'" @ionChange="toggleTheme"/>
				</ion-item>
				<localeDropdown class="topLevelRoute"/>
				<ion-item lines="full" @click="signOut" button class="topLevelRoute">
					<ion-icon slot="start" :icon="ionicons.logOutOutline"></ion-icon>
					<ion-label>{{ $t('components.navigation.navbar-item.signOut') }}</ion-label>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>
<script>
	import {
		IonContent,
		IonIcon,
		IonItem,
		IonLabel,
		IonList,
		IonMenu,
		IonToggle,
		IonThumbnail,
		IonImg,
	} from '@ionic/vue';
	import {
		chevronForwardOutline,
		chevronDownOutline,
		moonOutline,
		logOutOutline,
		languageOutline,
		barChartOutline,
		documentTextOutline,
		listOutline,
		cartOutline,
		peopleOutline,
		idCardOutline,
		bookOutline,
		homeOutline,
		walletOutline,
		bugOutline,
		cogOutline,
		bagCheckOutline,
		cardOutline,
		briefcaseOutline,
		personAddOutline,
		notificationsOutline,
	} from 'ionicons/icons';

	import SideNavigationCategory from '@/components/base/SideNavigationCategory';
	import localeDropdown from '@/components/structure/localeDropdown';

	import { mapActions } from 'vuex';

	export default {
		name: 'SideNavigation',
		components: {
			IonContent,
			IonIcon,
			IonItem,
			IonLabel,
			IonList,
			IonMenu,
			IonToggle,
			IonThumbnail,
			IonImg,
			SideNavigationCategory,
			localeDropdown,
		},
		data() {
			return {
				shown: false,
				colorTheme: 'light',
				ionicons: {
					chevronForwardOutline,
					chevronDownOutline,
					moonOutline,
					logOutOutline,
					languageOutline,
					barChartOutline,
					documentTextOutline,
					listOutline,
					cartOutline,
					peopleOutline,
					idCardOutline,
					bookOutline,
					homeOutline,
					walletOutline,
					bugOutline,
					cogOutline,
					bagCheckOutline,
					cardOutline,
					briefcaseOutline,
					notificationsOutline,
				},
			};
		},
		methods: {
			toggleTheme() {
				this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
				document.body.setAttribute('color-theme', this.colorTheme);
				console.log(this.colorTheme);
			},
			...mapActions({
				signOut: 'auth/signOut',
			}),
		},
		computed: {
			sidenav: function () {
				const allRoutes = [
					{
						name: this.$t('views.homePage.pageTitle'),
						icon: homeOutline,
						to: { name: 'Home' },
					},
					{
						name: this.$t('components.navigation.navbar-item.notifications'),
						to: { name: 'Notifications' },
						icon: notificationsOutline,
					},
					{
						name: this.$t('components.navigation.sidenav.pricing._groupName'),
						icon: barChartOutline,
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
						name: this.$t(
							'components.navigation.sidenav.contracts._groupName',
						),
						icon: documentTextOutline,
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
						name: this.$t(
							'components.navigation.sidenav.processing._groupName',
						),
						icon: listOutline,
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
						name: this.$t(
							'components.navigation.sidenav.accounting._groupName',
						),
						icon: cartOutline,
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
						name: this.$t(
							'components.navigation.sidenav.contractors._groupName',
						),
						icon: peopleOutline,
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
						name: this.$t(
							'components.navigation.sidenav.cards._groupName',
						),
						icon: idCardOutline,
						fab: true,
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
						name: this.$t(
							'components.navigation.sidenav.library._groupName',
						),
						icon: bookOutline,
						children: [
							{
								name: 'Book 1',
								to: { name: 'Library' },
							},
							{
								name: 'Book 2',
								to: { name: 'Library' },
							},
						],
					},
					{
						name: this.$t('components.navigation.navbar-item.wallet'),
						to: { name: 'Wallet' },
						icon: walletOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.contract-approval'),
						to: { name: 'ContractApproval' },
						icon: bagCheckOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.payment'),
						to: { name: 'Payment' },
						icon: cardOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.bank'),
						to: { name: 'Bank' },
						icon: briefcaseOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.collaboration'),
						to: { name: 'Collaboration' },
						icon: personAddOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.devtools'),
						to: { name: 'DevTools' },
						icon: bugOutline,
					},
					{
						name: this.$t('components.navigation.navbar-item.database'),
						to: { name: 'PlatformData' },
						icon: cogOutline,
					},
				];

				const routes = [];
				const permissions = this.$store.getters['auth/permissions'];
				for (const category of allRoutes) {
					if (category.children) {
						const children = [];
						for (const child of category.children) {
							const routeName = child.to.name;
							if (
								routeName in permissions &&
								permissions[routeName].read &&
								permissions[routeName].write
							) {
								children.push(child);
							}
						}
						if (children.length) {
							category.children = children;
							routes.push(category);
						}
					} else {
						const routeName = category.to.name;
						let hasPermissions = routeName in permissions;
						hasPermissions &= permissions[routeName]?.read;
						hasPermissions &= permissions[routeName]?.write;
						if (hasPermissions) {
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
