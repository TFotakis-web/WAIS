<template>
	<mdb-side-nav-2
		:value="true"
		:data="navigation"
		side
		slim
		expand-on-hover
		:slim-collapsed="collapsed"
		@toggleSlim="collapsed = $event"
		sidenav-class="blue accent-4"
		color="white"
	>
		<div slot="header" class="white-text">
			<router-link
				:to="{ name: 'Home' }"
				class="d-flex align-items-center my-4 justify-content-center white-text"
			>
				<mdb-avatar :width="40" style="flex: 0 0 auto">
					<!-- <img
						src="https://mdbootstrap.com/img/Photos/Avatars/avatar-7.jpg"
						class="img-fluid rounded-circle z-depth-1"
					/> -->
					<h1>
						<mdb-icon far icon="building" />
					</h1>
				</mdb-avatar>
				<p
					class="m-t mb-0 ml-4 p-0"
					style="flex: 0 2 auto"
					v-show="!collapsed"
				>
					<strong>MedInsCare</strong>
				</p>
			</router-link>
			<hr class="w-100" />
		</div>
		<div slot="content" class="d-flex justify-content-center white-text">
			<a type="button" class="mx-0">
				<mdb-icon
					:icon="collapsed ? 'chevron-right' : 'chevron-left'"
				/>
			</a>
		</div>

		<mdb-navbar
			slot="nav"
			tag="div"
			:toggler="false"
			position="top"
			light
			color="white"
		>
			<mdb-navbar-nav class="nav-flex-icons" left>
				<mdb-nav-item
					:to="{ name: 'Home' }"
					waves-fixed
					icon="euro-sign"
					class="ml-5"
				>
					<span class="ml-1">1345.85/1800.00</span>
				</mdb-nav-item>
			</mdb-navbar-nav>
			<mdb-navbar-nav class="nav-flex-icons" right>
				<mdb-nav-item
					:to="{ name: 'Home' }"
					waves-fixed
					icon="file-signature"
				>
					<!-- <span class="ml-1">Contract check</span> -->
				</mdb-nav-item>
				<mdb-nav-item
					:to="{ name: 'Home' }"
					waves-fixed
					icon="shopping-cart"
				>
					<!-- <span class="ml-1">Cart</span> -->
				</mdb-nav-item>
				<mdb-nav-item
					:to="{ name: 'Home' }"
					waves-fixed
					icon="university"
				>
					<!-- <span class="ml-1"></span> -->
				</mdb-nav-item>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="bell">
					<!-- <span class="ml-1"></span> -->
				</mdb-nav-item>
				<mdb-nav-item
					:to="{ name: 'Home' }"
					waves-fixed
					icon="handshake"
				>
					<!-- <span class="ml-1"></span> -->
				</mdb-nav-item>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="globe">
					<span class="ml-1">EN</span></mdb-nav-item
				>
				<mdb-nav-item waves-fixed icon="sign-out-alt" @click="signOut">
					<!-- <span>{{ $t("Sign Out") }}</span> -->
				</mdb-nav-item>
			</mdb-navbar-nav>
		</mdb-navbar>

		<div class="pt-5" slot="main" style="min-height: 100vh">
			<router-view />
		</div>
	</mdb-side-nav-2>
</template>

<script>
import { waves } from "mdbvue";
import { Auth } from "aws-amplify";

export default {
	name: "navigation",
	data() {
		return {
			show: true,
			collapsed: true,
			navigation: [
				{
					name: "Τιμολόγηση",
					icon: "chart-line",
					children: [
						{
							name: "Οχημα",
							to: { name: 'VehiclePricing' }
						},
						{
							name: "Αστική Ευθύνη",
							to: { name: 'IndustrialLiabilityPricing' }
						},
						{
							name: "Πυρός",
							to: { name: 'FirePricing' }
						},
						{
							name: "Ζωής",
							to: { name: 'LifePricing' }
						}
					]
				},
				{
					name: "Συμβόλαιο",
					icon: "file-contract",
					children: [
						{
							name: "Αρχείο",
							to: { name: 'ContractsFile' }
						},
						{
							name: "Ανείσπρακτα",
							to: { name: 'UncollectedContracts' }
						},
						{
							name: "Εισπραγμένα",
							to: { name: 'CollectedContracts' }
						},
						{
							name: "Πρόσθετες πράξεις",
							to: { name: 'ContractAdditionalActs' }
						},
						{
							name: "Πράσινη κάρτα",
							to: { name: 'GreenCardContracts' }
						},
						{
							name: "Αζήτητα",
							to: { name: 'UnclaimedContracts' }
						},
						{
							name: "Άκυρα",
							to: { name: 'InvalidContracts' }
						},
						{
							name: "Εισαγωγή Συμβολαίου",
							to: { name: 'NewContract' }
						}
					]
				},
				{
					name: "Διεκπεραίωση",
					icon: "list-ul",
					children: [
						{
							name: "Ληξιάρεια",
							to: { name: 'ProcessingDueDateRegister' }
						},
						{
							name: "Προς πληρωμή",
							to: { name: 'ProcessingDuePayment' }
						},
						{
							name: "Πληρωμένα",
							to: { name: 'ProcessingPaid' }
						},
						{
							name: "Ζημίες",
							to: { name: 'ProcessingLosses' }
						}
					]
				},
				{
					name: "Λογιστήριο",
					icon: "cash-register",
					children: [
						{
							name: "Αποδείξεις ταμείου",
							to: { name: 'AccountingReceipts' }
						},
						{
							name: "Ταμειακές",
							to: { name: 'AccountingRegisters' }
						},
						{
							name: "Ταμείο ημέρας",
							to: { name: 'AccountingTodaysIncome' }
						},
						{
							name: "Προμήθειες προς είσπραξη",
							to: { name: 'AccountingCommissionsUncollected' }
						},
						{
							name: "Εισπραγμένες προμήθειες",
							to: { name: 'AccountingCommissionsCollected' }
						},
						{
							name: "Αλληλοχρεος λογαριασμός",
							to: { name: 'AccountingMutualAccount' }
						}
					]
				},
				{
					name: "Συνεργάτες",
					icon: "user-friends",
					children: [
						{
							name: "Προμηθευτές",
							to: { name: 'SupplierContractors' }
						},
						{
							name: "Συνεργάτες",
							to: { name: 'ContractorsExternalContractors' }
						}
					]
				},
				{
					name: "Καρτέλες",
					icon: "wpforms",
					fab: true,
					children: [
						{
							name: "Οχημάτων",
							to: { name: 'VehicleCards' }
						},
						{
							name: "Πελατών",
							to: { name: 'CustomerCards' }
						}
					]
				},
				{
					name: "Βιβλιοθήκη",
					icon: "book",
					children: [
						{
							name: "Βιβλίο 1",
							to: { name: 'Library' }
						},
						{
							name: "Βιβλίο 2",
							to: { name: 'Library' }
						}
					]
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
			]
		};
	},
	mounted() {
		this.$store.commit("toggleDocs", false);
	},
	beforeDestroy() {
		this.$store.commit("toggleDocs", true);
	},
	mixins: [waves],
	methods: {
		signOut: async () => {
			await Auth.signOut();
		}
	}
};
</script>

<style scoped>
.navbar i {
	cursor: pointer;
	color: white;
}
</style>
