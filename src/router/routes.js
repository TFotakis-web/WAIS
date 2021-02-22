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

const routes = {
	'Home': {
		route: { path: '/', name: 'Home', component: Home }
	},
	'VehiclePricing': {
		route: { path: '/pricing/vehicle', name: 'VehiclePricing', component: VehiclePricing }
	},
	'IndustrialLiabilityPricing': {
		route: { path: '/pricing/industrialLiability', name: 'IndustrialLiabilityPricing', component: IndustrialLiabilityPricing }
	},
	'FirePricing': {
		route: { path: '/pricing/fire', name: 'FirePricing', component: FirePricing }
	},
	'LifePricing': {
		route: { path: '/pricing/life', name: 'LifePricing', component: LifePricing }
	},
	'ContractsFile': {
		route: { path: '/contract/file', name: 'ContractsFile', component: ContractsFile }
	},
	'UncollectedContracts': {
		route: { path: '/contract/uncollected', name: 'UncollectedContracts', component: UncollectedContracts }
	},
	'CollectedContracts': {
		route: { path: '/contract/collected', name: 'CollectedContracts', component: CollectedContracts }
	},
	'ContractAdditionalActs': {
		route: { path: '/contract/additionalActs', name: 'ContractAdditionalActs', component: ContractAdditionalActs }
	},
	'GreenCardContracts': {
		route: { path: '/contract/greenCard', name: 'GreenCardContracts', component: GreenCardContracts }
	},
	'UnclaimedContracts': {
		route: { path: '/contract/unclaimed', name: 'UnclaimedContracts', component: UnclaimedContracts }
	},
	'InvalidContracts': {
		route: { path: '/contract/invalid', name: 'InvalidContracts', component: InvalidContracts }
	},
	'NewContract': {
		route: { path: '/contract/new', name: 'NewContract', component: NewContract }
	},
	'ProcessingDueDateRegister': {
		route: { path: '/processing/dueDateRegister', name: 'ProcessingDueDateRegister', component: ProcessingDueDateRegister }
	},
	'ProcessingDuePayment': {
		route: { path: '/processing/duePayment', name: 'ProcessingDuePayment', component: ProcessingDuePayment }
	},
	'ProcessingPaid': {
		route: { path: '/processing/paid', name: 'ProcessingPaid', component: ProcessingPaid }
	},
	'ProcessingLosses': {
		route: { path: '/processing/losses', name: 'ProcessingLosses', component: ProcessingLosses }
	},
	'AccountingReceipts': {
		route: { path: '/accounting/receipts', name: 'AccountingReceipts', component: AccountingReceipts }
	},
	'AccountingRegisters': {
		route: { path: '/accounting/registers', name: 'AccountingRegisters', component: AccountingRegisters }
	},
	'AccountingTodaysIncome': {
		route: { path: '/accounting/todaysIncome', name: 'AccountingTodaysIncome', component: AccountingTodaysIncome }
	},
	'AccountingCommissionsUncollected': {
		route: { path: '/accounting/commissionsUncollected', name: 'AccountingCommissionsUncollected', component: AccountingCommissionsUncollected }
	},
	'AccountingCommissionsCollected': {
		route: { path: '/accounting/commissionsCollected', name: 'AccountingCommissionsCollected', component: AccountingCommissionsCollected }
	},
	'AccountingMutualAccount': {
		route: { path: '/accounting/mutualAccount', name: 'AccountingMutualAccount', component: AccountingMutualAccount }
	},
	'SupplierContractors': {
		route: { path: '/contractors/suppliers', name: 'SupplierContractors', component: SupplierContractors }
	},
	'ContractorsExternalContractors': {
		route: { path: '/contractors/externalContractors', name: 'ContractorsExternalContractors', component: ContractorsExternalContractors }
	},
	'VehicleCards': {
		route: { path: '/cards/vehicle', name: 'VehicleCards', component: VehicleCards }
	},
	'VehicleCardsDetails': {
		route: { path: '/cards/vehicle/:id', name: 'VehicleCardsDetails', component: VehicleCardsDetails }
	},
	'CustomerCards': {
		route: { path: '/cards/customers', name: 'CustomerCards', component: CustomerCards }
	},
	'Library': {
		route: { path: '/library', name: 'Library', component: Library }
	},
	'Trade': {
		route: { path: '/trade', name: 'Trade', component: Trade }
	},
	'UserProfile': {
		route: { path: '/profile', name: 'UserProfile', component: UserProfile }
	},
	'PlatformData': {
		route: { path: '/platformData', name: 'PlatformData', component: PlatformData }
	},
	'DevTools': {
		route: { path: '/devTools', name: 'DevTools', component: DevTools }
	},
};

export default routes;
