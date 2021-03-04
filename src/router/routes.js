import Home from '@/views/home/Home.vue';
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
import VehicleCardsDetails from '@/views/cards/VehicleDetails';
import CustomerCards from '@/views/cards/Customer';
import Library from '@/views/library/Library';
import Trade from '@/views/trade/Trade';
import UserProfile from '@/views/userProfile/UserProfile';
import PlatformData from '@/views/platformData/PlatformData';
import DevTools from "@/views/devTools/DevTools";
import Notifications from "@/views/notifications/Notifications";

let routesList = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/pricing/vehicle', name: 'VehiclePricing', component: VehiclePricing },
	{ path: '/pricing/industrialLiability', name: 'IndustrialLiabilityPricing', component: IndustrialLiabilityPricing },
	{ path: '/pricing/fire', name: 'FirePricing', component: FirePricing },
	{ path: '/pricing/life', name: 'LifePricing', component: LifePricing },
	{ path: '/contract/file', name: 'ContractsFile', component: ContractsFile },
	{ path: '/contract/uncollected', name: 'UncollectedContracts', component: UncollectedContracts },
	{ path: '/contract/collected', name: 'CollectedContracts', component: CollectedContracts },
	{ path: '/contract/additionalActs', name: 'ContractAdditionalActs', component: ContractAdditionalActs },
	{ path: '/contract/greenCard', name: 'GreenCardContracts', component: GreenCardContracts },
	{ path: '/contract/unclaimed', name: 'UnclaimedContracts', component: UnclaimedContracts },
	{ path: '/contract/invalid', name: 'InvalidContracts', component: InvalidContracts },
	{ path: '/contract/new', name: 'NewContract', component: NewContract },
	{ path: '/processing/dueDateRegister', name: 'ProcessingDueDateRegister', component: ProcessingDueDateRegister },
	{ path: '/processing/duePayment', name: 'ProcessingDuePayment', component: ProcessingDuePayment },
	{ path: '/processing/paid', name: 'ProcessingPaid', component: ProcessingPaid },
	{ path: '/processing/losses', name: 'ProcessingLosses', component: ProcessingLosses },
	{ path: '/accounting/receipts', name: 'AccountingReceipts', component: AccountingReceipts },
	{ path: '/accounting/registers', name: 'AccountingRegisters', component: AccountingRegisters },
	{ path: '/accounting/todaysIncome', name: 'AccountingTodaysIncome', component: AccountingTodaysIncome },
	{ path: '/accounting/commissionsUncollected', name: 'AccountingCommissionsUncollected', component: AccountingCommissionsUncollected },
	{ path: '/accounting/commissionsCollected', name: 'AccountingCommissionsCollected', component: AccountingCommissionsCollected },
	{ path: '/accounting/mutualAccount', name: 'AccountingMutualAccount', component: AccountingMutualAccount },
	{ path: '/contractors/suppliers', name: 'SupplierContractors', component: SupplierContractors },
	{ path: '/contractors/externalContractors', name: 'ContractorsExternalContractors', component: ContractorsExternalContractors },
	{ path: '/cards/vehicle', name: 'VehicleCards', component: VehicleCards },
	{ path: '/cards/vehicle/:id', name: 'VehicleCardsDetails', component: VehicleCardsDetails },
	{ path: '/cards/customers', name: 'CustomerCards', component: CustomerCards },
	{ path: '/library', name: 'Library', component: Library },
	{ path: '/trade', name: 'Trade', component: Trade },
	{ path: '/profile', name: 'UserProfile', component: UserProfile },
	{ path: '/platformData', name: 'PlatformData', component: PlatformData },
	{ path: '/devTools', name: 'DevTools', component: DevTools },
	{ path: '/contractApproval', name: 'ContractApproval', component: Home },
	{ path: '/payment', name: 'Payment', component: Home },
	{ path: '/bank', name: 'Bank', component: Home },
	{ path: '/collaboration', name: 'Collaboration', component: Home },
	{ path: '/notifications', name: 'Notifications', component: Notifications },
	{ path: '/wallet', name: 'Wallet', component: Home },
];

let routes = {};
for(const route of routesList) {
	routes[route.name] = {route};
}

export default routes;
