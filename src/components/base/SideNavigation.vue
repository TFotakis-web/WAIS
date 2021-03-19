<template>
	<ion-menu content-id="main-content" type="overlay">
		<ion-content>
			<ion-list id="categories-list">
				<ion-list-header>Inbox</ion-list-header>
				<ion-note>hi@ionicframework.com</ion-note>
				<side-navigation-category v-for="route in sidenav" :key="route.name" :route="route"/>
			</ion-list>
			<ion-list>
				<ion-item lines="full">
					<ion-icon slot="start" :icon="moon"></ion-icon>
					<ion-label> Toggle Dark Theme</ion-label>
					<ion-toggle id="themeToggle" slot="end" :checked="colorTheme === 'dark'" @ionChange="toggleTheme"/>
				</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>
<script>
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';

	import {
		IonContent,
		IonIcon,
		IonItem,
		IonLabel,
		IonList,
		IonListHeader,
		IonMenu,
		IonNote,
		IonToggle,
	} from '@ionic/vue';
	import {
		archiveOutline,
		archiveSharp,
		bookmarkOutline,
		bookmarkSharp,
		heartOutline,
		heartSharp,
		mailOutline,
		mailSharp,
		paperPlaneOutline,
		paperPlaneSharp,
		trashOutline,
		trashSharp,
		warningOutline,
		warningSharp,
		chevronForwardOutline,
		chevronDownOutline,
		moon,
	} from 'ionicons/icons';

	import SideNavigationCategory from '@/components/base/SideNavigationCategory';

	export default {
		name: 'SideNavigation',
		components: {
			IonContent,
			IonIcon,
			IonItem,
			IonLabel,
			IonList,
			IonListHeader,
			IonMenu,
			IonNote,
			IonToggle,
			SideNavigationCategory,
		},
		data() {
			return {
				shown: false,
				colorTheme: 'light',
			};
		},
		setup() {
			const appPages = [
				{
					title: 'Inbox',
					url: '/folder/Inbox',
					iosIcon: mailOutline,
					mdIcon: mailSharp,
				},
				{
					title: 'Outbox',
					url: '/folder/Outbox',
					iosIcon: paperPlaneOutline,
					mdIcon: paperPlaneSharp,
				},
				{
					title: 'Favorites',
					url: '/folder/Favorites',
					iosIcon: heartOutline,
					mdIcon: heartSharp,
				},
				{
					title: 'Archived',
					url: '/folder/Archived',
					iosIcon: archiveOutline,
					mdIcon: archiveSharp,
				},
				{
					title: 'Trash',
					url: '/folder/Trash',
					iosIcon: trashOutline,
					mdIcon: trashSharp,
				},
				{
					title: 'Spam',
					url: '/folder/Spam',
					iosIcon: warningOutline,
					mdIcon: warningSharp,
				},
			];

			const selectedIndex = ref(0);

			const path = window.location.pathname.split('folder/')[1];
			if (path !== undefined) {
				selectedIndex.value = appPages.findIndex(
					(page) => page.title.toLowerCase() === path.toLowerCase(),
				);
			}

			const route = useRoute();

			return {
				appPages,
				archiveOutline,
				archiveSharp,
				bookmarkOutline,
				bookmarkSharp,
				heartOutline,
				heartSharp,
				mailOutline,
				mailSharp,
				paperPlaneOutline,
				paperPlaneSharp,
				trashOutline,
				trashSharp,
				warningOutline,
				warningSharp,
				chevronForwardOutline,
				chevronDownOutline,
				moon,
				selectedIndex,
				isSelected: (url) => (url === route.path ? 'selected' : ''),
			};
		},
		methods: {
			toggleTheme() {
				this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
				document.body.setAttribute('color-theme', this.colorTheme);
				console.log('Color theme', this.colorTheme);
			},
		},
		computed: {
			sidenav: function () {
				const allRoutes = [
					{
						name: this.$t(
							'components.navigation.sidenav.pricing._groupName',
						),
						icon: 'chart-line',
						children: [
							{
								name: this.$t(
									'components.navigation.sidenav.pricing.vehicle',
								),
								to: { name: 'VehiclePricing' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.pricing.industrialLiability',
								),
								to: { name: 'IndustrialLiabilityPricing' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.pricing.fire',
								),
								to: { name: 'FirePricing' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.pricing.life',
								),
								to: { name: 'LifePricing' },
							},
						],
					},
					{
						name: this.$t(
							'components.navigation.sidenav.contracts._groupName',
						),
						icon: 'file-contract',
						children: [
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.file',
								),
								to: { name: 'ContractsFile' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.uncollected',
								),
								to: { name: 'UncollectedContracts' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.collected',
								),
								to: { name: 'CollectedContracts' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.additionalActs',
								),
								to: { name: 'ContractAdditionalActs' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.greenCard',
								),
								to: { name: 'GreenCardContracts' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.unclaimed',
								),
								to: { name: 'UnclaimedContracts' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.invalid',
								),
								to: { name: 'InvalidContracts' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contracts.new',
								),
								to: { name: 'NewContract' },
							},
						],
					},
					{
						name: this.$t(
							'components.navigation.sidenav.processing._groupName',
						),
						icon: 'list-ul',
						children: [
							{
								name: this.$t(
									'components.navigation.sidenav.processing.dueDateRegister',
								),
								to: { name: 'ProcessingDueDateRegister' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.processing.duePayment',
								),
								to: { name: 'ProcessingDuePayment' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.processing.paid',
								),
								to: { name: 'ProcessingPaid' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.processing.losses',
								),
								to: { name: 'ProcessingLosses' },
							},
						],
					},
					{
						name: this.$t(
							'components.navigation.sidenav.accounting._groupName',
						),
						icon: 'cash-register',
						children: [
							{
								name: this.$t(
									'components.navigation.sidenav.accounting.receipts',
								),
								to: { name: 'AccountingReceipts' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.accounting.registers',
								),
								to: { name: 'AccountingRegisters' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.accounting.todaysIncome',
								),
								to: { name: 'AccountingTodaysIncome' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.accounting.commissionsUncollected',
								),
								to: { name: 'AccountingCommissionsUncollected' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.accounting.commissionsCollected',
								),
								to: { name: 'AccountingCommissionsCollected' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.accounting.mutualAccount',
								),
								to: { name: 'AccountingMutualAccount' },
							},
						],
					},
					{
						name: this.$t(
							'components.navigation.sidenav.contractors._groupName',
						),
						icon: 'user-friends',
						children: [
							{
								name: this.$t(
									'components.navigation.sidenav.contractors.suppliers',
								),
								to: { name: 'SupplierContractors' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.contractors.externalContractors',
								),
								to: { name: 'ContractorsExternalContractors' },
							},
						],
					},
					{
						name: this.$t(
							'components.navigation.sidenav.cards._groupName',
						),
						icon: 'wpforms',
						fab: true,
						children: [
							{
								name: this.$t(
									'components.navigation.sidenav.cards.vehicleCards',
								),
								to: { name: 'VehicleCards' },
							},
							{
								name: this.$t(
									'components.navigation.sidenav.cards.customerCards',
								),
								to: { name: 'CustomerCards' },
							},
						],
					},
					{
						name: this.$t(
							'components.navigation.sidenav.library._groupName',
						),
						icon: 'book',
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
					// {
					// 	name: "Getting started",
					// 	icon: "mdb",
					// 	fab: true,
					// 	children: [
					// 		{
					// 			name: "Quick start",
					// 			href: "https://mdbootstrap.com/docs/vue/getting-started/quick-start/"
					// 		},
					// 		{
					// 			name: "Technical Support",
					// 			href: "https://mdbootstrap.com/support/"
					// 		}
					// 	]
					// },
					// {
					// 	name: "Documentation",
					// 	icon: "graduation-cap",
					// 	href: "https://mdbootstrap.com/docs/vue/"
					// }
				];
				const routes = allRoutes;
				// const routes = [];
				// const permissions = this.$store.getters["auth/permissions"];
				// for (const category of allRoutes) {
				// 	const children = [];
				// 	for (const child of category.children) {
				// 		const routeName = child.to.name;
				// 		if (
				// 			routeName in permissions &&
				// 			permissions[routeName].read &&
				// 			permissions[routeName].write
				// 		) {
				// 			children.push(child);
				// 		}
				// 	}
				// 	if (children.length) {
				// 		category.children = children;
				// 		routes.push(category);
				// 	}
				// }

				return routes;
			},
			navbarLeft: function () {
				const allRoutes = [
					{
						name: this.$t('components.navigation.navbar-item.home'),
						to: { name: 'Home' },
						icon: 'home',
						fab: false,
					},
					{
						name: this.$t('components.navigation.navbar-item.wallet'),
						to: { name: 'Wallet' },
						icon: 'euro-sign',
						fab: false,
						label: '1345.85/1800.00',
					},
				];
				const routes = allRoutes;
				// const routes = [];
				// const permissions = this.$store.getters['auth/permissions'];
				// for (const navItem of allRoutes) {
				// 	const routeName = navItem.to.name;
				// 	if (routeName in permissions && permissions[routeName].read && permissions[routeName].write) {
				// 		routes.push(navItem);
				// 	}
				// }
				return routes;
			},
			navbarRight: function () {
				const allRoutes = [
					{
						name: this.$t('components.navigation.navbar-item.devtools'),
						to: { name: 'DevTools' },
						icon: 'dev',
						fab: true,
					},
					{
						name: this.$t('components.navigation.navbar-item.database'),
						to: { name: 'PlatformData' },
						icon: 'table',
						fab: false,
					},
					{
						name: this.$t(
							'components.navigation.navbar-item.contract-approval',
						),
						to: { name: 'ContractApproval' },
						icon: 'file-signature',
						fab: false,
					},
					{
						name: this.$t('components.navigation.navbar-item.payment'),
						to: { name: 'Payment' },
						icon: 'shopping-cart',
						fab: false,
					},
					{
						name: this.$t('components.navigation.navbar-item.bank'),
						to: { name: 'Bank' },
						icon: 'university',
						fab: false,
					},
					{
						name: this.$t(
							'components.navigation.navbar-item.collaboration',
						),
						to: { name: 'Collaboration' },
						icon: 'handshake',
						fab: false,
					},
					{
						name: this.$t(
							'components.navigation.navbar-item.notifications',
						),
						to: { name: 'Notifications' },
						icon: 'bell',
						fab: false,
					},
				];
				const routes = allRoutes;
				// const routes = [];
				// const permissions = this.$store.getters["auth/permissions"];
				// for (const navItem of allRoutes) {
				// 	const routeName = navItem.to.name;
				// 	if (
				// 		routeName in permissions &&
				// 		permissions[routeName].read &&
				// 		permissions[routeName].write
				// 	) {
				// 		routes.push(navItem);
				// 	}
				// }
				return routes;
			},
		},
	};
</script>
<style scoped>
	ion-menu ion-content {
		--background: var(--ion-item-background, var(--ion-background-color, #fff));
	}

	ion-menu.md ion-content {
		--padding-start: 8px;
		--padding-end: 8px;
		--padding-top: 20px;
		--padding-bottom: 20px;
	}

	ion-menu.md ion-list {
		padding: 20px 0;
	}

	ion-menu.md ion-note {
		margin-bottom: 30px;
	}

	ion-menu.md ion-list-header,
	ion-menu.md ion-note {
		padding-left: 10px;
	}

	ion-menu.md ion-list#categories-list {
		border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
	}

	ion-menu.md ion-list#categories-list ion-list-header {
		font-size: 22px;
		font-weight: 600;

		min-height: 20px;
	}

	ion-menu.md ion-list#labels-list ion-list-header {
		font-size: 16px;

		margin-bottom: 18px;

		color: #757575;

		min-height: 26px;
	}

	ion-menu.md ion-item {
		--padding-start: 10px;
		--padding-end: 10px;
		border-radius: 4px;
	}

	ion-menu.md ion-item.selected {
		--background: rgba(var(--ion-color-primary-rgb), 0.14);
	}

	ion-menu.md ion-item.selected ion-icon {
		color: var(--ion-color-primary);
	}

	ion-menu.md ion-item ion-icon {
		color: #616e7e;
	}

	ion-menu.md ion-item ion-label {
		font-weight: 500;
	}

	ion-menu.ios ion-content {
		--padding-bottom: 20px;
	}

	ion-menu.ios ion-list {
		padding: 20px 0 0 0;
	}

	ion-menu.ios ion-note {
		line-height: 24px;
		margin-bottom: 20px;
	}

	ion-menu.ios ion-item {
		--padding-start: 16px;
		--padding-end: 16px;
		--min-height: 50px;
	}

	ion-menu.ios ion-item.selected ion-icon {
		color: var(--ion-color-primary);
	}

	ion-menu.ios ion-item ion-icon {
		font-size: 24px;
		color: #73849a;
	}

	ion-menu.ios ion-list#labels-list ion-list-header {
		margin-bottom: 8px;
	}

	ion-menu.ios ion-list-header,
	ion-menu.ios ion-note {
		padding-left: 16px;
		padding-right: 16px;
	}

	ion-menu.ios ion-note {
		margin-bottom: 8px;
	}

	ion-note {
		display: inline-block;
		font-size: 16px;

		color: var(--ion-color-medium-shade);
	}

	ion-item.selected {
		--color: var(--ion-color-primary);
	}
</style>
