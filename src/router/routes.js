let routesList = [
	{ path: '/', name: 'Home', component: () => import('@/views/home/Home.vue') },
	{ path: '/pricing/vehicle', name: 'VehiclePricing', component: () => import('@/views/pricing/Vehicle') },
	{ path: '/pricing/industrialLiability', name: 'IndustrialLiabilityPricing', component: () => import('@/views/pricing/IndustrialLiability') },
	{ path: '/pricing/fire', name: 'FirePricing', component: () => import('@/views/pricing/Fire') },
	{ path: '/pricing/life', name: 'LifePricing', component: () => import('@/views/pricing/Life') },
	{ path: '/contract/file', name: 'ContractsFile', component: () => import('@/views/contracts/File') },
	{ path: '/contract/uncollected', name: 'UncollectedContracts', component: () => import('@/views/contracts/Uncollected') },
	{ path: '/contract/collected', name: 'CollectedContracts', component: () => import('@/views/contracts/Collected') },
	{ path: '/contract/additionalActs', name: 'ContractAdditionalActs', component: () => import('@/views/contracts/AdditionalActs') },
	{ path: '/contract/greenCard', name: 'GreenCardContracts', component: () => import('@/views/contracts/GreenCard') },
	{ path: '/contract/unclaimed', name: 'UnclaimedContracts', component: () => import('@/views/contracts/Unclaimed') },
	{ path: '/contract/invalid', name: 'InvalidContracts', component: () => import('@/views/contracts/Invalid') },
	{ path: '/contract/new', name: 'NewContract', component: () => import('@/views/contracts/New') },
	{ path: '/processing/dueDateRegister', name: 'ProcessingDueDateRegister', component: () => import('@/views/processing/DueDateRegister') },
	{ path: '/processing/duePayment', name: 'ProcessingDuePayment', component: () => import('@/views/processing/DuePayment') },
	{ path: '/processing/paid', name: 'ProcessingPaid', component: () => import('@/views/processing/Paid') },
	{ path: '/processing/losses', name: 'ProcessingLosses', component: () => import('@/views/processing/Losses') },
	{ path: '/accounting/receipts', name: 'AccountingReceipts', component: () => import('@/views/accounting/Receipts') },
	{ path: '/accounting/registers', name: 'AccountingRegisters', component: () => import('@/views/accounting/Registers') },
	{ path: '/accounting/todaysIncome', name: 'AccountingTodaysIncome', component: () => import('@/views/accounting/TodaysIncome') },
	{ path: '/accounting/commissionsUncollected', name: 'AccountingCommissionsUncollected', component: () => import('@/views/accounting/CommissionsUncollected') },
	{ path: '/accounting/commissionsCollected', name: 'AccountingCommissionsCollected', component: () => import('@/views/accounting/CommissionsCollected') },
	{ path: '/accounting/mutualAccount', name: 'AccountingMutualAccount', component: () => import('@/views/accounting/MutualAccount') },
	{ path: '/contractors/suppliers', name: 'SupplierContractors', component: () => import('@/views/contractors/Supplier') },
	{ path: '/contractors/externalContractors', name: 'ContractorsExternalContractors', component: () => import('@/views/contractors/ExternalContractors') },
	{ path: '/cards/vehicle', name: 'VehicleCards', component: () => import('@/views/cards/Vehicle') },
	{ path: '/cards/vehicle/:id', name: 'VehicleCardsDetails', component: () => import('@/views/cards/VehicleDetails') },
	{ path: '/cards/customers', name: 'CustomerCards', component: () => import('@/views/cards/Customer') },
	{ path: '/library', name: 'Library', component: () => import('@/views/library/Library') },
	{ path: '/trade', name: 'Trade', component: () => import('@/views/trade/Trade') },
	{ path: '/profile', name: 'UserProfile', component: () => import('@/views/userProfile/UserProfile') },
	{ path: '/platformData', name: 'PlatformData', component: () => import('@/views/platformData/PlatformData') },
	{ path: '/devTools', name: 'DevTools', component: () => import("@/views/devTools/DevTools") },
	{ path: '/contractApproval', name: 'ContractApproval', component: () => import('@/views/home/Home') },
	{ path: '/payment', name: 'Payment', component: () => import('@/views/home/Home') },
	{ path: '/bank', name: 'Bank', component: () => import('@/views/home/Home') },
	{ path: '/collaboration', name: 'Collaboration', component: () => import('@/views/home/Home') },
	{ path: '/notifications', name: 'Notifications', component: () => import('@/views/notifications/Notifications') },
	{ path: '/wallet', name: 'Wallet', component: () => import('@/views/home/Home') },
];

let routes = {};
for(const route of routesList) {
	routes[route.name] = {route};
}

export default routes;
