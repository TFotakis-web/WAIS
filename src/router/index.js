import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import VehiclePricing from '@/views/pricing/Vehicle';
import IndustrialLiabilityPricing from '@/views/pricing/IndustrialLiability';
import FirePricing from '@/views/pricing/Fire';
import LifePricing from '@/views/pricing/Life';
import ContractsFile from '@/views/contracts/File';
import UncollectedContracts from '@/views/contracts/Uncollected';
import CollectedContracts from '@/views/contracts/Collected';
import ContractAdditionalActs from '@/views/contracts/AdditionalActs';
import GreenCardContracts from '@/views/contracts/GreenCard';
import UnclaimedContracts from '@/views/contracts/Unclaimed';
import InvalidContracts from '@/views/contracts/Invalid';
import NewContract from '@/views/contracts/New';
import ProcessingDueDateRegister from '@/views/processing/DueDateRegister';
import ProcessingDuePayment from '@/views/processing/DuePayment';
import ProcessingPaid from '@/views/processing/Paid';
import ProcessingLosses from '@/views/processing/Losses';
import AccountingReceipts from '@/views/accounting/Receipts';
import AccountingRegisters from '@/views/accounting/Registers';
import AccountingTodaysIncome from '@/views/accounting/TodaysIncome';
import AccountingCommissionsUncollected from '@/views/accounting/CommissionsUncollected';
import AccountingCommissionsCollected from '@/views/accounting/CommissionsCollected';
import AccountingMutualAccount from '@/views/accounting/MutualAccount';
import SupplierContractors from '@/views/contractors/Supplier';
import ContractorsExternalContractors from '@/views/contractors/ExternalContractors';
import VehicleCards from '@/views/cards/Vehicle';
import CustomerCards from '@/views/cards/Customer';
import Library from '@/views/library/Library';
import Trade from '@/views/Trade';
import UserProfile from '@/views/UserProfile';
import PlatformData from '@/views/platformData/PlatformData';

Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
	{ path: '/pricing/vehicle', name: 'VehiclePricing', component: VehiclePricing, meta: { requiresAuth: true } },
	{ path: '/pricing/industrialLiability', name: 'IndustrialLiabilityPricing', component: IndustrialLiabilityPricing, meta: { requiresAuth: true } },
	{ path: '/pricing/fire', name: 'FirePricing', component: FirePricing, meta: { requiresAuth: true } },
	{ path: '/pricing/life', name: 'LifePricing', component: LifePricing, meta: { requiresAuth: true } },
	{ path: '/contract/file', name: 'ContractsFile', component: ContractsFile, meta: { requiresAuth: true } },
	{ path: '/contract/uncollected', name: 'UncollectedContracts', component: UncollectedContracts, meta: { requiresAuth: true } },
	{ path: '/contract/collected', name: 'CollectedContracts', component: CollectedContracts, meta: { requiresAuth: true } },
	{ path: '/contract/additionalActs', name: 'ContractAdditionalActs', component: ContractAdditionalActs, meta: { requiresAuth: true } },
	{ path: '/contract/greenCard', name: 'GreenCardContracts', component: GreenCardContracts, meta: { requiresAuth: true } },
	{ path: '/contract/unclaimed', name: 'UnclaimedContracts', component: UnclaimedContracts, meta: { requiresAuth: true } },
	{ path: '/contract/invalid', name: 'InvalidContracts', component: InvalidContracts, meta: { requiresAuth: true } },
	{ path: '/contract/new', name: 'NewContract', component: NewContract, meta: { requiresAuth: true } },
	{ path: '/processing/dueDateRegister', name: 'ProcessingDueDateRegister', component: ProcessingDueDateRegister, meta: { requiresAuth: true } },
	{ path: '/processing/duePayment', name: 'ProcessingDuePayment', component: ProcessingDuePayment, meta: { requiresAuth: true } },
	{ path: '/processing/paid', name: 'ProcessingPaid', component: ProcessingPaid, meta: { requiresAuth: true } },
	{ path: '/processing/losses', name: 'ProcessingLosses', component: ProcessingLosses, meta: { requiresAuth: true } },
	{ path: '/accounting/receipts', name: 'AccountingReceipts', component: AccountingReceipts, meta: { requiresAuth: true } },
	{ path: '/accounting/registers', name: 'AccountingRegisters', component: AccountingRegisters, meta: { requiresAuth: true } },
	{ path: '/accounting/todaysIncome', name: 'AccountingTodaysIncome', component: AccountingTodaysIncome, meta: { requiresAuth: true } },
	{ path: '/accounting/commissionsUncollected', name: 'AccountingCommissionsUncollected', component: AccountingCommissionsUncollected, meta: { requiresAuth: true } },
	{ path: '/accounting/commissionsCollected', name: 'AccountingCommissionsCollected', component: AccountingCommissionsCollected, meta: { requiresAuth: true } },
	{ path: '/accounting/mutualAccount', name: 'AccountingMutualAccount', component: AccountingMutualAccount, meta: { requiresAuth: true } },
	{ path: '/contractors/suppliers', name: 'SupplierContractors', component: SupplierContractors, meta: { requiresAuth: true } },
	{ path: '/contractors/externalContractors', name: 'ContractorsExternalContractors', component: ContractorsExternalContractors, meta: { requiresAuth: true } },
	{ path: '/cards/vehicle', name: 'VehicleCards', component: VehicleCards, meta: { requiresAuth: true } },
	{ path: '/cards/customers', name: 'CustomerCards', component: CustomerCards, meta: { requiresAuth: true } },
	{ path: '/library', name: 'Library', component: Library, meta: { requiresAuth: true } },
	{ path: '/trade', name: 'Trade', component: Trade, meta: { requiresAuth: true } },
	{ path: '/profile', name: 'UserProfile', component: UserProfile, meta: { requiresAuth: true } },
	{ path: '/platformData', name: 'PlatformData', component: PlatformData, meta: { requiresAuth: true } },
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
export default router;
