<template>
	<mdb-card cascade narrow>
		<mdb-view cascade class="gradient-card-header blue">
			<h5 class="mb-0">{{ $t('views.Trade.userPermissionsTableCard.cardTitle') }}</h5>
		</mdb-view>
		<mdb-card-body>
			<mdb-row>
				<mdb-col>
					<mdb-tbl sm striped bordered scrollY maxHeight="40em" class="fixed-header-column">
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
					</mdb-tbl>
				</mdb-col>
			</mdb-row>
			<mdb-row>
				<mdb-col class="text-center">
					<hr/>
					<mdb-btn outline="primary" darkWaves rounded @click="addUser">{{ $t('actions.add') }}</mdb-btn>
					<mdb-btn outline="primary" darkWaves rounded @click="save">{{ $t('actions.save') }}</mdb-btn>
				</mdb-col>
			</mdb-row>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
	export default {
		name: 'userPermissionsTableCard',
		data() {
			return {
				permissionsTable: [
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
				],
				usersPermissions: {},
			};
		},
		mounted() {
			this.loadUserPermissions();
		},
		methods: {
			loadUserPermissions() {
				const user = {
					'Home': false,
					'VehiclePricing': false,
					'IndustrialLiabilityPricing': false,
					'FirePricing': false,
					'LifePricing': false,
					'ContractsFile': false,
					'UncollectedContracts': false,
					'CollectedContracts': false,
					'ContractAdditionalActs': false,
					'GreenCardContracts': false,
					'UnclaimedContracts': false,
					'InvalidContracts': false,
					'NewContract': false,
					'ProcessingDueDateRegister': false,
					'ProcessingDuePayment': false,
					'ProcessingPaid': false,
					'ProcessingLosses': false,
					'AccountingReceipts': false,
					'AccountingRegisters': false,
					'AccountingTodaysIncome': false,
					'AccountingCommissionsUncollected': false,
					'AccountingCommissionsCollected': false,
					'AccountingMutualAccount': false,
					'SupplierContractors': false,
					'ContractorsExternalContractors': false,
					'VehicleCards': false,
					'VehicleCardsDetails': false,
					'CustomerCards': false,
					'Library': false,
					'Trade': false,
					'UserProfile': false,
					'PlatformData': false,
				};
				const numCopies = 20;
				for (let i = 0; i < numCopies; i++) {
					this.$set(this.usersPermissions, 'user' + i.toString(), Object.assign({}, user));
				}
			},
			addUser() {
				console.log('Add User.');
			},
			save() {
				console.log('Saved.');
			},
		},
	};
</script>
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
