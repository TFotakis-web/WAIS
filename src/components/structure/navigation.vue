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
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="euro-sign" class="ml-5">
					<span class="ml-1">1345.85/1800.00</span>
				</mdb-nav-item>
			</mdb-navbar-nav>
			<mdb-navbar-nav class="nav-flex-icons" right>
				<mdb-nav-item :to="{ name: 'PlatformData' }" waves-fixed icon="table">
					<!-- <span class="ml-1">Contract check</span> -->
				</mdb-nav-item>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="file-signature">
					<!-- <span class="ml-1">Contract check</span> -->
				</mdb-nav-item>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="shopping-cart">
					<!-- <span class="ml-1">Cart</span> -->
				</mdb-nav-item>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="university">
					<!-- <span class="ml-1"></span> -->
				</mdb-nav-item>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="handshake">
					<!-- <span class="ml-1"></span> -->
				</mdb-nav-item>
				<mdb-nav-item :to="{ name: 'Home' }" waves-fixed icon="bell">
					<!-- <span class="ml-1"></span> -->
				</mdb-nav-item>
				<localeDropdown class="nav-item" style="border-left: 1px solid grey !important" />
				<mdb-dropdown tag="li" class="nav-item black-text">
					<mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>
						<mdb-icon icon="user-circle" class="black-text" />
					</mdb-dropdown-toggle>
					<mdb-dropdown-menu left style="min-width: unset">
						<mdb-dropdown-item :to="{ name: 'UserProfile' }">{{ $t('My account') }}</mdb-dropdown-item>
						<hr class="m-0" />
						<mdb-dropdown-item @click="signOut">
							<mdb-icon class="black-text" icon="sign-out-alt" />
							{{ $t('Sign Out') }}
						</mdb-dropdown-item>
					</mdb-dropdown-menu>
				</mdb-dropdown>
			</mdb-navbar-nav>
		</mdb-navbar>

		<div class="py-5" slot="main" style="min-height: 100vh">
			<transition name="fadingSlide" mode="out-in">
				<router-view/>
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
						name: this.$t('Pricing'),
						icon: 'chart-line',
						children: [
							{
								name: this.$t('Vehicle'),
								to: { name: 'VehiclePricing' },
							},
							{
								name: this.$t('Industrial Liability'),
								to: { name: 'IndustrialLiabilityPricing' },
							},
							{
								name: this.$t('Fire'),
								to: { name: 'FirePricing' },
							},
							{
								name: this.$t('Life'),
								to: { name: 'LifePricing' },
							},
						],
					},
					{
						name: this.$t('Contracts'),
						icon: 'file-contract',
						children: [
							{
								name: this.$t('File'),
								to: { name: 'ContractsFile' },
							},
							{
								name: this.$t('Uncollected'),
								to: { name: 'UncollectedContracts' },
							},
							{
								name: this.$t('Collected'),
								to: { name: 'CollectedContracts' },
							},
							{
								name: this.$t('Additional Acts'),
								to: { name: 'ContractAdditionalActs' },
							},
							{
								name: this.$t('Green Card'),
								to: { name: 'GreenCardContracts' },
							},
							{
								name: this.$t('Unclaimed'),
								to: { name: 'UnclaimedContracts' },
							},
							{
								name: this.$t('Invalid'),
								to: { name: 'InvalidContracts' },
							},
							{
								name: this.$t('New'),
								to: { name: 'NewContract' },
							},
						],
					},
					{
						name: this.$t('Processing'),
						icon: 'list-ul',
						children: [
							{
								name: this.$t('Due Date Register'),
								to: { name: 'ProcessingDueDateRegister' },
							},
							{
								name: this.$t('Due Payment'),
								to: { name: 'ProcessingDuePayment' },
							},
							{
								name: this.$t('Paid'),
								to: { name: 'ProcessingPaid' },
							},
							{
								name: this.$t('Losses'),
								to: { name: 'ProcessingLosses' },
							},
						],
					},
					{
						name: this.$t('Accounting'),
						icon: 'cash-register',
						children: [
							{
								name: this.$t('Receipts'),
								to: { name: 'AccountingReceipts' },
							},
							{
								name: this.$t('Registers'),
								to: { name: 'AccountingRegisters' },
							},
							{
								name: this.$t('Todays Income'),
								to: { name: 'AccountingTodaysIncome' },
							},
							{
								name: this.$t('Commissions Uncollected'),
								to: { name: 'AccountingCommissionsUncollected' },
							},
							{
								name: this.$t('Commissions Collected'),
								to: { name: 'AccountingCommissionsCollected' },
							},
							{
								name: this.$t('Mutual Account'),
								to: { name: 'AccountingMutualAccount' },
							},
						],
					},
					{
						name: this.$t('Contractors'),
						icon: 'user-friends',
						children: [
							{
								name: this.$t('Suppliers'),
								to: { name: 'SupplierContractors' },
							},
							{
								name: this.$t('External Contractors'),
								to: { name: 'ContractorsExternalContractors' },
							},
						],
					},
					{
						name: this.$t('Cards'),
						icon: 'wpforms',
						fab: true,
						children: [
							{
								name: this.$t('Vehicle Cards'),
								to: { name: 'VehicleCards' },
							},
							{
								name: this.$t('Customer Cards'),
								to: { name: 'CustomerCards' },
							},
						],
					},
					{
						name: this.$t('Library'),
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
