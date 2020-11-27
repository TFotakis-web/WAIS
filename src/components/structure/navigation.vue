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
			<router-link :to="{ name: 'Trade' }" class="d-flex align-items-center my-4 justify-content-center white-text">
				<mdb-avatar :width="40" style="flex: 0 0 auto">
					<!-- <img
						src="https://mdbootstrap.com/img/Photos/Avatars/avatar-7.jpg"
						class="img-fluid rounded-circle z-depth-1"
					/> -->
					<h1>
						<mdb-icon far icon="building" />
					</h1>
				</mdb-avatar>
				<p class="m-t mb-0 ml-4 p-0" style="flex: 0 2 auto" v-show="!collapsed">
					<strong>MedInsCare</strong>
				</p>
			</router-link>
			<hr class="w-100" />
		</div>
		<div slot="content" class="d-flex justify-content-center white-text">
			<a type="button" class="mx-0">
				<mdb-icon :icon="collapsed ? 'chevron-right' : 'chevron-left'" />
			</a>
		</div>

		<mdb-navbar slot="nav" tag="div" :toggler="false" position="top" light color="white">
			<mdb-navbar-nav class="nav-flex-icons" left>
				<mdb-tooltip material trigger="hover" :options="{ placement: 'right' }" class="ml-5">
					<span slot="tip">{{ $t('components.navigation.navbar-item.home') }}</span>
					<mdb-nav-item slot="reference" :to="{ name: 'Home' }" waves-fixed icon="home" />
				</mdb-tooltip>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="euro-sign">
					<span class="ml-1">1345.85/1800.00</span>
				</mdb-nav-item>
			</mdb-navbar-nav>
			<mdb-navbar-nav class="nav-flex-icons" right>
				<mdb-tooltip material trigger="hover" :options="{ placement: 'bottom' }">
					<span slot="tip">{{ $t('components.navigation.navbar-item.database') }}</span>
					<mdb-nav-item slot="reference" :to="{ name: 'PlatformData' }" waves-fixed icon="table" />
				</mdb-tooltip>
				<mdb-tooltip material trigger="hover" :options="{ placement: 'bottom' }">
					<span slot="tip">{{ $t('components.navigation.navbar-item.contract-approval') }}</span>
					<mdb-nav-item slot="reference" :to="{ name: 'Home' }" waves-fixed icon="file-signature" />
				</mdb-tooltip>
				<mdb-tooltip material trigger="hover" :options="{ placement: 'bottom' }">
					<span slot="tip">{{ $t('components.navigation.navbar-item.payment') }}</span>
					<mdb-nav-item slot="reference" :to="{ name: 'Home' }" waves-fixed icon="shopping-cart" />
				</mdb-tooltip>
				<mdb-tooltip material trigger="hover" :options="{ placement: 'bottom' }">
					<span slot="tip">{{ $t('components.navigation.navbar-item.bank') }}</span>
					<mdb-nav-item slot="reference" :to="{ name: 'Home' }" waves-fixed icon="university" />
				</mdb-tooltip>
				<mdb-tooltip material trigger="hover" :options="{ placement: 'bottom' }">
					<span slot="tip">{{ $t('components.navigation.navbar-item.collaboration') }}</span>
					<mdb-nav-item slot="reference" :to="{ name: 'Home' }" waves-fixed icon="handshake" />
				</mdb-tooltip>
				<mdb-tooltip material trigger="hover" :options="{ placement: 'bottom' }">
					<span slot="tip">{{ $t('components.navigation.navbar-item.notifications') }}</span>
					<mdb-nav-item slot="reference" :to="{ name: 'Home' }" waves-fixed icon="bell" />
				</mdb-tooltip>
				<localeDropdown class="nav-item" style="border-left: 1px solid grey !important" />
				<mdb-dropdown tag="li" class="nav-item black-text">
					<mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>
						<mdb-icon icon="user-circle" class="black-text" />
					</mdb-dropdown-toggle>
					<mdb-dropdown-menu left style="min-width: unset">
						<mdb-dropdown-item :to="{ name: 'UserProfile' }">{{ $t('components.navigation.navbar-item.myAccount') }}</mdb-dropdown-item>
						<hr class="m-0" />
						<mdb-dropdown-item @click="signOut">
							<mdb-icon class="black-text" icon="sign-out-alt" />
							{{ $t('components.navigation.navbar-item.signOut') }}
						</mdb-dropdown-item>
					</mdb-dropdown-menu>
				</mdb-dropdown>
			</mdb-navbar-nav>
		</mdb-navbar>

		<div class="py-5" slot="main" style="min-height: 100vh">
			<transition name="fadingSlide" mode="out-in">
				<router-view />
			</transition>
		</div>
	</mdb-side-nav-2>
</template>

<script>
	import { mapActions } from 'vuex';
	import { waves } from 'mdbvue';
	import localeDropdown from '@/components/structure/localeDropdown';

	export default {
		name: 'navigation',
		components: {
			localeDropdown,
		},
		data() {
			return {
				show: true,
				collapsed: true,
			};
		},
		computed: {
			navigation: function() {
				return [
					{
						name: this.$t('components.navigation.sidenav.pricing._groupName'),
						icon: 'chart-line',
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
						icon: 'file-contract',
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
						icon: 'list-ul',
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
						icon: 'cash-register',
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
						icon: 'user-friends',
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
						icon: 'wpforms',
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
						name: this.$t('components.navigation.sidenav.library._groupName'),
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
			},
		},
		mixins: [waves],
		methods: {
			...mapActions({
				signOutStore: 'auth/signOut',
			}),
			signOut: async function() {
				await this.signOutStore();
				if (this.$router.currentRoute.name !== 'Home') {
					this.$router.push({ name: 'Home' });
				}
			},
		},
	};
</script>

<style scoped>
	.navbar i {
		cursor: pointer;
		color: white;
	}
</style>
