<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>{{ $t('views.Trade.userPermissionsTableCard.cardTitle') }}</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<ion-item v-for="user in users" :key="user.username">
				<ion-label position="floating">{{ user.username }}</ion-label>
				<ion-select v-model="user.permissions" multiple required>
					<ion-select-option v-for="o in permissionOptions" :key="user.username + o" :value="o">{{ o }}</ion-select-option>
				</ion-select>
			</ion-item>
<!--			<mdb-tbl sm striped bordered scrollY maxHeight="40em" class="fixed-header-column">
				<mdb-tbl-head>
					<tr>
						<th>{{ $t('views.Trade.userPermissionsTableCard.tablePermissionHeader') }}</th>
						<th v-for="(userObject, username) in usersPermissions" :key="username">
							<strong>{{ username }}</strong>
						</th>
					</tr>
				</mdb-tbl-head>
				<mdb-tbl-body>
					<tr v-for="permission in permissionsTable" :key="permission + 'row'" scope="row">
						<th><strong>{{ permission }}</strong></th>
						<td v-for="(userObject, username) in usersPermissions" :key="permission + username" class="p-0 align-middle">
							<mdb-input type="checkbox" :id="permission + username" v-model="userObject[permission]" class="mx-auto p-0" style="height: 18px; width: 18px; margin-top: -4px;"/>
						</td>
					</tr>
				</mdb-tbl-body>
			</mdb-tbl>-->
			<div class="ion-margin-top">
				<ion-button @click="addUser" fill="clear">
					<ion-icon :icon="$ionicons.addOutline" slot="start"/>
					<span>{{ $t('actions.add') }}</span>
				</ion-button>
				<loadingBtn @click="save" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
			</div>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'userPermissionsTableCard',
		components: {
			loadingBtn,
		},
		data() {
			return {
				// permissionsTable: [
				// 	'Home',
				// 	'VehiclePricing',
				// 	'IndustrialLiabilityPricing',
				// 	'FirePricing',
				// 	'LifePricing',
				// 	'ContractsFile',
				// 	'UncollectedContracts',
				// 	'CollectedContracts',
				// 	'ContractAdditionalActs',
				// 	'GreenCardContracts',
				// 	'UnclaimedContracts',
				// 	'InvalidContracts',
				// 	'NewContract',
				// 	'ProcessingDueDateRegister',
				// 	'ProcessingDuePayment',
				// 	'ProcessingPaid',
				// 	'ProcessingLosses',
				// 	'AccountingReceipts',
				// 	'AccountingRegisters',
				// 	'AccountingTodaysIncome',
				// 	'AccountingCommissionsUncollected',
				// 	'AccountingCommissionsCollected',
				// 	'AccountingMutualAccount',
				// 	'SupplierContractors',
				// 	'ContractorsExternalContractors',
				// 	'VehicleCards',
				// 	'VehicleCardsDetails',
				// 	'CustomerCards',
				// 	'Library',
				// 	'Trade',
				// 	'UserProfile',
				// 	'PlatformData',
				// ],
				// usersPermissions: {},
				loading: false,
				users: (() => {
					const arr = [];
					for(let i = 0; i < 20; i++) {
						arr.push({
							username: `user${i}`,
							permissions: [],
						});
					}
					return arr;
				})(),
				permissionOptions: [
					'Home',
					'VehiclePricing',
					'IndustrialLiabilityPricing',
					'FirePricing',
					'LifePricing',
					'ContractsFile',
					'UncollectedContracts',
					'CollectedContracts',
					'ContractAdditionalActs',
					'GreenCardContracts',
					'UnclaimedContracts',
					'InvalidContracts',
					'NewContract',
					'ProcessingDueDateRegister',
					'ProcessingDuePayment',
					'ProcessingPaid',
					'ProcessingLosses',
					'AccountingReceipts',
					'AccountingRegisters',
					'AccountingTodaysIncome',
					'AccountingCommissionsUncollected',
					'AccountingCommissionsCollected',
					'AccountingMutualAccount',
					'SupplierContractors',
					'ContractorsExternalContractors',
					'VehicleCards',
					'VehicleCardsDetails',
					'CustomerCards',
					'Library',
					'Trade',
					'UserProfile',
					'PlatformData',
					'DevTools',
					'ContractApproval',
					'Payment',
					'Bank',
					'Collaboration',
					'Notifications',
					'NotificationDetails',
					'Wallet',
					'TradeCreationForm',
				],
			};
		},
		mounted() {
			// this.loadUserPermissions();
		},
		methods: {
			// loadUserPermissions() {
			// 	const user = {
			// 		'Home': false,
			// 		'VehiclePricing': false,
			// 		'IndustrialLiabilityPricing': false,
			// 		'FirePricing': false,
			// 		'LifePricing': false,
			// 		'ContractsFile': false,
			// 		'UncollectedContracts': false,
			// 		'CollectedContracts': false,
			// 		'ContractAdditionalActs': false,
			// 		'GreenCardContracts': false,
			// 		'UnclaimedContracts': false,
			// 		'InvalidContracts': false,
			// 		'NewContract': false,
			// 		'ProcessingDueDateRegister': false,
			// 		'ProcessingDuePayment': false,
			// 		'ProcessingPaid': false,
			// 		'ProcessingLosses': false,
			// 		'AccountingReceipts': false,
			// 		'AccountingRegisters': false,
			// 		'AccountingTodaysIncome': false,
			// 		'AccountingCommissionsUncollected': false,
			// 		'AccountingCommissionsCollected': false,
			// 		'AccountingMutualAccount': false,
			// 		'SupplierContractors': false,
			// 		'ContractorsExternalContractors': false,
			// 		'VehicleCards': false,
			// 		'VehicleCardsDetails': false,
			// 		'CustomerCards': false,
			// 		'Library': false,
			// 		'Trade': false,
			// 		'UserProfile': false,
			// 		'PlatformData': false,
			// 	};
			// 	const numCopies = 20;
			// 	for (let i = 0; i < numCopies; i++) {
			// 		this.$set(this.usersPermissions, 'user' + i.toString(), Object.assign({}, user));
			// 	}
			// },
			addUser() {
				console.log('Add User.');
			},
			save() {
				this.loading = true;
				console.log('Saved.');
				this.loading = false;
				this.$toast.saveSuccess();
			},
		},
	};
</script>
<!--
<style scoped>
	div .fixed-header-column {
		position: relative;
	}

	.fixed-header-column table {
		position: relative;
		border-collapse: collapse;
	}

	.fixed-header-column td,
	th {
		z-index: 1;
	}

	.fixed-header-column thead th {
		position: -webkit-sticky; /* for Safari */
		position: sticky;
		top: 0;
		background: #FFF;
		color: #000;
		z-index: 2;
	}

	.fixed-header-column thead th:first-child {
		left: 0;
		z-index: 3;
	}

	.fixed-header-column tbody th {
		position: -webkit-sticky; /* for Safari */
		position: sticky;
		left: 0;
		background: #FFF;
		z-index: 2;
	}
</style>
-->
