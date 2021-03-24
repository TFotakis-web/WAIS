import { createRouter, createWebHistory } from '@ionic/vue-router';

import { store } from '@/store';
// import dynamicRoutes from '@/router/routes';

const routes = [
	{ path: '', redirect: { name: 'Home' } },
	{ path: '/', redirect: { name: 'Home' } },
	{
		path: '/auth', name: 'Auth', component: () => import('@/views/auth/AuthPage.vue'), meta: { guest: true },
		children: [
			{ path: '/auth/confirmSignUp', name: 'ConfirmSignUp', component: () => import('@/components/auth/confirmSignUp.vue'), meta: { guest: true } },
			{ path: '/auth/forceChangePassword', name: 'ForceChangePassword', component: () => import('@/components/auth/forceChangePassword.vue'), meta: { guest: true } },
			{ path: '/auth/forgotPassword', name: 'ForgotPassword', component: () => import('@/components/auth/forgotPassword.vue'), meta: { guest: true } },
			{ path: '/auth/signIn', name: 'SignIn', component: () => import('@/components/auth/signIn.vue'), meta: { guest: true } },
			{ path: '/auth/signUp', name: 'SignUp', component: () => import('@/components/auth/signUp.vue'), meta: { guest: true } },
			{ path: '/auth/tradeCreationForm', name: 'TradeCreationForm', component: () => import('@/components/structure/tradeCreationForm/tradeCreationForm.vue'), meta: { requiresAuth: true } },
		],
	},

	{ path: '/home', name: 'Home', component: () => import('@/views/home/Home.vue'), meta: { requiresAuth: true } },
	{ path: '/pricing/vehicle', name: 'VehiclePricing', component: () => import('@/views/pricing/Vehicle'), meta: { requiresAuth: true } },
	{ path: '/pricing/industrialLiability', name: 'IndustrialLiabilityPricing', component: () => import('@/views/pricing/IndustrialLiability'), meta: { requiresAuth: true } },
	{ path: '/pricing/fire', name: 'FirePricing', component: () => import('@/views/pricing/Fire'), meta: { requiresAuth: true } },
	{ path: '/pricing/life', name: 'LifePricing', component: () => import('@/views/pricing/Life'), meta: { requiresAuth: true } },
	{ path: '/contract/file', name: 'ContractsFile', component: () => import('@/views/contracts/File'), meta: { requiresAuth: true } },
	{ path: '/contract/uncollected', name: 'UncollectedContracts', component: () => import('@/views/contracts/Uncollected'), meta: { requiresAuth: true } },
	{ path: '/contract/collected', name: 'CollectedContracts', component: () => import('@/views/contracts/Collected'), meta: { requiresAuth: true } },
	{ path: '/contract/additionalActs', name: 'ContractAdditionalActs', component: () => import('@/views/contracts/AdditionalActs'), meta: { requiresAuth: true } },
	{ path: '/contract/greenCard', name: 'GreenCardContracts', component: () => import('@/views/contracts/GreenCard'), meta: { requiresAuth: true } },
	{ path: '/contract/unclaimed', name: 'UnclaimedContracts', component: () => import('@/views/contracts/Unclaimed'), meta: { requiresAuth: true } },
	{ path: '/contract/invalid', name: 'InvalidContracts', component: () => import('@/views/contracts/Invalid'), meta: { requiresAuth: true } },
	{ path: '/contract/new', name: 'NewContract', component: () => import('@/views/contracts/New'), meta: { requiresAuth: true } },
	{ path: '/processing/dueDateRegister', name: 'ProcessingDueDateRegister', component: () => import('@/views/processing/DueDateRegister'), meta: { requiresAuth: true } },
	{ path: '/processing/duePayment', name: 'ProcessingDuePayment', component: () => import('@/views/processing/DuePayment'), meta: { requiresAuth: true } },
	{ path: '/processing/paid', name: 'ProcessingPaid', component: () => import('@/views/processing/Paid'), meta: { requiresAuth: true } },
	{ path: '/processing/losses', name: 'ProcessingLosses', component: () => import('@/views/processing/Losses'), meta: { requiresAuth: true } },
	{ path: '/accounting/receipts', name: 'AccountingReceipts', component: () => import('@/views/accounting/Receipts'), meta: { requiresAuth: true } },
	{ path: '/accounting/registers', name: 'AccountingRegisters', component: () => import('@/views/accounting/Registers'), meta: { requiresAuth: true } },
	{ path: '/accounting/todaysIncome', name: 'AccountingTodaysIncome', component: () => import('@/views/accounting/TodaysIncome'), meta: { requiresAuth: true } },
	{ path: '/accounting/commissionsUncollected', name: 'AccountingCommissionsUncollected', component: () => import('@/views/accounting/CommissionsUncollected'), meta: { requiresAuth: true } },
	{ path: '/accounting/commissionsCollected', name: 'AccountingCommissionsCollected', component: () => import('@/views/accounting/CommissionsCollected'), meta: { requiresAuth: true } },
	{ path: '/accounting/mutualAccount', name: 'AccountingMutualAccount', component: () => import('@/views/accounting/MutualAccount'), meta: { requiresAuth: true } },
	{ path: '/contractors/suppliers', name: 'SupplierContractors', component: () => import('@/views/contractors/Supplier'), meta: { requiresAuth: true } },
	{ path: '/contractors/externalContractors', name: 'ContractorsExternalContractors', component: () => import('@/views/contractors/ExternalContractors'), meta: { requiresAuth: true } },
	{ path: '/cards/vehicle', name: 'VehicleCards', component: () => import('@/views/cards/Vehicle'), meta: { requiresAuth: true } },
	{ path: '/cards/vehicle/:id', name: 'VehicleCardsDetails', component: () => import('@/views/cards/VehicleDetails'), meta: { requiresAuth: true } },
	{ path: '/cards/customers', name: 'CustomerCards', component: () => import('@/views/cards/Customer'), meta: { requiresAuth: true } },
	{ path: '/library', name: 'Library', component: () => import('@/views/library/Library'), meta: { requiresAuth: true } },
	{ path: '/trade', name: 'Trade', component: () => import('@/views/trade/Trade'), meta: { requiresAuth: true } },
	{ path: '/profile', name: 'UserProfile', component: () => import('@/views/userProfile/UserProfile'), meta: { requiresAuth: true } },
	{ path: '/platformData', name: 'PlatformData', component: () => import('@/views/platformData/PlatformData'), meta: { requiresAuth: true, isAdmin: true } },
	{ path: '/devTools', name: 'DevTools', component: () => import('@/views/devTools/DevTools'), meta: { requiresAuth: true, isAdmin: true } },
	{ path: '/contractApproval', name: 'ContractApproval', component: () => import('@/views/home/Home'), meta: { requiresAuth: true } },
	{ path: '/payment', name: 'Payment', component: () => import('@/views/home/Home'), meta: { requiresAuth: true } },
	{ path: '/bank', name: 'Bank', component: () => import('@/views/home/Home'), meta: { requiresAuth: true } },
	{ path: '/collaboration', name: 'Collaboration', component: () => import('@/views/home/Home'), meta: { requiresAuth: true } },
	{ path: '/notifications', name: 'Notifications', component: () => import('@/views/notifications/Notifications'), meta: { requiresAuth: true } },
	{ path: '/wallet', name: 'Wallet', component: () => import('@/views/home/Home'), meta: { requiresAuth: true } },

	{ path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@/views/errorPages/NotFound') },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

// router.$loadRoutesAsync = async function () {
// 	const permissions = store.getters['auth/permissions'];
//
// 	for (const p in permissions) {
// 		if (permissions[p].read && permissions[p].write) {
// 			const route = dynamicRoutes[p].route;
// 			router.addRoute(route);
// 		}
// 	}
// 	return Promise.resolve();
// };

function hasPermissions(route) {
	let flag = true;
	const permissions = store.getters['auth/permissions'];

	flag &= permissions[route.name]?.read;
	flag &= permissions[route.name]?.write;

	// for (const permission of route.meta.permissions) {
	// 	flag &= permissions.includes(permission);
	// }

	return flag;
}

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		let user = store.getters['auth/user'];
		if (!user) {
			store.dispatch('auth/currentAuthenticatedUser')
				.then(() => {
					if (!hasPermissions(to)) {
						next({ name: 'Home' });
					} else {
						next();
					}
				})
				.catch(() => {
					next({ name: 'SignIn' });
				});
			return;
			// user = store.getters['auth/user'];
		}
		if (user) {
			if (!hasPermissions(to)) {
				next({ name: 'Home' });
			} else {
				next();
			}
		} else {
			next({ name: 'SignIn' });
		}
	} else {
		next();
	}
});

export default router;
