import Vue from 'vue';
import VueRouter from 'vue-router';
import dynamicRoutes from '@/router/routes';

// import Home from '@/views/home/Home.vue';
// import VehiclePricing from '@/views/pricing/Vehicle';
// import IndustrialLiabilityPricing from '@/views/pricing/IndustrialLiability';
// import FirePricing from '@/views/pricing/Fire';
// import LifePricing from '@/views/pricing/Life';
// import ContractsFile from '@/views/contracts/File';
// import UncollectedContracts from '@/views/contracts/Uncollected';
// import CollectedContracts from '@/views/contracts/Collected';
// import ContractAdditionalActs from '@/views/contracts/AdditionalActs';
// import GreenCardContracts from '@/views/contracts/GreenCard';
// import UnclaimedContracts from '@/views/contracts/Unclaimed';
// import InvalidContracts from '@/views/contracts/Invalid';
// import NewContract from '@/views/contracts/New';
// import ProcessingDueDateRegister from '@/views/processing/DueDateRegister';
// import ProcessingDuePayment from '@/views/processing/DuePayment';
// import ProcessingPaid from '@/views/processing/Paid';
// import ProcessingLosses from '@/views/processing/Losses';
// import AccountingReceipts from '@/views/accounting/Receipts';
// import AccountingRegisters from '@/views/accounting/Registers';
// import AccountingTodaysIncome from '@/views/accounting/TodaysIncome';
// import AccountingCommissionsUncollected from '@/views/accounting/CommissionsUncollected';
// import AccountingCommissionsCollected from '@/views/accounting/CommissionsCollected';
// import AccountingMutualAccount from '@/views/accounting/MutualAccount';
// import SupplierContractors from '@/views/contractors/Supplier';
// import ContractorsExternalContractors from '@/views/contractors/ExternalContractors';
// import VehicleCards from '@/views/cards/Vehicle';
// import VehicleCardsDetails from '@/views/cards/VehicleDetails';
// import CustomerCards from '@/views/cards/Customer';
// import Library from '@/views/library/Library';
// import Trade from '@/views/trade/Trade';
// import UserProfile from '@/views/userProfile/UserProfile';
// import PlatformData from '@/views/platformData/PlatformData';
import NotFound from '@/views/errorPages/NotFound';
// import DevTools from "@/views/devTools/DevTools";

Vue.use(VueRouter);


// const routes = [
// 	{ path: '/', name: 'Home', component: Home },
// 	{ path: '/pricing/vehicle', name: 'VehiclePricing', component: VehiclePricing },
// 	{ path: '/pricing/industrialLiability', name: 'IndustrialLiabilityPricing', component: IndustrialLiabilityPricing },
// 	{ path: '/pricing/fire', name: 'FirePricing', component: FirePricing },
// 	{ path: '/pricing/life', name: 'LifePricing', component: LifePricing },
// 	{ path: '/contract/file', name: 'ContractsFile', component: ContractsFile },
// 	{ path: '/contract/uncollected', name: 'UncollectedContracts', component: UncollectedContracts },
// 	{ path: '/contract/collected', name: 'CollectedContracts', component: CollectedContracts },
// 	{ path: '/contract/additionalActs', name: 'ContractAdditionalActs', component: ContractAdditionalActs },
// 	{ path: '/contract/greenCard', name: 'GreenCardContracts', component: GreenCardContracts },
// 	{ path: '/contract/unclaimed', name: 'UnclaimedContracts', component: UnclaimedContracts },
// 	{ path: '/contract/invalid', name: 'InvalidContracts', component: InvalidContracts },
// 	{ path: '/contract/new', name: 'NewContract', component: NewContract },
// 	{ path: '/processing/dueDateRegister', name: 'ProcessingDueDateRegister', component: ProcessingDueDateRegister },
// 	{ path: '/processing/duePayment', name: 'ProcessingDuePayment', component: ProcessingDuePayment },
// 	{ path: '/processing/paid', name: 'ProcessingPaid', component: ProcessingPaid },
// 	{ path: '/processing/losses', name: 'ProcessingLosses', component: ProcessingLosses },
// 	{ path: '/accounting/receipts', name: 'AccountingReceipts', component: AccountingReceipts },
// 	{ path: '/accounting/registers', name: 'AccountingRegisters', component: AccountingRegisters },
// 	{ path: '/accounting/todaysIncome', name: 'AccountingTodaysIncome', component: AccountingTodaysIncome },
// 	{ path: '/accounting/commissionsUncollected', name: 'AccountingCommissionsUncollected', component: AccountingCommissionsUncollected },
// 	{ path: '/accounting/commissionsCollected', name: 'AccountingCommissionsCollected', component: AccountingCommissionsCollected },
// 	{ path: '/accounting/mutualAccount', name: 'AccountingMutualAccount', component: AccountingMutualAccount },
// 	{ path: '/contractors/suppliers', name: 'SupplierContractors', component: SupplierContractors },
// 	{ path: '/contractors/externalContractors', name: 'ContractorsExternalContractors', component: ContractorsExternalContractors },
// 	{ path: '/cards/vehicle', name: 'VehicleCards', component: VehicleCards },
// 	{ path: '/cards/vehicle/:id', name: 'VehicleCardsDetails', component: VehicleCardsDetails },
// 	{ path: '/cards/customers', name: 'CustomerCards', component: CustomerCards },
// 	{ path: '/library', name: 'Library', component: Library },
// 	{ path: '/trade', name: 'Trade', component: Trade },
// 	{ path: '/profile', name: 'UserProfile', component: UserProfile },
// 	{ path: '/platformData', name: 'PlatformData', component: PlatformData },
// 	{ path: '/devTools', name: 'DevTools', component: DevTools },
//
// 	// Example of how to use 404 page with items with id on the route
// 	// https://github.com/vueschool/vuejs-router/blob/eff7d82e1d0d00be5da0c65308d61cbbdcdcc34a/src/router.js
// 	// https://vueschool.io/lessons/how-to-create-a-404-not-found-route-and-page-with-vue-router
// 	// {
// 	// 	path: "/someItem/:id",
// 	// 	name: "SomeItemDetails",
// 	// 	props: true,
// 	// 	component: SomeItemDetails,
// 	// 	children: [
// 	// 		{
// 	// 			path: ":subItemId",
// 	// 			name: "SubItemDetails",
// 	// 			props: true,
// 	// 			component: SubItemDetails
// 	// 		}
// 	// 	],
// 	// 	beforeEnter: (to, from, next) => {
// 	// 		const exists = store.someItem.find(
// 	// 			item => item.id === to.params.id
// 	// 		);
// 	// 		if (exists) {
// 	// 			next();
// 	// 		} else {
// 	// 			next({ name: "notFound" });
// 	// 		}
// 	// 	}
// 	// },
//
// 	{ path: '/404-page-not-found', alias: '*', name: 'NotFound', component: NotFound },
// ];

const routes = [
	{ path: '/404-page-not-found', alias: '*', name: 'NotFound', component: NotFound },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: function (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return { x: 0, y: 0 };
	},
	linkActiveClass: 'active'
});

VueRouter.prototype.$loadRoutesAsync = async function () {
	console.log('Routes Loaded!', dynamicRoutes);
	return Promise.resolve();
}

export default router;
